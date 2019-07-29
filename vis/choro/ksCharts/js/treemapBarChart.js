function treemapBarChart(config) {
var margin = { top: 15, right: 15, bottom: 40, left: 60 }
var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom

var orderedContinents = _.keys(config.color);

var color = d3.scaleOrdinal()
    .domain(orderedContinents)
    .range(_.values(config.color))

var dollarFormat = d3.format('$,')
var tickFormat = function (n) {
    return n === 0 ? '$0'
        : n < 1000000 ? dollarFormat(n / 1000) + ' billion'
            : dollarFormat(n / 1000000) + ' trillion'
}

var options = {
    key: 'value',
    name: null
}

d3.json(config.url, initialize)

function initialize(error, data) {
    if (error) { throw error }

    var root = d3.hierarchy(data).sum(function (d) { return d[options.key] })
    var yearData = root.children

    yearData.sort(function (a, b) { return a.data.year - b.data.year })

    var svg = d3.select('body')
        .append('svg')
        .attr('class', 'treemap-bar-chart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    var x0 = d3.scaleBand()
        .domain(yearData.map(function (d) { return d.data.year }).sort())
        .range([0, width])
        .padding(0.15)

    var x1 = d3.scaleBand()
        .domain(['BTS', 'Holiday'])
        .rangeRound([0, x0.bandwidth()])
        .paddingInner(0.1)

    var y = d3.scaleLinear()
        .domain([0, d3.max(yearData, function (d) {
            return d3.max(d.children, function (e) { return e.value })
        })]).nice()
        .range([0, height])

    var x0Axis = d3.axisBottom()
        .scale(x0)
        .tickSize(0)

    var x1Axis = d3.axisBottom()
        .scale(x1)

    var yAxis = d3.axisLeft()
        .tickSize(-width)
        .tickFormat(tickFormat)
        .scale(y.copy().range([height, 0]))

    svg.append('g')
        .attr('class', 'x0 axis')
        .attr('transform', 'translate(0,' + (height + 22) + ')')
        .call(x0Axis)

    var gy = svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)

    var years = svg.selectAll('.year')
        .data(yearData, function (d) { return d.data.year })
        .enter().append('g')
        .attr('class', 'year')
        .attr('transform', function (d) {
            return 'translate(' + x0(d.data.year) + ',0)'
        })

    years.append('g')
        .attr('class', 'x1 axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(x1Axis)

    update()

    function sum(d) {
        return !options.name || options.name === d.name ? d[options.key] : 0
    }

    function update() {
        root.sum(sum)

        var t = d3.transition()

        var typeData = d3.merge(yearData.map(function (d) { return d.children }))

        y.domain([0, d3.max(typeData.map(function (d) { return d.value }))]).nice()

        // We use a copied Y scale to invert the range for display purposes
        yAxis.scale(y.copy().range([height, 0]))
        gy.transition(t).call(yAxis)

        var types = years.selectAll('.type')
            .data(function (d) { return d.children },
                  function (d) { return d.data.type })
            .each(function (d) {
                // UPDATE
                // The copied branches are orphaned from the larger hierarchy,
                // and must be
                // updated separately (see note at L152).
                d.treemapRoot.sum(sum)
                d.treemapRoot.children.forEach(function (d) {
                    d.sort(function (a, b) { return b.value - a.value })
                })
            })

        types = types.enter().append('g')
            .attr('class', 'type')
            .attr('transform', function (d) {
                return 'translate(' + x1(d.data.type) + ',' + height + ')'
            })
            .each(function (d) {
                // ENTER
                // Note that we can use .each on selections as a way to perform
                // operations
                // at a given depth of the hierarchy tree.
                d.children.sort(function (a, b) {
                    return orderedContinents.indexOf(b.data.name) -
                        orderedContinents.indexOf(a.data.name)
                })
                d.children.forEach(function (d) {
                    d.sort(function (a, b) { return b.value - a.value })
                })
                d.treemap = d3.treemap().tile(d3.treemapResquarify)

                // The treemap layout must be given a root node, so we make a
                // copy of our
                // child node, which creates a new tree from the branch.
                d.treemapRoot = d.copy()
            })
            .merge(types)
            .each(function (d) {
                // UPDATE + ENTER
                d.treemap.size([x1.bandwidth(), y(d.value)])(d.treemapRoot)
            })

        // d3.hierarchy gives us a convenient way to access the parent datum.
        // This line
        // adds an index property to each node that we'll use for the transition
        // delay.
        root.each(function (d) { d.index = d.parent ? d.parent.children.indexOf(d) : 0 })

        types.transition(t)
            .delay(function (d, i) { return d.parent.index * 150 + i * 50 })
            .attr('transform', function (d) {
                return 'translate(' + x1(d.data.type) + ',' + (height - y(d.value)) + ')'
            })

        var continents = types.selectAll('.continent')
            // Note that we're using our copied branch.
            .data(function (d) { return d.treemapRoot.children },
                  function (d) { return d.data.name })

        continents = continents.enter().append('g')
            .attr('class', 'continent')
            .merge(continents)

        var countries = continents.selectAll('.country')
            .data(function (d) { return d.children },
                  function (d) { return d.data.name })

        var enterCountries = countries.enter().append('rect')
            .attr('class', 'country')
            .attr('x', function (d) { return d.value ? d.x0 : x1.bandwidth() / 2 })
            .attr('width', function (d) { return d.value ? d.x1 - d.x0 : 0 })
            .attr('y', 0)
            .attr('height', 0)
            .style('fill', function (d) { return color(d.parent.data.name) })

        countries = countries.merge(enterCountries)

        enterCountries
            .on('mouseover', function (d) {
                svg.classed('hover-active', true)
                countries.classed('hover', function (e) {
                    return e.data.name === d.data.name
                })
            })
            .on('mouseout', function () {
                svg.classed('hover-active', false)
                countries.classed('hover', false)
            })
            .on('click', function (d) {
                options.name = options.name === d.data.name ? null : d.data.name
                update()
            })
            .append('title')
            .text(function (d) { return d.data.name })

        countries.filter(function (d) { return d.data.name === options.name })
            .each(function (d) { d3.select(this.parentNode).raise() })
            .raise()

        countries
            .transition(t)
            .attr('x', function (d) { return d.value ? d.x0 : x1.bandwidth() / 2 })
            .attr('width', function (d) { return d.value ? d.x1 - d.x0 : 0 })
            .attr('y', function (d) { return d.value ? d.y0 : d.parent.parent.y1 / 2 })
            .attr('height', function (d) { return d.value ? d.y1 - d.y0 : 0 })
    }
}

}
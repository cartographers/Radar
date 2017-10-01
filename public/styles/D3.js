import * as d3 from 'd3'

export function barGraph(data){
  d3.select('.chart')
  .selectAll('div')
  .data(data)
    .enter()
    .append('div')
    .style('width', function(d) { return d + 'px'; })
    .text(function(d) { return d; });
}

export function makePie(data, settings){
	let svg = d3.select('svg')
	let width = settings.width
	let height = settings.height
	let radius = Math.min(width, height)
	let g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
	let color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00', 'red'])

	let pie = d3.pie()
	pie.value(function(d){return d[settings.value]})

	let path = d3.arc()
	path.outerRadius(radius - 10)
	path.innerRadius(0)

	let label = d3.arc()
	label.outerRadius(radius - 40)
	label.innerRadius(radius - 40)

	d3.csv(data, function(d){
		d[settings.value] = +d[settings.value]
		return d
	}, function(error, dataItem){
		if (error) throw error

		let pieChart = g.selectAll('.pieChart')
			.data(pie(data))
			.enter()
			.append('g')
				.attr('class', 'pieChart')

		pieChart.append('path')
			.attr('d', path)
			.attr('fill', function(d) { return color(d.data[settings.label])})
			.text(function(d) { return d.data[settings.label] })

		pieChart.append('text')
			.attr('transform', function(d) { return 'translate(' + label.centroid(d) + ')'})
			.attr('dy', '0.30em')
			.text(function(d) { return d.data[settings.label] })

	})
}

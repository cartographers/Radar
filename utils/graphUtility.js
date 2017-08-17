import {AreaGraph, BarGraph, LineGraph, PieGraph, Scatter, Table} from './client/components'

export const setSettings = (settings, makeGraph) => {
	if (makeGraph === 'pie') {
		title = settings.Title
		width = settings.width
		height = settings.height
		selectThese = settings.selectThese
		whereThese = settings.whereThese, 
		orderBy = settings.orderedBy
		database = settings.currentDatabase
		table = settings.currentTable 
	} else {
		x = settings.xAxis
		y = settings.yAxis
		title = settings.Title
		width = settings.width
		height = settings.height
		selectThese = settings.selectThese
		whereThese = settings.whereThese 
		orderBy = settings.orderedBy
		database = settings.currentDatabase
		table = settings.currentTable 
	}
}


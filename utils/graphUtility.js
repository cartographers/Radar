import {AreaGraph, BarGraph, LineGraph, PieGraph, Scatter, Table} from './client/components'




export const newGraph = (settings, makeGraph) => {
		const title = settings.Title
		const width = settings.width
		const height = settings.height
		const selectThese = settings.selectThese
		const whereThese = settings.whereThese, 
		const orderBy = settings.orderedBy
		const database = settings.currentDatabase
		const table = settings.currentTable
		if(makeGraph === 'Pie'){
			return <PieGraph title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table}/>
		}
		const x = settings.xAxis
		const y = settings.yAxis
		if(makeGraph ==='Area') 
			return <AreaGraph title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} x={x} y={y}/>
		if(makeGraph ==='Line') 
			return <LineGraph title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} x={x} y={y}/>
		if(makeGraph ==='Bar') 
			return <BarGraph title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} x={x} y={y}/>
		if(makeGraph ==='Scatter') 
			return <ScatterGraph title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} x={x} y={y}/>
}

import {AreaGraph, BarGraph, LineGraph, PieGraph, Scatter, Table} from '../client/components'
import React from 'react'

export const saveQueryData = (data) => {
  return data
}

export const newGraphMaker = (settings) => {
    let makeGraph = settings.choosenChart
    let title = settings.Title
    let width = +settings.width
    let height = +settings.height
    let selectThese = settings.selectThese
    let whereThese = settings.whereThese
    let orderedBy = settings.orderedBy
    let database = settings.currentDatabase
    let table = settings.currentTable
    let x = settings.xAxis
    let y = settings.yAxis
    let savedQuery = settings.savedQuery
    let pieKey = settings.pieKey

    if (makeGraph === 'Area') return <AreaGraph title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} x={x} y={y} whereThese={whereThese} savedQuery={savedQuery} />
    if (makeGraph === 'Line') {
        //  Check for unique x values
        return <LineGraph title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} x={x} y={y} whereThese={whereThese} savedQuery={savedQuery} />
    }
    if (makeGraph === 'Bar') {
        // If x or y values do not meet correct data type, return error
        return <BarGraph title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} x={x} y={y} whereThese={whereThese} savedQuery={savedQuery} />
    }
    if (makeGraph === 'Scatter') {
        orderedBy = 'ORDER BY id ASC'
        return <Scatter title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} x={x} y={y} whereThese={whereThese} savedQuery={savedQuery} />
    }
    if (makeGraph === 'Pie') return <PieGraph pieKey={pieKey} title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} whereThese={whereThese} savedQuery={savedQuery} />
}

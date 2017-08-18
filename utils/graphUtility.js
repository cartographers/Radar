import {AreaGraph, BarGraph, LineGraph, PieGraph, Scatter, Table} from '../client/components'
import React from 'react'

export const saveQueryData = (data) => {
  return data
}

export const newGraphMaker = (settings) => {
    const makeGraph = settings.choosenChart
    const title = settings.Title
    const width = +settings.width
    const height = +settings.height
    const selectThese = settings.selectThese
    const whereThese = settings.whereThese
    const orderedBy = settings.orderedBy
    const database = settings.currentDatabase
    const table = settings.currentTable
    const x = settings.xAxis
    const y = settings.yAxis
    const savedQuery = settings.savedQuery

    if (makeGraph === 'Pie'){
      return <PieGraph title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} whereThese={whereThese} savedQuery={savedQuery} />
    }

    if (makeGraph === 'Area') return <AreaGraph title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} x={x} y={y} whereThese={whereThese} savedQuery={savedQuery} />
    if (makeGraph === 'Line') return <LineGraph title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} x={x} y={y} whereThese={whereThese} savedQuery={savedQuery} />
    if (makeGraph === 'Bar') return <BarGraph title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} x={x} y={y} whereThese={whereThese} savedQuery={savedQuery} />
    if (makeGraph === 'Scatter') return <Scatter title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} x={x} y={y} whereThese={whereThese} savedQuery={savedQuery} />
}

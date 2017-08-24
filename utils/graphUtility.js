import {AreaGraph, BarGraph, LineGraph, PieGraph, Scatter, TableDB} from '../client/components'
import React from 'react'

export const saveQueryData = (data) => {
  return data
}

export const newGraphMaker = (settings) => {
  const makeGraph = settings.choosenChart
  const title = settings.Title
  const width = 400
  const height = 350
  const selectThese = settings.selectThese
  const whereThese = settings.whereThese
  const orderedBy = settings.orderedBy
  const database = settings.currentDatabase
  const table = settings.currentTable
  const x = settings.xAxis
  const y = settings.yAxis
  const savedQuery = settings.savedQuery
  const pieKey = settings.pieKey
  const AndOr = settings.AndOr
  const created = settings.created
  const color1 =  '#E84A5F'
  const color2 = '#FECEA8'
  const color3 = '#99B898'
  const color4 = '#FF847C'
  const color5 = '2A363B'
  
  const stroke = color1
  const strokeGrid = color2
  const fill = color1
  
  
  if (makeGraph === 'Area') return <AreaGraph strokeGrid={strokeGrid} stroke={stroke} title={title} AndOr={AndOr} width={width} height={height}
                                              selectThese={selectThese} orderedBy={orderedBy} database={database}
                                              table={table} x={x} y={y} whereThese={whereThese} savedQuery={savedQuery}
                                              created={created}/>
  if (makeGraph === 'Line') {
    //  Check for unique x values
    return <LineGraph strokeGrid={strokeGrid} stroke={stroke} title={title} AndOr={AndOr} width={width} height={height}
                      selectThese={selectThese} orderedBy={orderedBy} database={database} table={table} x={x} y={y}
                      whereThese={whereThese} savedQuery={savedQuery} created={created}/>
  }
  if (makeGraph === 'Bar') {
    // If x or y values do not meet correct data type, return error
    return <BarGraph strokeGrid={strokeGrid} fill={fill} title={title} AndOr={AndOr} width={width} height={height} selectThese={selectThese}
                     orderedBy={orderedBy} database={database} table={table} x={x} y={y} whereThese={whereThese}
                     savedQuery={savedQuery} created={created}/>
  }
  
  if (makeGraph === 'Scatter') return <Scatter strokeGrid={strokeGrid} fill={fill} title={title} AndOr={AndOr} width={width} height={height}
                                               selectThese={selectThese} orderedBy={orderedBy} database={database}
                                               table={table} x={x} y={y} whereThese={whereThese} savedQuery={savedQuery}
                                               created={created}/>
  if (makeGraph === 'Pie') return <PieGraph pieKey={pieKey} title={title} AndOr={AndOr} width={width} height={height}
                                            selectThese={selectThese} orderedBy={orderedBy} database={database}
                                            table={table} whereThese={whereThese} savedQuery={savedQuery}
                                            created={created}/>
  if (makeGraph === 'Table') {
    // If x or y values do not meet correct data type, return error
    return <TableDB title={title} width={width} height={height} selectThese={selectThese} orderedBy={orderedBy}
                    database={database} table={table} whereThese={whereThese} savedQuery={savedQuery}
                    created={created}/>
  }
}

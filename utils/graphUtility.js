import {AreaGraph, BarGraph, LineGraph, PieGraph, Scatter, TableDB} from '../client/components'
import React from 'react'

export const saveQueryData = (data) => {
  return data
}

export const newGraphMaker = (settings) => {
  console.log(settings)

  const makeGraph = settings.choosenChart
  settings.title = settings.Title
  settings.width = 350
  settings.height = 350
  settings.x = settings.xAxis
  settings.y = settings.yAxis

  settings.savedQuery = settings.savedQuery.map(dataObject => {
    if (!isNaN(dataObject[settings.y])) dataObject[settings.y] = Number(dataObject[settings.y])
    return dataObject
  })

  const color1 =  '#E84A5F'
  const color2 = '#FECEA8'
  const color3 = '#99B898'
  const color4 = '#FF847C'
  const color5 = '2A363B'

  const stroke = color1
  const strokeGrid = color2
  const fill = color1

  if (makeGraph === 'Area') return <AreaGraph {...settings} strokeGrid={strokeGrid} stroke={stroke} />
  if (makeGraph === 'Line') return <LineGraph {...settings} strokeGrid={strokeGrid} stroke={stroke} fill={fill} />
  if (makeGraph === 'Bar') return <BarGraph {...settings}  strokeGrid={strokeGrid} fill={fill} />
  if (makeGraph === 'Scatter') return <Scatter {...settings} strokeGrid={strokeGrid} stroke={stroke} />
  if (makeGraph === 'Pie') return <PieGraph {...settings} fill={fill}/>
  if (makeGraph === 'Table') return <TableDB {...settings} />
}

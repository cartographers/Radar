import {AreaGraph, BarGraph, LineGraph, PieGraph, Scatter, TableDB} from '../client/components'
import React from 'react'

export const saveQueryData = (data) => {
  return data
}

export const newGraphMaker = (settings) => {
    const makeGraph = settings.choosenChart
    if (makeGraph === 'Area') return <AreaGraph {...settings} />
    if (makeGraph === 'Line') {
        //  Check for unique x values
        return <LineGraph {...settings} />
    }
    if (makeGraph === 'Bar') {
        // If x or y values do not meet correct data type, return error
        return <BarGraph {...settings} />
    }
    if (makeGraph === 'Scatter') return <Scatter {...settings} />
    if (makeGraph === 'Pie') return <PieGraph {...settings} />
    if (makeGraph === 'Table') {
        // If x or y values do not meet correct data type, return error
        return <TableDB {...settings} />
    }
}

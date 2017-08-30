import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {CustomTooltip} from './customToolTips'
import TableDB from './TableDB'
import React from 'react'

const ScatterGraph = (props) => {
  const {title, x, y, savedQuery, aggregateInformation, fill, width, height} = props
  return (
    <div className="col-md-6">
      <h5 className="form-labels"><strong> {title} </strong></h5>
      <ScatterChart
        width={width}
        height={height}
        margin={{top: 20, right: 20, bottom: 10, left: 10}}>
        <XAxis dataKey={x} name={x.toString()}/>
        <YAxis dataKey={y} name={y.toString()}/>
        <Tooltip content={CustomTooltip} cursor={{strokeDasharray: '3 3'}}/>
        <Legend/>
        <Scatter data={savedQuery} stroke={'#00ccff'} fill={'#2A363B'}/>
      </ScatterChart>
      {aggregateInformation && <TableDB Title={title + ' aggregate Info'} savedQuery={aggregateInformation}/>}
    </div>
  )
}

export default ScatterGraph

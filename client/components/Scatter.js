import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {CustomTooltip} from './customToolTips'
import TableDB from './TableDB'
import React from 'react'

const ScatterGraph = (props) => {
    const { Title, xAxis, yAxis, savedQuery, aggregateInformation } = props
    return (
      <div className="col-md-6">
        <div><h4>{Title}</h4></div>
          <ScatterChart
            width={500}
            height={500}
            margin={{top: 20, right: 20, bottom: 10, left: 10}}>
            <XAxis dataKey={xAxis} name={xAxis.toString()} />
            <YAxis dataKey={yAxis} name={yAxis.toString()} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={CustomTooltip}  cursor={{strokeDasharray: '3 3'}} />
            <Legend />
            <Scatter name={Title} data={savedQuery} fill="#8884d8" label />
          </ScatterChart>
          { aggregateInformation && <TableDB Title={Title + ' aggregate Info'} savedQuery={aggregateInformation} />}
      </div>
    )
}

export default ScatterGraph

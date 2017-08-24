import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {CustomTooltip} from './customToolTips'
import TableDB from './TableDB'
import React from 'react'

const ScatterGraph = (props) => {
    const { title, x, y, savedQuery, aggregateInformation, fill } = props
    return (
      <div className="col-md-6">
          <ScatterChart
            width={width}
            height={height}
            margin={{top: 20, right: 20, bottom: 10, left: 10}}>
            <XAxis dataKey={x} name={x.toString()} />
            <YAxis dataKey={y} name={y.toString()} />
            <Tooltip content={CustomTooltip}  cursor={{strokeDasharray: '3 3'}} />
            <Legend />
            <Scatter name={title} data={savedQuery} fill={fill} label />
          </ScatterChart>
          { aggregateInformation && <TableDB Title={title + ' aggregate Info'} savedQuery={aggregateInformation} />}
      </div>
    )
  }
}

export default ScatterGraph

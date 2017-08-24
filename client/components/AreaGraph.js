import React from 'react'
import {CustomTooltip} from './customToolTips.js'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import TableDB from './TableDB'


const AreaGraphs = (props) => {
    const { Title, xAxis, yAxis, savedQuery, aggregateInformation } = props

    return (
      <div className="col-md-6">
      <div><h4>{Title}</h4></div>
        <AreaChart
          width={250}
          height={250}
          data={savedQuery}
          margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey={xAxis} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={CustomTooltip} />
            <Area type="monotone" dataKey={yAxis} stroke="#8884d8" fill="#8884d8" label />
        </AreaChart>
        { aggregateInformation && <TableDB Title={Title + ' aggregate Info'} savedQuery={aggregateInformation} />}
      </div>
    )

}


export default AreaGraphs

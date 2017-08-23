import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React from 'react'
import {CustomTooltip} from './customToolTips.js'
import TableDB from './TableDB'


const BarGraph = (props) => {

    const { Title, xAxis, yAxis, savedQuery, aggregateInformation } = props
    return (
      <div className="col-md-6">
        <div><h4>{Title}</h4></div>
          <BarChart width={500} height={500} data={savedQuery} label>
            <XAxis dataKey={xAxis} label />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={CustomTooltip} cursor={{strokeDasharray: '3 3'}} />
            <Legend />
            <Bar dataKey={yAxis} fill="#82ca9d" label />
          </BarChart>
          { aggregateInformation && <TableDB Title={Title + ' aggregate Info'} savedQuery={aggregateInformation} />}
      </div>
    )
}

export default BarGraph

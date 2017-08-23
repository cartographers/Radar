import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React from 'react'
import {CustomTooltip} from './customToolTips.js'
import {TableDB} from './TableDB'


const BarGraph = (props) => {

    const { Title, xAxis, yAxis, savedQuery, aggregateInformation } = props
    console.log(aggregateInformation[0])
    let vals = Object.entries(aggregateInformation[0])
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
          { vals.map((arr, i) => {
            return <div key={i}>{arr[0]}: {arr[1]}</div>
          })}
      </div>
    )
}

export default BarGraph

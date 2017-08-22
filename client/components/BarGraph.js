import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React from 'react'
import {CustomTooltip} from './customToolTips.js'


const BarGraph = (props) => {

    const { title, x, y, savedQuery} = props
    return (
      <div className="col-md-6">
        <div><h4>{title}</h4></div>
          <BarChart width={500} height={500} data={savedQuery} label>
            <XAxis dataKey={x} label />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={CustomTooltip} cursor={{strokeDasharray: '3 3'}} />
            <Legend />
            <Bar dataKey={y} fill="#82ca9d" label />
          </BarChart>
      </div>
    )
}

export default BarGraph

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {CustomTooltip} from './customToolTips.js'
import React from 'react'


const LineGraph = (props) => {
    const { Title, aggregateInformation, xAxis, yAxis, savedQuery } = props

    return (
      <div className="col-md-6">
        <div><h4>{Title}</h4></div>
        <LineChart
          width={500}
          height={500}
          data={savedQuery}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>

           <XAxis dataKey={x} name={x.toString()} />
           <YAxis />
           <CartesianGrid strokeDasharray="3 3" />
           <Tooltip />
           <Legend content={CustomTooltip} />
           <Line type="monotone" dataKey={y} stroke="#8884d8" activeDot={{r: 8}} label />

        </LineChart>
      </div>
    )

}


export default LineGraph

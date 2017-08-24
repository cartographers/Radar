import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {CustomTooltip} from './customToolTips.js'
import TableDB from './TableDB'
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

           <XAxis dataKey={xAxis} name={xAxis} />
           <YAxis />
           <CartesianGrid strokeDasharray="3 3" />
           <Tooltip />
           <Legend content={CustomTooltip} />
           <Line type="monotone" dataKey={yAxis} stroke="#8884d8" activeDot={{r: 8}} label />
        </LineChart>
        { aggregateInformation && <TableDB Title={Title + ' aggregate Info'} savedQuery={aggregateInformation} />}
      </div>
    )

}


export default LineGraph

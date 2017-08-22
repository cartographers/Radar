import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React from 'react'

const LineGraph = (props) => {
    const { x, y, savedQuery } = props

    return (
      <div className="col-md-6">
        <LineChart
          width={250}
          height={250}
          data={savedQuery}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>

           <XAxis dataKey={x} name={x.toString()} />
           <YAxis />
           <CartesianGrid strokeDasharray="3 3" />
           <Tooltip />
           <Legend />
           <Line type="monotone" dataKey={y} stroke="#8884d8" activeDot={{r: 8}} label />

        </LineChart>
      </div>
    )

}


export default LineGraph

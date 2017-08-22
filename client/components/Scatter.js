import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React from 'react'

const ScatterGraph = (props) => {
    const { title, x, y, savedQuery} = props
    return (
      <div className="col-md-6">
        <div><h4>{title}</h4></div>
          <ScatterChart
            width={500}
            height={500}
            margin={{top: 20, right: 20, bottom: 10, left: 10}}>
            <XAxis dataKey={x} name={x.toString()} />
            <YAxis dataKey={y} name={y.toString()} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip cursor={{strokeDasharray: '3 3'}} />
            <Legend />
            <Scatter name={title} data={savedQuery} fill="#8884d8" label />
          </ScatterChart>
      </div>
    )
}

export default ScatterGraph

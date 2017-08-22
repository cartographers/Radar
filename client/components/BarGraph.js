import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React from 'react'


const CustomTooltip  = (props) => {
  if (!props.active) return
  const queriedInfo = props.payload[0].payload
  return (<div className="custom-tooltip">
      { Object.entries(queriedInfo).map((val, index) => {
        return <div key={index}>{val[0]} : {val[1]}</div>
      })
    }
    </div>)
}


const BarGraph = (props) => {

    const { title, x, y, savedQuery} = props

    return (
      <div className="col-md-6">
        <div><h4>{title}</h4></div>
          <BarChart width={250} height={250} data={savedQuery} label>
            <XAxis dataKey={x} label />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Bar dataKey={y} fill="#82ca9d" label />
          </BarChart>
      </div>
    )
}

export default BarGraph

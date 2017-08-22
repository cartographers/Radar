import {PieChart, Pie, Tooltip, Legend} from 'recharts'
import React from 'react'

const CustomTooltip  = (props) => {
  if (!props.active) return
  const queriedInfo = props.payload[0].payload.payload
  console.log(props)
  return (<div className="custom-tooltip">
      { Object.entries(queriedInfo).map((val, index) => {
        return (val[0] === 'payload' ) ? '' : <div key={index}>{val[0]} : {val[1] && val[1].toString()}</div>
      })
    }
    </div>)
}


const PieGraph = (props) => {
    const { savedQuery, pieKey } = props
    return (
      <div className="col-md-6">
        <PieChart width={500} height={500}>
        <Pie dataKey={pieKey} data={savedQuery} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        <Tooltip content={CustomTooltip} />
        </PieChart>
      </div>
    )
}

export default PieGraph

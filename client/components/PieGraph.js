import {PieChart, Pie} from 'recharts'
import React from 'react'

const PieGraph = (props) => {
    const { savedQuery, pieKey } = props
    return (
      <div className="col-md-6">
        <PieChart width={800} height={400}>
        <Pie dataKey={pieKey} data={savedQuery} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>
      </div>
    )
}

export default PieGraph

import {PieChart, Pie, Tooltip, Legend} from 'recharts'
import {CustomPieTooltip} from './customToolTips.js'
import React from 'react'

const PieGraph = (props) => {
    const { savedQuery, pieKey } = props
    return (
      <div className="col-md-6">
        <PieChart width={500} height={500}>
        <Pie dataKey={pieKey} data={savedQuery} cx={200} cy={200} innerRadius={0} outerRadius={90} fill="#82ca9d" label />
        <Tooltip content={CustomPieTooltip} />
        </PieChart>
      </div>
    )
}

export default PieGraph

import {PieChart, Pie, Tooltip, Legend} from 'recharts'
import {CustomPieTooltip} from './customToolTips.js'
import TableDB from './TableDB'
import React from 'react'

const PieGraph = (props) => {
    const {title, savedQuery, pieKey, aggregateInformation, fill, width, height} = props
    return (
        <div className="col-md-6">
            <h5 className="form-labels"><strong> {title} </strong></h5>
            <PieChart width={width} height={height}>
                <Pie dataKey={pieKey} data={savedQuery} cx={200} cy={200} innerRadius={0} outerRadius={90} fill={'#006dcc'} label />
                <Tooltip content={CustomPieTooltip} />
            </PieChart>
            {aggregateInformation && <TableDB Title={title + ' aggregate Info'} savedQuery={aggregateInformation} />}
        </div>
    )
}

export default PieGraph

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React from 'react'
import {CustomTooltip} from './customToolTips.js'
import TableDB from './TableDB'

const BarGraph = (props) => {
    const {title, x, y, savedQuery, aggregateInformation, fill, width, height} = props
    return (
        <div className="col-md-6">
            <h5 className="form-labels"><strong> {title} </strong></h5>
            <BarChart
                width={width}
                height={height}
                data={savedQuery}>
                <XAxis dataKey={x} minTickGap={10} />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Bar dataKey={y} fill={fill} />
            </BarChart>
            {aggregateInformation && <TableDB Title={title + ' aggregate Info'} savedQuery={aggregateInformation} />}
        </div>
    )
}

export default BarGraph

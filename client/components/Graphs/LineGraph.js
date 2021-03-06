import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {CustomTooltip} from './CustomToolTips.js'
import TableDB from './TableDB'
import React from 'react'

const LineGraph = (props) => {
    const {title, aggregateInformation, x, y, savedQuery, fill, stroke, strokeGrid, width, height} = props

    return (
        <div className="col-md-6">
            <h5 className="form-labels"><strong> {title} </strong></h5>
            <LineChart
                width={width}
                height={height}
                data={savedQuery}>
                <XAxis dataKey={x} name={x} />
                <YAxis dataKey={y} name={y} />
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Line type="monotone" dataKey={y} stroke={stroke} fill={fill} activeDot={{r: 5}} />
            </LineChart>
            {aggregateInformation && <TableDB Title={title + ' aggregate Info'} savedQuery={aggregateInformation} />}
        </div>
    )
}

export default LineGraph

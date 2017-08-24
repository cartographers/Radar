import React from 'react'
import {CustomTooltip} from './customToolTips.js'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import TableDB from './TableDB'

const AreaGraphs = (props) => {
    const { title, x, y, savedQuery, aggregateInformation, width, height, fill, stroke } = props
    return (
      <div className="col-md-6">
        <AreaChart
          width={width}
          height={height}
          data={savedQuery}>
            <XAxis dataKey={x} name={x}/>
            <YAxis datakey={y} name={y}/>
            <Tooltip content={CustomTooltip} />
            <Area type="monotone" dataKey={y} stroke={stroke} fill={fill} name={title} />
        </AreaChart>
        { aggregateInformation && <TableDB Title={title + ' aggregate Info'} savedQuery={aggregateInformation} />}
      </div>
    )
}

export default AreaGraphs

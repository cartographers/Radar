import React from 'react'

export const CustomTooltip  = (props) => {
  if (!props.active) return
  const queriedInfo = props.payload[0].payload
  return (<div className="custom-tooltip">
      { Object.entries(queriedInfo).map((val, index) => {
        return (val[0] == 'createdAt' || val[0] == 'updatedAt') ? '' : <div key={index}>{val[0]} : {val[1] && val[1].toString()}</div>
      })
    }
    </div>)
}

export const CustomPieTooltip  = (props) => {
  if (!props.active) return
  const queriedInfo = props.payload[0].payload.payload
  return (<div className="custom-tooltip">
      { Object.entries(queriedInfo).map((val, index) => {
        return (val[0] === 'payload' || val[0] == 'createdAt' || val[0] == 'updatedAt') ? '' : <div key={index}>{val[0]} : {val[1] && val[1].toString()}</div>
      })
    }
    </div>)
}
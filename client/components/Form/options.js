import React from 'react'
import ChooseOne from './ChooseOne'

const options = (selectThese, columns, columnType, onChange, filtered) => {
    let mapThis = selectThese.length ? selectThese : columns
    if (filtered) mapThis = mapThis.filter((val) => (columnType[columns.indexOf(val)] === 23 || columnType[columns.indexOf(val)] === 21 || columnType[columns.indexOf(val)] === 1700))
    return <ChooseOne onChange={onChange} iterable={mapThis}/>
}

export default options
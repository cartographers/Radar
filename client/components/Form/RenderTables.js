import React from 'react'
import ChooseOne from './ChooseOne'

const RenderTables = (props) => {
    return (
        <div>
            <h5 className="form-labels"><strong>From</strong></h5>
            <ChooseOne name="From" onChange={props.handleTableChange} iterable={props.tables}
                       value={props.currentTable}/>
        </div>
    )
}

export default RenderTables
import React from 'react'
import ChooseOne from './ChooseOne'

const RenderSelects = (props) => {
    return (
        <div>
            <div>
                <h5 className="form-labels"><strong>Select</strong></h5>
                {props.selectThese.map((sel, index) => {
                    return <div key={index}>
                        <ChooseOne key={index} onChange={props.handleChange.bind(this, index, 'selectThese')}
                                   value={props.selectThese[index]} iterable={props.columns}/>
                        <div onClick={props.handleRemove.bind(this, index, 'selectThese')}
                             className="glyphicon glyphicon-remove-sign"
                             style={{float: 'left', color: '#E84A5F', margin: 1 + 'px', padding: 0}}>
                        </div>
                    </div>
                })
                }
            </div>
            <div style={{float: 'left'}}>
                <button type="button" className="btn-xs btn-primary" onClick={props.handleAdd.bind(this, 'selectThese')}
                        disabled={(props.selectThese.length) === (props.columns.length - 1)}>+
                </button>
            </div>
        </div>
    )
}

export default RenderSelects
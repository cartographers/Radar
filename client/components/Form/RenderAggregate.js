import React from 'react'
import ChooseOne from './ChooseOne'

const RenderAggregate = (props) => {
    return (
        <div>
            <div>
                <h5 className="form-labels"><strong>Aggregates</strong></h5>
                {props.aggregateSelects.map((sel, index) => {
                    return <div key={index}>
                        <ChooseOne key={index + "agg"} name="agg"
                                   onChange={props.handleChange.bind(this, index, 'aggregateSelects')}
                                   value={props.aggregateSelects[index].agg} iterable={props.aggregateChoices}/>
                        <ChooseOne key={index + "col"} name="col"
                                   onChange={props.handleChange.bind(this, index, 'aggregateSelects')}
                                   value={props.aggregateSelects[index].col}
                                   iterable={props.columns.filter((val, i) => (props.columnType[i] === 23 || props.columnType[i] === 21 || props.columnType[i] === 1700))}/>
                        <div onClick={props.handleRemove.bind(this, index, 'aggregateSelects')}
                             className="glyphicon glyphicon-remove-sign"
                             style={{float: 'left', color: '#E84A5F', margin: 1 + 'px', padding: 0}}>
                        </div>
                    </div>
                })
                }
            </div>
            <div style={{float: 'left'}}>
                <button type="button" className="btn-xs btn-primary"
                        onClick={props.handleAdd.bind(this, 'aggregateSelects')}
                        disabled={(props.aggregateSelects.length) === 4}>+
                </button>
            </div>
        </div>
    )
}

export default RenderAggregate

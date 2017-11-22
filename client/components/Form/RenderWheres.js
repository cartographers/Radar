import React from 'react'
import RenderOrAnd from './RenderOrAnd'

const RenderWheres = (props) => {
    return (
        <div>
            <div>
                <h5 className="form-labels"><strong>Where</strong></h5>
                <div>
                    {(props.whereThese.length > 1) && <RenderOrAnd {...props} />}
                </div>
                {
                    props.whereThese.map((sel, index) => {
                        return <div key={index}>
                            <ChooseOne name="col" onChange={props.handleChange.bind(this, index, 'whereThese')}
                                       value={props.whereThese[index].col} iterable={props.columns}/>
                            <h4>is</h4>
                            <ChooseOne name="is" onChange={props.handleChange.bind(this, index, 'whereThese')}
                                       value={props.whereThese[index].literal} iterable={props.conditionals}
                                       indxVal={true}/>
                            <input name="spec" onChange={props.handleChange.bind(this, index, 'whereThese')}
                                   value={props.whereThese[index].spec}/>
                            <div onClick={props.handleRemove.bind(this, index, 'whereThese')}
                                 className="glyphicon glyphicon-remove-sign"
                                 style={{float: 'left', color: '#E84A5F', margin: 1 + 'px', padding: 0}}>
                            </div>
                        </div>
                    })
                }
            </div>
            <div style={{float: 'left'}}>
                <button type="button" className="btn-xs btn-primary" onClick={props.handleAdd.bind(this, 'whereThese')}
                        disabled={(props.whereThese.length) === 4}>+
                </button>
            </div>
        </div>
    )
}

export default RenderWheres
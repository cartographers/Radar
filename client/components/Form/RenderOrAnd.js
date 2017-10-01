import React from 'react'

const RenderOrAnd = (props) => {
    return (
        <div>
            <label>
                <input type="radio" className="form-check-input" name="AndOr" value="AND"
                       onChange={props.handleChartChange.bind(this, 'AndOr')} checked/>
                <h5 className="form-labels" style={{display: 'inline'}}><strong> And</strong></h5>
            </label>
            <label>
                <input type="radio" className="form-check-input" name="AndOr" value="OR"
                       onChange={props.handleChartChange.bind(this, 'AndOr')}/>
                <h5 className="form-labels" style={{display: 'inline'}}><strong> Or</strong></h5>
            </label>
        </div>
    )
}

export default RenderOrAnd
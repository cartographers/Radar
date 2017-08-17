import React from 'React'

export const WhereContainer = (props) => { //handleWhereChange, conditionals, columns, addWhere, handleRemove
	const {handleWhereChange, conditionals, columns, addWhere, handleRemove, whereThese } = props
	return (
		<div>
          <label>Where</label>
          {
            whereThese.map((sel, index) => <WhereComponent 
												columns={columns} 
												handleChange={handleWhereChange} 
												conditionals={conditionals}
												handleRemove={handleRemove}
												index={index}
											/>)
          }
          <button type="button" className="btn btn-primary" onClick={addWhere}>+</button>
        </div>
	)
}

const WhereComponent  = (props) => {
	const {handleWhereChange, conditionals, columns,handleRemove, index} = this.props
	return (
		<div>
	        <select name={`col ${index}`} onChange={handleWhereChange}>
	          {columns && columns.map(val => <option value={val}>{val}</option>)}
	        </select>
	        <h4>is</h4>
	          <select name={`is ${index}`} onChange={this.handleWhereChange}>
	          {conditionals && conditionals.map((val, ind) => <option value={ind}>{val}</option>)}
	          </select>
	          <input className="form-control" name={`spec ${index}`} onChange={this.handleWhereChange}/>
	          <button type="button" className="btn btn-danger" onClick={this.handleRemove.bind(this, index, 'whereThese')}> - </button>
	     </div>
	)
} 
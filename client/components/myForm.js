import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../store'

//this form is assuming that the table we're currently rendering is the Users table

class myForm extends React.Component {

  constructor() {
    super()
    this.state = {
      selectThese: [{
        col: 'All'
      }],
      whereThese: [{
        col: 'none'
      }],
      orderedBy: 'None',
      conditionals : ['greater than', 'greater than or equal to', 'less than', 'less than or equal to','equal to', 'not', 'between', 'not between'],
      orderType : ['None','Ascending', 'Descending']
    }

  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  handleSelectChange = (evt) => {
    console.log(evt.target.name, evt.target.value)
    this.setState( (prevState) => ({ selectThese: prevState.map( (val, index) => {
      return (index === evt.target.name) ? { col: evt.target.value } : val
    })}))
  }

  addSelect = (evt) => {
    console.log('Updating state')
    this.setState( (prevState) => ({ selectThese: [...prevState.selectThese, {col:'All'}] }))
    console.log(this.state)
  }

  render () {
    const { table, columns } = this.props
    const { conditionals, orderType } = this.state

    return (
      <div>
        <h2>User Query Selection Form</h2>
        <form>
          <div className="form-group">
            <label>Select</label>
            {
              this.state.selectThese.map((sel, index) => {
                return  <div><select name={index} key={index} onChange={this.handleSelectChange}>
                          <option value='All'>All</option>
                          {columns && columns.map((val,i) => <option value={val} key={i}>{val}</option>)}
                        </select></div>
              })
            }
          </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={this.addSelect}>+</button>
          </div>
          <div className="form-group">
            <label>Where</label>
            {
              this.state.whereThese.map((sel) => {
                return  <div>
                          <select>
                            <option value='All'>None</option>
                            {columns && columns.map(v => <option value={v}>{v}</option>)}
                          </select>
                          <h4>is</h4>
                            <select>
                            {conditionals && conditionals.map(v => <option value={v}>{v}</option>)}
                            </select>
                            <input className="form-control" name="testTextInput2"/>
                        </div>
              })
            }
          </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary">+</button>
            </div>
            <div className="form-group">
            <label>Order by</label>
            {
              <select>
               { orderType.map(v => <option value={v}>{v}</option>) }
              </select>
            }
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return ({
    table: state.users,
    columns: (state.users[0] ? Object.keys(state.users[0]) : undefined)
  })
}

const mapDispatch = dispatch => {
  return ({
    fetchAllUsers () {
      dispatch(fetchUsers())
    }
  })
}

export default connect(mapState, mapDispatch)(myForm)

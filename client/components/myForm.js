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
        col: 'none',
        is: 'equal to',
        spec: ''
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
    const {name, value} = evt.target
    this.setState( (prevState) => ({ selectThese: prevState.selectThese.map( (val, index) => {
      return (index == name) ? { col: value } : val
    })}))
    console.log(this.state)
  }

  addSelect = (evt) => {
    this.setState( (prevState) => ({ selectThese: [...prevState.selectThese, {col:'All'}] }))
  }

  handleWhereChange = (evt) => {
    const [type, i] = evt.target.name.split(' ')
    let newVal = {}
    newVal[type] = evt.target.value
    this.setState( (prevState) => ({ whereThese: prevState.whereThese.map( (val, index) => {
      return (index == i) ? {...val, ...newVal} : val
    })}))
  }

  addWhere = (evt) => {
    this.setState( (prevState) => ({ whereThese: [...prevState.whereThese, {col:'none', is: 'equal to', spec: '' }] }))
  }

  handleOrderChange = (evt) => {
    this.setState({ orderedBy: evt.target.value })
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
              this.state.whereThese.map((sel, index) => {
                return  <div>
                          <select name={`col ${index}`} onChange={this.handleWhereChange}>
                            <option value='All'>None</option>
                            {columns && columns.map(v => <option value={v}>{v}</option>)}
                          </select>
                          <h4>is</h4>
                            <select name={`is ${index}`} onChange={this.handleWhereChange}>
                            {conditionals && conditionals.map(v => <option value={v}>{v}</option>)}
                            </select>
                            <input className="form-control" name={`spec ${index}`} onChange={this.handleWhereChange}/>
                        </div>
              })
            }
          </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={this.addWhere}>+</button>
            </div>
            <div className="form-group">
            <label>Order by</label>
            {
              <select onChange={this.handleOrderChange}>
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

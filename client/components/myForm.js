import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../store'
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

//this form is assuming that the table we're currently rendering is the Users table

class myForm extends React.Component {

  constructor() {
    super()
    this.state = {
      selectThese: [],
      whereThese: [],
      orderedBy: 'None',
      conditionals : ['greater than', 'greater than or equal to', 'less than', 'less than or equal to','equal to', 'not', 'between', 'not between'],
      orderType : ['None','Ascending', 'Descending'],
      chartTypes: ['Pie', 'Scatter', 'Donut', 'Bar', 'Line'],
      choosenChart: '',
      Title: '',
      xLabel: '',
      yLabel: '',
      height: '',
      width: ''
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
  handleRemove = (index, fromWhere, evt) => {
    this.setState( (prevState) => ({
      [fromWhere]: [...prevState[fromWhere].slice(0, index), ...prevState[fromWhere].slice(index + 1)]
    }))
  }

  handleChange = (fromWhere, evt) => {
    this.setState({
      [fromWhere]: evt.target.value
    })
  }

  makeGraph = (evt) => {
    evt.preventDefault();
    const data = !(this.state.whereThese.length)
      ?  this.props.table
      :  this.props.table.filter( (val) => {
          return val[this.state.whereThese[0].col] === this.state.whereThese[0].spec
      })
    console.log(data)
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
                return  <div>
                            <select name={index} key={index} onChange={this.handleSelectChange}>
                                {columns && columns.map((val,i) => <option value={val} key={i}>{val}</option>)}
                            </select>
                            <button type="button" className="btn btn-danger" onClick={this.handleRemove.bind(this, index, 'selectThese')}> - </button>
                        </div>
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
                            {columns && columns.map(v => <option value={v}>{v}</option>)}
                          </select>
                          <h4>is</h4>
                            <select name={`is ${index}`} onChange={this.handleWhereChange}>
                            {conditionals && conditionals.map(v => <option value={v}>{v}</option>)}
                            </select>
                            <input className="form-control" name={`spec ${index}`} onChange={this.handleWhereChange}/>
                            <button type="button" className="btn btn-danger" onClick={this.handleRemove.bind(this, index, 'whereThese')}> - </button>
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
            {
              <select>
               { this.state.selectThese.length && this.state.selectThese.map( val => <option value={val.col}>{val.col}</option>) }
               { !(this.state.selectThese.length) && columns && columns.map(v => <option value={v}>{v}</option>) }
              </select>
            }
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          </form>


        <h2>Chart choice</h2>
        <form>
          <div className="form-group">
            <label>Chart Type</label>
              <select name='choosenChart' onChange={this.handleChange.bind(this, 'choosenChart')} >
               {this.state.chartTypes.map((val,i) => <option value={val} key={i}>{val}</option>)}
              </select>
          </div>
          <div className="form-group">
            <label>Chart Title</label>
            <input className="form-control" onChange={this.handleChange.bind(this, 'Title')}/>
          </div>
          <div className="form-group">
            <label>Height</label>
            <input className="form-control" onChange={this.handleChange.bind(this, 'height')}/>
          </div>
          <div className="form-group">
            <label>Width</label>
            <input className="form-control" onChange={this.handleChange.bind(this, 'width')}/>
          </div>
          <div className="form-group">
            <label>X axis</label>
            {
              <select onChange={this.handleChange.bind(this, 'xLabel')}>
               { this.state.selectThese.length && this.state.selectThese.map( val => <option value={val.col}>{val.col}</option>) }
               { !(this.state.selectThese.length) && columns && columns.map(val => <option value={val}>{val}</option>) }
              </select>
            }
            <input className="form-control"/>
          </div>
          <div className="form-group">
            <label>Y axis</label>
            {
              <select onChange={this.handleChange.bind(this, 'yLabel')}>
               { this.state.selectThese.length && this.state.selectThese.map( val => <option value={val.col}>{val.col}</option>) }
               { !(this.state.selectThese.length) && columns && columns.map( val => <option value={val}>{val}</option>) }
              </select>
            }
            <input className="form-control"/>
          </div>
          <button type="submit" className="btn btn-success" onClick={this.makeGraph}>Make my graph</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  console.log(state)
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

import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers, fetchDatabase, searchDatabase, fetchFields, fetchDatabases,fetchTables, currentDatabase, fetchGraphs, saveGraph } from '../store'
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {FormControl, ControlLabel, FormGroup} from 'react-bootstrap'

//this form is assuming that the table we're currently rendering is the Users table

class myForm extends React.Component {

  constructor() {
    super()
    this.state = {
      selectThese: [],
      whereThese: [],
      orderedBy: ['Descending', 0 ],
      conditionals : ['greater than', 'greater than or equal to', 'less than', 'less than or equal to','equal to', 'not', 'between', 'not between'],
      conditionalOperator: ['>', '>=', '<', '<=', '===', '!==', '[]', '![]'],
      orderType : ['None','Ascending', 'Descending'],
      chartTypes: ['Pie', 'Scatter', 'Donut', 'Bar', 'Line'],
      choosenChart: '',
      Title: '',
      xAxis: '',
      yAxis: '',
      height: '',
      width: '',
      myGraphs: []
    }

  }

  componentDidMount() {
    let db = { database: this.props.match.params.dbName}
    this.props.fetchDat(db)
    this.props.setWorkingDatabase(this.props.match.params.dbName)
    this.props.loadCreatedGraphs(this.props.match.params.dbName)
  }


  handleChange = (index, fromWhere, evt ) => {
    let newVal = (fromWhere === 'whereThese') ? {} : evt.target.value
    console.log(fromWhere, index, newVal)
    if(fromWhere === 'whereThese'){
      const type = evt.target.name
      newVal[type] = (type === 'is') ? this.state.conditionalOperator[evt.target.value] : evt.target.value  
    }
    this.setState( (prevState) => ( { [fromWhere]: prevState[fromWhere].map( (val, i) => {
        if (index != i ) return val
        if (fromWhere === 'whereThese') return {...val, ...newVal}
        return newVal;
    })}))
  }

  handleChartChange = (fromWhere, evt) => {
    this.setState({
      [fromWhere]: evt.target.value
    })
  }

  handleAdd = (addTo, evt) => {
    let newAdd = (addTo === 'selectThese') ? this.props.columns[0] : {col:'none', is: 'equal to', spec: '' }
    this.setState( (prevState) => ({ [addTo]: [...prevState[addTo], newAdd] }))
  }

  handleRemove = (index, fromWhere, evt) => {
    this.setState( (prevState) => ({
      [fromWhere]: [...prevState[fromWhere].slice(0, index), ...prevState[fromWhere].slice(index + 1)]
    }))
  }



  makeGraph = (evt) => {
    evt.preventDefault()
    console.log(this.state)
    const newGraph = <div>New Graph for {this.props.workingDatabase}</div>  // null
    this.props.savingGraph(this.props.workingDatabase, newGraph)  // second argument should be settings of graph
    this.setState((prevState) =>  ({
      myGraphs: [...prevState.myGraphs, newGraph]
    }))
  }

  handleTableChange = (evt) => {
    this.props.grabTableData(this.props.match.params.dbName, evt.target.value)
    this.props.loadCreatedGraphs(this.props.match.params.dbName, evt.target.value)
  }

  render () {
    const DBName = this.props.match.params.dbName
    return (
      <div>
        <h2>User {DBName} Query Selection Form</h2>
        <form>
            { this.renderTables() }
            { this.renderSelects() }
            { this.renderWheres() }
            { this.renderOrderBy() }
        </form>
        <h2>Chart choice</h2>
        <form>
            <label>Chart Type</label>
            <select name='choosenChart' onChange={this.handleChartChange.bind(this, 'choosenChart')} >
                {this.state.chartTypes.map((val,i) => <option value={val} key={i}>{val}</option>)}
            </select>
            <label>Chart Title</label><input className="form-control" onChange={this.handleChartChange.bind(this, 'Title')}/>
            <label>Height</label><input className="form-control" onChange={this.handleChartChange.bind(this, 'height')}/> 
            <label>Width</label><input className="form-control" onChange={this.handleChartChange.bind(this, 'width')}/>
            <label>X axis</label>
            {
              <select onChange={this.handleChartChange.bind(this, 'xAxis')}>
                { this.options() }
              </select>
            }
            <label>Y axis</label>
            {
              <select onChange={this.handleChartChange.bind(this, 'xAxis')}>
                { this.options() }
              </select>
            }
          <button type="submit" className="btn btn-success" onClick={this.makeGraph}>Make my graph</button>
        </form>
        {
          this.props.createdGraphs && this.props.createdGraphs.filter(graph => graph.workingDatabase === DBName).map((graph, index) => <div key={index}>New Graph for {graph.workingDatabase}</div>)
        }
      </div>
    )
  }

  renderTables = () => {
      return <div>
                <label>From</label>
                  <select name="From" onChange={this.handleTableChange}>
                    {this.props.tables && this.props.tables.map((table,i) => <option value={table} key={i}>{table}</option>)}
                  </select>
              </div>
  }

  renderSelects = () => {
      return <div>
                <label>Select</label>
                { this.state.selectThese.map((sel, index) => {
                    return  <div>
                                <select key={index} onChange={this.handleChange.bind(this, index, 'selectThese')}>
                                    {this.props.columns && this.props.columns.map((val,i) => <option value={val} key={i}>{val}</option>)}
                                </select>
                                <button type="button" className="btn btn-danger" onClick={this.handleRemove.bind(this, index, 'selectThese')}> - </button>
                            </div>
                    })
                }
                <button type="button" className="btn btn-primary" onClick={this.handleAdd.bind(this,'selectThese')}>+</button>
            </div>
  }

  renderWheres = () => {
    return  <div>
              <label>Where</label>
              {
                this.state.whereThese.map((sel, index) => {
                  return  <div>
                            <select name="col" onChange={this.handleChange.bind(this, index, 'whereThese')}>
                              {this.props.columns && this.props.columns.map(v => <option value={v}>{v}</option>)}
                            </select>
                            <h4>is</h4>
                              <select name="is" onChange={this.handleChange.bind(this, index, 'whereThese')}>
                              {this.state.conditionals && this.state.conditionals.map((val, ind) => <option value={ind} key={ind}>{val}</option>)}
                              </select>
                              <input  name="spec" onChange={this.handleChange.bind(this, index, 'whereThese')}/>
                              <button type="button" className="btn btn-danger" onClick={this.handleRemove.bind(this, index, 'whereThese')}> - </button>
                          </div>
                })
              }
                <button type="button" className="btn btn-primary" onClick={this.handleAdd.bind(this, 'whereThese')}>+</button>
            </div>
  }

  renderOrderBy = () =>  {
    return <div className="form-group">
            <label>Order by</label>
            {
              <select onChange={this.handleChange.bind(this, 0, 'orderedBy')}>
               { this.state.orderType.map(val => <option value={val} key={val}>{val}</option>) }
              </select>
            }
            {
              <select onChange={this.handleChange.bind(this, 1, 'orderedBy')}>
                {this.options}
              </select>
            }
          </div>
  }

  options = () => {
    return  {   this.state.selectThese.length 
                ? this.state.selectThese.map( (val, index) => <option value={val} key={index}>{val}</option>) 
                : (this.props.columns && this.props.columns.map( (val, index) => <option value={val} key={index}>{val}</option>) )
            }
  }
}

const mapState = state => {
  return ({
    tables: state.tables,
    table: state.database,
    columns: state.fields,
    workingDatabase: state.currentDatabase,
    createdGraphs: state.createdGraphs
  })
}

const mapDispatch = dispatch => {
  return ({
    fetchAllUsers () {
      dispatch(fetchUsers())
    },
    fetchDat (DBname) {
      dispatch( fetchTables(DBname) )
    },
    grabTableData(database, table) {
      dispatch( fetchFields({ database, table}))
    },
    setWorkingDatabase(database){
      dispatch(currentDatabase(database))
    },
    loadCreatedGraphs(database){
      dispatch(fetchGraphs(database))
    },
    savingGraph(currentDatabase, settings){  // settings of graph applied to newSettings
      let newSettings = {
        workingDatabase: currentDatabase

      }
      dispatch(saveGraph(newSettings))
    }
  })
}

export default connect(mapState, mapDispatch)(myForm)

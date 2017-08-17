import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers, fetchDatabase, searchDatabase, fetchFields, fetchDatabases,fetchTables, currentDatabase, fetchGraphs, saveGraph } from '../store'
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {FormControl, ControlLabel, FormGroup} from 'react-bootstrap'

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
      currentTable : '',
      currentDatabase : '',
      choosenChart: '',
      Title: '',
      xAxis: '',
      yAxis: '',
      height: '',
      width: '',
    }
  }

  componentDidMount() {
    let db = this.props.match.params.dbName
    this.setState({currentDatabase: db})
    this.props.fetchDat({ database: db})
    this.props.loadCreatedGraphs()
    if(this.props.tables) this.setState({currentTable: this.props.tables[0]})
  }


  handleChange = (index, fromWhere, evt ) => {
    let newVal = (fromWhere === 'whereThese') ? {} : evt.target.value
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
    let newAdd = (addTo === 'selectThese') ? this.props.columns[0] : {col:this.props.columns[0], is: '>', spec: '' }
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
    const newGraph = <div>New Graph for Database: {this.state.currentDatabase} Table: {this.state.currentTable}</div>  // null
    this.props.savingGraph(this.state.currentDatabase, this.state.currentTable, newGraph)  // second argument should be settings of graph
  }

  handleTableChange = (evt) => {
    const currentTable = evt.target.value
    this.setState({ currentTable: currentTable })
    this.props.grabTableData(this.state.currentDatabase, currentTable)
    this.props.loadCreatedGraphs()
  }
  renderTables = () => {
      return <div>
                <label>From</label>
                  <select name="From" onChange={this.handleTableChange}>
                    <option selected >Choose a Table</option>
                    {this.props.tables && this.props.tables.map((table,i) => <option value={table} key={i}>{table}</option>)}
                  </select>
              </div>
  }

  renderSelects = () => {
      return <div>
                <label>Select</label>
                { this.state.selectThese.map((sel, index) => {
                    return  <div key={index}>
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
                  return  <div key={index}>
                            <select name="col" onChange={this.handleChange.bind(this, index, 'whereThese')}>
                              {this.props.columns && this.props.columns.map((val, i)  => <option value={val} key={i}>{val}</option>)}
                            </select>
                            <h4>is</h4>
                              <select name="is" onChange={this.handleChange.bind(this, index, 'whereThese')}>
                              {this.state.conditionals && this.state.conditionals.map((val, i) => <option value={i} key={i}>{val}</option>)}
                              </select>
                              <input  name="spec" type={this.props.columnsType[this.props.columns.indexOf(this.state.whereThese[index].col)]} onChange={this.handleChange.bind(this, index, 'whereThese')}/>
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
               { this.state.orderType.map((val,i) => <option value={val} key={i}>{val}</option>) }
              </select>
            }
            {
              <select onChange={this.handleChange.bind(this, 1, 'orderedBy')}>
                { this.options() }
              </select>
            }
          </div>
  }

  options = () => {
    return  this.state.selectThese.length 
            ? this.state.selectThese.map( (val, index) => <option value={val} key={index}>{val}</option>) 
            : (this.props.columns && this.props.columns.map( (val, index) => <option value={val} key={index}>{val}</option>) )
  }

  render () {
    const DBName = this.props.match.params.dbName
    return (
      <div>
        <h2>User {DBName} Query Selection Form</h2>
        <form>
            { this.renderTables() }
            { this.state.currentTable && this.renderSelects()} 
            { this.state.currentTable && this.renderWheres() }
            { this.state.currentTable && this.renderOrderBy() }
        </form>
        <h2>Chart choice</h2>
        <form>
            <label>Chart Type</label>
              <select name='choosenChart' onChange={this.handleChartChange.bind(this, 'choosenChart')} >
               {this.state.chartTypes.map((val,i) => <option value={val} key={i}>{val}</option>)}
              </select>
            <label>Chart Title</label>
            <input className="form-control" onChange={this.handleChartChange.bind(this, 'Title')}/>
         
            <label>Height</label>
            <input className="form-control" onChange={this.handleChartChange.bind(this, 'height')}/>
       
            <label>Width</label>
            <input className="form-control" onChange={this.handleChartChange.bind(this, 'width')}/>
   
            <label>X axis</label>
            <select onChange={this.handleChartChange.bind(this, 'xAxis')}>
               { this.options() }
            </select>
            <label>Y axis</label>
            <select onChange={this.handleChartChange.bind(this, 'yAxis')} >
               { this.options() }
            </select>
          <button type="submit" className="btn btn-success" onClick={this.makeGraph}>Make my graph</button>
        </form>
        {
          this.props.createdGraphs && 
          this.props.createdGraphs
          .filter(graphInfo => {
            return !(this.state.currentTable) 
                    ? graphInfo.database === DBName  
                    : (graphInfo.database === DBName && graphInfo.table === this.state.currentTable)
          })
          .map(graphInfo => graphInfo.graph)
        }
      </div>
    )
  }
}

const mapState = state => {
  return ({
    tables: state.tables,
    columns: state.fields.map(val => val.name),
    columnsType: state.fields.map(val => {
      if(val.dataTypeID === 1043) return 'text'
      if(val.dataTypeID === 23) return 'integer'
      if(val.dataTypeID === 1184) return 'date'
      return 'text'
    }),
    createdGraphs: state.createdGraphs
  })
}

const mapDispatch = dispatch => {
  return ({
    fetchDat (DBname) {
      dispatch( fetchTables(DBname) )
    },
    grabTableData(database, table) {
      dispatch( fetchFields({ database, table}))
    },
    loadCreatedGraphs(){
      dispatch(fetchGraphs())
    },
    savingGraph(currentDatabase, currentTable, graph){  // settings of graph applied to newSettings
      let newGraphInfo = {
        database: currentDatabase,
        table: currentTable,
        graph: graph
      }
      dispatch(saveGraph(newGraphInfo))
    }
  })
}

export default connect(mapState, mapDispatch)(myForm)

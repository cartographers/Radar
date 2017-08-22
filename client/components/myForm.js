import React from 'react'
import { connect } from 'react-redux'
import { fetchFields, fetchTables, fetchGraphs, saveGraph, fetchKeys } from '../store'

import MyFormContainer from './MyFormContainer'

class myForm extends React.Component {

  constructor() {
    super()
    this.state = {
      selectThese: [],
      whereThese: [], //objects of Nested Wheres???
      orderedBy: ['Descending', 0 ],
      conditionals: ['greater than', 'greater than or equal to', 'less than', 'less than or equal to', 'equal to', 'not', 'between', 'not between'],
      conditionalOperator: ['>', '>=', '<', '<=', '=', '!=', '[]', '![]'],
      orderType: ['Ascending', 'Descending'],
      chartTypes: ['Scatter', 'Area', 'Bar', 'Line', 'Pie', 'Table'],
      currentTable: '',
      currentDatabase: '', //JK YOU CAN STAY
      AndOr: '',
      choosenChart: 'Scatter',
      Title: '',
      xAxis: '',
      yAxis: '',
      pieKey: '',
    }
    this.methods = {
      handleChange: this.handleChange.bind(this),
      handleAdd: this.handleAdd.bind(this),
      handleRemove: this.handleRemove.bind(this),
      handleChartChange: this.handleChartChange.bind(this),
      handleTableChange: this.handleTableChange.bind(this),
      makeGraph: this.makeGraph.bind(this)
    }
  }

  componentDidMount() {
    let db = this.props.match.params.dbName
    this.setState({currentDatabase: db})
    this.props.fetchDat({ database: db})
    this.props.loadCreatedGraphs()
  }


  handleChange = (index, fromWhere, evt ) => {
    const type = evt.target.name
    const value = evt.target.value
    let newVal = (fromWhere === 'whereThese') ? {} : value
    if (fromWhere === 'whereThese'){
      if (type === 'is'){
        newVal[type] = this.state.conditionalOperator[value]
        newVal.literal = value
      }
      else newVal[type] = value
    }

    this.setState( (prevState) => ( { [fromWhere]: prevState[fromWhere].map( (val, i) => {
        if (index != i ) return val
        if (fromWhere === 'whereThese'){
          return {...val, ...newVal}
        }
        return newVal
    })}))
  }

  handleChartChange = (fromWhere, evt) => {
    this.setState({
      [fromWhere]: evt.target.value
    })
  }

  handleAdd = (addTo) => {
    let newAdd = (addTo === 'selectThese') ? this.props.columns[0] : {col: this.props.columns[0], is: '>', spec: '', literal: 'greater than'}
    this.setState( (prevState) => ({ [addTo]: [...prevState[addTo], newAdd] }))
  }

  handleRemove = (index, fromWhere) => {
    this.setState( (prevState) => ({
      [fromWhere]: [...prevState[fromWhere].slice(0, index), ...prevState[fromWhere].slice(index + 1)]
    }))
  }

  makeGraph = (evt) => {
    evt.preventDefault()
    let settings = {
      whereThese: this.state.whereThese.map( val => {
        val.col = `"${val.col}"`
        return val
      }),
      selectThese: this.state.selectThese.map(val => `"${val}"`),
      Title: this.state.Title,
      xAxis: this.state.xAxis,
      yAxis: this.state.yAxis,
      orderedBy: [this.state.orderedBy[0], (this.state.orderedBy[1] ? `"${this.state.orderedBy[1]}"` : '')],
      currentTable: this.state.currentTable,
      currentDatabase: this.state.currentDatabase,
      AndOr: this.state.AndOr || 'AND',
      choosenChart: this.state.choosenChart,
      fields: this.props.fields,
      pieKey: this.state.pieKey
    }
    this.props.savingGraph(this.state.currentDatabase, this.state.currentTable, settings)  // second argument should be settings of graph
  }

  handleTableChange = (evt) => {
    const currentTable = evt.target.value
    this.setState({ currentTable: currentTable })
    this.props.grabTableData(this.state.currentDatabase, currentTable)
  }

  render () {
    return (<div>
              <MyFormContainer {...this.state} {...this.props} {...this.methods} />
            </div>)
  }
}

const mapState = state => {
  return ({
    tables: state.tables,
    columns: state.fields.map(val => val.name),
    createdGraphs: state.createdGraphs,
    database: state.queriedTable,
    fields: state.fields,
    columnType: state.fields.map(val => val.dataTypeID),
    foreignKeys: state.foreignKeys
  })
}

const mapDispatch = dispatch => {
  return ({
    fetchDat (DBname) {
      dispatch( fetchTables(DBname) )
    },
    grabTableData(database, table) {
      dispatch( fetchFields({ database, table}))
      dispatch( fetchKeys({ database, table}))
    },
    loadCreatedGraphs(){
      dispatch(fetchGraphs())
    },
    savingGraph(currentDatabase, currentTable, settings){  // settings of graph applied to newSettings
      let newGraphInfo = {
        database: currentDatabase,
        table: currentTable,
        settings: settings
      }
      dispatch(saveGraph(newGraphInfo))
    }
  })
}

export default connect(mapState, mapDispatch)(myForm)

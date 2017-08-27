import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
    fetchUsers,
    fetchDatabase,
    searchDatabase,
    fetchFields,
    fetchDatabases,
    fetchTables,
    currentDatabase,
    fetchGraphs,
    saveGraph,
    fetchQueryTable,
    fetchKeys,
    removeGraph,
    saveQueryGraph
} from '../store'
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {FormControl, ControlLabel, FormGroup, Button, Well} from 'react-bootstrap'
import {saveSettings} from '../../utils/saveFile'
import {newGraphMaker} from '../../utils/graphUtility'
import MyFormContainer from './MyFormContainer'
import CustomQuery from './CustomQuery'

class myForm extends React.Component {

    constructor() {
        super()
        this.state = {
            selectThese: [],
            whereThese: [], //objects of Nested Wheres???
            orderedBy: ['Descending', 0],
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
            selectQuery: true,
            aggregateChoices: ['MIN', 'MAX', 'SUM', 'AVG', 'COUNT'],
            aggregateSelects: [],
            displayForm: false
        }
        this.methods = {
            handleChange: this.handleChange.bind(this),
            handleAdd: this.handleAdd.bind(this),
            handleRemove: this.handleRemove.bind(this),
            handleChartChange: this.handleChartChange.bind(this),
            handleTableChange: this.handleTableChange.bind(this),
            makeGraph: this.makeGraph.bind(this),
            changeQueryType: this.changeQueryType.bind(this),
            handleChartDelete: this.handleChartDelete.bind(this),
            showForm: this.showForm.bind(this)
        }
    }

    componentDidMount() {
        let db = this.props.match.params.dbName
        this.setState({currentDatabase: db})
        this.props.fetchDat({database: db})
        this.props.loadCreatedGraphs()
        this.props.setCurrentDatabase(db)

    }


    handleChange = (index, fromWhere, evt) => {
        const type = evt.target.name
        const value = evt.target.value
        let newVal = (fromWhere === 'whereThese' || fromWhere === 'aggregateSelects') ? {} : value
        if (fromWhere === 'whereThese' || fromWhere === 'aggregateSelects') {
            if (type === 'is') {
                newVal[type] = this.state.conditionalOperator[value]
                newVal.literal = value
            }
            else newVal[type] = value
        }

        this.setState((prevState) => ( {
            [fromWhere]: prevState[fromWhere].map((val, i) => {
                if (index != i) return val
                if (fromWhere === 'whereThese' || fromWhere === 'aggregateSelects') {
                    return {...val, ...newVal}
                }
                return newVal
            })
        }))
    }

    handleChartChange = (fromWhere, evt) => {
        this.setState({
            [fromWhere]: evt.target.value
        })
    }

    handleAdd = (addTo) => {
        let newAdd = (addTo === 'selectThese') ? this.props.columns[0] : {
            col: '',
            is: '>',
            spec: '',
            literal: 'greater than'
        }
        if (addTo === 'aggregateSelects') newAdd = {col: '', agg: ''}
        this.setState((prevState) => ({[addTo]: [...prevState[addTo], newAdd]}))
    }

    handleRemove = (index, fromWhere) => {
        this.setState((prevState) => ({
            [fromWhere]: [...prevState[fromWhere].slice(0, index), ...prevState[fromWhere].slice(index + 1)]
        }))
    }

    makeGraph = (evt) => {
        evt.preventDefault()
        let settings = {
            whereThese: this.state.whereThese,
            selectThese: this.state.selectThese,
            Title: this.state.Title,
            xAxis: this.state.xAxis,
            yAxis: this.state.yAxis,
            orderedBy: [this.state.orderedBy[0], (this.state.orderedBy[1] ? `"${this.state.orderedBy[1]}"` : '')],
            currentTable: this.state.currentTable,
            currentDatabase: this.state.currentDatabase,
            AndOr: this.state.AndOr || 'AND',
            choosenChart: this.state.choosenChart,
            fields: this.props.fields,
            pieKey: this.state.pieKey,
            foreignKeys: this.props.foreignKeys,
            selectQuery: this.state.selectQuery,
            savedQuery: this.props.database,
            aggregateSelects: this.state.aggregateSelects,
            created: Date.now(),
            displayForm: this.state.displayForm
        }
        this.state.displayForm ?
            this.props.savingGraph(this.state.currentDatabase, this.state.currentTable, settings)
            : console.log('Wrong choice')
    }

    handleTableChange = (evt) => {
        const currentTable = evt.target.value
        this.setState({currentTable: currentTable})
        this.setState({
            selectThese: [],
            whereThese: [],
            orderedBy: ['Descending', 0],
            AndOr: '',
            xAxis: '',
            yAxis: '',
            pieKey: '',
            aggregateSelects: []
        })
        this.props.grabTableData(this.state.currentDatabase, currentTable, this.props.foreignKeys)
    }

    changeQueryType = (event) => {
        this.setState({selectQuery: !this.state.selectQuery})
    }

    handleChartDelete = (settings) => {
        this.props.deleteGraph(settings)
    }

    showForm = () => {
        this.setState((prevState) => ({displayForm: !prevState.displayForm}))
    }

    render() {
        return (
            <div>
                <div className="col-md-12">
                    <h4><Link to="/home"> Home </Link> > Dashboard > {this.state.currentDatabase} </h4>
                </div>
                <div className="col-md-12">
                    <button type="button" className="btn btn-primary" onClick={this.changeQueryType} style={{margin: 1 + 'px', padding: 1 + 'px'}}>
                        {this.state.selectQuery ? 'SQL Form Query' : 'Select Query Options'}
                    </button>
                </div>
                <div className="col-md-12">
                    <MyFormContainer {...this.state} {...this.props} {...this.methods} />
                </div>
            </div>
        )

    }
}

const mapState = state => {
    return ({
        tables: state.tables,
        columns: state.fields.map(val => val.tableName + ' ' + val.name),
        createdGraphs: state.createdGraphs,
        database: state.queriedTable,
        fields: state.fields,
        columnType: state.fields.map(val => val.dataTypeID),
        foreignKeys: state.foreignKeys
    })
}

const mapDispatch = dispatch => {
    return ({
        fetchDat(DBname) {
            dispatch(fetchTables(DBname))
        },
        grabTableData(database, table, foreignKeys) {
            dispatch(fetchKeys({database, table}))
            dispatch(fetchFields({database, table, foreignKeys}))
        },
        loadCreatedGraphs() {
            dispatch(fetchGraphs())
        },
        savingGraph(currentDatabase, currentTable, settings) {
            let newGraphInfo = {
                database: currentDatabase,
                table: currentTable,
                settings: settings
            }
            dispatch(saveGraph(newGraphInfo))
        },
        queryDatabase(settings, fields) {
            const newSettings = {
                ...settings,
                fields
            }
            dispatch(fetchQueryTable(newSettings))
        },
        setCurrentDatabase(database) {
            dispatch(currentDatabase(database))
        },
        savingCustomQueryGraph(currentDatabase, currentTable, settings) {
            let newGraphInfo = {
                database: currentDatabase,
                table: currentTable || 'users',
                settings: settings
            }
            dispatch(saveQueryGraph(newGraphInfo))
        },
        deleteGraph(settings) {
            dispatch(removeGraph(settings))
        }
    })
}

export default connect(mapState, mapDispatch)(myForm)

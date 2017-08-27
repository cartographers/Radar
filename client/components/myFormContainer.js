import React from 'react'
import {FormControl, ControlLabel, FormGroup, Button, Well} from 'react-bootstrap'
import {newGraphMaker} from '../../utils/graphUtility'
import {saveFile} from '../../utils/saveFile'
import CustomQuery from './CustomQuery'

const ChooseOne = (props) => {
    return (<select name={props.name} onChange={props.onChange} value={props.value}>
        <option>Make a choice</option>
        {props.iterable && props.iterable.map((val, i) => <option value={props.indxVal ? i : val}
                                                                  key={i}>{val.charAt(0).toUpperCase() + val.slice(1)}</option>)}
    </select>)
}

const options = (selectThese, columns, columnType, onChange, filtered) => {
    let mapThis = selectThese.length ? selectThese : columns
    if (filtered) mapThis = mapThis.filter((val) => (columnType[columns.indexOf(val)] === 23 || columnType[columns.indexOf(val)] === 21 || columnType[columns.indexOf(val)] === 1700))
    return <ChooseOne onChange={onChange} iterable={mapThis}/>
}


const RenderTables = (props) => {
    return (
        <div>
            <label>From</label>
            <ChooseOne name="From" onChange={props.handleTableChange} iterable={props.tables}
                       value={props.currentTable}/>
        </div>
    )
}


const RenderSelects = (props) => {
    return (
        <div>
            <div>
                <label>Select</label>
                {props.selectThese.map((sel, index) => {
                    return <div key={index}>
                        <ChooseOne key={index} onChange={props.handleChange.bind(this, index, 'selectThese')}
                                   value={props.selectThese[index]} iterable={props.columns}/>
                        <div onClick={props.handleRemove.bind(this, index, 'selectThese')}
                             className="glyphicon glyphicon-remove-sign"
                             style={{float: 'left', color: '#E84A5F', margin: 1 + 'px', padding: 0}}>
                        </div>
                    </div>
                })
                }
            </div>
            <div style={{float: 'left'}}>
                <button type="button" className="btn-xs btn-primary" onClick={props.handleAdd.bind(this, 'selectThese')}
                        disabled={(props.selectThese.length) === (props.columns.length - 1)}>+
                </button>
            </div>
        </div>
    )
}

const RenderAggregate = (props) => {
    return (
        <div>
            <div>
                <label>Aggregates</label>
                {props.aggregateSelects.map((sel, index) => {
                    return <div key={index}>
                        <ChooseOne key={index + "agg"} name="agg"
                                   onChange={props.handleChange.bind(this, index, 'aggregateSelects')}
                                   value={props.aggregateSelects[index].agg} iterable={props.aggregateChoices}/>
                        <ChooseOne key={index + "col"} name="col"
                                   onChange={props.handleChange.bind(this, index, 'aggregateSelects')}
                                   value={props.aggregateSelects[index].col}
                                   iterable={props.columns.filter((val, i) => (props.columnType[i] === 23 || props.columnType[i] === 21 || props.columnType[i] === 1700))}/>
                        <div onClick={props.handleRemove.bind(this, index, 'aggregateSelects')}
                             className="glyphicon glyphicon-remove-sign"
                             style={{float: 'left', color: '#E84A5F', margin: 1 + 'px', padding: 0}}>
                        </div>
                    </div>
                })
                }
            </div>
            <div style={{float: 'left'}}>
                <button type="button" className="btn-xs btn-primary"
                        onClick={props.handleAdd.bind(this, 'aggregateSelects')}
                        disabled={(props.aggregateSelects.length) === 4}>+
                </button>
            </div>
        </div>
    )
}

const RenderOrAnd = (props) => {
    return (<div>
        <input type="radio" className="form-check-input" name="AndOr" value="AND"
               onChange={props.handleChartChange.bind(this, 'AndOr')} checked/> And <br/>
        <input type="radio" className="form-check-input" name="AndOr" value="OR"
               onChange={props.handleChartChange.bind(this, 'AndOr')}/> Or <br/>
    </div>)
}

const RenderWheres = (props) => {
    return (
        <div>
            <div>
                <label>Where</label>
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


const RenderOrderBy = (props) => {
    return (
        <div className="form-group col-md-12">
            <label>Order by</label>
            <ChooseOne onChange={props.handleChange.bind(this, 0, 'orderedBy')} iterable={props.orderType}/>
            {options(props.selectThese, props.columns, props.columnType, props.handleChange.bind(this, 1, 'orderedBy'), false)}
        </div>
    )
}

const PieOptions = (props) => {
    return (
        <div>
            <label>Pie Key (only for pie charts)</label>
            {options(props.selectThese, props.columns, props.columnType, props.handleChartChange.bind(this, 'pieKey'), true)}
        </div>
    )
}

const ChartOptions = (props) => {
    return (
        <div>
            <div>
                <label>X axis</label>
                {options(props.selectThese, props.columns, props.columnType, props.handleChartChange.bind(this, 'xAxis'), false)}
            </div>

            <div>
                <label>Y axis</label>
                {options(props.selectThese, props.columns, props.columnType, props.handleChartChange.bind(this, 'yAxis'), true)}
            </div>
        </div>
    )
}

const ChartInput = (props) => {
    return (<div>
        <label>{props.chartElement}</label>
        <input className="form-control" onChange={props.handleChartChange.bind(this, props.chartElement)} required/>
    </div>)
}


const SelectQueryOptions = (props) => {
    return (
        <div>
            <form>
                <Well>
                    <div className="col-md-12">
                        <RenderTables {...props} />
                    </div>
                    <div className="col-md-12">
                        {props.currentTable && <RenderSelects {...props} />}
                    </div>
                    <div className="col-md-12">
                        {props.currentTable && <RenderWheres {...props} />}
                    </div>
                    <div className="col-md-12">
                        {props.currentTable && <RenderOrderBy {...props} />}
                    </div>
                    <div className="col-md-12">
                        {props.currentTable && <RenderAggregate {...props} />}
                    </div>
                </Well>
            </form>
        </div>
    )
}

const CustomSQLQuery = (props) => {
    return (
        <div>
            <CustomQuery {...props} />
        </div>
    )
}

const MyFormContainer = (props) => {
    return (
        <div>

            <div className="col-md-12">

                {/*query form on the left*/}
                <div className="col-md-6 box-form">
                    {props.selectQuery ? <SelectQueryOptions {...props} /> : <CustomSQLQuery {...props}  />}
                </div>

                {/*make graph form on the right */}
                <div className="col-md-6 box-form">
                    <form>
                        <Well>
                            <div>
                                <div className="col-md-12">
                                    <label>Chart Type</label>
                                    <ChooseOne name="choosenChart"
                                               onChange={props.handleChartChange.bind(this, 'choosenChart')}
                                               iterable={props.chartTypes}/>
                                </div>
                                <div className="col-md-12">
                                    <ChartInput {...props} chartElement="Title"/>
                                </div>
                                {props.choosenChart === 'Pie' && <PieOptions {...props} />}
                                {props.choosenChart !== 'Pie' && props.choosenChart !== 'Table' &&
                                <ChartOptions {...props} />}
                                <div className="col-md-12">
                                    <Button
                                        bsSize="small"
                                        type="submit"
                                        className="btn btn-success" onClick={props.makeGraph}>
                                        Make my graph
                                    </Button>
                                </div>
                            </div>
                        </Well>
                    </form>
                </div>
            </div>

            {/*saved graphs*/}
            <div className="col-md-12" style={{margin: 0, padding: 0}}>
                {
                    props.createdGraphs &&
                    props.createdGraphs
                        .filter(graphInfo => {
                            return !(props.currentTable)
                                ? graphInfo.database == props.currentDatabase
                                : (graphInfo.database == props.currentDatabase && graphInfo.table == props.currentTable)
                        })
                        .map((graphInfo, index) => {
                            return (
                                <div key={index} className="col-md-4 box graphdiv" style={{width: 32 + '%'}}>
                                    <div onClick={props.handleChartDelete.bind(this, graphInfo)}
                                         className="glyphicon glyphicon-remove-sign"
                                         style={{float: 'left', color: '#E84A5F', margin: 0, padding: 0}}>
                                    </div>
                                    <div>
                                        {newGraphMaker(graphInfo.settings)}
                                    </div>
                                </div>
                            )
                        })
                }
            </div>

        </div>
    )
}


export default MyFormContainer

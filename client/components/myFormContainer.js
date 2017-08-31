import React from 'react'
import {FormControl, ControlLabel, FormGroup, Button, Well, Modal} from 'react-bootstrap'
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
        <div className="col-md-12" style={{margin: 5 + 'px', padding: 3 + 'px'}}>
            <h5 className="form-labels"><strong>From</strong></h5>
            <ChooseOne name="From" onChange={props.handleTableChange} iterable={props.tables}
                       value={props.currentTable}/>
        </div>
    )
}


const RenderSelects = (props) => {
    return (
        <div className="col-md-12">
            <div>
                <h5 className="form-labels"><strong>Select</strong></h5>
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
        <div className="col-md-12">
            <div>
                <h5 className="form-labels"><strong>Aggregates</strong></h5>
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
    return (
        <div className="col-md-12">
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

const RenderWheres = (props) => {
    return (
        <div className="col-md-12">
            <div>
                <h5 className="form-labels"><strong>Where</strong></h5>
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
            <h5 className="form-labels"><strong> Order By </strong></h5>
            <ChooseOne onChange={props.handleChange.bind(this, 0, 'orderedBy')} iterable={props.orderType}/>
            {options(props.selectThese, props.columns, props.columnType, props.handleChange.bind(this, 1, 'orderedBy'), false)}
        </div>
    )
}

const PieOptions = (props) => {
    return (
        <div>
            <h5 className="form-labels"><strong> Pie Key </strong></h5>
            {options(props.selectThese, props.columns, props.columnType, props.handleChartChange.bind(this, 'pieKey'), true)}
        </div>
    )
}

const ChartOptions = (props) => {
    return (
        <div>
            <div>
                <h5 className="form-labels"><strong> X axis </strong></h5>
                {options(props.selectThese, props.columns, props.columnType, props.handleChartChange.bind(this, 'xAxis'), false)}
            </div>

            <div>
                <h5 className="form-labels"><strong> Y axis </strong></h5>
                {options(props.selectThese, props.columns, props.columnType, props.handleChartChange.bind(this, 'yAxis'), true)}
            </div>
        </div>
    )
}
const FormComponent = (props) => {

    return (
        <div className="form-group col-md-12">
            <h5 className="form-labels"><strong>{props.elem}</strong></h5>
            { options(props.selectThese, props.columns, props.columnType, props.handleChartChange.bind(this, elem), props.filtered)}
        </div>
        )
}
const ChartInput = (props) => {
    return (
    <div className="col-md-12">
        <h5 className="form-labels"><strong>{props.chartElement}</strong></h5>
        <input className="form-control" onChange={props.handleChartChange.bind(this, props.chartElement)} required/>
    </div>
    )
}

const RenderChartSettings = (props) => {
    return (
        <div className="col-md-12">
            <div className="col-md-12">
                <h5 className="form-labels"><strong> Chart Type </strong></h5>
                <ChooseOne name="choosenChart"
                           onChange={props.handleChartChange.bind(this, 'choosenChart')}
                           iterable={props.chartTypes}/>
            </div>
            <ChartInput {...props} chartElement="Title"/>
            {props.choosenChart === 'Pie' && <PieOptions {...props} />}
            {props.choosenChart !== 'Pie' && props.choosenChart !== 'Table' &&
            <ChartOptions {...props} />}
            <div className="col-md-12">
                <button
                    type="submit"
                    className="btn btn-primary btn-xs"
                    onClick={props.makeGraph}
                    style={{float: 'right'}}>
                    Make my graph
                </button>
            </div>
        </div>
    )
}


const SelectQueryOptions = (props) => {
    return (
        <form>
            <RenderTables {...props} />
            { props.currentTable && <RenderSelects {...props} />
              && <RenderWheres {...props} /> && <RenderOrderBy {...props} /> 
              && <RenderAggregate {...props} /> && <RenderChartSettings {...props}/>}
        </form>
    )
}

const CustomSQLQuery = (props) => {
    return (
        <form>
            <CustomQuery {...props} />
            <RenderChartSettings {...props}/>
        </form>
    )
}


const ModalHeader = (props) => {
    return (
        <div>
            <Modal show={props[props.displayType]} bsSize="large">
                <Modal.Header>
                    <Modal.Title>
                      {props.displayType === "customDisplayForm" ? "Advanced SQL Query Form" : "Query Selection Form"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.displayType === "customDisplayForm" ? <CustomSQLQuery {...props} /> : <SelectQueryOptions {...props} />}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger btn-xs" onClick={props.flipBoolean.bind(this, props.displayType)}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
        )
}

const QueryButton = (props) => {
    return (
        <div className="queryDiv">
            <button onClick={props.flipBoolean.bind(this, props.displayType)} className="queryButton btn-primary btn-xs">
                { props.displayType === 'displayForm' ?  'Query Selection Form' : 'Advanced QueryForm'}
            </button>
        </div>
        )
}


const ChartRender = (props) => {
    return (
            <div key={props.index} className="col-md-4 box graphdiv" style={{width: 32 + '%'}}>
                <div onClick={props.handleChartDelete.bind(this, props.graphInfo)}
                     className="glyphicon glyphicon-remove-sign"
                     style={{float: 'left', color: '#E84A5F', margin: 0, padding: 0}}>
                </div>
                <div>
                    {newGraphMaker(props.graphInfo.settings)}
                </div>
            </div>
            )
}

const filterGraphs = (graphInfo, props) => {
    return !(props.currentTable)
    ? graphInfo.database == props.currentDatabase
    : (graphInfo.database == props.currentDatabase && graphInfo.table == props.currentTable)
}

const MyFormContainer = (props) => {
    return (
        <div>
            <div className="col-md-12">

                {/*query form on the left*/}
                <QueryButton flipBoolean={props.flipBoolean} displayType="displayForm" />
                <QueryButton flipBoolean={props.flipBoolean} displayType="customDisplayForm" />
                <ModalHeader {...props} displayType={props.displayForm ? "displayForm" : "customDisplayForm" } />
            </div>
            {/*saved graphs*/}
            <div className="col-md-12" style={{margin: 0, padding: 0}}>
                {
                    props.createdGraphs &&
                    props.createdGraphs
                        .filter(graphInfo => filterGraphs(graphInfo, props))
                        .map((graphInfo, index) => {
                            return <ChartRender {...props} graphInfo={graphInfo} index={index} />
                        })
                }
            </div>

        </div>
    )
}


export default MyFormContainer

import React from 'react'
import {Modal} from 'react-bootstrap'
import CustomQuery from './CustomQuery'
import ChooseOne from './ChooseOne'
import options from './options'
import RenderTables from './RenderTables'
import RenderAggregate from './RenderAggregate'
import RenderWheres from './RenderWheres'


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

const ChartInput = (props) => {
    return (<div>
        <input className="form-control" onChange={props.handleChartChange.bind(this, props.chartElement)} required/>
    </div>)
}

const RenderChartSettings = (props) => {
    return (
        <div>
            <div className="col-md-12">
                <h5 className="form-labels"><strong> Chart Type </strong></h5>
                <ChooseOne name="choosenChart"
                           onChange={props.handleChartChange.bind(this, 'choosenChart')}
                           iterable={props.chartTypes}/>
            </div>
            <div className="col-md-12">
                <h5 className="form-labels"><strong> Title </strong></h5>
                <ChartInput {...props} chartElement="Title"/>
            </div>
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


export const SelectQueryOptions = (props) => {
    return (
        <div>
            <Modal show={props.displayForm} bsSize="large">
                <Modal.Header>
                    <Modal.Title>
                        Query Selection Form
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="col-md-12" style={{margin: 5 + 'px', padding: 3 + 'px'}}>
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
                        <div className="col-md-12">
                            {props.currentTable && <RenderChartSettings {...props}/>}
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-xs btn-danger" onClick={props.showForm}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export const CustomSQLQuery = (props) => {
    return (
        <div>
            <Modal show={props.customDisplayForm} bsSize="large">
                <Modal.Header>
                    <Modal.Title>
                        Advanced SQL Query Form
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="col-md-12">
                            <CustomQuery {...props} />
                        </div>
                        <div className="col-md-12">
                            <RenderChartSettings {...props}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger btn-xs" onClick={props.showCustomForm}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
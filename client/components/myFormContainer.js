import React from 'react'
import {FormControl, ControlLabel, FormGroup, Button, Well} from 'react-bootstrap'
import {newGraphMaker} from '../../utils/graphUtility'
import {saveFile} from '../../utils/saveFile'

const ChooseOne = (props) => {
  return (<select name={props.name} onChange={props.onChange} value={props.value}>
            <option>Make a choice</option>
            {props.iterable && props.iterable.map((val, i) => <option value={props.indxVal ? i : val} key={i}>{val}</option>)}
          </select>)
}

const options = (selectThese, columns, columnType, onChange, filtered) => {
    let mapThis = selectThese.length ? selectThese : columns
    if (filtered) mapThis = mapThis.filter((val) => (columnType[columns.indexOf(val)] === 23))
    return <ChooseOne onChange={onChange} iterable={mapThis} />
}


const RenderTables = (props) => {
    return (<div className="col-md-12">
              <label>From</label>
                <ChooseOne name="From" onChange={props.handleTableChange} iterable={props.tables} value={props.currentTable} />
            </div>)
}


const RenderSelects = (props) => {
      return (<div className="col-md-12">
                <label>Select</label>
                { props.selectThese.map((sel, index) => {
                    return  <div key={index}>
                                <ChooseOne key={index} onChange={props.handleChange.bind(this, index, 'selectThese')} value={props.selectThese[index]} iterable={props.columns} />
                                <button type="button" className="btn btn-danger" onClick={props.handleRemove.bind(this, index, 'selectThese')}> - </button>
                            </div>
                    })
                }
                <button type="button" className="btn btn-primary" onClick={props.handleAdd.bind(this,'selectThese')} disabled={(props.selectThese.length) === (props.columns.length-1)}>+</button>
            </div>)
  }

const RenderOrAnd = (props) => {
  return (<div>
            <input type="radio" className="form-check-input" name="AndOr" value="AND" onChange={props.handleChartChange.bind(this, 'AndOr')} checked /> And <br />
            <input type="radio" className="form-check-input" name="AndOr" value="OR" onChange={props.handleChartChange.bind(this, 'AndOr')} />  Or <br />
          </div>)
}

const RenderWheres = (props) => {
  return  <div className="col-md-12">
            <label>Where</label>
            { (props.whereThese.length > 1) && <RenderOrAnd {...props} /> }
            {
              props.whereThese.map((sel, index) => {
                return  <div key={index}>
                          <ChooseOne name="col" onChange={props.handleChange.bind(this, index, 'whereThese')} value={props.whereThese[index].col} iterable={props.columns} />
                          <h4>is</h4>
                          <ChooseOne name="is" onChange={props.handleChange.bind(this, index, 'whereThese')} value={props.whereThese[index].literal} iterable={props.conditionals} indxVal={true} />
                          <input name="spec" onChange={props.handleChange.bind(this, index, 'whereThese')} value={props.whereThese[index].spec} />
                          <button type="button" className="btn btn-danger" onClick={props.handleRemove.bind(this, index, 'whereThese')}> - </button>
                        </div>
              })
            }
              <button type="button" className="btn btn-primary" onClick={props.handleAdd.bind(this, 'whereThese')} disabled={props.whereThese.length === 4}>+</button>
          </div>
}

const RenderOrderBy = (props) =>  {
  return (<div className="col-md-12">
            <div className="form-group">
            <label>Order by</label>
            <ChooseOne onChange={props.handleChange.bind(this, 0, 'orderedBy')} iterable={props.orderType} />
            { options(props.selectThese, props.columns, props.columnType, props.handleChange.bind(this, 1, 'orderedBy'), false)}
            </div>
          </div>)
}

const PieOptions = (props) => {
  return (<div className="col-md-12">
            <label>Pie Key (only for pie charts)</label>
            { options(props.selectThese, props.columns, props.columnType, props.handleChartChange.bind(this, 'pieKey'), true)}
          </div>)
}

const ChartOptions = (props) => {
  return (<div>
              <div className="col-md-12">
              <label>X axis</label>
              { options(props.selectThese, props.columns, props.columnType, props.handleChartChange.bind(this, 'xAxis'), false)}
              </div>

              <div className="col-md-12">
                <label>Y axis</label>
                  { options(props.selectThese, props.columns, props.columnType, props.handleChartChange.bind(this, 'yAxis'), true)}
              </div>

          </div>)
}
const ChartInput = (props) => {
  return (<div className="col-md-12">
          <label>{props.chartElement}</label>
          <input className="form-control" onChange={props.handleChartChange.bind(this, props.chartElement)} required />
          </div>)
}


const MyFormContainer = (props) => {

      return (<div className="col-md-12">

        <div className="box1 col-md-6">
              <Button id="saveFile" onClick={saveFile}>Save Graph</Button>
                <form>
                  <Well>
                    <RenderTables {...props} />
                    { props.currentTable && <RenderSelects {...props} /> }
                    { props.currentTable && <RenderWheres {...props} /> }
                    { props.currentTable && <RenderOrderBy {...props} /> }
                  </Well>
                </form>
        </div>

        <div className="box1 col-md-6">

            <form>
              <Well>
                <div className="col-md-12">
                  <label>Chart Type</label>
                  <ChooseOne name="choosenChart" onChange={props.handleChartChange.bind(this, 'choosenChart')} iterable={props.chartTypes} />
                </div>
                <ChartInput {...props} chartElement="Title" />
                {  props.choosenChart === 'Pie' && <PieOptions {...props} />}
                {  props.choosenChart !== 'Pie' && props.choosenChart !== 'Table' && <ChartOptions {...props} /> }
                <div className="col-md-12">
                      <Button type="submit" className="btn btn-success" onClick={props.makeGraph}>
                        Make my graph
                      </Button>
                </div>
            </Well>
            </form>
          </div>
          {
          props.createdGraphs &&
          props.createdGraphs
          .filter(graphInfo => {
            return !(props.currentTable)
                    ? graphInfo.database == props.currentDatabase
                    : (graphInfo.database == props.currentDatabase && graphInfo.table == props.currentTable)
          })
          .map((graphInfo, index) => <div key={index}>{newGraphMaker(graphInfo.settings)}</div>)
        }

      </div>)
}

export default MyFormContainer

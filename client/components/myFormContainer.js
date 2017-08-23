import React from 'react'
import {FormControl, ControlLabel, FormGroup, Button, Well} from 'react-bootstrap'
import {newGraphMaker} from '../../utils/graphUtility'
import {saveFile} from '../../utils/saveFile'
import CustomQuery from './CustomQuery'

const RenderTables = (props) => {
    return <div>
              <label>From</label>
                <select name="From" onChange={props.handleTableChange}>
                  <option>Choose a Table</option>
                  {props.tables && props.tables.map((table,i) => <option value={table} key={i}>{table}</option>)}
                </select>
            </div>
}

const RenderSelects = (props) => {
      return <div>
                <label>Select</label>
                { props.selectThese.map((sel, index) => {
                    return  <div key={index}>
                                <select key={index} onChange={props.handleChange.bind(this, index, 'selectThese')} value={props.selectThese[index]}>
                                    {props.columns && props.columns.map((val,i) => <option value={val} key={i}>{val}</option>)}
                                </select>
                                <button type="button" className="btn btn-danger" onClick={props.handleRemove.bind(this, index, 'selectThese')}> - </button>
                            </div>
                    })
                }
                <button type="button" className="btn btn-primary" onClick={props.handleAdd.bind(this,'selectThese')} disabled={(props.selectThese.length) === (props.columns.length-1)}>+</button>
            </div>
  }

const RenderWheres = (props) => {
  return  <div>
            <label>Where</label>
            { (props.whereThese.length > 1) && (<div>
                    <input type="radio" className="form-check-input" name="AndOr" value="AND" onChange={props.handleChartChange.bind(this, 'AndOr')} checked/>
                    And <br />
                    <input type="radio" className="form-check-input" name="AndOr" value="OR" onChange={props.handleChartChange.bind(this, 'AndOr')} />
                    Or <br />
                  </div>)
            }
            {
              props.whereThese.map((sel, index) => {
                return  <div key={index}>
                          <select name="col" onChange={props.handleChange.bind(this, index, 'whereThese')} value={props.whereThese[index].col}>
                            {props.columns && props.columns.map((val, i)  => <option value={val} key={i}>{val}</option>)}
                          </select>
                          <h4>is</h4>
                            <select name="is" onChange={props.handleChange.bind(this, index, 'whereThese')} value={props.whereThese[index].literal}>
                            {props.conditionals && props.conditionals.map((val, i) => <option value={i} key={i}>{val}</option>)}
                            </select>
                            <input  name="spec"
                                    onChange={props.handleChange.bind(this, index, 'whereThese')}
                                    value={props.whereThese[index].spec}/>
                            <button type="button" className="btn btn-danger" onClick={props.handleRemove.bind(this, index, 'whereThese')}> - </button>
                        </div>
              })
            }
              <button type="button" className="btn btn-primary" onClick={props.handleAdd.bind(this, 'whereThese')} disabled={props.whereThese.length === 4}>+</button>
          </div>
}

const RenderOrderBy = (props) =>  {
  return (<div className="form-group">
          <label>Order by</label>
          {
            <select onChange={props.handleChange.bind(this, 0, 'orderedBy')}>
             { props.orderType.map((val, i) => <option value={val} key={i}>{val}</option>) }
            </select>
          }
          {
            <select onChange={props.handleChange.bind(this, 1, 'orderedBy')}>
              <option>Please choose an Option</option>
              { options(props.selectThese, props.columns, props.columnType, false)}
            </select>
          }
        </div>)
}


const options = (selectThese, columns, columnType, filtered) => {
    if (!filtered) return selectThese.length
            ? selectThese.map( (val, index) => <option value={val} key={index}>{val}</option>)
            : (columns && columns.map( (val, index) => <option value={val} key={index}>{val}</option>) )
    let mapThis = selectThese.length
                  ? selectThese
                  : columns
    mapThis = mapThis.filter((val) => (columnType[columns.indexOf(val)] === 23))
    return mapThis.map( (val, index) => <option value={val} key={index}>{val}</option> )
}

const PieOptions = (props) => {
  return (<div className="col-md-12">
            <label>Pie Key (only for pie charts)</label>
            <select onChange={props.handleChartChange.bind(this, 'pieKey')} >
              <option>Please choose an Option</option>
              { options(props.selectThese, props.columns, props.columnType, true)}
            </select>
          </div>)
}

const ChartOptions = (props) => {
  return (<div>
              <div className="col-md-12">
              <label>X axis</label>
              <select onChange={props.handleChartChange.bind(this, 'xAxis')} required>
                  <option>Please choose an Option</option>
                  { options(props.selectThese, props.columns, props.columnType, false)}
              </select>
              </div>

              <div className="col-md-12">
                <label>Y axis</label>
                <select onChange={props.handleChartChange.bind(this, 'yAxis')} required>
                    <option>Please choose an Option</option>
                    { options(props.selectThese, props.columns, props.columnType, true)}
                </select>
              </div>

          </div>)
}

const SelectQueryOptions = (props) => {
  return (
      <div className="box1 col-md-6">
        <Button id="saveFile" onClick={saveFile}>Save Graph</Button>
          <form>
            <Well>
              <div className="col-md-12">
               <RenderTables {...props} />
              </div>
              <div className="col-md-12">
                { props.currentTable && <RenderSelects {...props} /> }
              </div>
              <div className="col-md-12">
                { props.currentTable && <RenderWheres {...props} /> }
              </div>
              <div className="col-md-12">
                { props.currentTable && <RenderOrderBy {...props} /> }
              </div>
            </Well>
          </form>
      </div>
    )
}

const CustomSQLQuery = (props) => {
  return (
    <div className="box1 col-md-6">
      <Well>
        <CustomQuery {...props} />
      </Well>
    </div>
  )
}

const MyFormContainer = (props) => {

      return (<div className="col-md-12">

        {props.selectQuery ? <SelectQueryOptions {...props} /> : <CustomSQLQuery {...props}  />}

        <div className="box1 col-md-6">

            <form>
              <Well>
                <div className="col-md-12">
                  <label>Chart Type</label>
                  <select name="choosenChart" onChange={props.handleChartChange.bind(this, 'choosenChart')} required>
                   {props.chartTypes.map((val, i) => <option value={val} key={i}>{val}</option>)}
                  </select>
                </div>

                <div className="col-md-12">
                  <label>Chart Title</label>
                  <input className="form-control" onChange={props.handleChartChange.bind(this, 'Title')} required />
                </div>

                <div className="col-md-12">
                  <label>Height</label>
                  <input className="form-control" onChange={props.handleChartChange.bind(this, 'height')} required />
                </div>

                <div className="col-md-12">
                  <label>Width</label>
                  <input className="form-control" onChange={props.handleChartChange.bind(this, 'width')} required />
                </div>
                {  props.choosenChart === 'Pie' && <PieOptions {...props} />}
                {  props.choosenChart !== 'Pie' && props.choosenChart !== 'Table' && <ChartOptions {...props} /> }
              <div className="col-md-12">
                    <Button
                      type="submit"
                      className="btn btn-success" onClick={props.makeGraph}>
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
          .map((graphInfo, index) => {
            return (
            <div className="createdCharts" key={index} style={{border: 'solid grey 1px'}}>{newGraphMaker(graphInfo.settings)}
            <button onClick={props.handleChartDelete.bind(this, graphInfo)}>
            Delete
            </button>
            </div>
          )})
        }

      </div>)
}


export default MyFormContainer

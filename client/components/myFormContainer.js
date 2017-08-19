import React from 'react'
import {FormControl, ControlLabel, FormGroup, Button, Well} from 'react-bootstrap'
import {newGraphMaker} from '../../utils/graphUtility'

const renderTables = (props) => {
    return <div>
              <label>From</label>
                <select name="From" onChange={props.handleTableChange}>
                  <option>Choose a Table</option>
                  {this.props.tables && this.props.tables.map((table,i) => <option value={table} key={i}>{table}</option>)}
                </select>
            </div>
}

const renderSelects = (props) => {
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

renderWheres = (props) => {
  return  <div>
            <label>Where</label>
            { (this.state.whereThese.length > 1) && (<div>
                    <input type="radio" className="form-check-input" name="AndOr" value="AND" onChange={this.handleChartChange.bind(this, 'AndOr')} checked/>
                    And <br />
                    <input type="radio" className="form-check-input" name="AndOr" value="OR" onChange={this.handleChartChange.bind(this, 'AndOr')} />
                    Or <br />
                  </div>)
            }
            {
              this.state.whereThese.map((sel, index) => {
                return  <div key={index}>
                          <select name="col" onChange={this.handleChange.bind(this, index, 'whereThese')} value={this.state.whereThese[index].col}>
                            {this.props.columns && this.props.columns.map((val, i)  => <option value={val} key={i}>{val}</option>)}
                          </select>
                          <h4>is</h4>
                            <select name="is" onChange={this.handleChange.bind(this, index, 'whereThese')} value={this.state.whereThese[index].literal}>
                            {this.state.conditionals && this.state.conditionals.map((val, i) => <option value={i} key={i}>{val}</option>)}
                            </select>
                            <input  name="spec"
                                    onChange={this.handleChange.bind(this, index, 'whereThese')}
                                    value={this.state.whereThese[index].spec}/>
                            <button type="button" className="btn btn-danger" onClick={this.handleRemove.bind(this, index, 'whereThese')}> - </button>
                        </div>
              })
            }
              <button type="button" className="btn btn-primary" onClick={this.handleAdd.bind(this, 'whereThese')} disabled={this.state.whereThese.length === 4}>+</button>
          </div>
}

const renderOrderBy = (props) =>  {
  return <div className="form-group">
          <label>Order by</label>
          {
            <select onChange={this.handleChange.bind(this, 0, 'orderedBy')}>
             { this.state.orderType.map((val,i) => <option value={val} key={i}>{val}</option>) }
            </select>
          }
          {
            <select onChange={this.handleChange.bind(this, 1, 'orderedBy')}>
              <option>Please choose an Option</option>
              { this.options(true) }
            </select>
          }
        </div>
}
const options = (props) => {
    if (!props.yAxis) return this.state.selectThese.length
            ? this.state.selectThese.map( (val, index) => <option value={val} key={index}>{val}</option>)
            : (this.props.columns && this.props.columns.map( (val, index) => <option value={val} key={index}>{val}</option>) )
    let mapThis = this.state.selectThese.length
                  ? this.state.selectThese
                  : this.props.columns 
    mapThis = mapThis.filter((val) => (this.props.columnType[this.props.columns.indexOf(val)] === 23))
    return mapThis.map( (val, index) => <option value={val} key={index}>{val}</option> ) 
  }

const pieOptions = (props) => {
  return (<div className="col-md-12">
            <label>Pie Key (only for pie charts)</label>
            <select onChange={this.handleChartChange.bind(this, 'pieKey')} >
              <option>Please choose an Option</option>
              { this.options() }
            </select>
          </div>)
}

const chartOptions = (props) => {
  return (<div>
              <div className="col-md-12">
              <label>X axis</label>
              <select onChange={this.handleChartChange.bind(this, 'xAxis')} required>
                  <option>Please choose an Option</option>
                 { this.options() }
              </select>
              </div>

              <div className="col-md-12">
                <label>Y axis</label>
                <select onChange={this.handleChartChange.bind(this, 'yAxis')} required>
                    <option>Please choose an Option</option>
                   { this.options() }
                </select>
              </div>

          </div>)
}

const MyFormContainer = (props) => {

      <div className="col-md-12">

        <div className="box1 col-md-6">
              <Button>
              </Button>
              <Button id="saveFile" onClick={saveFile}>Save Graph</Button>

                <form>
                  <Well>
                    <div className="col-md-12">
                      { this.renderTables() }
                    </div>
                    <div className="col-md-12">
                      { this.state.currentTable && this.renderSelects()} 
                    </div>
                    <div className="col-md-12">
                      { this.state.currentTable && this.renderWheres() }
                    </div>
                    <div className="col-md-12">
                      { this.state.currentTable && this.renderOrderBy() }
                    </div>
                  </Well>
                </form>
        </div>

        <div className="box1 col-md-6">

            <form>
              <Well>
                <div className="col-md-12">
                  <label>Chart Type</label>
                  <select name='choosenChart' onChange={this.handleChartChange.bind(this, 'choosenChart')} required>
                   {this.state.chartTypes.map((val,i) => <option value={val} key={i}>{val}</option>)}
                  </select>
                </div>

                <div className="col-md-12">
                  <label>Chart Title</label>
                  <input className="form-control" onChange={this.handleChartChange.bind(this, 'Title')} required/>
                </div>

                <div className="col-md-12">
                  <label>Height</label>
                  <input className="form-control" onChange={this.handleChartChange.bind(this, 'height')} required/>
                </div>

                <div className="col-md-12">
                  <label>Width</label>
                  <input className="form-control" onChange={this.handleChartChange.bind(this, 'width')} required/>
                </div>
                {  this.state.choosenChart === 'Pie' && this.pieOptions() } 
                {  this.state.choosenChart !== 'Pie' && this.state.choosenChart !== 'Table' && this.chartOptions() }
              <div className="col-md-12">
                    <Button 
                      type="submit" 
                      className="btn btn-success" onClick={this.makeGraph}>
                      Make my graph
                    </Button>
              </div>
            </Well>

            </form>
          </div>
        {
          this.props.createdGraphs &&
          this.props.createdGraphs
          .filter(graphInfo => {
            return !(this.props.currentTable)
                    ? graphInfo.database == DBName
                    : (graphInfo.database == DBName && graphInfo.table == this.state.currentTable)
          })
          .map((graphInfo, index) => <div key={index}>{newGraphMaker(graphInfo.settings)}</div>)
        }

      </div>
}

export default MyFormContainer
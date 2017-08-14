import React, {Component} from 'react'
import {Accordion, Panel} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class Home extends Component {
  render() {

  		const tables = ['table1', 'table2', 'table3', 'table4', 'table5']

    return (
      <div>
        <div>
          <h4>Welcome!</h4>
        </div>

        <div>
          <h5>Your databases:::</h5>
        </div>

        <div>
        	<Accordion>
			    <Panel header="Database 1" eventKey="1">
			    {
			    	tables.map((table, index) => {
			    		return (
			    			<div key={index}>
			    				<Link to="/table1"> {table} </Link>
			    			</div>
			    		)
			    	})
			    }
			    </Panel>
			    <Panel header="Database 2" eventKey="2">
			    	link to tables will appear here.. 
			    </Panel>
			    <Panel header="Database 3" eventKey="3">
			    	link to tables will appear here ... 
			    </Panel>
  			</Accordion>
        </div>
      </div>
    )
  }
}


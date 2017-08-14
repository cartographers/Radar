import React, {Component} from 'react'
import {Accordion, Panel} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class Home extends Component {
  render() {

    const tables = ['table1', 'table2', 'table3', 'table4', 'table5']
    const databases = ['Database 1', 'Database 2', 'Database 3', 'Database 4', 'Database 5']

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
            {
              databases.map((database, index) => {
                return (
                  <Panel header={database} eventKey={index}>
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
                )
              })
            }
          </Accordion>
        </div>
      </div>
    )
  }
}


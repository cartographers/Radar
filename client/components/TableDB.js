import React from 'react'
import {Table, thead, tr, th, tbody, td} from 'react-bootstrap'


const TableDB = (props)  => {
    const { savedQuery } = props
    const fields = savedQuery && savedQuery[0] ? Object.keys(savedQuery[0]) : []
    return (
      <div>
        <div>
          <h4>Table</h4>
        </div>
        <div>
          <Table>
            <thead>
            <tr>
              {
                fields.map((field, index) => {
                  return (
                    <th key={index}>
                      {field}
                    </th>
                  )
                })
            }
            </tr>
            </thead>
            <tbody>
              {
                savedQuery.map((row, index) => {
                  const values = Object.values(row)
                  return (
                    <tr key={index}>
                        { values.map( (val, index) => <td key={index}>{val && val.toString() }</td>)}
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
      </div>
    )
}


export default TableDB

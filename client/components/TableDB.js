import React from 'react'
import {Table, thead, tr, th, tbody, td} from 'react-bootstrap'

const TableDB = (props)  => {
    const { savedQuery, aggregateInformation, title, width, height } = props
    if(!savedQuery) return <div>No matching Query</div>
    const fields = savedQuery && savedQuery[0] ? Object.keys(savedQuery[0]) : []
    return (
      <div>
          <h5 className="form-labels"><strong> {title} </strong></h5>
          <Table condensed>
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
          { aggregateInformation && <TableDB Title={title + ' aggregate Info'} savedQuery={aggregateInformation} />}
          </div>
    )
}

export default TableDB

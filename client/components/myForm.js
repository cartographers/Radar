import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../store'

//this form is assuming that the table we're currently rendering is the Users table

class myForm extends React.Component {

  constructor() {
    super()
    this.state = {
      selectThese: [{
        col: 'Choose One'
      }],
      whereThese: [],
      orderedBy: 'None'
    }
    addSelect = () => ({
    })

    updateSelect = (index) => ({
    })
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }


  render () {
    const { table, columns } = this.props;
    return (
      <div>
        <h2>Query Selection Form</h2>
        <form>
          <div className="form-group">
            <label>Select</label>
            {
              this.state.selectThese.map((val, index) => ({
                return  <select className="form-control" name="testSelect">
                          {columns.map((opt) => <option value={opt}>{opt}</option>)}
                        </select>
              }))
            }
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={this.addSelect}>+</button>
            </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return ({
    table: state.users,
    columns: (state.users ? Object.keys(state.users[0]) : undefinded)
  })
}

const mapDispatch = dispatch => {
  return ({
    fetchAllUsers () {
      dispatch(fetchUsers())
    }
  })
}

export default connect(mapState, mapDispatch)(myForm)

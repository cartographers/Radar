import React from 'react'
import { connect } from 'react-redux'
import {FormControl, ControlLabel, FormGroup, Button, Well} from 'react-bootstrap'
import {saveFile} from '../../utils/saveFile'
import {newGraphMaker} from '../../utils/graphUtility'

class CustomQuery extends React.Component {
	
}

const mapState = (state) => {
  return {
    currentDatabase: state.currentDatabase
  }
}

const mapDispatch = dispatch => {
  return {
  }
}

export default connect(mapState, mapDispatch)(CustomQuery)

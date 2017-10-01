import React from 'react'
import {newGraphMaker} from '../../../utils/graphUtility'
import {SelectQueryOptions, CustomSQLQuery} from "./FormComponents";

const FormContainer = (props) => {
    return (
        <div>
            <div className="col-md-12">

                {/*query form on the left*/}
                <div className="queryDiv">
                    <button onClick={props.showForm} className="queryButton btn-primary btn-xs">
                        Query Selection Form
                    </button>
                    {props.displayForm ? <SelectQueryOptions {...props} /> : null}
                </div>
                <div className="queryDiv">
                    <button onClick={props.showCustomForm} className="queryButton btn-primary btn-xs">
                        Advanced Query Form
                    </button>
                    {props.customDisplayForm ? <CustomSQLQuery {...props} /> : null}
                </div>
            </div>
            {/*saved graphs*/}
            <div className="col-md-12" style={{margin: 0, padding: 0}}>
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
                                <div key={index} className="col-md-4 box graphdiv" style={{width: 32 + '%'}}>
                                    <div onClick={props.handleChartDelete.bind(this, graphInfo)}
                                         className="glyphicon glyphicon-remove-sign"
                                         style={{float: 'left', color: '#E84A5F', margin: 0, padding: 0}}>
                                    </div>
                                    <div>
                                        {newGraphMaker(graphInfo.settings)}
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}


export default FormContainer

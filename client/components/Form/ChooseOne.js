import React from 'react'

const ChooseOne = (props) => {
    return (
        <select name={props.name} onChange={props.onChange} value={props.value}>
            <option> Make a choice </option>
            {
                props.iterable && props.iterable.map((val, i) => {
                    return (
                        <option
                            value={props.indxVal ? i : val}
                            key={i}>{val.charAt(0).toUpperCase() + val.slice(1)}
                        </option>)
                })
            }
        </select>)
}

export default ChooseOne

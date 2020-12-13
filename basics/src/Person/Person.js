import React from 'react'

const Person = (props) => {
    return (
        <div>
            <p>{ props.name } is { props.age } years old</p>
            <p>{ props.children }</p>
        </div>
    )
}

export default Person
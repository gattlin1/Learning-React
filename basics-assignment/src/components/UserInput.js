import React from 'react'

function UserInput(props) {
    const styles = {
        backgroundColor: 'green',
        border: '1px solid darkgreen',

    }
    return (
        <div>
            <input
                style={styles}
                type="text"
                onChange={ props.changeUserName }
                value={ props.username }
            />
        </div>
    )
}

export default UserInput

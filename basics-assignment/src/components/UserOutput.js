import React from 'react'
import './UserOutput.css'

function UserOutput(props) {
    return (
        <div className="UserOutput">
            <p>{ props.username }</p>
           <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae delectus aliquid adipisci accusamus amet similique error esse vel debitis officia non expedita neque corporis, quod exercitationem, fuga qui saepe magni.</p>
        </div>
    )
}

export default UserOutput

import React from 'react'

function Confirmation( props:any ) {
    const consultants = props.consultants;

    return(
        <div className="confirmation">

            { consultants.length > 0 ?
                <>
                    <h2>Thank you!</h2>
                    <p> Someone from Anthony & Sylvan will be in touch soon.</p>
                </>
               :
                <>
                    <h2>Sorry, we don't currently serve your area.</h2>
                    <p> We will keep your information on file and will reach out if we begin servicing your area in the future.</p>
                </>
            }
            
            <button className='refresh-form-btn' onClick={props.resetForm}>REFRESH</button>
        </div>
    )
}

export default Confirmation
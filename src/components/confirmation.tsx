import React from 'react'

function Confirmation(props:any) {
    const consultants = props.consultants;
    console.log(consultants);

    return(
        <div className="confirmation">

            { consultants.length > 0 ?
                <>
                    <h2>Success!</h2>
                    <p> Please select your preferred day and time for a consultation.</p>
                    <img src="/calendar.png" className='calendar' alt="calendar"/>
                </>
               :
                <>
                    <h2>UNAVAILABLE.</h2>
                    <p> Sorry your zip code is not in an available area..</p>
                </>
            }
            
        </div>
    )
}

export default Confirmation
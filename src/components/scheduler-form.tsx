import React, { useState } from 'react'
import { getAuthToken, getDummyData } from '../services/api-service'

function SchedulerForm() {
    const [inputField , setInputField] = useState({
        firstName: '',
        lastName: '',
        streetAddress: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        email: '',
        phone: '',
        interest: '',
        referral: '',
        message: '',
        newsletter: ''
    })

    function inputHandler( e: any ) {
        setInputField( { ...inputField, [e.target.name]: e.target.value } )
    }

    // API CALLS
    async function callAuthToken() {
        try {
            const result = await getAuthToken();
            console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function callAuthTokenFetch() {
        try {
            const response = await fetch("https://dev-anthonysylvan.creatio.com/ServiceModel/AuthService.svc/Login", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'access-control-allow-methods': '*',
                },
                body: JSON.stringify( {
                    UserName: "andrew.keller@chartis.io",
                    UserPassword: "Welc0Me$1"
                }),
            });
            const test = await response.json();
            console.log(test);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    async function callJsonPlaceholder() {
        try {
            // const result = await getAuthToken();
            const result = await getDummyData();
            console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleSubmit = ( e:any ) => {
        callAuthToken()
        console.log(inputField)
        e.preventDefault()
    }

    function handleJsonPlaceholder() {
        callJsonPlaceholder();
    }

    function handleFetchAPI() {
        callAuthTokenFetch();
    }

    return(
        <div className="as-form">
            <span className="required-note">All fields are required unless marked optional</span>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor='first-name'> First Name </label>
                    <input type="text" name="firstName" id="first-name" autoComplete='on' onChange={inputHandler} value={inputField.firstName}/>
                </div>

                <div className="input-group">
                    <label htmlFor='last-name'> Last Name </label>
                    <input type="text" name="lastName" id="last-name" onChange={inputHandler} value={inputField.lastName} />
                </div>

                <div className="input-group">
                    <label htmlFor='street-address'> Street Address </label>
                    <input type="text" name="streetAddress" id="street-address" autoComplete='on' onChange={inputHandler} value={inputField.streetAddress} />
                </div>

                <div className="input-group">
                    <label htmlFor='address-line-2'> Address Line 2 </label>
                    <input type="text" name="addressLine2" id="address-line-2" onChange={inputHandler} value={inputField.addressLine2}  />
                </div>

                <div className="input-group">
                    <label htmlFor='city'> City </label>
                    <input type="text" name="city" id="city" onChange={inputHandler} value={inputField.city} />
                </div>

                <div className="input-group size-short">
                    <label htmlFor='state'> State </label>
                    <input type="text" name="state"  id="state" onChange={inputHandler} value={inputField.state} />
                </div>

                <div className="input-group size-short">
                    <label htmlFor='zip-code'> Zip Code </label>
                    <input type="text" name="zipCode" id="zip-code" onChange={inputHandler} value={inputField.zipCode} />
                </div>

                <div className="input-group">
                    <label htmlFor='email'> Email </label>
                    <input type="email" name="email" id="email" autoComplete='on' onChange={inputHandler} value={inputField.email} />
                </div>

                <div className="input-group">
                    <label htmlFor='phone'> Phone Number </label>
                    <input name="phone" id="phone" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  autoComplete='on' onChange={inputHandler} value={inputField.phone} />
                </div>

                <div className="input-group">
                    <label> What are you interested in? </label>

                    <div className="check-option">
                        <input type="radio" name="interest" value="new-pool-spa" id="new-pool-spa" onChange={inputHandler} />
                        <label htmlFor='new-pool-spa'> Build a New Pool and/or Spa </label>
                    </div>
                    
                    <div className="check-option">
                        <input type="radio" name="interest" value="renovate-pool-spa" id="renovate-pool-spa" onChange={inputHandler} />
                        <label htmlFor='renovate-pool-spa'> Renovate an Existing Pool or Spa </label>
                    </div>

                    <div className="check-option">
                        <input type="radio" name="interest" value="backyard-offerings" id="backyard-offerings" onChange={inputHandler} />
                        <label htmlFor='backyard-offerings'> Backyard Offerings </label>
                    </div>
                </div>

                <div className="input-group">
                    <label> Where you referred by Anthony & Sylvan Customer? </label>

                    <div className="check-option">
                        <input type="radio" name="referral" value="yes" id="referral-yes" onChange={inputHandler} />
                        <label htmlFor='referral-yes'> Yes </label>
                    </div>
                    
                    <div className="check-option">
                        <input type="radio" name="referral" value="no" id="referral-no" onChange={inputHandler} />
                        <label htmlFor='referral-no'> No </label>
                    </div>
                </div>

                <div className="input-group size-full">
                    <label htmlFor='message'> Is there anything else we should know to best meet your needs? </label>
                    <textarea name="message" id="message" rows={10} onChange={inputHandler} value={inputField.message} />
                </div>

                <div className="input-group size-full">
                    <div className="check-option">
                        <input type="checkbox" name="newsletter" value="yes" id="newsletter" onChange={inputHandler} />
                        <label htmlFor='newsletter'> Yes, I would like to receive Anthony & Sylvan's newsletter, special offers and promotions. </label>
                    </div>
                </div>

                <input type="submit" value="Submit" />
            </form>
            <button onClick={handleFetchAPI}>FETCH API TEST</button>

            <button onClick={handleJsonPlaceholder}>JSON API TEST</button>
        </div>
    )
}

export default SchedulerForm
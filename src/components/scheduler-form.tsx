import React, { useState, useEffect } from 'react'
import Confirmation from './confirmation'
import Loader from './loader'
import { getAuthToken, getConsultants, insertLeads, verifyAddress } from '../services/api-service'
import { getSourceId } from '../utils/sourceHelpers'
import { sanitizeInput, handleNullText } from '../utils/generalHelpers'

function SchedulerForm( props:any ) {
    const [showLoader, setShowLoader] = useState(false);
    const [consultants, setConsultants] = useState();
    const [leadInfo , setLeadInfo] = useState({
        firstName: '',
        lastName: '',
        streetAddress: '',
        addressLine2: '',
        city: '', //GUID
        state: '', //GUID
        zipCode: '',
        email: '',
        phone: '',
        interest: '', //GUID
        referral: '',
        referrerName: '',
        message: '',
        newsletter: '',
        poolType: '', //GUID
        shortCode: '',
        leadMedium: '', //GUID
        leadSource: '', //GUID
        utmCampaign: '',
        utmMedium: '',
        utmSource: '',
        adSrc: ''
    });

    useEffect(() => {
        getSessionUtmInfo();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if ( showLoader === true) {
            const loader = document.querySelector('#loader');
            if (loader) {
                loader.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [showLoader]);

    // EVENT HANDLERS
    const inputHandler = ( e: any ) => {
        setLeadInfo( { ...leadInfo, [e.target.name]: e.target.value } )
    }

    const submitHandler = async ( e:any ) => {
        e.preventDefault();
        setShowLoader(true);

        // Sanitize Address
        sanitizeAddress();

        // Headers
        const headers = await getAuthHeaders();

        // Address Validation
        await validateAddress();

        // Consultants
        const consultants = await getConsultants( headers, leadInfo.zipCode );
        setConsultants( consultants );

        // Lead Model
        var leadModel = await buildLeadModel(headers);
        const res = await insertLeads( headers, leadModel );
        //TODO: Add result validation
        console.log(res);

        setShowLoader(false);
        props.liftFormSubmittedState(true);
    }

    // FUNCTIONS
    const buildLeadModel = async ( headers: any ) => {
        var model = {...leadInfo};

        if (model.referral === "yes") {
            model.message += `\r\n \r\nReferred By: ${leadInfo.referrerName}`;
        }

        // SET GUIDs

        // Address
        model.city = await getSourceId(headers, "City", model.city );
        model.state = await getSourceId(headers, "Region", model.state );

        // Interest and Pool Type
        if ( model.interest === "renovate-pool-spa" || model.interest === "backyard-offerings" ){
            model.interest = await getSourceId(headers, "LeadType", "Renovation");
            model.poolType = '8d7ac882-b141-456b-8ba9-d0c51cd5e1c2';
        } else if ( model.interest === "new-pool-spa" ) {
            model.interest = await getSourceId(headers, "LeadType", "New Pool");
            model.poolType = 'edec19b2-a695-4d9a-9e9e-b948cdd70cd1';
        } else {
            model.interest = '4eb933c2-d7bb-4711-8d57-3e59c2bcdc0f';
            model.poolType = 'edec19b2-a695-4d9a-9e9e-b948cdd70cd1';
        }

        // LeadSource and LeadMedium
        model.leadSource = model.leadSource !== '' ? await getSourceId(headers, "LeadSource", model.leadSource.replace("&amp","&") ) : '69eca55d-41cf-4879-a2c2-92615574cdbf';

        const medium = model.leadMedium !== '' ? model.leadMedium.replace("&amp","&") : 'Internet';
        model.leadMedium = await getSourceId(headers, "LeadMedium", medium);

        // Spam Check
        if (model.message.includes("http")) {
            model.interest = await getSourceId(headers, "LeadType", "Spam");
            model.poolType = '8d7ac882-b141-456b-8ba9-d0c51cd5e1c2';
        }

        return model;
    }

    const getAuthHeaders = async () => {
        const authToken = await getAuthToken();
        const authCookie = authToken['set-cookie'];
        let headerCookie = "";
        let headerBpmcsrf = "";

        if (authCookie) {
            headerCookie = authCookie.join('; ');
            const bpmcsrfCookie = authCookie.find((c: any) => c.startsWith('BPMCSRF='));
            if (bpmcsrfCookie) {
                headerBpmcsrf = bpmcsrfCookie.split(';')[0].replace('BPMCSRF=', '');
            }
        }

        return {
            cookies: headerCookie,
            bpmcsrf: headerBpmcsrf
        };
    }

    const getSessionUtmInfo = () => {
        leadInfo.utmCampaign = handleNullText(sessionStorage.getItem('utm_campaign'));
        leadInfo.utmMedium = handleNullText(sessionStorage.getItem('utm_medium'));
        leadInfo.utmSource = handleNullText(sessionStorage.getItem('utm_source'));
        leadInfo.adSrc = handleNullText(sessionStorage.getItem('adsrc'));
        leadInfo.leadMedium = handleNullText(sessionStorage.getItem('source'));
        leadInfo.leadSource = handleNullText(sessionStorage.getItem('source2'));
    }

    const validateAddress = async () => {
        const result = await verifyAddress( leadInfo );
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(result,"text/xml");

        if ( xmlDoc.getElementsByTagName("Error").length <= 0 ) {
            const avResponseXml = xmlDoc.getElementsByTagName("AddressValidateResponse")[0];
            const addressXml = avResponseXml.getElementsByTagName("Address")[0];

            if ( addressXml.getElementsByTagName("Address2").length > 0 ) {
                leadInfo.streetAddress = addressXml.getElementsByTagName("Address2")[0].innerHTML;
                leadInfo.addressLine2 = "";
            }

            leadInfo.state = addressXml.getElementsByTagName("State")[0].innerHTML;
            leadInfo.city = addressXml.getElementsByTagName("City")[0].innerHTML;
            leadInfo.zipCode = addressXml.getElementsByTagName("Zip5")[0].innerHTML;
        } else {
            leadInfo.message += `\r\n \r\nUSPS Validation Error: `;
            leadInfo.message += `\r\nAddress given was Address1: ${leadInfo.streetAddress} | Address2: ${leadInfo.addressLine2}`;

            leadInfo.streetAddress = "";
            leadInfo.addressLine2 = "";
        }
    }

    const sanitizeAddress = () => {
        leadInfo.streetAddress = sanitizeInput(leadInfo.streetAddress);
        leadInfo.addressLine2 = sanitizeInput(leadInfo.addressLine2);
        leadInfo.city = sanitizeInput(leadInfo.city);
        leadInfo.zipCode = sanitizeInput(leadInfo.zipCode);
    }

    const resetForm = () => {
        props.liftFormSubmittedState(false);
        setLeadInfo({...leadInfo,
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
            referrerName: '',
            message: '',
            newsletter: '',
            poolType: '',
            shortCode: '',
            leadMedium: handleNullText(sessionStorage.getItem('source')),
            leadSource: handleNullText(sessionStorage.getItem('source2'))
        });
    }

    return(
        <>
        {showLoader && <Loader />}
        
        {!props.formSubmitted && 
        <div className="as-form">
            <form onSubmit={submitHandler}>
                <div className="input-group">
                    <label htmlFor='first-name'> First Name* </label>
                    <input type="text" name="firstName" id="first-name" autoComplete='on' onChange={inputHandler} value={leadInfo.firstName} required/>
                </div>

                <div className="input-group">
                    <label htmlFor='last-name'> Last Name* </label>
                    <input type="text" name="lastName" id="last-name" onChange={inputHandler} value={leadInfo.lastName} required/>
                </div>

                <div className="input-group">
                    <label htmlFor='street-address'> Street Address* </label>
                    <input type="text" name="streetAddress" id="street-address" autoComplete='on' onChange={inputHandler} value={leadInfo.streetAddress} required/>
                </div>

                <div className="input-group">
                    <label htmlFor='address-line-2'> Address Line 2 </label>
                    <input type="text" name="addressLine2" id="address-line-2" onChange={inputHandler} value={leadInfo.addressLine2}  />
                </div>

                <div className="input-group">
                    <label htmlFor='city'> City* </label>
                    <input type="text" name="city" id="city" onChange={inputHandler} value={leadInfo.city} required/>
                </div>

                <div className="input-group size-short">
                    <label htmlFor='state'> State* </label>
                    <select name="state"  id="state" onChange={inputHandler} value={leadInfo.state} required>
                        <option value=""> Select State </option>
                        <option value="AL"> Alabama </option>
                        <option value="AK"> Alaska </option>
                        <option value="AZ"> Arizona </option>
                        <option value="AR"> Arkansas </option>
                        <option value="CA"> California </option>
                        <option value="CO"> Colorado </option>
                        <option value="CT"> Connecticut </option>
                        <option value="DE"> Delaware </option>
                        <option value="FL"> Florida </option>
                        <option value="GA"> Georgia </option>
                        <option value="HI"> Hawaii </option>
                        <option value="ID"> Idaho </option>
                        <option value="IL"> Illinois </option>
                        <option value="IN"> Indiana </option>
                        <option value="IA"> Iowa </option>
                        <option value="KS"> Kansas </option>
                        <option value="KY"> Kentucky </option>
                        <option value="LA"> Louisiana </option>
                        <option value="ME"> Maine </option>
                        <option value="MD"> Maryland </option>
                        <option value="MA"> Massachusetts </option>
                        <option value="MI"> Michigan </option>
                        <option value="MN"> Minnesota </option>
                        <option value="MS"> Mississippi </option>
                        <option value="MO"> Missouri </option>
                        <option value="MT"> Montana </option>
                        <option value="NE"> Nebraska </option>
                        <option value="NV"> Nevada </option>
                        <option value="NH"> New Hampshire </option>
                        <option value="NJ"> New Jersey </option>
                        <option value="NM"> New Mexico </option>
                        <option value="NY"> New York </option>
                        <option value="NC"> North Carolina </option>
                        <option value="ND"> North Dakota </option>
                        <option value="OH"> Ohio </option>
                        <option value="OK"> Oklahoma </option>
                        <option value="OR"> Oregon </option>
                        <option value="PA"> Pennsylvania </option>
                        <option value="RI"> Rhode Island </option>
                        <option value="SC"> South Carolina </option>
                        <option value="SD"> South Dakota </option>
                        <option value="TN"> Tennessee </option>
                        <option value="TX"> Texas </option>
                        <option value="UT"> Utah </option>
                        <option value="VT"> Vermont </option>
                        <option value="VA"> Virginia </option>
                        <option value="WA"> Washington </option>
                        <option value="WV"> West Virginia </option>
                        <option value="WI"> Wisconsin </option>
                        <option value="WY"> Wyoming </option>
                        <option value="DC"> District of Columbia </option>
                        <option value="AS"> American Samoa </option>
                        <option value="GU"> Guam </option>
                        <option value="MP"> Northern Mariana Islands </option>
                        <option value="PR"> Puerto Rico </option>
                        <option value="UM"> United States Minor Outlying Islands </option>
                        <option value="VI"> U.S. Virgin Islands </option>
                    </select>
                </div>

                <div className="input-group size-short">
                    <label htmlFor='zip-code'> Zip Code* </label>
                    <input type="text" name="zipCode" id="zip-code" onChange={inputHandler} value={leadInfo.zipCode} required/>
                </div>

                <div className="input-group size-half-block">
                    <label htmlFor='email'> Email* </label>
                    <input type="email" name="email" id="email" autoComplete='on' onChange={inputHandler} value={leadInfo.email} required/>
                </div>

                <div className="input-group size-half-block">
                    <label htmlFor='phone'> Phone Number* </label>
                    <input name="phone" id="phone" type="tel" placeholder="XXX-XXX-XXXX" autoComplete='on' onChange={inputHandler} value={leadInfo.phone} required/>
                </div>

                <div className="input-group size-half-block">
                    <label> What are you interested in?* </label>

                    <div className="check-option">
                        <label className="container">Build a New Pool and/or Spa
                            <input type="radio" name="interest" value="new-pool-spa" id="new-pool-spa" onChange={inputHandler} required/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    
                    <div className="check-option">
                        <label className="container">Renovate an Existing Pool or Spa
                            <input type="radio" name="interest" value="renovate-pool-spa" id="renovate-pool-spa" onChange={inputHandler} />
                            <span className="checkmark"></span>
                        </label>
                    </div>

                    <div className="check-option">
                        <label className="container">Backyard Offerings
                            <input type="radio" name="interest" value="backyard-offerings" id="backyard-offerings" onChange={inputHandler} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>

                <div className="input-group size-half-block">
                    <label> Where you referred by Anthony & Sylvan Customer?* </label>

                    <div className="check-option">
                        <label className="container">Yes
                            <input type="radio" name="referral" value="yes" id="referral-yes" onChange={inputHandler} required/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    
                    <div className="check-option">
                        <label className="container">No
                            <input type="radio" name="referral" value="no" id="referral-no" onChange={inputHandler} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>

                { 
                    leadInfo.referral === 'yes' &&
                    <div className="input-group size-half-block">
                        <label htmlFor='referrer-name'> If yes, enter customer name.* </label>
                        <input type="text" name="referrerName" id="referrer-name" onChange={inputHandler} value={leadInfo.referrerName} required/>
                    </div>
                }

                <div className="input-group size-full">
                    <label htmlFor='message'> Is there anything else we should know, to best meet your needs? </label>
                    <textarea name="message" id="message" rows={10} onChange={inputHandler} value={leadInfo.message} />
                </div>

                <div className="input-group size-full">
                    <div className="check-option">
                        <label className="container newsletter">Yes, I would like to receive Anthony & Sylvan's newsletter, special offers and promotions.
                            <input type="checkbox" name="newsletter" value="yes" id="newsletter" onChange={inputHandler} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>

                <div>
                    <div className="g-recaptcha" data-sitekey="6LdpA_kdAAAAAGEpTjhAxHefqWbzDtpHOyruXZdB"></div>
                    <input type="submit" value="SEND" className='form-submit'/>
                </div>
            </form>
        </div>
        }

        {props.formSubmitted && <Confirmation consultants={consultants} resetForm={resetForm} />}

        </>
    )
}

export default SchedulerForm


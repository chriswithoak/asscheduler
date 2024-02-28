import React from 'react'

const SchedulerForm = () => 
    <header className="as-form">
        <form>
            <div className="input-group">
                <label htmlFor='first-name'> First Name </label>
                <input type="text" name="first-name" id="first-name" autoComplete='on' />
            </div>

            <div className="input-group">
                <label htmlFor='last-name'> Last Name </label>
                <input type="text" name="last-name" id="last-name" />
            </div>

            <div className="input-group">
                <label htmlFor='street-address'> Street Address </label>
                <input type="text" name="street-address" id="street-address"  autoComplete='on'/>
            </div>

            <div className="input-group">
                <label htmlFor='address-line-2'> Address Line 2 </label>
                <input type="text" name="address-line-2" id="address-line-2" />
            </div>

            <div className="input-group">
                <label htmlFor='city'> City </label>
                <input type="text" name="city" id="city" />
            </div>

            <div className="input-group size-short">
                <label htmlFor='state'> State </label>
                <input type="text" name="state"  id="state" />
            </div>

            <div className="input-group size-short">
                <label htmlFor='zip-code'> Zip Code </label>
                <input type="text" name="zip-code" id="zip-code" />
            </div>

            <div className="input-group">
                <label htmlFor='email'> Email </label>
                <input type="email" name="email" id="email" autoComplete='on' />
            </div>

            <div className="input-group">
                <label htmlFor='phone'> Phone Number </label>
                <input name="phone" id="phone" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  autoComplete='on' />
            </div>

            <div className="input-group">
                <label> What are you interested in? </label>

                <div className="check-option">
                    <input type="radio" name="interest" value="new-pool-spa" id="new-pool-spa" />
                    <label htmlFor='new-pool-spa'> Build a New Pool and/or Spa </label>
                </div>
                
                <div className="check-option">
                    <input type="radio" name="interest" value="renovate-pool-spa" id="renovate-pool-spa"/>
                    <label htmlFor='renovate-pool-spa'> Renovate an Existing Pool or Spa </label>
                </div>

                <div className="check-option">
                    <input type="radio" name="interest" value="backyard-offerings" id="backyard-offerings" />
                    <label htmlFor='backyard-offerings'> Backyard Offerings </label>
                </div>
            </div>

            <div className="input-group">
                <label> Where you referred by Anthony & Sylvan Customer? </label>

                <div className="check-option">
                    <input type="radio" name="referral" value="referral-yes" id="referral-yes" />
                    <label htmlFor='referral-yes'> Yes </label>
                </div>
                
                <div className="check-option">
                    <input type="radio" name="referral" value="referral-no" id="referral-no" />
                    <label htmlFor='referral-no'> No </label>
                </div>
            </div>

            <div className="input-group">
                <label htmlFor='appointement-date'> Select Appointment Date </label>
                <input type="date" name="appointement-date" id="appointement-date" />
            </div>

            <div className="input-group">
                <label htmlFor='appointement-time'> Select Appointment Time </label>
                <input type="time" name="appointement-time" id="appointement-time" />
            </div>

            <div className="input-group size-full">
                <label htmlFor='message'> Is there anything else we should know to best meet your needs? </label>
                <textarea name="message" id="message" rows={10} />
            </div>

            <div className="input-group size-full">
                <div className="check-option">
                    <input type="checkbox" name="newsletter" value="newsletter-yes" id="newsletter" />
                    <label htmlFor='newsletter'> Yes, I would like to receive Anthony & Sylvan's newsletter, special offers and promotions. </label>
                </div>
            </div>

            
            <input type="submit" value="Submit" />
        </form>
    </header>

export default SchedulerForm

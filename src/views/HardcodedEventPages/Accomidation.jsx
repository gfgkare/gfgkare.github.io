import  { useState } from 'react';


const Accomidation = () => {
    // State to manage the visibility of the form
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [checkbox,  setCheckBox] = useState(false) 
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [noOFDays, setnoOfDays] = useState(null)
    const [noOfMembers, setnoOfMembers] = useState(null)
    const [checkindate, setCheckindate] = useState(null)
    const [checkintime, setCheckintime] = useState(null)
    const [checkoutdate, setCheckoutdate] = useState(null)
    const [checkouttime, setCheckouttime] = useState(null)

    // Handler for checkbox change event
    const handleCheckboxChange = (event) => {
        setIsFormVisible(true);
        setCheckBox(event.target.checked);
    };

    const convertTo12HourFormat = (time24) => {
        const [hours, minutes] = time24.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const adjustedHours = hours % 12 || 12;
        return `${adjustedHours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault
        // Implement form submission logic here
        alert('Form submitted!');
        console.log(noOFDays, noOfMembers, checkindate, convertTo12HourFormat(checkintime), checkoutdate, convertTo12HourFormat(checkouttime))
        setIsFormVisible(false);
        setCheckBox(true); 
        setFormSubmitted(true)
    };

    // Handler to close the form
    const handleClose = () => {
        setIsFormVisible(false);
        setCheckBox(false);
        setFormSubmitted(false);
    };

    return (
        <div className='accomidation-div'>
            <h1>Need Accomidation ?</h1>

            <label>
                <input
                    type="checkbox"
                    checked={isFormVisible}
                    onChange={handleCheckboxChange}
                />{' '}
                Click here to get Accomidation form
            </label>

            <label className="checkbox-btn">
            <input id="checkbox" type="checkbox" checked={isFormVisible}
                    onChange={handleCheckboxChange} />{" "} Click here to get Accomidation form
            <span className="checkmark"></span>
            </label>
            <div className='accomidation-checkbox'>
                <div className="container">
                <input type="checkbox" id="cbx2" style={{ display: 'none' }} onChange={handleCheckboxChange} checked={checkbox}/>
                <label htmlFor="cbx2" className="check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                </label>
            </div>
        <div>
        <h3 className='check-line'>{formSubmitted ? "Accomidation form Submitted" : "Check the circle to get Accomidation form."}</h3></div>
        </div>

            {isFormVisible && (
                <div id="formContainer" >
                    <form id="exampleForm">
                        {/* <label htmlFor="name">Number of days:</label><br /> */}
                        {/* <input type="Number" id="name" name="name" required /><br /><br /> */}
                        <div className='inputs1'>
                        <div className="input-group">
                            <input
                                required
                                type="number"
                                max={2}
                                name="number"
                                onChange={(e) => setnoOfDays(e.target.value)}
                                autoComplete="off"
                                className="input"
                            />
                            <label className="user-label">How many days</label>
                        </div>
                        <div className="input-group">
                            <input
                                required
                                type="number"
                                max={4}
                                name="number"
                                onChange={(e) => setnoOfMembers(e.target.value)}
                                autoComplete="off"
                                className="input"
                            />
                            <label className="user-label">How many members</label>
                        </div>
                        </div>
                        <h4>Checkin date and time :</h4>
                        <div className='inputs1'>
                            
                        <div className="input-group">
                            <input
                                required
                                type="date"
                                name="checkindate"
                                onChange={(e) => setCheckindate(e.target.value)}
                                autoComplete="off"
                                className="input"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                required
                                type="time"
                                name="checkintime"
                                autoComplete="off"
                                onChange={(e) => setCheckintime(e.target.value)}
                                className="input1"
                            />
                        </div>
                        </div>
                        <h4>Checkout date and time :</h4>
                        <div className='inputs1'>
                            
                        <div className="input-group">
                            <input 
                                type="date"
                                name="text"
                                onChange={(e) => setCheckoutdate(e.target.value)}
                                autoComplete="off"
                                className="input"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                required
                                type="time"
                                name="text"
                                onChange={(e) => setCheckouttime(e.target.value)}
                                autoComplete="off"
                                className="input1"
                            />
                        </div>
                        </div>


                        {/* <input type="email" id="email" name="email" required /><br /><br /> */}
                        <div className='accomidation-buttons'>
                            {/* <button type="button" onClick={handleSubmit} className='button1'>OK</button> */}
                            
                            {/* <button type="button" onClick={handleClose} className='button1'>Close</button> */}
                            <button className='button2' type='button' onClick={handleClose}>Cancel</button>
                            {/* <button className="button1" type='button' onClick={handleSubmit}> OK</button> */}
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};


export default Accomidation;

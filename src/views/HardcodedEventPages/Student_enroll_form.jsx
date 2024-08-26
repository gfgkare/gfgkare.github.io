import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import "../../Form.css"

import gfgKare from "../../assets/gfgkare_square_logo.jpg"


const Student_enroll_form = () => {
    const [registrationno, setRegistrationNo] = useState("");
    const [email, setEmail] = useState("");
    const [year, setYear] = useState("");
    const [department, setDepartment] = useState("");
    const [mobileno, setMobileNo] = useState("");
    const [domain, setDomain] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errmsg, setErrmsg] = useState("");
    const [fullname, setFullname] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState("");
    const [imageName,setimageName]=useState("")

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    
        if (file) {
            setimageName(file.name)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [checkboxes, setCheckboxes] = useState({
        agree1: false,
        agree2: false,
        agree3: false,
        agree4: false,
        agree5: false,
    });

    const [additionalCheckboxes, setAdditionalCheckboxes] = useState({
        ML: false,
        DSA: false,
        GATE: false
    });

    const [selectedCount, setSelectedCount] = useState(0);

    useEffect(() => {
        setFullname(`${firstName} ${secondName}`);
    }, [firstName, secondName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Log the form data to check values
        console.log({
            fullname,
            registrationno,
            email,
            year,
            department,
            mobileno,
            domain,
            photo,
            additionalPreferences: JSON.stringify(Object.keys(additionalCheckboxes).filter(key => additionalCheckboxes[key])),
            checkboxes,
        });
    
        // Check if all required fields are filled
        if (!fullname || !registrationno || !email || !year || !department || !mobileno || !domain) {
            alert("Please fill in all required fields.");
            return;
        }
    
        if (domain === "Technical" && selectedCount < 1) {
            alert("Please select at least 1 additional preference.");
            return;
        }
    
        if (domain === "Technical" && selectedCount > 2) {
            alert("You can select a maximum of 2 additional preferences.");
            return;
        }
        if (!photo) {
            alert("Please upload your profile image.");
            return;
        }
    
        const allChecked = Object.values(checkboxes).every(value => value);
        if (!allChecked) {
            alert("Please accept all terms and conditions before submitting.");
            return;
        }
    
        setLoading(true);
    
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("registrationno", registrationno);
        formData.append("email", email);
        formData.append("year", year);
        formData.append("department", department);
        formData.append("mobileno", mobileno);
        formData.append("domain", domain);
        formData.append("additionalPreferences", JSON.stringify(Object.keys(additionalCheckboxes).filter(key => additionalCheckboxes[key])));
        if (photo) {
            formData.append("photo", photo);
        }
    
        axios.post("http://localhost:3001/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            console.log(res.data);
            setLoading(false);
            setimageName("")
            setMessage("✔️ Your registration was successful!");
            resetForm();
        })
        .catch(error => {
            setLoading(false);
            if (error.response && error.response.data && error.response.data.message) {
                console.log("Error occurred:", error.response.data.message);
                setErrmsg(error.response.data.message);
            } else {
                console.log("Error occurred:", error.message);
                setErrmsg("❌ An unexpected error occurred. Please try again.");
            }
        });
    };
    
    

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckboxes(prev => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleAdditionalCheckboxChange = (e) => {
        const { name, checked } = e.target;

        if (domain === "Technical") {
            if (checked) {
                if (selectedCount >= 2) {
                    alert("You can select a maximum of 2 additional preferences.");
                    return;
                }
                setSelectedCount(prev => prev + 1);
            } else {
                setSelectedCount(prev => prev - 1);
            }
        }
        
        setAdditionalCheckboxes(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleDomainChange = (e) => {
        const { value } = e.target;
        setDomain(value);

        // Reset additional checkboxes and count when domain changes
        if (value !== "Technical") {
            setAdditionalCheckboxes({
                ML: false,
                DSA: false,
                GATE: false
            });
            setSelectedCount(0);
        }
    };

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setRegistrationNo("");
        setEmail("");
        setYear("");
        setDepartment("");
        setMobileNo("");
        setDomain("");
        setAdditionalCheckboxes({
            ML: false,
            DSA: false,
            GATE: false
        });
        setSelectedCount(0);
        setCheckboxes({
            agree1: false,
            agree2: false,
            agree3: false,
            agree4: false,
            agree5: false,
        });
        setPhoto(null); // Clear the photo
        setPhotoPreview(""); // Clear the photo preview
    };

    return (
        <>

        <nav>
            <div className="logoContainer">
                <img src={gfgKare} alt="" />
            </div>
        </nav>

        <div className="body-form">
            <div className="main-form">
                <div className="form">
                    <h1 className="font1">REGISTRATION FORM</h1>
                    <h3>Student Member Enrollment 24 - 25</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-div-flex">
                            <div className="form-1-1">
                                <label htmlFor="text">First Name :</label><br />
                                <input type="text" required placeholder="Enter your first name" className="input1-1" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                            </div>
                            <div className="form-1-2">
                                <label htmlFor="text">Last Name :</label><br />
                                <input type="text" required placeholder="Enter your last name" className="input1-1" onChange={(e) => setLastName(e.target.value)} value={secondName} />
                            </div>
                        </div>
                        <div className="form-1">
                            <label htmlFor="text">Registration Number :</label><br />
                            <input type="number" required placeholder="Enter your Registration number" className="input1" onChange={(e) => setRegistrationNo(e.target.value)} value={registrationno} />
                        </div>
                        <div className="form-1">
                            <label htmlFor="text">Your Email-Id :</label><br />
                            <input type="email" required placeholder="Enter your Email id" className="input1" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                        <div className="form-1">
                            <label htmlFor="radio">Year :</label><br />
                            <div className="checkbox-div">
                                <input type="radio" required name="radio1" value="II Year (2023-2027 Batch)" className="checkbox" onChange={(e) => setYear(e.target.value)} checked={year === "II Year (2023-2027 Batch)"} />
                                <label htmlFor="radio1">II Year (2023-2027 Batch)</label>
                            </div>
                            <div className="checkbox-div">
                                <input type="radio" required name="radio1" value="III Year (2022-2026 Batch)" className="checkbox" onChange={(e) => setYear(e.target.value)} checked={year === "III Year (2022-2026 Batch)"} />
                                <label htmlFor="radio1">III Year (2022-2026 Batch)</label>
                            </div>
                        </div>
                        <div className="form-1">
                            <label htmlFor="text">Your Department:</label><br />
                            <input type="text" required placeholder="Enter your Department" className="input1" onChange={(e) => setDepartment(e.target.value)} value={department} />
                        </div>
                        <div className="form-1">
                            <label htmlFor="number">Enter your Whatsapp No:</label><br />
                            <input type="number" required placeholder="Enter your Whatsapp No" className="input1" onChange={(e) => setMobileNo(e.target.value)} value={mobileno} />
                        </div>
                        <div className="form-2">
                            <label htmlFor="text">Which Domain you are interested in ?</label><br />
                            <input type="radio" required id="radio" name="radio" value="Technical" className="checkbox" onChange={handleDomainChange} checked={domain === "Technical"} />
                            <label htmlFor="radio">Technical</label><br />
                            <input type="radio" required id="radio" name="radio" value="Web Development" className="checkbox" onChange={handleDomainChange} checked={domain === "Web Development"} />
                            <label htmlFor="radio">Web Development</label><br />
                            <input type="radio" required id="radio" name="radio" value="Graphic Designing" className="checkbox" onChange={handleDomainChange} checked={domain === "Graphic Designing"} />
                            <label htmlFor="radio">Graphic Designing</label><br />
                            <input type="radio" required id="radio" name="radio" value="Social Media" className="checkbox" onChange={handleDomainChange} checked={domain === "Social Media"} />
                            <label htmlFor="radio">Social Media</label><br />
                            <input type="radio" required id="radio" name="radio" value="Article Writing & Report making" className="checkbox" onChange={handleDomainChange} checked={domain === "Article Writing & Report making"} />
                            <label htmlFor="radio">Article Writing & Report making</label><br />
                            <input type="radio" required id="radio" name="radio" value="Event Management" className="checkbox" onChange={handleDomainChange} checked={domain === "Event Management"} />
                            <label htmlFor="radio">Event Management</label><br />
                        </div>
                        {domain === "Technical" && (
                            <div className="form-1">
                                <label>Additional Preferences:</label><br />
                                <input type="checkbox" id="ML" name="ML" className="checkbox" checked={additionalCheckboxes.ML} onChange={handleAdditionalCheckboxChange} />
                                <label htmlFor="ML" className="custom-checkbox-label">ML</label><br />
                                <input type="checkbox" id="DSA" name="DSA" className="checkbox" checked={additionalCheckboxes.DSA} onChange={handleAdditionalCheckboxChange} />
                                <label htmlFor="DSA" className="custom-checkbox-label">DSA</label><br />
                                <input type="checkbox" id="GATE" name="GATE" className="checkbox" checked={additionalCheckboxes.GATE} onChange={handleAdditionalCheckboxChange} />
                                <label htmlFor="GATE" className="custom-checkbox-label">GATE</label><br />
                            </div>
                        )}
                        <div className="form-1">
                            <label htmlFor="photo">Upload your profile image (.jpg, .png):</label><br />
                            <div className="form-1-3">
                                
                            <input type="file"  id="photo" className="hide" name="photo" accept="image/*" onChange={handlePhotoChange} />
                            <center>
                            <div>
                            {photoPreview && <img src={photoPreview} alt="Photo Preview" style={{ width: "100px", height: "100px", marginTop: "10px" }} />}
                            <p className="line2">{imageName}</p>
                            
                            </div>
                            </center>
                            </div>
                        </div>
                        <div className="form-1">
                            <label>I understand that being an active member is essential for the growth of the student chapter.</label><br />
                            <input type="checkbox" id="agree1" name="agree1" className="checkbox" checked={checkboxes.agree1} onChange={handleCheckboxChange} />
                            <label htmlFor="agree1">I AGREE</label>
                        </div>
                        <div className="form-1">
                            <label>I commit to actively participate in the chapter's activities and contribute to its success.</label><br />
                            <input type="checkbox" id="agree2" name="agree2" className="checkbox" checked={checkboxes.agree2} onChange={handleCheckboxChange} />
                            <label htmlFor="agree2">I AGREE</label>
                        </div>
                        <div className="form-1">
                            <label>I commit to complete the tasks provided within the time period.</label><br />
                            <input type="checkbox" id="agree3" name="agree3" className="checkbox" checked={checkboxes.agree3} onChange={handleCheckboxChange} />
                            <label htmlFor="agree3">I AGREE</label>
                        </div>
                        <div className="form-1">
                            <label>I acknowledge that in case of any concerns or queries, I should reach out to the Chairperson or the other core team members.</label><br />
                            <input type="checkbox" id="agree4" name="agree4" className="checkbox" checked={checkboxes.agree4} onChange={handleCheckboxChange} />
                            <label htmlFor="agree4">I AGREE</label>
                        </div>
                        <div className="form-1">
                            <label>I agree not to disclose any information related to the chapter without core team permission.</label><br />
                            <input type="checkbox" id="agree5" name="agree5" className="checkbox" checked={checkboxes.agree5} onChange={handleCheckboxChange} />
                            <label htmlFor="agree5">I AGREE</label>
                        </div>
                        <div className="form-1">
                            {loading ? (
                                <center>
                                    <button className="button" type="submit">
                                        <span><Loader /></span> Registering...
                                    </button>
                                </center>
                            ) : (
                                <center>
                                    <button className="button" type="submit">Register</button>
                                </center>
                            )}
                        </div>
                        {message && <p className="message-text">{message}</p>}
                        {errmsg && <div className="message-text">{errmsg}</div>}
                    </form>
                </div>
            </div>
        </div>


        </>
        
    );
};
export default Student_enroll_form

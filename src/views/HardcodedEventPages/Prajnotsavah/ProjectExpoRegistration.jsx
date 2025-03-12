import { useState,useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Fade } from "react-awesome-reveal";
import axios from "@/scripts/axiosConfig";
import { useAuth } from "@/contexts/AuthContext";
import CLink from "@/components/CLink";
import { FiChevronLeft } from "react-icons/fi";
import {  IoClose } from "react-icons/io5";
import qrcode from "./qrcode.png"
import upiImage from "@/assets/upi.png"

import { useNavigate } from "react-router-dom"

import "@/styles/ProjectExpoRegistration.scss";

const UPI_ID = "gvsskvineeth-1@okicici"

export default function ProjectExpoRegistration() {
  const { currentUser, USER_PRESENT, signinwithpopup } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [confirmChecked, setConfirmChecked] = useState(false);
  const [confirmModalShown, setConfirmModalShown] = useState(false);
  const [teamMembers, setTeamMembers] = useState({});
  const [numberOfMembers, setNumberOfMembers] = useState(4);
  const [registrationStatus, setRegistrationStatus] = useState("not_registered");
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("")

  const [registrationDisabled, setRegistrationDisabled] = useState(false);
  const [accomodationDetails, setAccomodationDetails] = useState({});
  const [needAccomodation, setNeedAccomomdation] = useState(false);

  const form = useRef(null);

  // Add this new state for the QR code image URL

  const formatDate = (date) => {
    console.log(typeof date);
    return date;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const register = async (e) => {
      setRegistrationLoading(true);
      console.log(form.current.reportValidity());
      e.preventDefault();
      if (!USER_PRESENT()) {
          toast.error("You have to be logged in to complete registration.");
          setRegistrationLoading(false);
          return;
      }

      console.log("Form valid?");
      console.log(form.current.reportValidity());
      if (!form.current.reportValidity()) {
          setRegistrationLoading(false);
          return;
      }

      const upiValue = form.current.elements["upi_id"].value;

      if (upiValue == UPI_ID) {
        setConfirmModalShown(false);
        setRegistrationLoading(false);
        setRegistrationDisabled(false);
        form.current.elements["upi_id"].focus();
        toast.info("Please enter *YOUR* UPI ID");
        return;
      };

      const teamName = form.current.elements.teamName.value;
      const theme = form.current.elements.theme.value;
      const teamSize = form.current.elements.numberOfMembers.value;
      const team = {};
      for (let i = 1; i <= teamSize; i++) {
          team[`member${i}`] = {
              name: form.current.elements[`memberName${i}`].value,
              email: form.current.elements[`memberEmail${i}`].value,
              registerNo: form.current.elements[`memberRegisterNo${i}`].value,
              number: form.current.elements[`memberNumber${i}`].value,
              institution: form.current.elements[`memberInstitution${i}`].value,
              location: form.current.elements[`memberLocation${i}`].value,
          };
      }

      console.log(team);
      setTeamMembers(team);

    axios.post(
      "/email_valid_for_event", 
      { emails: [...Object.values(team).map((member) => member.email)], eventID: "project-expo",},
      { headers: { Authorization: await currentUser.getIdToken() } }
    )
    .then(async (res) => {
        console.log("%c All emails are valid.", "color: green");
        console.log(res.data.message);
        let accomodationDetails = {};

        if (form.current.elements["needAccomodation"].checked) {
            const noOfDays = form.current.elements["noOfDays"].value;
            const noOfMembers =
                form.current.elements["noOfMembers"].value;
            const checkInDate =
                form.current.elements["checkInDate"].value;
            const checkInTime =
                form.current.elements["checkInTime"].value;
            const checkOutDate =
                form.current.elements["checkOutDate"].value;
            const checkOutTime =
                form.current.elements["checkOutTime"].value;
            accomodationDetails = {
                noOfDays,
                noOfMembers,
                checkInDate,
                checkInTime,
                checkOutDate,
                checkOutTime,
            };
        }

        console.log({
            teamName,
            theme,
            teamSize,
            teamMembers: team,
            tnr_number: form.current.elements["tnr_number"].value,
            needAccomodation:
                form.current.elements["needAccomodation"].checked,
            accomodationDetails: accomodationDetails,
        });

        axios.post("/register_projectexpo", {
          email: currentUser.email,
          teamName,
          theme,
          teamSize,
          teamMembers: team,
          tnr_number: form.current.elements["tnr_number"].value,
          upi_id: form.current.elements["upi_id"].value,
          screenshot: imageUrl,
          needAccomodation:
              form.current.elements["needAccomodation"].checked,
          accomodationDetails: accomodationDetails,
          referrer: form.current.elements["referrerInput"].value
        }, { headers: { Authorization: await currentUser.getIdToken() } })
        .then((res) => {
          console.log("Stored information in Firebase.");
          setRegistrationLoading(false);
          console.log(res.data);
          toast.success("Registration successful! Please check your mail!");
          form.current.reset();
          setRegistrationStatus("registered");
          setConfirmModalShown(false);
          navigate("/events/prajnotsavah/success", { state: { cred: "from_regn_success" } });
        })
        .catch((err) => {
          console.error(err);
          toast.error( err.data.message || err.message );
        })
      })
      .catch((err) => {
          setRegistrationLoading(false);
          console.log(err);
          toast.error(
              err.response?.data?.message ||
                  err?.message ||
                  "Something went wrong while verifying the emails. Please try again."
          );
          return;
      });
  };

  useEffect(() => {
    if (confirmModalShown) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [confirmModalShown]);

  // Modify the register function to handle form submission
  const showConfirmationModal = (e) => {
    e.preventDefault();
    const teamSize = form.current.elements.numberOfMembers.value;
    const team = {};
    for (let i = 1; i <= teamSize; i++) {
        team[`member${i}`] = {
            name: form.current.elements[`memberName${i}`].value,
            email: form.current.elements[`memberEmail${i}`].value,
            registerNo: form.current.elements[`memberRegisterNo${i}`].value,
            number: form.current.elements[`memberNumber${i}`].value,
            institution: form.current.elements[`memberInstitution${i}`].value,
            location: form.current.elements[`memberLocation${i}`].value,
        };
    }
    setTeamMembers(team);
    
    setConfirmModalShown(true);
  };

  return (
    <>
      {confirmModalShown && (
        <div className="confirmModalBackground">
          <div className="confirmModal">
            <button className="close" onClick={() => setConfirmModalShown(false)}><IoClose size={"30px"} /></button>
            <div className="heading">Confirm Details</div>
            <div className="field">
              <div className="title color green">Team Name</div>
              <div className="value">{form.current?.elements.teamName?.value}</div>
            </div>
            <div className="field">
              <div className="title color green">Theme</div>
              <div className="value">{form.current?.elements.theme?.value}</div>
            </div>
            
            <div className="field">
              <div className="title color green">Number of members</div>
              <div className="value">{form.current?.elements.numberOfMembers?.value}</div>
            </div>
            <div className="title color green">Team Members</div>
            {Object.keys(teamMembers).map((memberKey, index) => (
              <div className="field" key={index}>
                <div className="title">{teamMembers[memberKey].name}</div>
                <div className="value">{teamMembers[memberKey].email}</div>
              </div>
            ))}
            <div className="accomodationDetailsConfirm">
              <div className="field">
                <div className="title color green">Need Accomodation</div>
                <div className="value">{form.current?.elements["needAccomodation"].checked ? "Yes" : "No"}</div>
              </div>
              {
                form.current?.elements["needAccomodation"].checked && (
                  <div className="field">
                    <div className="value">
                      Accomodation needed for {form.current?.elements["noOfMembers"].value} members for {form.current?.elements["noOfDays"].value} days from {formatDate(form.current?.elements["checkInDate"].value)} {form.current?.elements["checkInTime"].value} to {form.current?.elements["checkOutDate"].value} {form.current?.elements["checkOutTime"].value}.
                    </div>
                  </div>
                )
              }
            </div>
            <div className="field">
              <div className="title color green">Transaction ID</div>
              <div className="value">{form.current?.elements["tnr_number"].value}</div>
            </div>
            <div className="title ss">Kindly take a screenshot of this page and keep it safe for confirmation.</div>
            <input type="checkbox" id="detailsCorrectCheckbox" onClick={(e) => setConfirmChecked(e.target.checked)} />
            <label htmlFor="detailsCorrectCheckbox">
              The details are correct and I wish to go for the registration. I understand that modification of these details are not possible.
            </label>
            {confirmChecked && <Fade className="finalRegisterButton"><button disabled={ registrationDisabled || registrationLoading } onClick={register}>{ (registrationLoading) ? "Registering... Keep this tab open" : "Register!"}</button></Fade>}
          </div>
        </div>
      )}

      <nav className="projectExpoNav">
          <div className="back">
              <CLink to={location?.state?.from || "/events/project-expo"}>
                  <FiChevronLeft size={"25px"} />
              </CLink>
          </div>

          <div className="bigText projectExpoText">
              PRAJNOTSavaH
          </div>

          <div className="profile">
              {
                  (USER_PRESENT()) ? (
                      <CLink to={"/profile"}>
                          <img src={currentUser.photoURL} alt="" />
                      </CLink>
                  ) : (
                      <div onClick={() => signinwithpopup("google")}>Sign In</div>
                  )
              }
          </div>
      </nav>


      <div className="projectExpoRegistration">
        <div className="titleText">Registration</div>
        <div className="titleText">Registrations are closed!</div>
        <form className="registrationForm" ref={form} onSubmit={showConfirmationModal}>
          <div className="formGroup">
            <label htmlFor="teamName">Team Name:</label>
            <input required type="text" id="teamName" name="teamName" title="Please enter a team name" />
          </div>
          <div className="formGroup">
            <label htmlFor="theme">Theme:</label>
            <select defaultValue={"Healthcare"} id="theme" name="theme">
              <option value="Healthcare">Healthcare</option>
              <option value="FinTech">FinTech</option>
              <option value="AgroTech">AgroTech</option>
              <option value="Fitness and Sports">Fitness and Sports</option>
              <option value="BlockChain">BlockChain</option>
            </select>
          </div>
          <div className="formGroup">
            <label htmlFor="numberOfMembers">Number of Members:</label>
            <select 
              id="numberOfMembers" 
              name="numberOfMembers" 
              defaultValue={4} 
              onChange={(e) => setNumberOfMembers(e.target.value)}
              required
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          {[...Array(Number(numberOfMembers))].map((_, index) => (
            <div className={`formGroup memberDetails ${index === 0 && "zero"}`} key={index}>
              <label htmlFor={`memberName${index + 1}`}>Member {index + 1} Name:</label>
              <input required type="text" id={`memberName${index + 1}`} name={`memberName${index + 1}`} defaultValue={index === 0 ? currentUser?.displayName : ''} />
              <label htmlFor={`memberEmail${index + 1}`}>Member {index + 1} Email:</label>
              <input 
                required 
                type="email" 
                id={`memberEmail${index + 1}`} 
                name={`memberEmail${index + 1}`} 
                defaultValue={index === 0 ? currentUser?.email : ''} 
                title="Enter a valid email address"
              />
              <label htmlFor={`memberRegisterNo${index + 1}`}>Member {index + 1} College Register No:</label>
              <input required type="text" id={`memberRegisterNo${index + 1}`} name={`memberRegisterNo${index + 1}`} />
              <label htmlFor={`memberPhone${index + 1}`}>Member {index + 1} Whatsapp Number:</label>
              <input 
                type="tel" 
                id={`memberNumber${index + 1}`} 
                name={`memberNumber${index + 1}`} 
                // pattern={"/(7|8|9)\d{9}/"}
                // onBlur={(e) => console.log( "Mobile validation:", e.currentTarget.checkValidity()) }
                defaultValue={"+91"}
                title="Enter a valid 10 digit mobile number, or 13 digits including +91"
                minLength={10}
                maxLength={13}
                required 
              />
              <label htmlFor={`memberCollege${index + 1}`}>Member {index + 1} College:</label>
              <input 
                required 
                type="text" 
                id={`memberInstitution${index + 1}`} 
                name={`memberInstitution${index + 1}`} 
              />
              <label htmlFor={`memberLocation${index + 1}`}>Member {index + 1} Location:</label>
              <input required type="location" id={`memberLocation${index + 1}`} name={`memberLocation${index + 1}`} />
            </div>
          ))}

          <div className="referrer">
            <label htmlFor="referrerInput">Referrer ID (leave blank if unsure)</label>
            <input
              className="referrerInput" 
              name="referrerInput"
              type="text" 
              placeholder="Referrer ID" 
              defaultValue={
                new URLSearchParams(location.search).get("ref") 
                ? 
                (new URLSearchParams(location.search).get("ref") != "null") ? new URLSearchParams(location.search).get("ref") : "" 
                : ""
              } 
              disabled={!!(new URLSearchParams(location.search).get("ref") && new URLSearchParams(location.search).get("ref") != "null")} 
            />
          </div>

          <div className="accomodationDetails">
            <div className="accomodationCheckBoxContainer">

              <input 
                id="needAccomodationCheckbox"
                type="checkbox" 
                name="needAccomodation" 
                onChange={(e) => setNeedAccomomdation(e.target.checked)} 
                disabled={registrationDisabled}
              />
              <label htmlFor="needAccomodationCheckbox">
                Need accomodation for the event?
              </label>
            </div>

            {
              (needAccomodation) && (
                <>
                  <div className='inputs'>
                    <div className="textInputs">
                      <div className="inputGroup">
                          <label className="label">How many days</label>
                          <input
                              required
                              className="input"
                              type="number"
                              max={2}
                              name="noOfDays"
                              autoComplete="off"
                          />
                      </div>
                      <div className="inputGroup">
                        <label className="label">How many members</label>
                          <input
                              required
                              type="number"
                              max={4}
                              name="noOfMembers"
                              autoComplete="off"
                              className="input"
                          />
                      </div>
                    </div>
                  </div>
                  <h4>Checkin date and time :</h4>
                  <div className='dateAndTimeInput'>
                      
                  <div className="input-group">
                      <input
                          required
                          type="date"
                          name="checkInDate"
                          autoComplete="off"
                          className="input"
                      />
                  </div>
                  <div className="input-group">
                      <input
                          required
                          type="time"
                          name="checkInTime"
                          autoComplete="off"
                          className="input1"
                      />
                  </div>
                  </div>
                  <h4>Checkout date and time :</h4>
                  <div className='dateAndTimeInput'>
                      
                  <div className="input-group">
                      <input 
                          type="date"
                          name="checkOutDate"
                          autoComplete="off"
                          className="input"
                      />
                  </div>
                  <div className="input-group">
                      <input
                          required
                          type="time"
                          name="checkOutTime"
                          autoComplete="off"
                          className="input1"
                      />
                  </div>
                  </div>
                </>
              )
            }
          </div>
            
          <div className="upiPaymentSection">
            <div className="title">Payment Instructions</div>
            <p>Please scan the QR code below to make a payment of <strong> <span className="color green">500</span> </strong> using any UPI app.</p>
            <div className="upiQRContainer">
              <img src={qrcode} alt="UPI QR Code" className="upiQrCode" width="150" />
              <a className="upiPayButton" href={`upi://pay?pa=${UPI_ID}&pn=GFGKARE&cu=INR&am=500`}>PAY WITH ANY <img src={upiImage} alt="" /> APP</a>
            </div>
            {/* <img src={imageUrl} alt="" width="250" style={{display:"flex"}} /> */}
            <p>After payment, please enter the transaction ID below:</p>
            <div className="paymentVerificationInputs">
              <input
                type="text"
                id="tnr_number"
                name="tnr_number"
                // value={tnr_number: form.current.elements["tnr_number"].value}
                // onChange={(e) => settnr_number(e.target.value)}: form.current.elements["tnr_number"].value
                required
                placeholder="Enter 12 digit UTR Number / Transaction ID"
                minLength={12}
                maxLength={12}
                
                title="Enter a valid 12 digit UPI UTR Number / Transaction ID"
              />
              <input
                type="text"
                id="upi_id"
                name="upi_id"
                pattern="[\w\s\.\-\_]+@[\w]+"
                title="Enter YOUR valid UPI ID"
                placeholder="Enter YOUR UPI ID. ex: example@oksbi"
                required
              />

              <label className="screenshotLabel" htmlFor="screenshotInput">Upload Payment Screenshot</label>
              <img src={imageUrl} alt="" width="250" style={{display:"flex"}} />
              <input id="screenshotInput" required type="file" accept="image/*" onChange={(e) => {
                try {
                  console.log(e.target.files);
                  setRegistrationLoading(true);

                  if (e.target.files.length) {
                    if (e.target.files.length > 1) {
                      toast.error("You can only upload one image.");
                      return;
                    }
  
                    const file = e.target.files[0];
                    // setimageName(file.name)
  
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                        const response = await axios.post('https://api.cloudinary.com/v1_1/dvw9vd875/image/upload', {file:reader.result, upload_preset:"gfgcloud"});
                        console.log('File uploaded successfully:', response.data);
                        setImageUrl(response.data.url)
                        setRegistrationLoading(false);
                        // setPhotoPreview(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }
                catch (err) {
                  console.log("Error during Screenshot upload. Clearing SS field.");
                  toast.error(err.message);
                  setImageUrl("");
                  setRegistrationLoading(false);
                }
                
                // if (e.target.files.length) {
                //   setRegistrationLoading(true);
                //   const name=date.getTime()+"-"+"gfg-expo"+e.target.files[0].name.split(" ").join("")
                //   s3Client.send(new PutObjectCommand({Bucket:S3_BUCKET,Key:name,Body:e.target.files[0]}))
                //   .then((res)=>{
                //     console.log(res)
                //     setImageUrl(`https://gfg.s3.ap-south-1.amazonaws.com/${name}`);
                //     setRegistrationLoading(false);
                //   }).catch((err)=>{
                //     console.log(err);
                //     setRegistrationLoading(false);
                //     toast.error( "Error during S3 Image Upload: " + err?.message );
                //     setImageUrl("");
                //   })
                // }
                // else {
                //   setRegistrationLoading(false);
                //   console.log("clearing");
                //   setImageUrl("");
                // }
                
              }}/>
            </div>
          </div>

          <button
            disabled
          >
            Registrations Closed
          </button>
{/* 
          {!USER_PRESENT() ? 
           (
            <button
              type="button"
              disabled={registrationDisabled || registrationLoading}
              onClick={() => signinwithpopup("google")}
              className="signInButton"
            >
              Sign in to Register!
            </button>
          ) : (
            <button disabled={registrationLoading || registrationDisabled}>{ (registrationLoading) ? "Please wait..." : "Register" }</button>            
          )} */}

          <div className="cancellationFee">
            NOTE: Cancelling of registration will incur a cancellation fee set by the organiser.
          </div>
        </form>
      </div>
    </>
  );
}

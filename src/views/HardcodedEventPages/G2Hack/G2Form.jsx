import React, { useState } from 'react';
import { Check, Upload, CheckCircle2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./G2Form.css";
import upiImage from '@/assets/upi.png';

const UPI_ID = "gvsskvineeth-1@okicici"

const G2Form = () => {
  const [formData, setFormData] = useState({
    teamSize: '',
    members: [],
    upiId: '',
    transactionId: '',
    paymentScreenshot: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const departments = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const hostels = ['MH1', 'MH2', 'MH3', 'MH4', 'MH5', 'LH2', 'LH3', 'LH4'];

  const handleChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;

    if (dataset?.index !== undefined) {
      const index = parseInt(dataset.index, 10);
      const field = name.replace(`member_${index}_`, '');
      
      setFormData((prev) => {
        const updatedMembers = [...prev.members];
        if (!updatedMembers[index]) {
          updatedMembers[index] = {};
        }

        // Handle residence type change
        if (field === 'residenceType') {
          if (value === 'dayscholar') {
            // Reset hostel details when switching to day scholar
            updatedMembers[index] = {
              ...updatedMembers[index],
              residenceType: value,
              hostelDetails: {
                hostelName: '',
                roomNumber: '',
                floorWarden: '',
                wardenContact: ''
              }
            };
          } else {
            // Initialize hostel details when switching to hosteller
            updatedMembers[index] = {
              ...updatedMembers[index],
              residenceType: value,
              hostelDetails: updatedMembers[index].hostelDetails || {
                hostelName: '',
                roomNumber: '',
                floorWarden: '',
                wardenContact: ''
              }
            };
          }
        } else if (field.startsWith('hostelDetails.')) {
          // Handle hostel details fields
          const hostelField = field.split('.')[1];
          updatedMembers[index] = {
            ...updatedMembers[index],
            hostelDetails: {
              ...updatedMembers[index].hostelDetails,
              [hostelField]: value
            }
          };
        } else {
          // Handle other fields
          updatedMembers[index] = {
            ...updatedMembers[index],
            [field]: type === 'checkbox' ? checked : value,
          };
        }

        return {
          ...prev,
          members: updatedMembers,
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  console.log(formData)

  const handleTeamSizeChange = (e) => {
    const teamSize = e.target.value;
    const members = Array(parseInt(teamSize, 10)).fill(null).map(() => ({
      name: '',
      registerNumber: '',
      department: '',
      year: '',
      section: '',
      gender: '',
      residenceType: '',
      isFasting: false,
      isPhysicallyChallenged: false,
      hostelDetails: {
        hostelName: '',
        roomNumber: '',
        floorWarden: '',
        wardenContact: ''
      }
    }));
    
    setFormData((prev) => ({
      ...prev,
      teamSize,
      members,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        paymentScreenshot: file,
      }));
    }
  };

  const validateForm = () => {
    for (const member of formData.members) {
      if (!member.residenceType) {
        toast.error('Please select residence type for all members');
        return false;
      }

      if (member.residenceType === 'hosteller') {
        const { hostelName, roomNumber, floorWarden, wardenContact } = member.hostelDetails;
        if (!hostelName || !roomNumber || !floorWarden || !wardenContact) {
          toast.error('Please fill all hostel details for hostellers');
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowSuccessModal(true);
      toast.success('Registration completed successfully!');
      setFormData({
        teamSize: '',
        members: [],
        upiId: '',
        transactionId: '',
        paymentScreenshot: null
      });
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setFormData({
      teamSize: '',
      members: [],
      upiId: '',
      transactionId: '',
      paymentScreenshot: null
    });
  };

  return (
    <div className="g2form-body">
      <div className="header-section">
        <h1 className="g2hackfest">G2HackFest</h1>
        <p className="p-tag-2">Registration Form</p>
      </div>

      <div className="g2hack-form">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <div className="form-group">
                <label htmlFor="teamSize">Team Size <span>*</span></label>
                <select
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleTeamSizeChange}
                  required
                >
                  <option value="">Select Team Size</option>
                  <option value="3">3 Members</option>
                  <option value="4">4 Members</option>
                </select>
              </div>
            </div>
          </div>

          {formData.teamSize && Array.from({ length: parseInt(formData.teamSize, 10) }).map((_, index) => (
            <div key={index} className="team-member">
              <h3>Member {index + 1}</h3>
              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor={`member_${index}_name`}>Full Name <span>*</span></label>
                    <input
                      type="text"
                      id={`member_${index}_name`}
                      name={`member_${index}_name`}
                      value={formData.members[index]?.name || ''}
                      onChange={handleChange}
                      data-index={index}
                      required
                      placeholder="Enter member full name"
                    />
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor={`member_${index}_registerNumber`}>Register Number <span>*</span></label>
                    <input
                      type="text"
                      id={`member_${index}_registerNumber`}
                      name={`member_${index}_registerNumber`}
                      value={formData.members[index]?.registerNumber || ''}
                      onChange={handleChange}
                      data-index={index}
                      required
                      placeholder="Enter member register number"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor={`member_${index}_department`}>Department <span>*</span></label>
                    <select
                      id={`member_${index}_department`}
                      name={`member_${index}_department`}
                      value={formData.members[index]?.department || ''}
                      onChange={handleChange}
                      data-index={index}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor={`member_${index}_year`}>Year <span>*</span></label>
                    <select
                      id={`member_${index}_year`}
                      name={`member_${index}_year`}
                      value={formData.members[index]?.year || ''}
                      onChange={handleChange}
                      data-index={index}
                      required
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor={`member_${index}_section`}>Section <span>*</span></label>
                    <input
                      type="text"
                      id={`member_${index}_section`}
                      name={`member_${index}_section`}
                      value={formData.members[index]?.section || ''}
                      onChange={handleChange}
                      data-index={index}
                      required
                      placeholder="Enter member section"
                    />
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor={`member_${index}_gender`}>Gender <span>*</span></label>
                    <select
                      id={`member_${index}_gender`}
                      name={`member_${index}_gender`}
                      value={formData.members[index]?.gender || ''}
                      onChange={handleChange}
                      data-index={index}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <div className="form-group residence-type">
                    <label>Residence Type <span>*</span></label>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name={`member_${index}_residenceType`}
                          value="hosteller"
                          checked={formData.members[index]?.residenceType === 'hosteller'}
                          onChange={handleChange}
                          data-index={index}
                          required
                        />
                        Hosteller
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`member_${index}_residenceType`}
                          value="dayscholar"
                          checked={formData.members[index]?.residenceType === 'dayscholar'}
                          onChange={handleChange}
                          data-index={index}
                          required
                        />
                        Day Scholar
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group checkbox-group">
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name={`member_${index}_isFasting`}
                          checked={formData.members[index]?.isFasting || false}
                          onChange={handleChange}
                          data-index={index}
                        />
                        Fasting
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name={`member_${index}_isPhysicallyChallenged`}
                          checked={formData.members[index]?.isPhysicallyChallenged || false}
                          onChange={handleChange}
                          data-index={index}
                        />
                        Person with Disabilities?
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {formData.members[index]?.residenceType === 'hosteller' && (
                <div className="hostel-details">
                  <h4>Hostel Details</h4>
                  <div className="form-row">
                    <div className="form-col">
                      <div className="form-group">
                        <label htmlFor={`member_${index}_hostelName`}>Hostel <span>*</span></label>
                        <select
                          id={`member_${index}_hostelName`}
                          name={`member_${index}_hostelDetails.hostelName`}
                          value={formData.members[index]?.hostelDetails?.hostelName || ''}
                          onChange={handleChange}
                          data-index={index}
                          required={formData.members[index]?.residenceType === 'hosteller'}
                        >
                          <option value="">Select Hostel</option>
                          {hostels.map((hostel) => (
                            <option key={hostel} value={hostel}>{hostel}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-col">
                      <div className="form-group">
                        <label htmlFor={`member_${index}_roomNumber`}>Room Number <span>*</span></label>
                        <input
                          type="text"
                          id={`member_${index}_roomNumber`}
                          name={`member_${index}_hostelDetails.roomNumber`}
                          value={formData.members[index]?.hostelDetails?.roomNumber || ''}
                          onChange={handleChange}
                          data-index={index}
                          required={formData.members[index]?.residenceType === 'hosteller'}
                          placeholder="Enter room number"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-col">
                      <div className="form-group">
                        <label htmlFor={`member_${index}_floorWarden`}>Floor Warden Name <span>*</span></label>
                        <input
                          type="text"
                          id={`member_${index}_floorWarden`}
                          name={`member_${index}_hostelDetails.floorWarden`}
                          value={formData.members[index]?.hostelDetails?.floorWarden || ''}
                          onChange={handleChange}
                          data-index={index}
                          required={formData.members[index]?.residenceType === 'hosteller'}
                          placeholder="Enter floor warden name"
                        />
                      </div>
                    </div>
                    <div className="form-col">
                      <div className="form-group">
                        <label htmlFor={`member_${index}_wardenContact`}>Warden Contact Number <span>*</span></label>
                        <input
                          type="tel"
                          id={`member_${index}_wardenContact`}
                          name={`member_${index}_hostelDetails.wardenContact`}
                          value={formData.members[index]?.hostelDetails?.wardenContact || ''}
                          onChange={handleChange}
                          data-index={index}
                          required={formData.members[index]?.residenceType === 'hosteller'}
                          placeholder="Enter warden contact number"
                          pattern="[0-9]{10}"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="payment-section">
            <h2>Payment Details</h2>
            <div className="qr-code-container">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=example@upi&pn=G2HackFest"
                alt="Payment QR Code"
                className="qr-code"
              />
              <p>Scan QR code to pay</p>
              <center>
                <a className="upiPayButton" href={`upi://pay?pa=${UPI_ID}&pn=GFGKARE&cu=INR&am=500`}>
                  PAY WITH ANY <img src={upiImage} alt="" className='upiImage' /> APP
                </a>
              </center>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="upiId">UPI ID <span>*</span></label>
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    required
                    placeholder="Enter your UPI ID"
                  />
                </div>
              </div>
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="transactionId">Transaction ID / UTR Number <span>*</span></label>
                  <input
                    type="text"
                    id="transactionId"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    required
                    placeholder="Enter transaction ID"
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col-full">
                <div className="form-group">
                  <label>Payment Screenshot <span>*</span></label>
                  <div className="file-upload">
                    <label className="file-upload-btn" htmlFor="paymentScreenshot">
                      <Upload size={18} />
                      Choose File
                    </label>
                    <input
                      type="file"
                      id="paymentScreenshot"
                      name="paymentScreenshot"
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    <span className="file-name">
                      {formData.paymentScreenshot
                        ? formData.paymentScreenshot.name
                        : 'No file chosen'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-modal-content">
              <div className="success-icon">
                <CheckCircle2 size={64} />
              </div>
              <h2>Registration Successful!</h2>
              <p>Thank you for registering for G2HackFest!</p>
              <p>Please check your email for registration details and further instructions.</p>
              <button onClick={closeSuccessModal} className="success-modal-button">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default G2Form;
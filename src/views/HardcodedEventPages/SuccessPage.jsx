import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './SuccessPage.css';

const SuccessPage = ({ onClose }) => {

  const modalRef = useRef(null);
  useEffect(() => {
    // Trigger confetti animation on component mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    if (modalRef.current) {
      const modalElement = modalRef.current;
      const modalHeight = modalElement.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollY = (viewportHeight - modalHeight) / 2;

      window.scrollTo({
        top: Math.max(0, scrollY),
        behavior: 'smooth',
      });

      // Optionally, set focus to the modal or another element within it
      modalElement.focus();
    }
  }, []);

  return (
    <div ref={modalRef} className="success-container modal-overlay">
      <div className="modal-content">
        <svg className="success-svg" viewBox="0 0 120 120">
          <circle
            className="circle-path"
            cx="60"
            cy="60"
            r="50"
          ></circle>
        </svg>
        <div className="checkmark"></div>
        <div className="success-message">
          Registration Successful!
        </div>
        <div className="info-message">
          Thank you for enrolling in the GFG KARE Student Membership Program.
          <br />
          Please review your email for the WhatsApp group invitation and additional information regarding your selected domain.
        </div>
        <div>
          <center>
            <button onClick={onClose} className='close-btn'>Close</button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

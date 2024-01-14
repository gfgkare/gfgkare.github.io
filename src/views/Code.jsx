import { useState, useEffect, useRef } from 'react';

import "../styles/Code.scss";

const Code = () => {


    const handleRef = useRef(null);
    const [flexValue, setFlexValue] = useState(0.4);

    useEffect(() => {
        setTimeout(() => setFlexValue(0.4), 10);

        const handleResize = (event) => {
          if (handleRef.current) {
            const parentRect = handleRef.current.parentElement.getBoundingClientRect();
            const handleX = event.clientX - parentRect.left;
            const newFlexValue = handleX / parentRect.width;
            setFlexValue(newFlexValue);
          }
        };
    
        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleResize);
          document.removeEventListener('mouseup', handleMouseUp);
        };
    
        if (handleRef.current) {
          handleRef.current.addEventListener('mousedown', () => {
            document.addEventListener('mousemove', handleResize);
            document.addEventListener('mouseup', handleMouseUp);
          });
        }
    
        return () => {
          if (handleRef.current) {
            handleRef.current.removeEventListener('mousedown', () => {
              document.removeEventListener('mousemove', handleResize);
              document.removeEventListener('mouseup', handleMouseUp);
            });
          }
        };
      }, []);

    return (
        <div className="Code">
            <nav className="codeNav">
                <ul>
                    <li>
                        Back
                    </li>
                    {
                        [...Array(10)].map((e, i) => (
                            <li key={i}>
                                {i+1}
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <div className="codeContent" style={{ display: 'flex', height: '100%' }}>
                <div className="questionContainer" style={{ flex: flexValue, border: '1px solid black' }}>
                    {/* Content for the first div */}
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus molestiae ex harum voluptate dolores rem provident eos? Fugiat accusantium consequatur itaque aliquam cum, quis repellat nisi reprehenderit beatae. Aut, repellendus.
                </div>
                <div
                    className="resizeHandle"
                    ref={handleRef}
                >||</div>
                <div className="codeEditor" style={{ flex: 1 - flexValue, border: '1px solid black' }}>
                    {/* Content for the second div */}
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus molestiae ex harum voluptate dolores rem provident eos? Fugiat accusantium consequatur itaque aliquam cum, quis repellat nisi reprehenderit beatae. Aut, repellendus.
                </div>
                </div>
            

        </div>
    );
};

export default Code;

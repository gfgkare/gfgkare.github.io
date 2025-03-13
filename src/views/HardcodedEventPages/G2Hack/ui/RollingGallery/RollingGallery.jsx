import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";
import "./RollingGallery.css";

const IMGS = [
    {
        "url": "https://res.cloudinary.com/diwf54xkb/image/upload/c_fit,h_350,w_350/gfg1_ztlqpe.jpg",
        "title": "Image 1"
    },
    {
        "url": "https://res.cloudinary.com/diwf54xkb/image/upload/c_fit,h_350,w_350/gfg2_kujeff.jpg",
        "title": "Image 2"
    },
    {
        "url": "https://res.cloudinary.com/diwf54xkb/image/upload/c_fit,h_350,w_350/gfg3_zbmsfv.jpg",
        "title": "Image 3" 
    },
    {
        "url": "https://res.cloudinary.com/diwf54xkb/image/upload/c_fit,h_350,w_350/gdg2_jaeopu.jpg",
        "title": "Image 4"
    },
    {
        "url": "https://res.cloudinary.com/diwf54xkb/image/upload/c_fit,h_350,w_350/gdg1_sbnpzh.jpg",
        "title": "Image 5"
    },
    {
        "url": "https://res.cloudinary.com/diwf54xkb/image/upload/c_fit,h_350,w_350/gdg3_qdt1g4.jpg",
        "title": "Image 6"
    },
    {
      "url": "https://res.cloudinary.com/diwf54xkb/image/upload/c_fit,h_350,w_350/gfg3_zbmsfv.jpg",
      "title": "Image 3" 
    },
    {
        "url": "https://res.cloudinary.com/diwf54xkb/image/upload/c_fit,h_350,w_350/gdg2_jaeopu.jpg",
        "title": "Image 4"
    },
    // {
    //   "url": "https://res.cloudinary.com/diwf54xkb/image/upload/c_fit,h_350,w_350/gfg1_ztlqpe.jpg",
    //   "title": "Image 7"
    // },
];

const RollingGallery = ({ autoplay = false, pauseOnHover = false, images = [] }) => {
  images = IMGS;
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);

  const cylinderWidth = isScreenSizeSm ? 1100 : 3200;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5; // Increased width for items
  const dragFactor = 0.05;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef();

  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: "spring", stiffness: 60, damping: 20, mass: 0.1, ease: "easeOut" },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  // Autoplay effect with adjusted timing
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - (360 / faceCount),
          transition: { duration: 2, ease: "linear" },
        });
        rotation.set(rotation.get() - (360 / faceCount));
      }, 2000);

      return () => clearInterval(autoplayRef.current);
    }
  }, [autoplay, rotation, controls, faceCount]);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pause on hover with smooth transition
  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      clearInterval(autoplayRef.current);
      controls.stop(); // Stop the animation smoothly
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      controls.start({
        rotateY: rotation.get() - (360 / faceCount),
        transition: { duration: 2, ease: "linear" },
      });
      rotation.set(rotation.get() - (360 / faceCount));

      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - (360 / faceCount),
          transition: { duration: 2, ease: "linear" },
        });
        rotation.set(rotation.get() - (360 / faceCount));
      }, 2000);
    }
  };

  return (
    <div className="rolling-gallery-container">
      <div className="rolling-gallery-gradient rolling-gallery-gradient-left"></div>
      <div className="rolling-gallery-gradient rolling-gallery-gradient-right"></div>
      <div className="rolling-gallery-content">
        <motion.div
          drag="x"
          className="rolling-gallery-track"
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {images.map((imageObj, i) => (
            <div
              key={i}
              className="rolling-gallery-item"
              data-title={imageObj.title}
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
            >
              <img src={imageObj.url} alt="rolling-gallery" className="rolling-gallery-img" />
              {/* <div className="rolling-gallery-item-text">
                <span>GFG KARE</span>
                <span>Visit</span>
              </div> */}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;

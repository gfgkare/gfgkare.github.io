import { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import "../styles/Carousel.scss";

export default function Carousel({
    children: slides,
    autoSlide = false,
    autoSlideInterval = 3000,
}) {
    const [curr, setCurr] = useState(0);

    const prev = () =>
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    const next = () =>
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, []);

    return (
        <div className="Carousel">
            <div
                className="Cover"
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {slides}
            </div>
            <div className="ButtonContainer">
                <button onClick={prev}>
                    <FiArrowLeft size={40} />
                </button>
                <button onClick={next}>
                    <FiArrowRight size={40} />
                </button>
            </div>

            <div className="IndicatorContainer">
                <div className="Wrapper">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`Dot ${curr === i ? "active" : ""}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

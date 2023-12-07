import "../styles/Fade.scss";

import { useState, useEffect, useRef } from "react";

export default function Fade(props) {
    const [shown, setShown] = useState(false);

    const elem = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        setShown(true)
                    }, props.delay);

                    observer.unobserve(elem.current);
                }
            },
            { threshold: 0.85 }
        );

        observer.observe(elem.current);
    }, []);

    return (
        <div
            ref={elem}
            className={
                "elem " +
                (shown ? " visible " : "") +
                (props.className || "fadeAnim")
            }
            style={{ transitionDelay: props.delay || "0.5s" }}
        >
            {props.children}
        </div>
    );
}

import React, { useState, useRef, useEffect } from "react";
// import classnames from "classnames";
import { useIntersection } from "./intersectionObserver";
import "../styles/ImageRenderer.scss";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ImageRenderer = ({ url, fallbackImage, width, height, blurFill }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef();
    useIntersection(imgRef, () => {
        console.log("img in view");
        setIsInView(true);
    });

    const handleOnLoad = () => {
        setIsLoaded(true);
    };

	useEffect(() => {
	console.log(blurFill);
	}, []);


    return (
        <div
            className="image-container"
            ref={imgRef}
            style={{
                height: height,
                width: width,
            }}
        >
            {isInView && (
                <>
                    {/* <img
						className={"image thumb " + (!!isLoaded ? "hasLoaded" : "")}
						src={thumb}
					/> */}
                    <div
                        className={
                            "image thumb " + (!!isLoaded ? "hasLoaded" : "")
                        }
                    >
                        {" "}
                        <AiOutlineLoading3Quarters />{" "}
                    </div>

                    {isLoaded && blurFill ? (
                        <img
                            src={url}
                            className="imageFill"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackImage;
                            }}
                        ></img>
                    ) : (
                        <></>
                    )}

                    <img
                        className={"image " + (!!isLoaded ? "hasLoaded" : "") + (blurFill ? " zoom" : "")}
                        src={url}
                        onLoad={handleOnLoad}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackImage;
                        }}
                        alt="Member Image"
                    />
                </>
            )}
        </div>
    );
};

export default ImageRenderer;

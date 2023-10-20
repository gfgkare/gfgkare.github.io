import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useMisc } from "../contexts/MiscContext";
import ShapesBackground from "../components/ShapesBackground";

import "../styles/ChapterMember.scss";

import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { GoCopy } from "react-icons/go";
import { BsCheckLg } from "react-icons/bs";

import errored_image_fallback from "../assets/errored_image_fallback.png"
import ImageRenderer from "../components/ImageRenderer"


const about = [
    "This person is a passionate and driven individual, relentlessly pursuing their dreams. They exude confidence, intelligence, and empathy, inspiring others with their unwavering determination and kindness. A true beacon of light in this world.",
    "This person is a passionate, persistent, and confident individual with a brilliant intellect. Their pursuit of their dreams inspires others, while their kindness and empathy make them a true role model.",
    "This person is an unstoppable blend of ambition, tenacity, wit, and empathy. With dreams as their compass and kindness as their guide, they carve a unique path, leaving a trail of inspiration and hope wherever they go.",
    "This person is a rare blend of unyielding resolve, unshakable confidence, boundless intelligence, and a heart brimming with compassion. With an unstoppable pursuit of dreams, they ignite inspiration and leave an indelible mark on the world.",
    "This person is an extraordinary blend of relentless determination and boundless compassion. With unyielding confidence and sharp intelligence, they inspire others on their remarkable journey to achieve their dreams."
]

export default function ChapterMember(props) {

    const {setNavTitle, toTitleCase, getViewLinkFromDriveLink } = useMisc();

    const chapterMemberLinks = useRef();
    // const chapterMemberDiv = useRef();
    // const [memberDetails, setMemberDetails] = useState();


    const renderLinks = ( ) => {
        return (
            <>
            {/* Connect with me: */}
            { props.info.linkedin ? <Link to={props.info.linkedin} target="_blank" rel="noopener noreferrer" ><AiFillLinkedin className="linkIcon" size={"25px"} /></Link> : <></> }
            { props.info.github ? <Link to={props.info.github} target="_blank" rel="noopener noreferrer" ><AiFillGithub className="linkIcon" size={"25px"} /></Link> : <></> }
            {/* { linksObject ? <>Connect with me: </> : <></> } */}
            {/* { linksObject?.linkedin ? <Link to={linksObject.linkedin} target="_blank" rel="noopener noreferrer" ><AiFillLinkedin className="linkIcon" size={"25px"} /></Link> : <></>  } */}
            {/* { linksObject?.github ? <Link to={linksObject.github} target="_blank" rel="noopener noreferrer" ><AiFillGithub className="linkIcon" size={"25px"} /></Link> : <></>  } */}
            </>
        )
    }


    useEffect(() => {
        setNavTitle("")
        window.scrollTo(0, 0);
        // document.title = `${props.info.Name} - GeeksForGeeks KARE Student Chapter`

        getViewLinkFromDriveLink(props.info.imageLink)

        const teamLinkObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                chapterMemberLinks.current.classList.add("visible");
                teamLinkObserver.unobserve(chapterMemberLinks.current);
            }
        });

        teamLinkObserver.observe(chapterMemberLinks.current);
        const x = setTimeout(() => {
            document.querySelector(".chapterMember").classList.add("visible");
            clearTimeout(x);
        }, 50);

        return () => {
            teamLinkObserver.disconnect();
        };
    }, []);

    return (
        <>
            <ShapesBackground />

            <div className="chapterMember">
                <div className="imageWrapper shine">
                    {/* <img loading="lazy" src={ getViewLinkFromDriveLink(props.info.imageLink) } 
                    onError={(e) => {
                            e.target.onerror = null
                            e.target.src = errored_image_fallback
                        }
                    }
                    alt="Member Image" className="chapterMemberImage" /> */}
                    <ImageRenderer blurFill={false} url={getViewLinkFromDriveLink(props.info.imageLink)} fallbackImage={errored_image_fallback} width={'300px'} height={'400px'} />
                </div>


                <div className="chapterMemberDetails">
                    <div className="chapterMemberTopDetails">
                        <div className="sectionTitle chapterMemberName">
                            {toTitleCase(props.info.Name)}
                        </div>
                        <div className="chapterMemberRole">
                            {"Student Member - "}
                            <span className="yearAndDept">
                                {props.info.Year} / {props.info.Dept}
                            </span>
                        </div>
                        <div className="chapterMemberId">
                            Membership ID: {props.info["Membership ID"]} 
                            <div className="copyIdBtn" onClick={(e) => {
                                navigator.clipboard.writeText(props.info["Membership ID"]);
                                e.target.parentElement.classList.add("copied");
                                
                                setTimeout(() => {
                                e.target.parentElement.classList.remove("copied");  
                                }, 2000)
                            }}>
                                <GoCopy className="copy" />
                                <BsCheckLg className="check" />
                            </div>
                        </div>
                    </div>

                    <div className="chapterMemberAbout">
                        {
                            props.info.About || about[Math.floor(Math.random() * about.length)]
                        }
                    </div>
                    <div
                        className="chapterMemberLinks"
                        ref={chapterMemberLinks}
                    >
                        {   renderLinks()  }
                    </div>
                </div>
            </div>
        </>
    );
}

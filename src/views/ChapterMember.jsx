import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { AiFillLinkedin, AiFillGithub, AiFillYoutube } from "react-icons/ai";
import { BsGlobe, BsStackOverflow } from "react-icons/bs";

import "../styles/ChapterMember.scss";
import ShapesBackground from "../components/ShapesBackground";

// import chapterMembersInfo from "../data/chapterMembersInfo";
// import headShot from "../assets/headshot.jpg";
import headshot from "../assets/headshot_gen_neutral.png";
import { useMisc } from "../contexts/MiscContext";

const about = [
    "This person is a passionate and driven individual, relentlessly pursuing their dreams. They exude confidence, intelligence, and empathy, inspiring others with their unwavering determination and kindness. A true beacon of light in this world.",
    "This person is a passionate, persistent, and confident individual with a brilliant intellect. Their pursuit of their dreams inspires others, while their kindness and empathy make them a true role model.",
    "This person is an unstoppable blend of ambition, tenacity, wit, and empathy. With dreams as their compass and kindness as their guide, they carve a unique path, leaving a trail of inspiration and hope wherever they go.",
    "This person is a rare blend of unyielding resolve, unshakable confidence, boundless intelligence, and a heart brimming with compassion. With an unstoppable pursuit of dreams, they ignite inspiration and leave an indelible mark on the world.",
    "This person is an extraordinary blend of relentless determination and boundless compassion. With unyielding confidence and sharp intelligence, they inspire others on their remarkable journey to achieve their dreams."
]

export default function ChapterMember(props) {

    const {setNavTitle, toTitleCase} = useMisc();

    const chapterMemberLinks = useRef();
    // const chapterMemberDiv = useRef();
    const params = useParams();
    // const [memberDetails, setMemberDetails] = useState();


    useEffect(() => {
        setNavTitle("MEMBER DETAILS")
        // console.log(props);
        // setMemberName(params.memberId || "101");

        // setMemberDetails(chapterMembersInfo.get(params.memberId));

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
                <img className="chapterMemberImage" src={headshot} />

                <div className="chapterMemberDetails">
                    <div className="chapterMemberTopDetails">
                        <div className="sectionTitle chapterMemberName">
                            {toTitleCase(props.info.Name)}
                        </div>
                        <div className="chapterMemberRole">
                            {/* {props.info.role} - */}
                            {"Student Member - "}
                            {/* <span className="yearAndDept">{props.info.year} / {props.info.department}</span> */}
                            <span className="yearAndDept">
                                {props.info.Year} / {props.info.Dept}
                            </span>
                        </div>
                        <div className="chapterMemberId">
                            {/* Membership ID: {props.info.id} */}
                            Membership ID: {props.info["Membership ID"]}
                        </div>
                    </div>

                    <div className="chapterMemberAbout">
                        {
                            about[Math.floor(Math.random() * about.length)]
                        }
                    </div>
                    <div
                        className="chapterMemberLinks"
                        ref={chapterMemberLinks}
                    >
                        Connect with me:{" "}
                        <AiFillLinkedin className="linkIcon" size={"25px"} />
                        <AiFillGithub className="linkIcon" size={"25px"} />
                        {/* <BsGlobe className="linkIcon" size={"25px"} /> */}
                        {/* <BsStackOverflow className="linkIcon" size={"25px"} /> */}
                        {/* <AiFillYoutube className="linkIcon" size={"25px"} /> */}
                    </div>
                </div>
            </div>
        </>
    );
}

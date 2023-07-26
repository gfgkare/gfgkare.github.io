import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import vineethImg from "../assets/vineeth.jpg";

import { AiFillLinkedin, AiFillGithub, AiFillYoutube } from "react-icons/ai";
import { BsGlobe, BsStackOverflow } from "react-icons/bs";

import "../styles/TeamMember.scss";

export default function TeamMember(props) {
    // const [memberName, setMemberName] = useState();

    const teamMemberLinks = useRef();
    // const teamMemberDiv = useRef();
    // const params = useParams();

    useEffect(() => {
        // setMemberName(params.membername || "each team member");

        const teamLinkObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                teamMemberLinks.current.classList.add("visible");
                teamLinkObserver.unobserve(teamMemberLinks.current);
            }
        });

        teamLinkObserver.observe(teamMemberLinks.current);
        // const x = setTimeout(() => {
        //     document.querySelector(".teamMember").classList.add("visible");
        //     clearTimeout(x);
        // }, 50)


        return () => {
            teamLinkObserver.disconnect();
        };
    }, []);

    return (
        <div className="teamMember">
            <img className="teamMemberImage" src={props.info.image} />

            <div className="teamMemberDetails">
                <div className="sectionTitle teamMemberName">
                    {props.info.name}
                </div>
                <div className="teamMemberRole">{props.info.role}</div>
                <div className="teamMemberAbout">{props.info.about}</div>
                <div className="teamMemberLinks" ref={teamMemberLinks}>
                    <AiFillLinkedin className="linkIcon" size={"25px"} />
                    <AiFillGithub className="linkIcon" size={"25px"} />
                    <BsGlobe className="linkIcon" size={"25px"} />
                    <BsStackOverflow className="linkIcon" size={"25px"} />
                    <AiFillYoutube className="linkIcon" size={"25px"} />
                </div>
            </div>
        </div>
    );
}

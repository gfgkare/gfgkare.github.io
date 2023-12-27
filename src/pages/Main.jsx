import "../styles/Main.scss";
import '../styles/customToastStyle.scss';

import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

import gfgLogo from "../assets/GFG_KARE.svg";
import { useMisc } from "../contexts/MiscContext";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";

export default function Main() {
    const { currentUser, USER_PRESENT, signinwithpopup } = useAuth();
    const { theme, setTheme, navTitle } = useMisc();

    const [showNavBox, setShowNavBox] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            {/* <RandomBubbles /> */}
            <div className="navBar">
                <div className="navBarWrap">
                    <div className="logosContainer">
                        <img
                            className="navIcon"
                            src={gfgLogo}
                            alt="GFG logo"
                        />
                    </div>
                    <span className="centerText hideOnMobile">{navTitle}</span>

                    <div className="rightMenu">
                        {/* <div className="menuLink hideOnMobile">
                            <Link className="noStyle" to="/">
                                Home
                            </Link>
                        </div>
                        <div className="menuLink hideOnMobile">
                            <Link className="noStyle" to="/events">
                                Events
                            </Link>
                        </div> */}
                        <div className="menuLink hideOnMobile">
                            <Link className="noStyle" to="/events/algo2024">
                                Testing
                            </Link>
                        </div>
                         <div className="menuLink hideOnMobile">
                            <Link className="noStyle" to="/events/algo2024">
                                Algorithmist2024
                            </Link>
                        </div>
                        <div className="menuLink hideOnMobile">
                            <Link className="noStyle" to="/members">
                                Members
                            </Link>
                        </div>
                        {/*
                        <div className="menuLink hideOnMobile">
                            <Link className="noStyle" to="/contact">
                                Contact
                            </Link>
                        </div> */}
                        {
                            (USER_PRESENT()) ? 
                                <div onClick={() => navigate("/profile")} className="menuLink hideOnMobile account">
                                    <img src={currentUser.photoURL} referrerPolicy="no-referrer" alt="user's profile image" />
                                </div>
                            :
                                <button className="hideOnMobile" onClick={() => signinwithpopup("google") }>Sign In</button> 
                        }
                       

                        <div className="iconAndGrid showOnMobile">
                            <div
                                className="dropdown"
                                onBlur={() => console.log("lose ir")}
                            >
                                <RxHamburgerMenu
                                    size={"25px"}
                                    id="hamburger"
                                    onClick={() => {
                                        setShowNavBox(
                                            (showNavBox) => !showNavBox
                                        );
                                    }}
                                    onFocus={() => {
                                        console.log("focused");
                                    }}
                                    onBlur={() => {
                                        console.log("blurred");
                                    }}
                                />
                                <div
                                    className={`dropdown-content ${
                                        showNavBox ? "show" : ""
                                    }`}
                                >
                                    {/* <span>
                                        <Link to="/">Home</Link>
                                    </span>
                                    <span>
                                        <Link to="/events">Events</Link>
                                    </span> */}
                                    <span>
                                        <Link to="/members">Members</Link>
                                    </span>
                                    <span>
                                        <Link to="/events/algo2024">Algorithmist2024</Link>
                                    </span>
                                    {/* <span>Contact</span> */}
                                    {/* <span>
                                         <input
                                            type="checkbox"
                                            class="toggle"
                                            title="change color theme"
                                            onClick={() => {
                                                if (theme === "light") {
                                                    document.body.classList.remove("light");
                                                    document.body.classList.add("dark");
                                                    setTheme("dark");
                                                } else {
                                                    document.body.classList.remove("dark");
                                                    document.body.classList.add("light");
                                                    setTheme("light");
                                                }
                                            }}
                                        />
                                    </span> */}
                                    {
                                        (USER_PRESENT()) ? 
                                        <span className="accountField" onClick={() => navigate("/profile")} >Account</span>
                                        : 
                                        <span className="registerButton" onClick={() => signinwithpopup("google")}>Sign In</span> // signinwithpopup("google")
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer progressClassName="toastProgress" bodyClassName="toastBody" />

            <div className="out" >
                <Outlet />
            </div>
        </>
    );
}

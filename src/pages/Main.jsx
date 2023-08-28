import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Main.scss";
import { useMisc } from "../contexts/MiscContext";

// import ScrollContainer from "../components/ScrollContainer";

import gfgLogo from "../assets/GFG_KARE.svg";
// import kluLogo from "../assets/klu.png";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Main() {
    const { theme, setTheme, navTitle } = useMisc();

    const [showNavBox, setShowNavBox] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            <div className="navBar">
                <div className="navBarWrap">
                    <div className="logosContainer">
                        <img
                            className="navIcon"
                            src={gfgLogo}
                            alt="GFG logo"
                            onClick={() =>
                                navigate("/members")
                            }
                        />
                    </div>
                    <span className="centerText hideOnMobile">
                        {navTitle}
                    </span>

                    <div className="rightMenu">
                        <div className="menuLink hideOnMobile"><Link className="noStyle" to="/">Home</Link></div>
                        <div className="menuLink hideOnMobile"><Link className="noStyle" to="/events">Events</Link></div>
                        <div className="menuLink hideOnMobile"><Link className="noStyle" to="/members">Members</Link></div>
                        <div className="menuLink hideOnMobile"><Link className="noStyle" to="/contact">Contact</Link></div>

                        <div className="iconAndGrid showOnMobile">
                            <div className="dropdown" onBlur={() => console.log("lose ir")}>
                                <RxHamburgerMenu
                                    size={"25px"}
                                    id="hamburger"
                                    onClick={() => {
                                        setShowNavBox(
                                            (showNavBox) => !showNavBox
                                        );
                                    }}
                                    onFocus={() => {
                                        console.log("focused")
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
                                    <span><Link to="/">Home</Link></span>
                                    <span><Link to="/events">Events</Link></span>
                                    <span><Link to="/members">Members</Link></span>
                                    <span>Contact</span>
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
                                    <span className="registerButton">Join</span>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="out">
                <Outlet />
            </div>
        </>
    );
}

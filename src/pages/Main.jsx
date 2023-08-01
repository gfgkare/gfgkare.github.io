import { Outlet } from "react-router-dom";
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
            {/* <ScrollContainer> */}
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

                        {/* <img
                            className="navIcon"
                            src={kluLogo}
                            alt="KLU logo"
                            onClick={() => window.open("https://klu.ac.in")}
                        /> */}
                    </div>
                    <span className="centerText hideOnMobile">
                        {navTitle}
                    </span>

                    <div className="rightMenu">
                        {/* <div className="dropDown">
                            <button className="button">\/</button>
                            <div className="list">
                                <div className="item">Home</div>
                                <div className="item">Home</div>
                                <div className="item">Home</div>
                                <div className="item">Home</div>
                                <div className="item">Home</div>
                            </div>
                        </div> */}

                        <div className="iconAndGrid">
                            {/* <div className="comingSoon">Coming soon...</div> */}

                            <div class="dropdown">
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
                                    {/* <a href="#home">Home</a>
                                    <a href="#about">About</a>
                                    <a href="#contact">Contact</a> */}
                                    <span>Coming soon...</span>
                                    <span onClick={() => navigate("/events")}>Events</span>
                                    <span onClick={() => navigate("/members")}>Members</span>
                                    <span>Contact</span>
                                    <span className="registerButton">Join</span>

                                </div>
                            </div>
                        </div>
                        {/* <ul
								className={
									"nav no-search" + (currentUser === "none" || !currentUser ? "" : " signed-in")
								}
								ref={navUl}
							>
									<li className="nav-item">
										<div
											className="apps-icon"
											tabIndex={"0"}
											onBlur={() => setAppsDrawerOpen(false)}
										>
											<MdOutlineApps
												size={"30px"}
												onClick={() => setAppsDrawerOpen(!appsDrawerOpen)}
											/>
											<CSSTransition
												in={appsDrawerOpen}
												timeout={300}
												classNames="appsanim"
												unmountOnExit
											>
												<ul className={"apps-dropdown"}>
													<li>1</li>
													<li>2</li>
													<li>3</li>
													<li>4</li>
													<li>5</li>
												</ul>
											</CSSTransition>
										</div>
									</li>
                                </ul> */}

                        {/* <input
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
                        /> */}
                    </div>
                </div>
            </div>

            <div className="out">
                <Outlet />
            </div>
            {/* </ScrollContainer> */}
        </>
    );
}

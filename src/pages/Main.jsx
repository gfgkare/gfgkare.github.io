import { Outlet } from "react-router-dom";
import "../styles/Main.scss";
import { useMisc } from "../contexts/MiscContext";

import ScrollContainer from "../components/ScrollContainer";

import gfgLogo from "../assets/gfg.png";
import kluLogo from "../assets/klu.png";

export default function Main() {
    const { theme, setTheme } = useMisc();

    return (
        <>
            {/* <ScrollContainer> */}
                <div className="navBar">
                    <div className="logosContainer">
                        <img
                            className="navIcon"
                            src={gfgLogo}
                            alt="GFG logo"
                            onClick={() =>
                                window.open("https://www.geeksforgeeks.org")
                            }
                        />
                        <img
                            className="navIcon"
                            src={kluLogo}
                            alt="KLU logo"
                            onClick={() => window.open("https://klu.ac.in")}
                        />
                    </div>

                    <div className="rightMenu">
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

                        {/* <button onClick={() => {
                        if (theme === "light") {
                            document.body.classList.remove("light")
                            document.body.classList.add("dark")
                            setTheme("dark")
                        }
                        else {
                            document.body.classList.remove("dark")
                            document.body.classList.add("light")
                            setTheme("light")
                        }
                    }}>{theme}</button> */}
                    </div>
                </div>

                <div className="out">
                    <Outlet />
                </div>
            {/* </ScrollContainer> */}
        </>
    );
}

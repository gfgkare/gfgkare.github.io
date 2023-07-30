import { useState, createContext, useContext } from "react";

export const MiscContext = createContext()

export const useMisc = () => {
    return useContext(MiscContext)
}

export const MiscProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");
    const [navTitle, setNavTitle] = useState("GFG KARE STUDENT CHAPTER");
    const [aboutRevealed, setAboutRevealed] = useState(false);
    const [teamRevealed, setTeamRevealed] = useState(false);


    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    const value = {
        theme,
        setTheme,
        aboutRevealed,
        setAboutRevealed,
        teamRevealed,
        setTeamRevealed,
        navTitle,
        setNavTitle,
        toTitleCase
    }

    return <MiscContext.Provider value={value}>{children}</MiscContext.Provider>

}
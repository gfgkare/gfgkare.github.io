import { useState, createContext, useContext } from "react";

export const MiscContext = createContext()

export const useMisc = () => {
    return useContext(MiscContext)
}

export const MiscProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");
    const [aboutRevealed, setAboutRevealed] = useState(false);
    const [teamRevealed, setTeamRevealed] = useState(false);


    const value = {
        theme,
        setTheme,
        aboutRevealed,
        setAboutRevealed,
        teamRevealed,
        setTeamRevealed
    }

    return <MiscContext.Provider value={value}>{children}</MiscContext.Provider>

}
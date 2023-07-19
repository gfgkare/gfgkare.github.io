import { useState, createContext, useContext } from "react";

export const MiscContext = createContext()

export const useMisc = () => {
    return useContext(MiscContext)
}

export const MiscProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");

    const value = {
        theme,
        setTheme,
    }

    return <MiscContext.Provider value={value}>{children}</MiscContext.Provider>

}
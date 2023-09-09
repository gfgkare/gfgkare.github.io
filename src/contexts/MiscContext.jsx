import { useState, createContext, useContext } from "react";
import defaultPlaceholderImage from "../assets/headshot_gen_neutral.png";

export const MiscContext = createContext();

export const useMisc = () => {
    return useContext(MiscContext);
};

export const MiscProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");
    const [navTitle, setNavTitle] = useState("");
    const [aboutRevealed, setAboutRevealed] = useState(false);
    const [teamRevealed, setTeamRevealed] = useState(false);

    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    const getViewLinkFromDriveLink = (driveLink) => {
        console.log("drive: " + driveLink);
        if (typeof driveLink == 'undefined' || !driveLink ) return defaultPlaceholderImage;

        const regex = /https:\/\/drive\.google\.com\/open\?id=(.*)/;

        const match = driveLink.match(regex);

        if (match && match[1]) {
            console.log("Match found: " + `https://drive.google.com/uc?id=${match[1]}` )
            return (`https://drive.google.com/uc?id=${match[1]}`);

        } else {
            console.log("Match not found.")
            return defaultPlaceholderImage;
        }
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
        toTitleCase,
        getViewLinkFromDriveLink
    };

    return (
        <MiscContext.Provider value={value}>{children}</MiscContext.Provider>
    );
};

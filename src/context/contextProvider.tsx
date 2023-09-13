'use client';

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({})

export const ThemeContextProvider = ({ children }) => {
    const [chatTo, setChatTo] = useState();
   

    return (
        <ThemeContext.Provider value={{ chatTo, setChatTo }}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);

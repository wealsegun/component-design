import { useState } from "react";

export const useTheme = (startingTheme = "light") => {
    const [theme, setTheme] = useState(startingTheme);

    const validateTheme = () => {
        if (themeValue === "dark") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return {
        theme, setTheme: validateTheme
    }
}
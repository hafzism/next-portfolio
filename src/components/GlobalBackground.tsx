"use client";

import { useTheme } from "next-themes";
import NightSky from "@/components/NightSky";
import PullChainSwitch from "@/components/PullChainSwitch";
import { useEffect, useState } from "react";

const GlobalBackground = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";
    const toggleTheme = () => setTheme(isDark ? "light" : "dark");

    return (
        <>
            <NightSky isVisible={isDark} />
            <PullChainSwitch isDark={isDark} onToggle={toggleTheme} />
        </>
    );
};

export default GlobalBackground;

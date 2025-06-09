"use client";
import { useTheme } from "next-themes";
import { FunctionComponent } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

const ThemeToggler: FunctionComponent = () => {
    const { setTheme, theme } = useTheme();

    return (<>
        <div className="fixed bottom-4 right-4 z-[1000]">
            {/* Toggle for dark/light mode */}
            <Button
                variant="outline"
                size={"icon"}
                className="group size-9 dark:bg-neutral-900 bg-accent"
                onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
                {theme === "dark" ? (<Sun
                    size={16}
                    strokeWidth={2}
                />) : (<Moon
                    size={16}
                    strokeWidth={2}
                />)}

            </Button>
        </div>
    </>);
}

export default ThemeToggler;
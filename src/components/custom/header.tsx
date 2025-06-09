
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import ThemeToggler from "./themetoggler";

interface HeaderProps {
    className?: string
}

const Header: FunctionComponent<HeaderProps> = ({ className }) => {

    return (
        <header className={cn("flex items-center fixed py-3 w-full bottom-0 left-0 z-[999]", className)}>
            <div className="flex items-center w-fit py-2 rounded-xl px-8 bg-white text-black h-full mx-auto">
                <Image src={"/textlogo-alt.png"} alt="dyu logo" className="mr-8" width={64} height={64} />
                <nav className="flex text-sm font-medium">
                    <Link href={"/"} className="hover:bg-gray-200 py-2 px-3 rounded-xl">home</Link>
                    <Link href={"/#brands"} className="hover:bg-gray-200 py-2 px-3 rounded-xl">brands</Link>
                    <Link href={"/#solutions"} className="hover:bg-gray-200 py-2 px-3 rounded-xl">solutions</Link>
                    <Link href={"/#opensource"} className="hover:bg-gray-200 py-2 px-3 rounded-xl">open source</Link>
                    <Link href={"/contact"} className="hover:bg-gray-200 py-2 px-3 rounded-xl">contact</Link>
                </nav>
            </div>
            <ThemeToggler />
        </header>
    );
}

export default Header;
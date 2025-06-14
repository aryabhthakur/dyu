import Link from "next/link"
import { Button } from "../ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

export default function FooterSection() {
    const siteLinks = [
        {
            title: 'brands',
            href: '/#brands',
        },
        {
            title: 'solutions',
            href: '/#solutions',
        },
        {
            title: 'open source',
            href: '/#opensource',
        },
    ]
    const companyLinks = [{
        title: "company",
        href: "/company"
    }, {
        title: "careers",
        href: "/careers"
    }, {
        title: "mission",
        href: "/#mission"
    }, {
        title: "contact",
        href: "/contact"
    }]

    const legalLinks = [{
        title: "terms",
        href: "/terms"
    }, {
        title: "privacy",
        href: "/privacy"
    }]
    return (
        <footer className="min-h-96 relative z-10 dark:bg-neutral-900 bg-accent p-6">
            <section className='max-w-6xl mx-auto'>
                <div className="py-10 mx-auto grid grid-cols-1 md:grid-cols-7 gap-8 px-4">
                    <div className="md:col-span-2">
                        <Image src={"/textlogo.png"} alt="dyu logo" className="hidden dark:block" width={64} height={64} />
                        <Image src={"/textlogo-alt.png"} alt="dyu logo" className="dark:hidden" width={64} height={64} />
                        <div className="flex mt-10 items-center gap-2">
                            <Link href="https://www.linkedin.com/company/dyutechnologies" className="dark:bg-primary p-2 rounded-lg  bg-white dark:hover:bg-neutral-400 hover:bg-neutral-200 duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256">
                                    <path fill="#0a66c2" d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.91 39.91 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186zM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009s9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97zM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"></path>
                                </svg>
                            </Link>
                            <Link href="https://github.com/dyutechnologies" className="dark:bg-primary p-2 rounded-lg  bg-white dark:hover:bg-neutral-400 hover:bg-neutral-200 duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 250">
                                    <path fill="#161614" d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46c6.397 1.185 8.746-2.777 8.746-6.158c0-3.052-.12-13.135-.174-23.83c-35.61 7.742-43.124-15.103-43.124-15.103c-5.823-14.795-14.213-18.73-14.213-18.73c-11.613-7.944.876-7.78.876-7.78c12.853.902 19.621 13.19 19.621 13.19c11.417 19.568 29.945 13.911 37.249 10.64c1.149-8.272 4.466-13.92 8.127-17.116c-28.431-3.236-58.318-14.212-58.318-63.258c0-13.975 5-25.394 13.188-34.358c-1.329-3.224-5.71-16.242 1.24-33.874c0 0 10.749-3.44 35.21 13.121c10.21-2.836 21.16-4.258 32.038-4.307c10.878.049 21.837 1.47 32.066 4.307c24.431-16.56 35.165-13.12 35.165-13.12c6.967 17.63 2.584 30.65 1.255 33.873c8.207 8.964 13.173 20.383 13.173 34.358c0 49.163-29.944 59.988-58.447 63.157c4.591 3.972 8.682 11.762 8.682 23.704c0 17.126-.148 30.91-.148 35.126c0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002C256 57.307 198.691 0 128.001 0m-80.06 182.34c-.282.636-1.283.827-2.194.39c-.929-.417-1.45-1.284-1.15-1.922c.276-.655 1.279-.838 2.205-.399c.93.418 1.46 1.293 1.139 1.931m6.296 5.618c-.61.566-1.804.303-2.614-.591c-.837-.892-.994-2.086-.375-2.66c.63-.566 1.787-.301 2.626.591c.838.903 1 2.088.363 2.66m4.32 7.188c-.785.545-2.067.034-2.86-1.104c-.784-1.138-.784-2.503.017-3.05c.795-.547 2.058-.055 2.861 1.075c.782 1.157.782 2.522-.019 3.08m7.304 8.325c-.701.774-2.196.566-3.29-.49c-1.119-1.032-1.43-2.496-.726-3.27c.71-.776 2.213-.558 3.315.49c1.11 1.03 1.45 2.505.701 3.27m9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033c-1.448-.439-2.395-1.613-2.103-2.626c.301-1.01 1.747-1.484 3.207-1.028c1.446.436 2.396 1.602 2.095 2.622m10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95c-1.53.034-2.769-.82-2.786-1.86c0-1.065 1.202-1.932 2.733-1.958c1.522-.03 2.768.818 2.768 1.868m10.555-.405c.182 1.03-.875 2.088-2.387 2.37c-1.485.271-2.861-.365-3.05-1.386c-.184-1.056.893-2.114 2.376-2.387c1.514-.263 2.868.356 3.061 1.403"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <ul>
                        <li className="text-xl font-semibold mb-4">Menu</li>
                        {siteLinks.map((link) => (
                            <li key={link.title} className="mb-2">
                                <Link href={link.href} className="text-neutral-500 hover:text-neutral-400">{link.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <li className="text-xl font-semibold mb-4">Company</li>
                        {companyLinks.map((link) => (
                            <li key={link.title} className="mb-2">
                                <Link href={link.href} className="text-neutral-500 hover:text-neutral-400">{link.title}
                                    {link.title === "career" && <span className="ml-1 text-xs text-white bg-neutral-700 px-1 rounded">Were hiring!</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <li className="text-xl font-semibold mb-4">Legal</li>
                        {legalLinks.map((link) => (
                            <li key={link.title} className="mb-2">
                                <Link href={link.href} className="text-neutral-500 hover:text-neutral-400">{link.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className="md:col-span-2">
                        <p className="text-xl font-semibold mb-4">Never miss an update</p>
                        <p className="text-sm font-medium mb-6 text-neutral-500">
                            Subscribe for fresh tech related updates, things we be working on, job post and more
                        </p>
                        <form>
                            <input type="text" placeholder="Your Email address" className="border-b-2 w-full !outline-none border-primary py-3 text-sm" />
                            <Button className="mt-2">Subscribe <ChevronRight /></Button>
                        </form>
                    </div>
                </div>
                <div className="pt-16 pb-5 border-b-2 border-neutral-800">
                    <p className="text-center font-medium text-transparent md:text-[110px] bg-clip-text bg-gradient-to-b from-primary dark:from-white to-transparent">Ignite, Scale, Secure.</p>
                </div>
                <div className="py-5 flex items-center">
                    <p className="text-sm font-medium">
                        © {new Date().getFullYear()} DYU Technologies. All rights reserved.
                    </p>
                    <p className="text-sm font-medium ml-auto">
                        Based in India, serving globally.
                    </p>
                </div>
            </section>

        </footer>
    )
}

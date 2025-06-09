"use client"

import { FunctionComponent } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

import { useEffect, useState } from "react";

import { ArrowUpRight, ChevronLeft, ChevronRight, } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SolutionsProps {
    className?: string;
}

const Solutions: FunctionComponent<SolutionsProps> = ({ className }) => {

    const solutions = [{
        badge: "Waterhalt",
        name: "Web Access Firewall",
        video: "https://0gcenrijt5.ufs.sh/f/DahQSy6m8oQJJJMrXCbFYE71iW6zlw5vtAyIpPobfeH9hmMS",
        link: "//waterhalt.com/waf?ref=dyutechnologies.com",
        p: "An AI-driven firewall solution that intelligently blocks unwanted traffic, including DDoS attacks, bots, geo-targeted threats, and enforces rate limiting and other advanced security measures."
    }, {
        badge: "Waterhalt",
        name: "Smart Load Balancer",
        video: "https://0gcenrijt5.ufs.sh/f/DahQSy6m8oQJZydmjXixL4AK6YdBlDSQm10hrXkewFnEbWU2",
        p: "AI based load balancer solution to automate balancing traffic based on the content, type, location and more.",
        link: "//waterhalt.com/load-balancer?ref=dyutechnologies.com",
    }, {
        badge: "Unoversion",
        name: "NLP Search",
        video: "https://0gcenrijt5.ufs.sh/f/DahQSy6m8oQJhX61iBpSfA4XiEuwr9yvkO1eQlK2NGFpZ60m",
        p: "AI based federated search solution to deliver personalized NLP based search results for your customers or users.",
        link: "//unoversion.com/search?ref=dyutechnologies.com",
    }, {
        badge: "Unoversion",
        name: "Personalization",
        video: "https://0gcenrijt5.ufs.sh/f/DahQSy6m8oQJpHY8CdERA47EnchQsSFoCUyVgKNefaLqmYHZ",
        p: "AI based firewall solution",
        link: "//unoversion.com/recommendation?ref=dyutechnologies.com",
    }, {
        badge: "Unoversion",
        name: "Dynamic Catalog",
        video: "https://0gcenrijt5.ufs.sh/f/DahQSy6m8oQJGAbbXrD0aDv5eXdC4LYAFgjBEh9WbpTlKMwZ",
        p: "AI based firewall solution",
        link: "//unoversion.com/recommendation?ref=dyutechnologies.com",
    }]
    const [api, setApi] = useState<CarouselApi>()
    useEffect(() => {
        if (!api) {
            return
        }
    }, [api])
    return (<>
        <section id="solutions" className={cn("min-h-screen relative z-10 bg-accent dark:bg-neutral-800 px-12 py-40", className)}>
            <div className="dark:bg-neutral-900 bg-neutral-200 py-40 rounded-2xl">
                <div className="max-w-6xl mx-auto text-center">
                    <Badge className="text-sm mb-10" variant={"secondary"}>Powered by Skyrocketing Tech</Badge>
                    <h2 className="text-5xl font-medium">Solutions <span className="opacity-50"> That Ignite Your Potential</span>
                    </h2>
                    <h4 className="mt-4 max-w-96 mx-auto">Secure, Engage, and Scale with AI Mastery</h4>
                    <Carousel setApi={setApi} className="my-10">
                        <CarouselContent>
                            {solutions.map((t, i) => <CarouselItem className="basis-1/3 text-white" key={i}>
                                <div className="relative h-[520px] group/card ml-5 rounded-xl overflow-hidden">
                                    <div className="relative duration-300 h-full w-full flex flex-col z-20 p-10 bg-gradient-to-t from-black group-hover/card:backdrop-blur-2xl to-transparent">
                                        <Badge className="mb-5">{t.badge}</Badge>
                                        <div className="mt-auto text-left">
                                            <h3 className="text-lg font-medium">{t.name}</h3>
                                            <div className="h-0 group-hover/card:mt-2 group-hover/card:h-auto opacity-0 group-hover/card:opacity-100 invisible group-hover/card:visible duration-200 translate-y-20 group-hover/card:translate-y-0">
                                                <p className="text-sm leading-6 opacity-80">{t.p}</p>
                                                <Button variant={"secondary"} className="mt-5 group" asChild>
                                                    <Link href={t.link}>Learn more <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" /></Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <video
                                        className="w-full h-full absolute top-0 left-0 z-0 object-cover"
                                        autoPlay={true}
                                        muted={true}
                                        loop={true}
                                        preload={"auto"}
                                        playsInline
                                    >
                                        <source src={t.video} />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </CarouselItem>)}
                        </CarouselContent>
                    </Carousel>
                    <div className="flex gap-2 items-center justify-center">
                        <Button onClick={() => api?.scrollPrev()} size={'icon'} variant={"secondary"}><ChevronLeft size={14} /></Button>
                        <Button onClick={() => api?.scrollNext()} size={'icon'} variant={"secondary"}><ChevronRight size={14} /></Button>
                    </div>
                    <p className="mt-16 text-sm max-w-lg mx-auto">
                        Our AI platforms deliver robust solutions for most clients, offering security, personalization, and efficiency
                    </p>
                </div>
            </div>
        </section>
    </>);
}

export default Solutions;
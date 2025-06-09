import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon, Shield, Play, CreditCard, BriefcaseMedical, PenTool, Truck, MoveRight } from "lucide-react";
import { FunctionComponent } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IndustriesProps {
    className?: string;
}

const Industries: FunctionComponent<IndustriesProps> = ({ className }) => {
    const industries = [{
        name: "E-commerce",
        desc: " Our AI Recommendation Platform drives sales with hyper-personalized recommendations and dynamic content, while our Web Security Platform ensures safe transactions, boosting customer trust.",
        icon: ShoppingCartIcon,
        slug: "ecommerce",
    }, {
        name: "Cybersecurity",
        desc: "Our AI Web Security Platform delivers real-time threat detection and mitigation, empowering security teams to stay ahead with algorithmic precision.",
        icon: Shield,
        slug: "cybersecurity"
    }, {
        name: "Media and Entertainment",
        desc: "Our AI Recommendation Platform enhances user engagement with tailored content feeds and search, creating addictive experiences for audiences.",
        icon: Play,
        slug: "media-and-entertainment"
    }, {
        name: "Retail",
        desc: "Our AI Recommendation Platform boosts in-store and online sales with personalized offers, while our Web Security Platform ensures secure payment systems.",
        icon: CreditCard,
        slug: "retail"
    }, {
        name: "Healthcare",
        desc: "Our AI Web Security Platform safeguards patient data, while AI Platform automates administrative workflows, improving efficiency and care delivery.",
        icon: BriefcaseMedical,
        slug: "healthcare"
    }, {
        name: "Education",
        desc: "Our AI Recommendation Platform personalizes learning content, and AI Workflow platform gamifies educational workflows, enhancing student engagement and institutional efficiency.",
        icon: PenTool,
        slug: "education"
    }, {
        name: "Logistics",
        desc: "Our AI Workflow platform optimizes supply chain processes with AI-driven automation and quantum efficiency, while our Web Security Platform secures critical logistics data.",
        icon: Truck,
        slug: "logistics"
    }]
    return (<>
        <section id="industries" className={cn("min-h-screen relative z-10 dark:bg-neutral-800 bg-accent p-6", className)}>
            <div className="dark:bg-neutral-900 bg-white py-40 rounded-2xl">
                <div className="max-w-6xl mx-auto text-center">
                    <Badge className="text-sm mb-10" variant={"secondary"}>Industry Game-Changer</Badge>
                    <h2 className="text-5xl font-medium"><span className="opacity-50">Transforming</span> <span className="opacity-100">Industries</span> <span className="opacity-50">with AI</span>
                    </h2>
                    <h4 className="mt-4 max-w-96 mx-auto">Where Our Platforms Make a Difference</h4>
                    <div className="grid mt-16 md:grid-cols-3 gap-8">
                        {industries.map((t, i) => <Card
                            key={i}
                            className={`p-8 bg-accent border-0 dark:bg-neutral-800 flex flex-col h-96 shadow-none rounded-lg ${i == 0 && "col-span-2"
                                } ${i == 6 && "col-span-2"
                                }`}
                        >
                            <div className="flex items-center">
                                <t.icon size={44} strokeWidth={1} />
                            </div>
                            <div className="mt-5 text-start">
                                <h3 className="text-[20px] leading-8 dark:text-white font-medium">
                                    {t.name}
                                </h3>
                                <p className="text-base opacity-50 dark:text-white font-medium leading-6">
                                    {t.desc}
                                </p>
                            </div>
                            <div className="mt-auto mr-auto">
                                <Button
                                    variant={"outline"}
                                    className="bg-white p-5 group has-[>svg]:px-4 shadow-none rounded-full"
                                    asChild
                                >
                                    <Link href={`/industries/${t.slug}`} passHref>
                                        {t.name} Sector
                                        <MoveRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" />
                                    </Link>
                                </Button>
                            </div>
                        </Card>)}
                    </div>
                    <p className="mt-16 text-sm max-w-lg mx-auto">
                        Dyu Technologies’ AI platforms are revolutionizing a diverse range of industries with intelligent, scalable solutions.
                    </p>
                </div>
            </div>
        </section>
    </>);
}

export default Industries;
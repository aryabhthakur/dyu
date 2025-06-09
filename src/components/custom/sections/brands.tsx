import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";


interface BrandsProps {
    className?: string;
}

const Brands: FunctionComponent<BrandsProps> = ({ className }) => {
    const brands = [
        {
            name: "Unoversion",
            link: "https://unoversion.com",
            img: "/unoversion.png",
            p: "An AI platform to help you connect your customer better and provide them an exclusively personalized experience"
        },
        {
            name: "Kartikey AI",
            link: "https://kartikey.ai",
            img: "/KartikeyAI-IconLogo.png",
            p: "An AI platform to help you protect your digital services, and act as barrier between you and adversery"
        },
        {
            name: "Hyperwafer",
            link: "https://hyperwafer.com",
            img: "/hyperwafer.png",
            p: "An AI platform to help automate your workflow with Quantum Workflow Optimized assistants"
        }]

    return (<section id="brands" className={cn("min-h-screen relative z-10 py-40 dark:bg-neutral-900 rounded-4xl bg-accent", className)}>
        <div className="max-w-6xl mx-auto text-center">
            <Badge className="text-sm mb-10">Neural Powerhouses</Badge>
            <h2 className="text-6xl font-medium"><span className="opacity-50">Discover our</span> Brands</h2>
            <h4 className="mt-4 max-w-96 mx-auto">At Dyu Technologies, our innovative AI platforms are built to transform your operations</h4>
            <div className="grid grid-cols-3 gap-8 mt-16">
                {brands.map((t, i) => <div className="h-[480px] relative overflow-hidden group/card bg-white dark:bg-neutral-800 flex  rounded-lg" key={i}>
                    {t.img && <Image src={t.img} alt={t.name} width={64} height={64} className="m-auto" />}
                    <div className="group-hover/card:bottom-0 group-hover/card:opacity-100 duration-500 px-10 absolute -bottom-80 opacity-0 flex w-full items-center flex-col justify-center py-4">
                        <p className="mb-5 text-sm text-muted-foreground">{t.p}</p>
                        <Button asChild>
                            <Link href={t.link} target='_blank'>{t.name} <ArrowUpRight /></Link>
                        </Button>
                    </div>
                </div>)}
            </div>
        </div>
    </section>);
}

export default Brands;
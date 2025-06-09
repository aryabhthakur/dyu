import Brands from "@/components/custom/sections/brands";
import Industries from "@/components/custom/sections/industries";
import Solutions from "@/components/custom/sections/solutions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, MoveRight, } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | DYU Technologies",
  description: "Discover DYU Technologies, your partner in AI-driven solutions. Learn about our innovative AI platforms and how they can transform your business.",
  openGraph: {
    title: "DYU Technologies - Ignite, Secure, Scale with AI",
    description: "Discover DYU Technologies, your partner in AI-driven solutions. Learn about our innovative AI platforms and how they can transform your business.",
    url: "https://dyutechnologies.com",
    type: "website",
  },
}

export default function Home() {
  const opensourcetools = [{
    name: "CloudCLI",
    desc: "A powerful unified CLI tool for managing cloud resources such as compute, database, load balancer and more with ease, designed to streamline your cloud operations with over 25+ cloud providers.",
    slug: "cloudcli",
    logo: "/cloudcli.png",
    darklogo: "/cloudcli-alt.png",
    url: "https://cloudcli.xyz",
    github: "https://github.com/dyutechnologies/cloudcli"
  }, {
    name: "Snapsphere",
    desc: "A powerful snapshot management tool for managing snapshots across multiple cloud providers, designed to streamline your snapshot operations with over 25+ cloud providers.",
    slug: "snapsphere",
    logo: "/snapsphere.png",
    darklogo: "/snapsphere-alt.png",
    url: "https://snapsphere.xyz",
    github: "https://github.com/dyutechnologies/snapsphere"
  }, {
    name: "Stackgen",
    desc: "A powerful snapshot management tool for managing snapshots across multiple cloud providers, designed to streamline your snapshot operations with over 25+ cloud providers.",
    slug: "stackgen",
    logo: "/stackgen.png",
    darklogo: "/stackgen-alt.png",
    url: "https://stackgen.xyz",
    github: "https://github.com/dyutechnologies/stackgen"
  }]
  return (
    <>
      {/* Add JSON-LD schema for the homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "DYU Technologies Home",
            description: "Discover DYU Technologies, your partner in AI-driven solutions.",
            url: "https://dyutechnologies.com",
          }),
        }}
      />
      <Brands />
      <Solutions />
      <section id="mission" className="dark:bg-neutral-800 bg-accent relative z-10">
        <div className="max-w-6xl py-40 mx-auto text-center">
          <Badge className="mb-10 dark:bg-neutral-900">Visionary AI</Badge>
          <h1 className="text-5xl font-medium">
            <span className="opacity-50">Our Mission,</span> Your Future
          </h1>
          <h3 className="mt-5 text-2xl opacity-40 font-medium">
            Pioneering AI for a Smarter World
          </h3>
          <p className="mt-10 text-3xl font-medium leading-12">
            <span className="opacity-50">At</span> Dyu Technologies, <span className="opacity-50">we’re driven by a bold mission:</span> to ignite, secure, and scale the potential of every business through artificial intelligence. <span className="opacity-50">Our vision is a world where </span> AI empowers seamless, safe, and personalized digital experiences, transforming industries with intelligent automation and data-driven insights. <span className="opacity-50">We’re not just building platforms;</span> we’re crafting the future of technology, <span className="opacity-50">one algorithm at a time.</span> Join us in redefining what’s possible with AI that’s as innovative as it is impactful. Let’s shape a smarter tomorrow together!
          </p>
        </div>
      </section>
      <Industries />
      <section id="opensource" className="min-h-screen relative z-10 bg-accent dark:bg-neutral-800 p-6">
        <div className="py-40 rounded-2xl">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="text-sm mb-10 bg-white dark:bg-neutral-900" variant={"secondary"}>Community Catalysts</Badge>
            <h2 className="text-5xl font-medium">Empowering the AI Community</h2>
            <h4 className="mt-4 max-w-96 mx-auto">Our Open-Source Tools Fuel Innovation</h4>
            <div className="grid mt-16 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {opensourcetools.map((t, i) => <Card key={i} className={`${i == 2 && 'col-span-2'} shadow-none text-left p-8 border-0`}>
                {t.logo && <Image src={t.logo} width={64} height={64} alt={t.name} />}
                <h3 className="text-lg font-medium leading-0">{t.name}</h3>
                <p className="text-sm opacity-70">{t.desc}</p>
                <div className="mt-4 flex gap-2">
                  <Button size={'sm'} asChild>
                    <Link href={t.url} target="_blank">Visit <ArrowUpRight /></Link>
                  </Button>
                  <Button size={'sm'} asChild>
                    <Link href={t.github} target="_blank">GitHub <ArrowUpRight /></Link>
                  </Button>
                </div>
              </Card>)}
            </div>
            <p className="mt-16 text-sm max-w-lg mx-auto">
              Dyu Technologies is committed to advancing the AI ecosystem through open-source contributions that empower developers and businesses.
            </p>
          </div>
        </div>
      </section>
      <section id="cta" className="min-h-screen relative z-10 bg-gradient-to-b from-white to-accent dark:from-neutral-800 dark:to-neutral-900 p-6">
        <div className="py-40 rounded-2xl">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="text-sm mb-10 dark:bg-neutral-900"> Connect with AI</Badge>
            <h2 className="text-5xl font-medium">Ready to Ignite Your Future?</h2>
            <h4 className="mt-4 max-w-96 mx-auto">Let’s Talk About Your AI Journey</h4>
            <p className="mt-10 text-sm max-w-lg mx-auto">
              Whether you’re looking to enhance security, drive engagement, or scale operations, our team is here to help you harness the power of AI.
            </p>
            <Link href={"/contact"} className="flex items-center group rounded-full text-5xl mx-auto w-fit mt-28 dark:bg-white bg-accent-foreground text-white dark:text-accent py-8 px-12">Connect with Us <MoveRight className="ml-8 group-hover:translate-x-2 duration-300" size={56} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "About Us | DYU Technologies",
    description: "Learn more about DYU Technologies, our mission, and our vision for the future of AI.",
    openGraph: {
        title: "About Us | DYU Technologies",
        description: "Learn more about DYU Technologies, our mission, and our vision for the future of AI.",
        url: "https://dyutechnologies.com/company",
        type: "website",
    },
}

function CompanyPage() {
    return (<>
        {/* Add JSON-LD schema for the company page */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    name: "DYU Technologies Company",
                    description: "Learn more about DYU Technologies, our mission, and our vision for the future of AI.",
                    url: "https://dyutechnologies.com/company",
                }),
            }}
        />
        <section className="min-h-screen relative z-10 py-40 dark:bg-neutral-900 rounded-t-4xl bg-accent">
            <div className="max-w-6xl mx-auto text-center">
                <Badge className="text-sm mb-10">About Us</Badge>
                <h2 className="text-6xl font-medium">Company</h2>
                <h4 className="mt-4 max-w-96 mx-auto">At Dyu Technologies, our innovative AI platforms are built to transform your operations</h4>

            </div>
        </section>
    </>);
}

export default CompanyPage;


import { Contactform } from "@/components/custom/forms/contact";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | DYU Technologies",
    description: "Get in touch with DYU Technologies for inquiries, support, or to learn more about our AI solutions.",
    openGraph: {
        title: "Contact Us | DYU Technologies",
        description: "Get in touch with DYU Technologies for inquiries, support, or to learn more about our AI solutions.",
        url: "https://dyutechnologies.com/contact",
        type: "website",
    },
}

function ContactPage() {
    return (<>
        {/* Add JSON-LD schema for the contact page */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    name: "DYU Technologies Contact",
                    description: "Get in touch with DYU Technologies for inquiries, support, or to learn more about our AI solutions.",
                    url: "https://dyutechnologies.com/contact",
                }),
            }}
        />
        <section className="min-h-screen relative z-10 py-40 dark:bg-neutral-900 rounded-t-4xl bg-accent">
            <div className="max-w-lg mx-auto text-center">
                <Badge className="text-sm mb-10">Let&apos;s talk</Badge>
                <h2 className="text-6xl font-medium">Contact Us</h2>
                <h4 className="mt-4 max-w-96 mx-auto">At Dyu Technologies, our innovative AI platforms are built to transform your operations</h4>
                <div className="mt-16 text-left">
                    <Contactform />
                </div>
            </div>
        </section>
    </>);
}

export default ContactPage;

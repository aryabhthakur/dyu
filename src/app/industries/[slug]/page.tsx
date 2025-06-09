import { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
    const slugs = ["ecommerce", "cybersecurity", "retail", "healthcare", "media-and-entertainment"];
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const slug = (await params).slug;
    const industry = getIndustryData(slug); // Implement getIndustryData function to fetch industry data based on slug

    return {
        title: `${industry.name} | DYU Technologies`,
        description: industry.description,
        openGraph: {
            title: `${industry.name} | DYU Technologies`,
            description: industry.description,
            url: `https://dyutechnologies.com/industries/${slug}`,
            type: "website",
        },
    };
}

function getIndustryData(slug: string) {
    // This is a placeholder function. You should implement it to fetch or define industry data based on the slug.
    const industries = {
        ecommerce: { name: "E-commerce", description: "AI solutions for e-commerce businesses." },
        cybersecurity: { name: "Cybersecurity", description: "AI-driven cybersecurity solutions." },
        retail: { name: "Retail", description: "AI solutions for retail businesses." },
        healthcare: { name: "Healthcare", description: "AI solutions for healthcare." },
        "media-and-entertainment": { name: "Media and Entertainment", description: "AI solutions for media and entertainment." },
    };
    return industries[slug as keyof typeof industries] || { name: "Industry", description: "DYU Technologies' AI solutions for various industries." };
}

export default async function IndustryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const industry = getIndustryData(slug);

    return (
        <>
            {/* Add JSON-LD schema for the industry page */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: industry.name,
                        description: industry.description,
                        url: `https://dyutechnologies.com/industries/${slug}`,
                    }),
                }}
            />
            <div className="card">{industry.name}</div>
        </>
    );
}

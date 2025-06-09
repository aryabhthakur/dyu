import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/header";
import Footer from "@/components/custom/footer";
import { ThemeProvider } from "next-themes";
import { VideoText } from "@/components/magicui/video-text";
import { TextAnimate } from "@/components/magicui/text-animate";

const font = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dyutechnologies.com"),
  title: {
    default: "DYU Technologies - Ignite, Secure, Scale with AI",
    template: "%s | DYU Technologies"
  },
  description: "Discover DYU Technologies, your partner in AI-driven solutions. Learn about our innovative AI platforms and how they can transform your business.",
  openGraph: {
    title: "DYU Technologies",
    description: "Discover DYU Technologies, your partner in AI-driven solutions. Learn about our innovative AI platforms and how they can transform your business.",
    url: "https://dyutechnologies.com",
    siteName: "DYU Technologies",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: "DYU Technologies",
    card: "summary_large_image",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className} antialiased dark:bg-neutral-800`}
      >
        <ThemeProvider defaultTheme="system" attribute="class">
          <Header />
          <section id="home" className="fixed min-h-96 flex items-center dark:bg-neutral-800 top-0 w-full">
            <div className="max-w-6xl h-full mx-auto text-center">
              <div className="relative z-20">
                <div className="relative h-[120px] w-full overflow-hidden">
                  <VideoText src="https://0gcenrijt5.ufs.sh/f/DahQSy6m8oQJbDyIGKQKa8wmPph4RW165IEvxDQl2fskZoA3" fontSize={40}>
                    DYU
                  </VideoText>
                </div>
                <TextAnimate animation="blurIn" as="h4" className="mt-4 font-medium text-xl">
                  Ignite, Secure, Scale with AI
                </TextAnimate>
              </div>
            </div>
          </section>
          <div className="mt-96">
            {children}
          </div>
          {modal}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

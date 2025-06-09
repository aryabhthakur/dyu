import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Tailwind,
    Hr,
    Font,
} from '@react-email/components';

interface ThankYouEmailProps {
    name?: string;
}

const ThankYouEmail: React.FunctionComponent<ThankYouEmailProps> = (props) => {
    const { name = 'Jhon' } = props;

    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head>
                    <Font
                        fontFamily="Inter"
                        fallbackFontFamily="sans-serif"
                        webFont={{
                            url: "https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400&display=swap",
                            format: "woff2",
                        }}
                        fontWeight={400}
                        fontStyle="normal"
                    />
                </Head>
                <Preview>Thank you for reaching out to us - we&apos;ll be in touch soon!</Preview>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto">
                        {/* Company Header */}
                        <Section className='p-10 pb-0'>
                            <Section className="bg-neutral-950 rounded-xl p-16 pb-10 text-center">
                                <Img
                                    src="https://0gcenrijt5.ufs.sh/f/DahQSy6m8oQJNYCd81uRNCWdnFZE146vMwl2y7mD9HaUJAp8"
                                    alt="DYU Logo"
                                    className="w-full h-auto object-cover max-w-[128px] mx-auto mb-10"
                                />
                                <Text className="text-base text-white font-medium">
                                    Ignite, Scale, Secure.
                                </Text>
                            </Section>
                        </Section>

                        {/* Main Content */}
                        <Section className="p-20">
                            <Heading className="text-[28px] font-bold text-gray-900 mb-[24px]">
                                Thank You for Contacting Us!
                            </Heading>

                            <Text className="text-[16px] font-medium text-gray-700 leading-[24px] mb-[20px]">
                                Hi {name},
                            </Text>

                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[20px]">
                                We really appreciate you taking the time to reach out to us. Your message is important to us, and we&apos;re excited to help you with your inquiry.
                            </Text>

                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[20px]">
                                Our team has received your message and we&apos;ll get back to you within 24 hours during business days. In the meantime, feel free to explore our website or check out our frequently asked questions if you need immediate assistance.
                            </Text>

                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[32px]">
                                Thank you again for your interest in our services. We look forward to connecting with you soon!
                            </Text>

                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[8px]">
                                Regards,
                            </Text>
                            <Text className="text-[16px] font-semibold text-gray-900 mb-[32px]">
                                The DYU Communications Team
                            </Text>
                        </Section>

                        <Hr className="border-gray-200" />

                        {/* Footer */}
                        <Section className="p-[40px] pt-[32px]">
                            <Text className="text-[14px] text-gray-500 leading-[20px] mb-[16px] text-center">
                                Need immediate assistance?{' '}Email us at hi@dyutechnologies.com
                            </Text>

                            <Text className="text-[12px] text-gray-400 leading-[16px] m-0 text-center">
                                DYU Technologies<br />
                                4th & 5th Floor, Bizness Square<br />
                                Hitec City, Madhapur, Hyderabad, Telangana - 500084, India
                            </Text>

                            <Text className="text-[12px] text-gray-400 leading-[16px] mt-[16px] text-center">
                                This is an automated response mail. <br />
                                © 2025 DYU Technologies. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ThankYouEmail;
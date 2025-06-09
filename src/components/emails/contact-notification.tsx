import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
    Hr,
    Row,
    Column,
    Img,
} from '@react-email/components';

interface ContactFormNotificationProps {
    name: string;
    email: string;
    company: string;
    message: string;
    submissionDate: string;
}

const ContactFormNotification: React.FunctionComponent<ContactFormNotificationProps> = (props) => {
    const {
        name = "Sarah Johnson",
        email = "sarah.johnson@example.com",
        company = "Tech Solutions Inc.",
        message = "Hi there!\n\nI'm interested in learning more about your services for our upcoming project. We're looking for a reliable partner to help us with our digital transformation initiative.\n\nCould we schedule a call to discuss our requirements in detail?\n\nBest regards,\nSarah",
        submissionDate = "May 29, 2025 at 5:31 AM IST"
    } = props;
    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Preview>New contact form submission from {name}</Preview>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto px-[32px] pb-[32px]">
                        {/* Company Header */}
                        <Section className="bg-neutral-950 mb-10 rounded-xl p-16 pb-10 text-center">
                            <Img
                                src="https://0gcenrijt5.ufs.sh/f/DahQSy6m8oQJNYCd81uRNCWdnFZE146vMwl2y7mD9HaUJAp8"
                                alt="DYU Logo"
                                className="w-full h-auto object-cover max-w-[128px] mx-auto mb-10"
                            />
                            <Text className="text-base text-white font-medium">
                                Ignite, Scale, Secure.
                            </Text>
                        </Section>

                        {/* Header */}
                        <Section>
                            <Heading className="text-[24px] font-bold text-gray-900 mb-[16px] text-center">
                                🔔 New Contact Form Submission
                            </Heading>
                            <Text className="text-[16px] text-gray-600 text-center mb-[32px]">
                                Someone has reached out to us through our website contact form.
                            </Text>
                        </Section>

                        <Hr className="border-gray-200 mb-[24px]" />

                        {/* Contact Details */}
                        <Section>
                            <Heading className="text-[18px] font-semibold text-gray-900 mb-[16px]">
                                Contact Information
                            </Heading>

                            <Row className="mb-[12px]">
                                <Column className="w-[120px]">
                                    <Text className="text-[14px] font-medium text-gray-700 m-0">
                                        Name:
                                    </Text>
                                </Column>
                                <Column>
                                    <Text className="text-[14px] text-gray-900 m-0">
                                        {name}
                                    </Text>
                                </Column>
                            </Row>

                            <Row className="mb-[12px]">
                                <Column className="w-[120px]">
                                    <Text className="text-[14px] font-medium text-gray-700 m-0">
                                        Email:
                                    </Text>
                                </Column>
                                <Column>
                                    <Text className="text-[14px] text-blue-600 m-0">
                                        {email}
                                    </Text>
                                </Column>
                            </Row>

                            <Row className="mb-[12px]">
                                <Column className="w-[120px]">
                                    <Text className="text-[14px] font-medium text-gray-700 m-0">
                                        Company:
                                    </Text>
                                </Column>
                                <Column>
                                    <Text className="text-[14px] text-gray-900 m-0">
                                        {company}
                                    </Text>
                                </Column>
                            </Row>

                            <Row className="mb-[24px]">
                                <Column className="w-[120px]">
                                    <Text className="text-[14px] font-medium text-gray-700 m-0">
                                        Submitted:
                                    </Text>
                                </Column>
                                <Column>
                                    <Text className="text-[14px] text-gray-600 m-0">
                                        {submissionDate}
                                    </Text>
                                </Column>
                            </Row>
                        </Section>

                        <Hr className="border-gray-200 mb-[24px]" />

                        {/* Message */}
                        <Section>
                            <Heading className="text-[18px] font-semibold text-gray-900 mb-[16px]">
                                Message
                            </Heading>
                            <Section className="bg-gray-50 p-[16px] rounded-[6px] border-l-[4px] border-blue-500">
                                <Text className="text-[14px] text-gray-800 leading-[1.6] m-0 whitespace-pre-wrap">
                                    {message}
                                </Text>
                            </Section>
                        </Section>

                        <Hr className="border-gray-200 my-[32px]" />

                        {/* Action Items */}
                        <Section>
                            <Heading className="text-[16px] font-semibold text-gray-900 mb-[12px]">
                                Next Steps
                            </Heading>
                            <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                                • Review the inquiry and determine the appropriate team member to respond
                            </Text>
                            <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                                • Aim to respond within 24 hours for optimal customer experience
                            </Text>
                            <Text className="text-[14px] text-gray-600 m-0">
                                • Log this inquiry in our Airtable for tracking
                            </Text>
                        </Section>

                        {/* Footer */}
                        <Hr className="border-gray-200 my-[32px]" />
                        <Section>
                            <Text className="text-[12px] text-gray-500 text-center m-0">
                                This is an automated notification from the DYU Automation System.
                            </Text>
                            <Text className="text-[12px] text-gray-500 text-center m-0">
                                © {new Date().getFullYear()} DYU Technologies. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};


export default ContactFormNotification;
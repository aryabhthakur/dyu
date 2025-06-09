import * as React from 'react';
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Hr,
    Img,
    Tailwind,
} from '@react-email/components';

interface JobApplicationThankYouProps {
    applicantName: string;
    positionTitle: string;
}

const JobApplicationThankYou: React.FunctionComponent<JobApplicationThankYouProps> = (props) => {
    // Default values for preview
    const {
        applicantName = 'John Doe',
        positionTitle = 'Software Engineer',
    } = props;
    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white mx-auto rounded-[8px] max-w-[600px] overflow-hidden">
                        {/* Header Section with Logo */}
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
                        <Section className="px-[40px] py-[40px]">
                            <Heading className="text-[24px] font-bold text-gray-900 mb-[24px] mt-0">
                                Thank You for Your Application!
                            </Heading>

                            <Text className="text-[16px] text-gray-700 mb-[16px] mt-0">
                                Dear {applicantName},
                            </Text>

                            <Text className="text-[16px] text-gray-700 mb-[16px] mt-0">
                                Thank you for your interest in the <strong>{positionTitle}</strong> position at DYU Technologies. We have successfully received your application and wanted to acknowledge it right away.
                            </Text>

                            <Text className="text-[16px] text-gray-700 mb-[16px] mt-0">
                                We&apos;re excited to learn more about your background and experience. Our hiring team will carefully review your application along with all other submissions we receive for this role.
                            </Text>

                            <Text className="text-[16px] text-gray-700 mb-[24px] mt-0">
                                <strong>What happens next?</strong><br />
                                We will get back to you as soon as possible with an update on your application status. If your qualifications match what we&apos;re looking for, we&apos;ll reach out to schedule the next step in our interview process.
                            </Text>

                            <Hr className="border-gray-200 my-[24px]" />

                            <Text className="text-[14px] text-gray-600 mb-[16px] mt-0">
                                In the meantime, feel free to explore more about our company culture and values on our website. We appreciate your patience as we work through all applications.
                            </Text>

                            <Text className="text-[16px] text-gray-700 mb-[32px] mt-0">
                                Best regards,<br />
                                <strong>The DYU Technologies HR Team</strong>
                            </Text>
                        </Section>

                        {/* Footer */}
                        <Section className="bg-gray-50 px-[40px] py-[24px] border-t border-gray-200">
                            <Text className="text-[12px] text-gray-500 m-0 text-center">
                                DYU Technologies<br />
                                4th & 5th Floor, Bizness Square<br />
                                Hitec City, Madhapur, Hyderabad, Telangana - 500084, India
                                <br />
                                This email was sent regarding your job application. If you have any questions, email our HR department on hr@dyutechnologies.com.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default JobApplicationThankYou;
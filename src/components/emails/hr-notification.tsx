import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
    Hr,
} from '@react-email/components';

interface HRJobApplicationNotificationProps {
    candidateName?: string;
    candidateEmail?: string;
    candidatePhone?: string;
    positionTitle?: string;
    department?: string;
    applicationDate?: string;
    resumeLink?: string;
    coverLetterPreview?: string;
    yearsOfExperience?: string;
    currentCompany?: string;
    expectedSalary?: string;
    availabilityDate?: string;
}

const HRJobApplicationNotification: React.FunctionComponent<HRJobApplicationNotificationProps> = (props) => {
    const {
        candidateName = "Sarah Johnson",
        candidateEmail = "sarah.johnson@email.com",
        candidatePhone = "+1 (555) 123-4567",
        positionTitle = "Senior Software Engineer",
        department = "Engineering",
        applicationDate = "December 6, 2024",
        resumeLink = "https://example.com/resume/sarah-johnson",
        coverLetterPreview = "I am excited to apply for the Senior Software Engineer position at your company. With over 5 years of experience in full-stack development and a passion for creating scalable solutions, I believe I would be a valuable addition to your engineering team",
        yearsOfExperience = "5+ years",
        currentCompany = "Tech Solutions Inc.",
        expectedSalary = "$95,000 - $110,000",
        availabilityDate = "January 15, 2025",
    } = props;

    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Preview>New job application received for {positionTitle} position</Preview>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto">
                        {/* Company Header */}
                        <Section className='p-[32px] pb-0'>
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

                        <div className="p-[32px]">
                            {/* Main Content Header */}
                            <Section>
                                <Heading className="text-[24px] font-bold text-gray-900 mb-[8px] mt-0">
                                    🎯 New Job Application Received
                                </Heading>
                                <Text className="text-gray-600 text-[16px] mt-0 mb-[24px]">
                                    A candidate has applied for the {positionTitle} position in {department}.
                                </Text>
                            </Section>

                            <Hr className="border-gray-200 my-[24px]" />

                            {/* Candidate Information */}
                            <Section>
                                <Heading className="text-[20px] font-bold text-gray-900 mb-[16px] mt-0">
                                    📋 Candidate Details
                                </Heading>

                                <div className="bg-gray-50 rounded-[8px] p-[20px] mb-[24px]">
                                    <Text className="text-[16px] text-gray-900 mb-[8px] mt-0">
                                        <strong>Full Name:</strong> {candidateName}
                                    </Text>
                                    <Text className="text-[16px] text-gray-900 mb-[8px] mt-0">
                                        <strong>Email:</strong> {candidateEmail}
                                    </Text>
                                    <Text className="text-[16px] text-gray-900 mb-[8px] mt-0">
                                        <strong>Phone:</strong> {candidatePhone}
                                    </Text>
                                    <Text className="text-[16px] text-gray-900 mb-[8px] mt-0">
                                        <strong>Current Company:</strong> {currentCompany}
                                    </Text>
                                    <Text className="text-[16px] text-gray-900 mb-[8px] mt-0">
                                        <strong>Years of Experience:</strong> {yearsOfExperience}
                                    </Text>
                                    <Text className="text-[16px] text-gray-900 mb-[8px] mt-0">
                                        <strong>Expected Salary:</strong> {expectedSalary}
                                    </Text>
                                    <Text className="text-[16px] text-gray-900 mb-0 mt-0">
                                        <strong>Available From:</strong> {availabilityDate}
                                    </Text>
                                </div>
                            </Section>

                            {/* Position Information */}
                            <Section>
                                <Heading className="text-[20px] font-bold text-gray-900 mb-[16px] mt-0">
                                    💼 Position Applied For
                                </Heading>

                                <div className="bg-blue-50 rounded-[8px] p-[20px] mb-[24px]">
                                    <Text className="text-[16px] text-gray-900 mb-[8px] mt-0">
                                        <strong>Position:</strong> {positionTitle}
                                    </Text>
                                    <Text className="text-[16px] text-gray-900 mb-[8px] mt-0">
                                        <strong>Department:</strong> {department}
                                    </Text>
                                    <Text className="text-[16px] text-gray-900 mb-0 mt-0">
                                        <strong>Application Date:</strong> {applicationDate}
                                    </Text>
                                </div>
                            </Section>

                            {/* Cover Letter Preview */}
                            <Section>
                                <Heading className="text-[20px] font-bold text-gray-900 mb-[16px] mt-0">
                                    📝 Cover Letter Preview
                                </Heading>
                                <div className="bg-gray-50 rounded-[8px] p-[20px] mb-[24px] border-l-[4px] border-blue-500">
                                    <Text className="text-[14px] text-gray-700 italic mt-0 mb-0 leading-[1.6]">
                                        &quot;{coverLetterPreview}...&quot;
                                    </Text>
                                </div>
                            </Section>

                            {/* Action Items */}
                            <Section>
                                <Heading className="text-[20px] font-bold text-gray-900 mb-[16px] mt-0">
                                    🚀 Next Steps
                                </Heading>

                                <div className="bg-green-50 rounded-[8px] p-[20px] mb-[24px]">
                                    <Text className="text-[16px] text-gray-900 mb-[12px] mt-0">
                                        <strong>Recommended Actions:</strong>
                                    </Text>
                                    <Text className="text-[14px] text-gray-700 mb-[8px] mt-0">
                                        • Review the candidate&apos;s resume and cover letter
                                    </Text>
                                    <Text className="text-[14px] text-gray-700 mb-[8px] mt-0">
                                        • Schedule initial screening call if qualified
                                    </Text>
                                    <Text className="text-[14px] text-gray-700 mb-[8px] mt-0">
                                        • Update candidate status in ATS system
                                    </Text>
                                    <Text className="text-[14px] text-gray-700 mb-0 mt-0">
                                        • Send acknowledgment email to candidate
                                    </Text>
                                </div>

                                <Link
                                    href={resumeLink}
                                    className="bg-blue-600 text-white px-[24px] py-[12px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                                >
                                    📄 View Resume & Documents
                                </Link>
                            </Section>

                            <Hr className="border-gray-200 my-[32px]" />

                            {/* Footer */}
                            <Section>
                                <Text className="text-[12px] text-gray-500 text-center m-0">
                                    This is an automated notification from the DYU Automation System.
                                </Text>
                                <Text className="text-[12px] text-gray-500 text-center m-0">
                                    © {new Date().getFullYear()} DYU Technologies. All rights reserved.
                                </Text>
                            </Section>
                        </div>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};


export default HRJobApplicationNotification;
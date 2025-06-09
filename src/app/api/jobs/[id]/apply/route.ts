import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import Airtable, { type Attachment } from "airtable";
import HRJobApplicationNotification from "@/components/emails/hr-notification";
import { getStringValue } from "../../route";
import JobApplicationThankYou from "@/components/emails/job-thank-you";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Schema for form validation
const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  linkedIn: z.string().optional(),
  coverLetter: z.string().optional(),
  additionalInfo: z.string().optional(),
});

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY_JOB_APPLY,
}).base(process.env.AIRTABLE_BASE_ID!);

interface JobCandidateRecordType {
  fields: {
    "Candidate Name": string;
    "Email Address": string;
    "Phone Number": string;
    "LinkedIn Profile"?: string;
    "Years of Experience": string;
    "Current Company"?: string;
    "Expected Salary": string;
    "Availability Date": string;
    "Application Status": string;
    "Cover Letter"?: string;
    Resume?: Attachment[];
    "Current Status": string;
  };
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobId } = await params;

    if (!jobId) {
      return NextResponse.json(
        {
          success: false,
          error: "Job ID is required",
        },
        { status: 400 }
      );
    }
    // Fetch job details from Airtable
    const records = await base("Job Openings")
      .select()
      .all();
    const job = records.find(
      (record) => record.id === jobId
    );

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          error: "Job not found",
        },
        { status: 404 }
      );
    }

    // Parse form data
    const formData = await request.formData();

    // Extract other form fields
    // Extract form fields
    const applicationData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      linkedIn: formData.get("linkedIn") as string,
      yearsOfExperience: formData.get(
        "yearsOfExperience"
      ) as string,
      currentCompany: formData.get(
        "currentCompany"
      ) as string,
      expectedSalary: formData.get(
        "expectedSalary"
      ) as string,
      availabilityDate: formData.get(
        "availabilityDate"
      ) as string,
      coverLetter: formData.get("coverLetter") as string,
      resumeUrl: formData.get("resumeUrl") as string,
    };

    // Validate form data
    try {
      applicationSchema.parse(applicationData);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid form data",
          details: error,
        },
        { status: 400 }
      );
    }

    const airtableJobCandidateRecord: JobCandidateRecordType =
      {
        fields: {
          "Candidate Name": applicationData.fullName,
          "Email Address": applicationData.email,
          "Phone Number": applicationData.phone,
          "Application Status": "Applied",
          "Years of Experience":
            applicationData.yearsOfExperience,
          "Expected Salary": applicationData.expectedSalary,
          "Availability Date":
            applicationData.availabilityDate,
          "Current Status": "Active",
        },
      };

    // Add optional fields if they exist
    if (applicationData.linkedIn) {
      airtableJobCandidateRecord.fields[
        "LinkedIn Profile"
      ] = applicationData.linkedIn;
    }
    if (applicationData.currentCompany) {
      airtableJobCandidateRecord.fields["Current Company"] =
        getStringValue(applicationData.currentCompany);
    }
    if (applicationData.coverLetter) {
      airtableJobCandidateRecord.fields["Cover Letter"] =
        applicationData.coverLetter;
    }

    // Add resume attachment if present - using the correct format for new uploads
    // Add resume URL if provided
    // Add resume URL if provided - using the correct Airtable attachment format
    if (applicationData.resumeUrl) {
      const urlParts = applicationData.resumeUrl.split("/");
      const filename =
        urlParts[urlParts.length - 1] || "resume.pdf";

      airtableJobCandidateRecord.fields.Resume = [
        {
          url: applicationData.resumeUrl,
          filename: filename,
        } as Attachment, // Type assertion to match Airtable's Attachment type
      ];
    }

    const createCandidateResponse = await base(
      "Candidates"
    ).create([airtableJobCandidateRecord]);

    if (
      !createCandidateResponse ||
      !createCandidateResponse.length
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Something went wrong! please try again later.",
        },
        { status: 500 }
      );
    }

    const candidateId = createCandidateResponse[0].getId();

    // Create a new application record in Airtable
    const applicationRecord = {
      fields: {
        Name: applicationData.fullName,
        "Candidate Name": [candidateId],
        "Source of Application": "Company Website",
        "Submission Date": new Date()
          .toISOString()
          .split("T")[0],
        "Cover Letter": getStringValue(
          applicationData.coverLetter
        ),
        "Job Opening": [jobId], // Link to the job opening
      },
    };

    // Create the application record in Airtable
    const createApplicationResponse = await base(
      "Applications"
    ).create([applicationRecord]);

    if (
      !createApplicationResponse ||
      !createApplicationResponse.length
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Failed to create application record. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Send confirmation email to candidate & notification to hiring team
    // Use Resend to send emails
    await resend.batch.send([
      {
        from: "careers@dyutechnologies.com",
        to: "hr@dyutechnologies.com",
        subject: `New Application: ${job.fields["Job Title"]}`,
        react: await HRJobApplicationNotification({
          candidateName: applicationData.fullName,
          candidateEmail: applicationData.email,
          candidatePhone: applicationData.phone,
          positionTitle: getStringValue(
            job.fields["Job Title"]
          ),
          resumeLink: applicationData.resumeUrl,
          department: getStringValue(job.fields.Department),
          applicationDate: new Date().toLocaleDateString(),
          coverLetterPreview: getStringValue(
            applicationData.coverLetter
          ),
          yearsOfExperience: getStringValue(
            applicationData.yearsOfExperience
          ),
          currentCompany: getStringValue(
            applicationData.currentCompany
          ),
          expectedSalary: getStringValue(
            applicationData.expectedSalary
          ),
          availabilityDate: getStringValue(
            applicationData.availabilityDate
          ),
        }),
      },
      {
        from: "careers@dyutechnologies.com",
        to: applicationData.email,
        subject: `Application Received: ${job.fields["Job Title"]}`,
        react: await JobApplicationThankYou({
          applicantName: applicationData.fullName,
          positionTitle: getStringValue(
            job.fields["Job Title"]
          ),
        }),
      },
    ]);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Error processing application:", error);

    // Handle Airtable-specific errors
    if (error instanceof Error) {
      if (error.message.includes("INVALID_REQUEST_BODY")) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Invalid data format. Please check your input and try again.",
          },
          { status: 400 }
        );
      }
      if (error.message.includes("NOT_FOUND")) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Airtable configuration error. Please contact support.",
          },
          { status: 500 }
        );
      }
      if (
        error.message.includes(
          "ATTACHMENTS_FAILED_UPLOADING"
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Failed to process resume URL. Please check the URL and try again.",
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process application",
      },
      { status: 500 }
    );
  }
}

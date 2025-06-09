import Airtable from "airtable";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import ThankYouEmail from "@/components/emails/thank-you";
import ContactFormNotification from "@/components/emails/contact-notification";
import { getStringValue } from "@/lib/utils";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_CC_BASE_ID!);

// Validate form data
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long"),
  newsletter: z.boolean().default(false).optional(),
});

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  // Parse form data
  const formData = await request.json();

  if (!formData || typeof formData !== "object") {
    return NextResponse.json(
      { success: false, error: "Invalid form data" },
      { status: 400 }
    );
  }

  // Validate form data
  try {
    formSchema.parse(formData);
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
  const newsletter =
    formData.newsletter === "on" ? true : false;

  // airtable record
  const record = {
    fields: {
      "Customer Name": getStringValue(formData.name),
      "Customer Email": getStringValue(formData.email),
      "Customer's Company Name": getStringValue(
        formData.company
      ),
      "Inquiry Details": getStringValue(formData.message),
    },
  };

  const saveInquery = await base(
    "Customer Inquiries"
  ).create([record]);

  if (!saveInquery) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save inquiry",
      },
      { status: 500 }
    );
  }

  // Send email notification to client and to DYU Technologies team
  await resend.batch.send([
    {
      from: "team@dyutechnologies.com",
      to: getStringValue(formData.get("email")),
      subject: "Thank you for contacting DYU Technologies",
      react: await ThankYouEmail({
        name: getStringValue(formData.name),
      }),
    },
    {
      from: "cx@dyutechnologies.com",
      to: "sales@dyutechnologies.com",
      subject: "New Customer Inquiry",
      react: await ContactFormNotification({
        name: getStringValue(formData.name),
        email: getStringValue(formData.email),
        company: getStringValue(formData.company),
        message: getStringValue(formData.message),
        submissionDate: new Date().toISOString(),
      }),
    },
  ]);

  if (newsletter) {
    // Add to newsletter list if opted in
    try {
      await resend.contacts.create({
        email: getStringValue(formData.get("email")),
        firstName: getStringValue(
          formData.get("name")
        ).split(" ")[0],
        lastName:
          getStringValue(formData.get("name")).split(
            " "
          )[1] || "",
        unsubscribed: false,
        audienceId: getStringValue(
          process.env.RESEND_AUDIENCE_ID
        ),
      });
    } catch (error) {
      console.error(
        "Failed to add to newsletter list:",
        error
      );
      return NextResponse.json(
        {
          success: false,
          error: "Failed to subscribe to newsletter",
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    success: true,
    message: "Inquiry submitted successfully",
  });
}

import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";
import { JobRecord } from "../route";
import { getStringValue } from "@/lib/utils";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: jobId } = await params;

  try {
    // Fetch single record by ID
    const record = await base("Job Openings").find(jobId);

    if (!record) {
      return NextResponse.json(
        { success: false, error: "Job not found" },
        { status: 404 }
      );
    }

    const job: JobRecord = {
      id: record.id,
      createdTime: record._rawJson.createdTime,
      fields: {
        "Job Title": getStringValue(
          record.fields["Job Title"]
        ),
        Department: getStringValue(
          record.fields["Department"]
        ),
        "Job Requirements": getStringValue(
          record.fields["Job Requirements"]
        ),
        "Job Responsibilities": getStringValue(
          record.fields["Job Responsibilities"]
        ),
        "Job Summary": {
          value: getStringValue(
            (
              record.fields["Job Summary"] as {
                value?: unknown;
              }
            )?.value
          ),
        },
        "Job Perks": {
          value: getStringValue(
            (
              record.fields["Job Perks"] as {
                value?: unknown;
              }
            )?.value
          ),
        },
        "Job Type": getStringValue(
          record.fields["Job Type"]
        ),
        "Job Location Type": getStringValue(
          record.fields["Job Location Type"]
        ),
      },
    };

    return NextResponse.json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

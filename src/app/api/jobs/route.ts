import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";
import { getStringValue } from "@/lib/utils";

// types/JobListing.ts
export interface JobFields {
  "Job Title": string;
  Department: string;
  "Job Requirements": string;
  "Job Responsibilities": string;
  "Job Summary": { value: string };
  "Job Perks": { value: string };
  "Job Type": string;
  "Job Location Type": string;
}

export interface JobRecord {
  id: string;
  fields: JobFields;
  createdTime: string; // ISO date string
}

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Query parameters
    const department = searchParams.get("department");
    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    // Fetch all jobs from Airtable
    const records = await base("Job Openings")
      .select()
      .all();

    // Map to minimal structure
    const airtableJobs = records
      .filter((record) => {
        const jobStatus = record.fields["Job Status"];
        return (
          typeof jobStatus === "string" &&
          jobStatus.trim().toLowerCase() === "open"
        );
      })
      .map(
        (record): JobRecord => ({
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
        })
      );

    let filteredJobs = [...airtableJobs];

    // Filter by department
    if (department) {
      if (department !== "all") {
        filteredJobs = filteredJobs.filter(
          (job) => job.fields.Department === department
        );
      }
    }

    // Filter by location
    if (location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.fields["Job Location Type"]
          .toLowerCase()
          .includes(location.toLowerCase())
      );
    }

    // Filter by job type
    if (type) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.fields["Job Type"].toLowerCase() ===
          type.toLowerCase()
      );
    }

    // Search in title, summary, perks, or requirements
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredJobs = filteredJobs.filter((job) => {
        const title = job.fields["Job Title"].toLowerCase();
        const summary =
          job.fields["Job Summary"].value.toLowerCase();
        const perks =
          job.fields["Job Perks"].value.toLowerCase();
        const requirements =
          job.fields["Job Requirements"].toLowerCase();

        return (
          title.includes(searchTerm) ||
          summary.includes(searchTerm) ||
          perks.includes(searchTerm) ||
          requirements.includes(searchTerm)
        );
      });
    }

    // Sort by creation date (newest first)
    filteredJobs.sort(
      (a, b) =>
        new Date(b.createdTime).getTime() -
        new Date(a.createdTime).getTime()
    );

    // Pagination
    const totalJobs = filteredJobs.length;
    const limitNum = limit ? parseInt(limit, 10) : null;
    const offsetNum = offset ? parseInt(offset, 10) : 0;

    if (limitNum) {
      filteredJobs = filteredJobs.slice(
        offsetNum,
        offsetNum + limitNum
      );
    }

    // Format response
    const formattedJobs = filteredJobs.map((job) => ({
      id: job.id,
      title: job.fields["Job Title"],
      department: job.fields.Department,
      requirements: job.fields["Job Requirements"],
      responsibilities: job.fields["Job Responsibilities"],
      summary: job.fields["Job Summary"].value,
      perks: job.fields["Job Perks"].value,
      type: job.fields["Job Type"],
      location: job.fields["Job Location Type"],
      createdAt: job.createdTime,
    }));

    return NextResponse.json({
      success: true,
      data: {
        jobs: formattedJobs,
        pagination: {
          total: totalJobs,
          limit: limitNum,
          offset: offsetNum,
          hasMore: limitNum
            ? offsetNum + limitNum < totalJobs
            : false,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch jobs",
      },
      { status: 500 }
    );
  }
}

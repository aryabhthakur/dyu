import { NextResponse } from "next/server";
import Airtable from "airtable";
import { getStringValue } from "../route";
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

export interface DepartmentRecord {
  name: string;
  count: number;
  id: string;
}

export async function GET() {
  try {
    // Fetch all jobs from Airtable
    const records = await base("Departments")
      .select()
      .all();

    const airtableDepartments = records.map((record) => ({
      id: record.id,
      fields: {
        "Department Name": getStringValue(
          record.fields["Department Name"]
        ),
        "Number of Job Openings": getStringValue(
          record.fields["Number of Job Openings"]
        ),
      },
    }));
    const departments: DepartmentRecord[] =
      airtableDepartments.map((record) => ({
        name: getStringValue(
          record.fields["Department Name"]
        ),
        count: Number(
          record.fields["Number of Job Openings"] || 0
        ),
        id: record.id,
      }));

    return NextResponse.json({
      success: true,
      data: departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch departments",
      },
      { status: 500 }
    );
  }
}

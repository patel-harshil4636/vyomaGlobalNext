// app/api/project-inquiry/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import ProjectInquiry from "@/models/ProjectInquiry";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      location,
      serviceType,
      budget,
      projectDetails,
      consent,
    } = body;

    // Basic validation (optional but good)
    if (!fullName || !email || !phone || !serviceType || !budget || !projectDetails) {
      return NextResponse.json(
        { success: false, msg: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const newInquiry = await ProjectInquiry.create({
      fullName,
      email,
      phone,
      location,
      serviceType,
      budget,
      projectDetails,
      consent: consent === "yes" || consent === true, // convert to boolean
    });

    return NextResponse.json(
      {
        success: true,
        msg: "Project inquiry saved successfully",
        data: newInquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Project inquiry API error:", error);
    return NextResponse.json(
      { success: false, msg: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

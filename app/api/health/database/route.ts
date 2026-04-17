import { NextResponse } from "next/server";
import { verifyDatabaseConnection } from "@/lib/db/connection-check";

export const runtime = "nodejs";

export async function GET() {
  try {
    const result = await verifyDatabaseConnection();

    return NextResponse.json({
      area: "api",
      status: "ok",
      database: "connected",
      connectionCheck: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";

    return NextResponse.json(
      {
        area: "api",
        status: "error",
        database: "unreachable",
        message,
      },
      { status: 500 },
    );
  }
}

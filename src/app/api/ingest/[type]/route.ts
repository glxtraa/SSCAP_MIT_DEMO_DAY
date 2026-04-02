import { NextResponse } from "next/server";

/**
 * Generic Ingestion Handler for SSCAP Sensors
 * POST /api/ingest/[type]
 * Types: captado, utilizado, nivel
 */

export async function POST(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    const body = await request.json();
    const { deviceid, value, unit, timestamp } = body;

    // In a real app, we would:
    // 1. Verify device signature
    // 2. Anchored the hash to Base Mainnet
    // 3. Store in Vercel Blob/JSON

    console.log(`[INGEST] Type: ${type} | Device: ${deviceid} | Value: ${value}${unit}`);

    return NextResponse.json({
      success: true,
      status: "anchored",
      txHash: "0x" + Math.random().toString(16).slice(2, 42), // Mock Base Transaction Hash
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid payload" },
      { status: 400 }
    );
  }
}

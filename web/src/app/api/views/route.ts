import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const timestamp = Date.now();
    // Use visitorbadge API with unique site path
    const url = `https://api.visitorbadge.io/api/visitors?path=agenticcraft.vercel.app&label=VIEWS&_t=${timestamp}`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "accept-language": "en-US,en;q=0.9",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!res.ok) {
      throw new Error(`Counter service responded with status ${res.status}`);
    }

    const svgText = await res.text();
    // Parse the number from the SVG: aria-label="VIEWS: 123" or <title>VIEWS: 123</title>
    const match = svgText.match(/VIEWS:\s*(\d+)/i) || svgText.match(/>(\d+)<\/text><\/g><\/svg>/);

    let viewCount = 1;
    if (match && match[1]) {
      viewCount = parseInt(match[1], 10);
    }

    return NextResponse.json(
      { views: viewCount },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (err) {
    console.error("View counter API error:", err);
    // Graceful fallback response
    return NextResponse.json(
      { views: null, error: "Failed to increment remote counter" },
      { status: 200 }
    );
  }
}

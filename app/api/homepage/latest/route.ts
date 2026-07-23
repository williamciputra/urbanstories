import { NextResponse } from "next/server";

import {
    getLatestFeed,
} from "@/services/public/latest-v2";

export async function GET(
    request: Request
) {
    const { searchParams } =
        new URL(request.url);

    const page = Math.max(
        1,
        Number(
            searchParams.get("page")
        ) || 1
    );

    const latest =
        await getLatestFeed(page);

    return NextResponse.json({
        articles: latest.articles,
        currentPage:
            latest.currentPage,
        totalPages:
            latest.totalPages,
    });
}
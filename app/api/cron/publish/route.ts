import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const authHeader = request.headers.get("authorization");

    if (
        authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const supabase = await createClient();

    const now = new Date().toISOString();

    const { data: articles, error } =
        await supabase
            .from("articles")
            .select("id")
            .eq("status", "scheduled")
            .lte("published_at", now);

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    if (!articles?.length) {
        return NextResponse.json({
            success: true,
            published: 0,
        });
    }

    const ids = articles.map(
        (article) => article.id
    );

    const { error: updateError } =
        await supabase
            .from("articles")
            .update({
                status: "published",
            })
            .in("id", ids);

    if (updateError) {
        return NextResponse.json(
            {
                error: updateError.message,
            },
            {
                status: 500,
            }
        );
    }

    return NextResponse.json({
        success: true,
        published: ids.length,
        ids,
    });
}
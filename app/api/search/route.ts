import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json([]);
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      slug,

      authors:author_id (
        name
      ),

      categories:category_id (
        name
      )
    `)
    .eq("status", "published")
    .or(
      `title.ilike.%${q}%,excerpt.ilike.%${q}%,content.ilike.%${q}%`
    )
    .order("published_at", {
      ascending: false,
    })
    .limit(5);

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(data);
}
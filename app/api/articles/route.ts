import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncTags } from "@/lib/articles/syncTags";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const { tags = [], ...body } =
    await request.json();

  console.log("BODY:", body);

  if (body.is_top_story) {
    const { error } = await supabase
      .from("articles")
      .update({
        is_top_story: false,
      })
      .eq("is_top_story", true);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }

  const { data, error } = await supabase
    .from("articles")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  await syncTags(
    supabase,
    data.id,
    tags
  );

  return NextResponse.json(data);
}
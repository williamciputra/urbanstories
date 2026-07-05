import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { syncTags } from "@/lib/articles/syncTags";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Props
) {
  const { id } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

export async function PATCH(
  request: Request,
  { params }: Props
) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    tags = [],
    ...body
  } = await request.json();

  if (body.is_top_story) {
    const { error } = await supabase
      .from("articles")
      .update({
        is_top_story: false,
      })
      .eq("is_top_story", true)
      .neq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }

  const { data, error } = await supabase
    .from("articles")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("PATCH ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  await syncTags(
    supabase,
    id,
    tags
  );

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: Props
) {
  const { id } = await params;

  const supabase = await createClient();

  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}
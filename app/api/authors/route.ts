import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("authors")
      .select("*")
      .eq("status", "active")
      .order("name");

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch authors",
      },
      {
        status: 500,
      }
    );
  }
}
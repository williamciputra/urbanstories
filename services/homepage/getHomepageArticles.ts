import { createClient } from "@/lib/supabase/server";

export async function getHomepageArticles() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}
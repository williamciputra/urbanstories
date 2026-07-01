import { createClient } from "@/lib/supabase/server";

export default async function TestSupabasePage() {
  const supabase = await createClient();

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">
        ✅ Supabase Connected
      </h1>
    </main>
  );
}
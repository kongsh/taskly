import { supabase } from "@/lib/supabase/supabase";

export async function GET() {
  const { data, error } = await supabase.from("Task").select();

  if (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }

  return Response.json(data);
}

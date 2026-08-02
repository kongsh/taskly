import { supabase } from "@/lib/supabase/supabase";
import { TaskForm } from "@/types/task";

export async function GET() {
  const { data, error } = await supabase.from("Task").select();

  if (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }

  // return Response.json({ message: "강제 에러" }, { status: 500 });

  return Response.json(data);
}

export async function POST(request: Request) {
  const body: TaskForm = await request.json();

  const deadline = new Date();

  deadline.setDate(deadline.getDate() + Number(body.dueDate));

  const { data, error } = await supabase
    .from("Task")
    .insert({
      title: body.title,
      description: body.description,
      deadline: deadline.toISOString(),
      status: body.status,
    })
    .select()
    .single();

  if (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }

  return Response.json(data, { status: 201 });
}

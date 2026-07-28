import { supabase } from "@/lib/supabase/supabase";
import { TaskForm } from "@/types/task";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body: TaskForm = await request.json();
  const { id } = await params;

  const deadline = new Date();

  deadline.setDate(deadline.getDate() + Number(body.dueDate));

  const { data, error } = await supabase
    .from("Task")
    .update({
      title: body.title,
      description: body.description,
      deadline: deadline.toISOString(),
      status: body.status,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }

  return Response.json(data, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { error } = await supabase.from("Task").delete().eq("id", id);

  if (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }

  return Response.json({ message: "Task가 삭제되었습니다." }, { status: 200 });
}

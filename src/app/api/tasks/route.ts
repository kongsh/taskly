import { tasks } from "@/data/tasks";

export async function GET() {
  return Response.json(tasks);
}

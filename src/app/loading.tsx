import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-w-96 flex size-full flex-col p-8 gap-6">
      <h2 className="text-3xl font-bold">My Tasks</h2>
      <Skeleton className="w-48 h-6 bg-muted" />
      <div className="flex w-full items-center justify-between gap-4 flex-col-reverse md:flex-row">
        <div className="flex items-center gap-4 w-full flex-col md:flex-row">
          <Skeleton className="w-48 h-6" />
          <div className="flex gap-4 w-full md:w-auto">
            <Skeleton className="w-48 h-6" />
            <Skeleton className="w-48 h-6" />
          </div>
        </div>

        <Skeleton className="w-48 h-6" />
      </div>
      <Skeleton className="w-48 h-6" />
    </div>
  );
}

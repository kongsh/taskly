import { Skeleton } from "@/components/ui/skeleton";

export function TaskListSkeleton() {
  return (
    <div className="min-w-96 flex size-full flex-col gap-6 p-8">
      <h2 className="text-3xl font-bold">My Tasks</h2>

      <Skeleton className="h-6 w-80" />

      <div className="flex w-full flex-col-reverse items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full flex-col items-center gap-4 md:flex-row">
          <Skeleton className="h-10 w-full md:w-64" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>

        <Skeleton className="h-10 w-36" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

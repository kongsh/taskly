import { Button } from "@/components/ui/button";

type TaskErrorProps = {
  message: string;
  onRetry: () => void;
};

export default function TaskError({ message, onRetry }: TaskErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <p className="text-center text-lg font-medium">{message}</p>
      <Button onClick={onRetry}>다시 시도</Button>
    </div>
  );
}

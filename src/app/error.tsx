"use client";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">문제가 발생했습니다.</h2>

      <p>{error.message}</p>

      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}

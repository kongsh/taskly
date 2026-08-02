import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p>페이지를 찾을 수 없습니다.</p>

      <Button>
        <Link href="/">홈으로 이동</Link>
      </Button>
    </div>
  );
}

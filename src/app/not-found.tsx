import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p>페이지를 찾을 수 없습니다.</p>

      <Link
        href="/"
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        홈으로 이동
      </Link>
    </div>
  );
}

export default function CommentSkeleton() {
  return (
    <div className="animate-pulse rounded-lg bg-zinc-800 p-4">
      <div className="mb-3 h-4 w-24 rounded bg-zinc-700" />
      <div className="h-4 w-full rounded bg-zinc-700" />
      <div className="mt-2 h-4 w-2/3 rounded bg-zinc-700" />
    </div>
  );
}
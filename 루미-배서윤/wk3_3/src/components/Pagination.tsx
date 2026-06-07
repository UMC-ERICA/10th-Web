type PaginationProps = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
}: PaginationProps) {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        이전
      </button>

      <span className="text-sm font-medium text-gray-300">
        {page} / {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        다음
      </button>
    </div>
  );
}

export default Pagination;
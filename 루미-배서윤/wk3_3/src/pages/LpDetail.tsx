import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { deleteLp, getLpDetail, likeLp, updateLp } from "../apis/lp";
import LpComments from "../components/LpComments";

export default function LpDetail() {
  const { lpid } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(
    null
  );

  const {
    data: lp,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["lp", lpid],
    queryFn: () => getLpDetail(lpid as string),
    enabled: !!lpid,
    staleTime: 1000 * 60,
    retry: 0,
  });

  const mockLp = {
    id: 1,
    title: "다들 파이팅!",
    content: "시험기간 너무 힘들지만 끝까지 해보자 🔥",
    thumbnail: "https://picsum.photos/600/600?random=10",
    createdAt: new Date().toISOString(),
    likes: 12,
  };

  const displayLp = lp ?? mockLp;

  const updateLpMutation = useMutation({
    mutationFn: updateLp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lp", lpid],
      });

      queryClient.invalidateQueries({
        queryKey: ["lps"],
      });

      setIsEditing(false);
      setEditImage(null);
      setEditImagePreview(null);
    },
    onError: () => {
      alert("LP 수정에 실패했습니다.");
    },
  });

  const deleteLpMutation = useMutation({
    mutationFn: deleteLp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lps"],
      });

      navigate("/lps");
    },
    onError: () => {
      alert("LP 삭제에 실패했습니다.");
    },
  });

  const likeMutation = useMutation({
    mutationFn: likeLp,

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["lp", lpid],
      });

      const previousLp = queryClient.getQueryData(["lp", lpid]);

      queryClient.setQueryData(["lp", lpid], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          likes: [...(old.likes ?? []), { id: -1 }],
        };
      });

      return { previousLp };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousLp) {
        queryClient.setQueryData(["lp", lpid], context.previousLp);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["lp", lpid],
      });
    },
  });

  const handleStartEdit = () => {
    setEditTitle(displayLp.title);
    setEditContent(displayLp.content || "");
    setEditImage(null);
    setEditImagePreview(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle("");
    setEditContent("");
    setEditImage(null);
    setEditImagePreview(null);
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setEditImage(file);
    setEditImagePreview(URL.createObjectURL(file));
  };

  const handleUpdate = () => {
    if (!lpid) return;

    if (!editTitle.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    updateLpMutation.mutate({
      lpId: lpid,
      title: editTitle,
      content: editContent,
      image: editImage,
    });
  };

  const handleDelete = () => {
    if (!lpid) return;

    const isConfirmed = confirm("정말 삭제하시겠습니까?");

    if (!isConfirmed) return;

    deleteLpMutation.mutate(lpid);
  };

  if (isPending && !lp) {
    return (
      <div className="flex min-h-[500px] items-center justify-center text-white">
        불러오는 중...
      </div>
    );
  }

  const imageSrc =
    editImagePreview || displayLp.thumbnail || "https://picsum.photos/600/600";

  return (
    <section className="mx-auto max-w-4xl rounded-2xl bg-zinc-900 p-8 text-white shadow-xl">
      {!lp && (
        <div className="mb-6 rounded-md border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
          서버 상세 데이터가 없어 테스트용 LP 데이터를 표시 중입니다.
          <button
            type="button"
            onClick={() => refetch()}
            className="ml-3 underline"
          >
            다시 불러오기
          </button>
        </div>
      )}

      <div className="mb-8 flex items-start justify-between">
        <div className="flex-1">
          <p className="mb-2 text-sm text-gray-400">
            {new Date(displayLp.createdAt).toLocaleDateString()}
          </p>

          {isEditing ? (
            <div className="space-y-3">
              <input
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
                placeholder="LP 제목"
                className="w-full rounded-md border border-gray-600 bg-transparent px-4 py-3 text-2xl font-bold text-white outline-none focus:border-pink-400"
              />

              <textarea
                value={editContent}
                onChange={(event) => setEditContent(event.target.value)}
                placeholder="LP 내용"
                rows={4}
                className="w-full rounded-md border border-gray-600 bg-transparent px-4 py-3 text-white outline-none focus:border-pink-400"
              />
            </div>
          ) : (
            <h1 className="text-4xl font-extrabold">{displayLp.title}</h1>
          )}
        </div>

        <div className="ml-4 flex gap-3 text-xl">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={updateLpMutation.isPending}
                className="rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold disabled:bg-gray-500"
              >
                {updateLpMutation.isPending ? "저장 중" : "저장"}
              </button>

              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-md bg-zinc-700 px-3 py-2 text-sm font-semibold hover:bg-zinc-600"
              >
                취소
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleStartEdit}
                title="수정"
              >
                ✎
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteLpMutation.isPending}
                title="삭제"
              >
                🗑
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mb-8 overflow-hidden rounded-xl">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative block w-full overflow-hidden rounded-xl"
            >
              <img
                src={imageSrc}
                alt={displayLp.title}
                className="mx-auto max-h-[500px] w-full object-cover transition group-hover:brightness-75"
              />

              <div className="absolute inset-0 hidden items-center justify-center bg-black/40 text-sm font-semibold text-white group-hover:flex">
                사진 변경
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <p className="mt-2 text-sm text-gray-400">
              이미지를 클릭하면 새 사진을 선택할 수 있습니다.
            </p>
          </>
        ) : (
          <img
            src={imageSrc}
            alt={displayLp.title}
            className="mx-auto max-h-[500px] w-full object-cover"
          />
        )}
      </div>

      <div className="mb-6 flex items-center gap-3">
        <button
        type="button"
        onClick={() => {
          if (!lpid) return;
          likeMutation.mutate(lpid);
        }}
        disabled={likeMutation.isPending}
        className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold disabled:bg-gray-500"
      >
        ♥ 좋아요 {Array.isArray(displayLp.likes) ? displayLp.likes.length : (displayLp.likes ?? 0)}
      </button>
      </div>

      {!isEditing && (
        <article className="leading-8 text-gray-200">
          {displayLp.content || "내용이 없습니다."}
        </article>
      )}

      {lpid && <LpComments lpId={lpid} />}
    </section>
  );
}
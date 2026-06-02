import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLp } from "../apis/lp";
import Modal from "./ui/Modal";

const lpImage = "/lp.png";

type Props = {
  onClose: () => void;
};

export default function CreateLpModal({ onClose }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();

    if (!trimmedTag) return;
    if (tags.includes(trimmedTag)) return;

    setTags((prev) => [...prev, trimmedTag]);
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((item) => item !== tag));
  };

  const createLpMutation = useMutation({
    mutationFn: createLp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      onClose();
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("LP 이름을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("LP 내용을 입력해주세요.");
      return;
    }

    createLpMutation.mutate({
      title,
      content,
      tags,
      image: imageFile,
    });
  };

  return (
    <Modal onClose={onClose}>
      <div className="relative w-[500px] rounded-2xl bg-[#28292f] px-7 pb-7 pt-8 text-white shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-4 z-30 text-3xl leading-none text-gray-200 hover:text-white"
        >
          ×
        </button>

        <div className="relative mb-6 h-[300px]">
          {!imagePreview && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute left-1/2 top-4 h-64 w-64 -translate-x-1/2 overflow-hidden rounded-full transition hover:scale-[1.02]"
            >
              <img
                src={lpImage}
                alt="LP"
                className="h-full w-full object-contain"
              />
            </button>
          )}

          {imagePreview && (
            <>
              <img
                src={lpImage}
                alt="LP"
                className="absolute right-[5px] top-1/2 h-52 w-52 -translate-y-1/2 object-contain"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group absolute left-[60px] top-1/2 z-10 h-56 w-56 -translate-y-1/2 overflow-hidden bg-zinc-800 shadow-2xl transition hover:brightness-90"
              >
                <img
                  src={imagePreview}
                  alt="LP preview"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 hidden items-center justify-center bg-black/50 text-sm font-semibold text-white group-hover:flex">
                  사진 변경
                </div>
              </button>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="LP Name"
            className="h-11 w-full rounded-md border border-gray-500 bg-transparent px-3 text-base text-white outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="LP Content"
            className="h-11 w-full rounded-md border border-gray-500 bg-transparent px-3 text-base text-white outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="LP Tag"
              className="h-11 flex-1 rounded-md border border-gray-500 bg-transparent px-3 text-base text-white outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={handleAddTag}
              className="h-11 rounded-md bg-pink-500 px-5 text-base font-semibold text-white hover:bg-pink-600"
            >
              Add
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 rounded-full bg-zinc-700 px-3 py-1 text-sm text-white"
                >
                  <span>{tag}</span>

                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-pink-300 hover:text-pink-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={createLpMutation.isPending}
            className="mt-5 h-11 w-full rounded-md bg-pink-500 text-base font-semibold text-white hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {createLpMutation.isPending ? "등록 중..." : "Add LP"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
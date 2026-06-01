import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { updateMyProfile } from "../apis/user";
import { getAccessToken } from "../router/auth";

export default function MyPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = getAccessToken();

  const savedName = localStorage.getItem("nickname") || "사용자";
  const savedEmail = localStorage.getItem("email") || "이메일 정보 없음";
  const savedBio = localStorage.getItem("bio") || "";

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(savedName);
  const [bio, setBio] = useState(savedBio);
  const [email] = useState(savedEmail);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login", {
        replace: true,
        state: { from: location },
      });
    }
  }, [accessToken, navigate, location]);

  const updateProfileMutation = useMutation({
    mutationFn: updateMyProfile,

    onMutate: (newProfile) => {
      const previousNickname = localStorage.getItem("nickname") ?? "사용자";
      const previousBio = localStorage.getItem("bio") ?? "";

      localStorage.setItem("nickname", newProfile.name);
      localStorage.setItem("bio", newProfile.bio || "");
      window.dispatchEvent(new Event("nickname-change"));

      return { previousNickname, previousBio };
    },

    onSuccess: () => {
      setIsEditing(false);
      alert("프로필이 수정되었습니다.");
    },

    onError: (_error, _variables, context) => {
      if (context) {
        localStorage.setItem("nickname", context.previousNickname);
        localStorage.setItem("bio", context.previousBio);
        setName(context.previousNickname);
        setBio(context.previousBio);
        window.dispatchEvent(new Event("nickname-change"));
      }
      setIsEditing(false);
      alert("프로필 수정에 실패했습니다.");
    },
  });

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    updateProfileMutation.mutate({
      name,
      bio,
      profileImage,
    });
  };

  if (!accessToken) return null;

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-12 text-white">
      <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-8 shadow-xl">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => {
              if (isEditing) fileInputRef.current?.click();
            }}
            className="h-36 w-36 shrink-0 overflow-hidden rounded-full bg-zinc-700"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-300 text-sm text-gray-500">
                {isEditing ? "사진 선택" : "👤"}
              </div>
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="flex-1 space-y-3">
            {isEditing ? (
              <>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-md border border-white/30 bg-black px-4 py-3 text-xl text-white outline-none focus:border-pink-400"
                />

                <input
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  placeholder="Bio"
                  className="w-full rounded-md border border-white/30 bg-black px-4 py-3 text-base text-white outline-none focus:border-pink-400"
                />

                <p className="text-sm font-medium text-gray-300">
                  {email}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold">{name}</h1>

                <p className="text-base text-gray-400">
                  {bio || "Bio 없음"}
                </p>

                <p className="text-base font-medium text-gray-200">
                  {email}
                </p>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={isEditing ? handleSubmit : () => setIsEditing(true)}
            disabled={updateProfileMutation.isPending}
            className="text-2xl text-white transition hover:scale-110 disabled:opacity-50"
            aria-label={isEditing ? "저장" : "수정"}
          >
            {isEditing ? "✓" : "⚙"}
          </button>
        </div>
      </div>
    </section>
  );
}
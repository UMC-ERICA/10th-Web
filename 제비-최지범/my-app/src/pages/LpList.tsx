import type { LP } from "../types/music";

import { useEffect, useState, useRef } from "react";
import type { PaginationDto } from "../types/common";
import useGetInfinityLpList from "../hooks/useGetInfinityLpList";
import { useInView } from "react-intersection-observer";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import useCreateLp from "../hooks/mutations/useCreateLp";

const LpList = () => {
  const [openModal, seOpenModal] = useState(false);
  const [lpAddData, setLpAddData] = useState({
    title: "",
    content: "",
    thumbnail: "",
    published: true,
    tags: [],
  });
  const [paginationDto, setPaginationDto] = useState<PaginationDto>({
    limit: 10,
    search: "",
    order: "asc",
  });
  const tagsRef = useRef<HTMLInputElement>(null);
  const handleOnchangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLpAddData({ ...lpAddData, [e.target.name]: e.target.value });
  };
  const closeModal = () => {
    seOpenModal(false);
    setLpAddData({
      title: "",
      content: "",
      thumbnail: "",
      published: true,
      tags: [],
    });
  };
  const handleAddTag = () => {
    if (tagsRef.current) {
      if (lpAddData.tags.includes(tagsRef.current.value)) {
        tagsRef.current.value = "";
        alert("이미 존재하는 태그입니다.");
        return;
      }
      setLpAddData({
        ...lpAddData,
        tags: [...lpAddData.tags, tagsRef.current.value],
      });
      tagsRef.current.value = "";
    }
  };
  const handleRemoveTag = (tag: string) => {
    setLpAddData({
      ...lpAddData,
      tags: lpAddData.tags.filter((t) => t !== tag),
    });
  };

  const { mutate: createLpMutation } = useCreateLp();

  const handleAddLp = () => {
    if (lpAddData.title === "") {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const postData = {
      title: lpAddData.title,
      content: lpAddData.content || "",
      tags: lpAddData.tags.length > 0 ? lpAddData.tags : ["없음"],
      thumbnail: lpAddData.thumbnail || "",
      published: lpAddData.published || true,
    };
    createLpMutation(postData);
    closeModal();
    setLpAddData({
      title: "",
      content: "",
      thumbnail: "",
      published: true,
      tags: [],
    });
  };

  const {
    data,
    isPending,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useGetInfinityLpList(
    paginationDto.limit,
    paginationDto.search,
    paginationDto.order,
  );
  const { ref, inView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching, isPending]);

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold">LP 목록</h1>
      <input
        type="text"
        placeholder="검색"
        onChange={(e) =>
          setPaginationDto({ ...paginationDto, search: e.target.value })
        }
      />
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => setPaginationDto({ ...paginationDto, order: "desc" })}
        >
          최신순
        </button>
        <button
          onClick={() => setPaginationDto({ ...paginationDto, order: "asc" })}
        >
          오래된순
        </button>
      </div>
      {isFetching && <div>데이터를 불러오는중입니다...</div>}
      {isError && <div>데이터를 불러오는중 오류가 생겼습니다.</div>}
      {error && <div>오류: {error.message}</div>}
      {isPending && <div>데이터를 불러오는중입니다...</div>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3 p-3">
        {data?.pages.map((page) =>
          page.data.data.map((lp: LP) => <Card key={lp.id} {...lp} />),
        )}
        {isFetching &&
          Array.from({ length: paginationDto.limit }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
      </div>

      <div ref={ref}>{inView && "-"}</div>
      <button
        onClick={() => seOpenModal(true)}
        className="fixed right-10 bottom-10 w-10 h-10 bg-red-500 text-white rounded-full text-2xl text-center items-center justify-center"
      >
        +
      </button>

      <div
        className={`${openModal ? "block" : "hidden"} fixed top-0 left-0 w-full h-full  bg-opacity-50`}
      >
        <div className="absolute bg-white rounded-lg p-4 shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="flex w-full justify-between items-center">
            <h2>LP 생성</h2>
            <button onClick={() => closeModal()}>X</button>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <img src={lpAddData.thumbnail} alt="썸네일" />
            <input
              type="text"
              placeholder="제목"
              onChange={handleOnchangeInput}
              name="title"
            />
            <input
              type="text"
              placeholder="내용"
              onChange={handleOnchangeInput}
              name="content"
            />
            <div className="flex gap-2">
              <input type="text" placeholder="태그" ref={tagsRef} />
              <button onClick={() => handleAddTag()}>Add</button>
            </div>

            <div>
              {lpAddData.tags.map((tag) => (
                <span onClick={() => handleRemoveTag(tag)} key={tag}>
                  {tag} x
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="썸네일"
              onChange={handleOnchangeInput}
              name="thumbnail"
            />
            <button
              onClick={() =>
                setLpAddData({ ...lpAddData, published: !lpAddData.published })
              }
            >
              {lpAddData.published ? "발매" : "미발매"}
            </button>
            <button onClick={() => handleAddLp()}>저장</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LpList;

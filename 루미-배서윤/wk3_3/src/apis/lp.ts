import axios from "axios";

export type SortType = "asc" | "desc";

export type Lp = {
  id: number;
  title: string;
  content?: string;
  thumbnail?: string;
  createdAt: string;
  likes?: number;
};

export type LpListPage = {
  data: Lp[];
  nextCursor: number | null;
  hasNext: boolean;
};

type LpListResponse = {
  data: LpListPage;
};

export const getLps = async ({
  sort,
  cursor,
}: {
  sort: SortType;
  cursor?: number | null;
}) => {
  const response = await axios.get("http://localhost:8000/v1/lps", {
    params: {
      order: sort,
      cursor,
      limit: 10,
    },
  });

  return response.data.data;
};


export const getLpDetail = async (lpid: string) => {
  const response = await axios.get(`http://localhost:8000/v1/lps/${lpid}`);

  return response.data.data;
};

export type CommentOrder = "asc" | "desc";

export type LpComment = {
  id: number;
  content: string;
  createdAt: string;
  author?: {
    name?: string;
  };
};

export type LpCommentPage = {
  data: LpComment[];
  nextCursor: number | null;
  hasNext: boolean;
};

type LpCommentResponse = {
  data: LpCommentPage;
};

export const getLpComments = async ({
  lpId,
  order,
  cursor,
}: {
  lpId: string;
  order: CommentOrder;
  cursor?: number | null;
}) => {
  const response = await axios.get<LpCommentResponse>(
    `http://localhost:8000/v1/lps/${lpId}/comments`,
    {
      params: {
        order,
        cursor,
        limit: 10,
      },
    }
  );

  return response.data.data;
};
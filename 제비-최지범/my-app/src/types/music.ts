export type LP = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  vote_average: number;
  tags: { id: number; name: string }[];
  likes: { id: number; userId: number; lpId: number }[];
  // 필요하다면 추가 필드도 정의 가능
};

export type LpResponseDto = {
  data: LP[];
  nextCursor: number;
  hasNext: boolean;
};

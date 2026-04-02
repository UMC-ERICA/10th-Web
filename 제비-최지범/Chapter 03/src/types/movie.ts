export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  // 필요하다면 추가 필드도 정의 가능
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export type MovieDetailResponse = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  runtime: number;
  vote_average: number;
  genres: { id: number; name: string }[];
};

export type Member = {
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: string | null;
  popularity: number;
};

export type MovieCredit = {
  cast: Member[];
  crew: Member[];
};

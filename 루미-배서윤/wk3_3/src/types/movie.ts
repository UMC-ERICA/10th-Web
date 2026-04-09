export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
};

export type MovieApiResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
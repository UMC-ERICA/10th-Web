import MoviePageLayout from '../components/MoviePageLayout';

export default function TopRated() {
  return <MoviePageLayout badge="#4" title="평점 높은 영화" endpoint="top_rated" />;
}

import MoviePageLayout from '../components/MoviePageLayout';

export default function NowPlaying() {
  return <MoviePageLayout badge="#2" title="상영 중인 영화" endpoint="now_playing" />;
}

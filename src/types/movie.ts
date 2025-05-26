
import { CalendarIcon as LucideCalendarIcon } from "lucide-react"; // Renaming to avoid conflict if CalendarIcon is used elsewhere

export interface Movie {
  id: string; // 영화코드
  titleKorean: string; // 영화명
  titleEnglish: string; // 영화명(영문)
  productionYear: number; // 제작연도
  productionCountry: string; // 제작국가
  type: string; // 유형 (e.g., 장편, 단편)
  genre: string; // 장르
  productionStatus: string; // 제작상태 (e.g., 개봉, 개봉예정)
  director: string; // 감독
  productionCompany: string; // 제작사
  releaseDate: string; // YYYY-MM-DD
}

export const sampleMovies: Movie[] = [
  {
    id: "20224492",
    titleKorean: "내가 잠들 때까지",
    titleEnglish: "When I Sleep",
    productionYear: 2022,
    productionCountry: "한국",
    type: "장편",
    genre: "드라마",
    productionStatus: "개봉예정",
    director: "최지훈",
    productionCompany: "(주)시네마달",
    releaseDate: "2025-07-01",
  },
  {
    id: "20255168",
    titleKorean: "극장판 여성향 게임의 파멸 플래그밖에 없는 악역 영애로 환생해버렸다…",
    titleEnglish: "BanG Dream! It's MyGO!!!!!",
    productionYear: 2024,
    productionCountry: "일본",
    type: "장편",
    genre: "애니메이션",
    productionStatus: "개봉예정",
    director: "카키모토 코다이",
    productionCompany: "",
    releaseDate: "2025-06-15",
  },
  {
    id: "20253956",
    titleKorean: "나를 모르는 그의 세계에서",
    titleEnglish: "My Beloved Stranger",
    productionYear: 2025,
    productionCountry: "일본",
    type: "장편",
    genre: "멜로/로맨스",
    productionStatus: "개봉",
    director: "미키 타카히로",
    productionCompany: "",
    releaseDate: "2025-05-20",
  },
  {
    id: "20223444",
    titleKorean: "미스치프 시흥",
    titleEnglish: "MISFITS [SIHEUNG]",
    productionYear: 2021,
    productionCountry: "한국",
    type: "단편",
    genre: "드라마",
    productionStatus: "기타",
    director: "김아무개",
    productionCompany: "독립영화사",
    releaseDate: "2021-10-10",
  },
  {
    id: "20244606",
    titleKorean: "새로 온 공기",
    titleEnglish: "All that saves us",
    productionYear: 2024,
    productionCountry: "한국",
    type: "장편",
    genre: "다큐멘터리",
    productionStatus: "개봉준비",
    director: "남보라, 문혜성, 김보람",
    productionCompany: "영화사보통",
    releaseDate: "2024-12-01",
  },
  {
    id: "20254931",
    titleKorean: "인피니트 13주년 콘서트 무비 인피니트 ＜컴백 어게인＞",
    titleEnglish: "",
    productionYear: 2025,
    productionCountry: "한국",
    type: "장편",
    genre: "공연",
    productionStatus: "개봉예정",
    director: "손석",
    productionCompany: "주식회사 케이엔",
    releaseDate: "2025-08-01",
  },
  {
    id: "20240001",
    titleKorean: "파묘",
    titleEnglish: "Exhuma",
    productionYear: 2024,
    productionCountry: "한국",
    type: "장편",
    genre: "미스터리, 공포",
    productionStatus: "개봉",
    director: "장재현",
    productionCompany: "(주)쇼박스",
    releaseDate: "2024-02-22",
  },
  {
    id: "20230002",
    titleKorean: "범죄도시3",
    titleEnglish: "The Roundup: No Way Out",
    productionYear: 2023,
    productionCountry: "한국",
    type: "장편",
    genre: "액션, 범죄",
    productionStatus: "개봉",
    director: "이상용",
    productionCompany: "에이비오엔터테인먼트",
    releaseDate: "2023-05-31",
  },
  {
    id: "20230003",
    titleKorean: "웡카",
    titleEnglish: "Wonka",
    productionYear: 2023,
    productionCountry: "미국",
    type: "장편",
    genre: "판타지, 드라마, 뮤지컬",
    productionStatus: "개봉",
    director: "폴 킹",
    productionCompany: "워너브라더스 코리아(주)",
    releaseDate: "2024-01-31",
  },
  {
    id: "20220004",
    titleKorean: "아바타: 물의 길",
    titleEnglish: "Avatar: The Way of Water",
    productionYear: 2022,
    productionCountry: "미국",
    type: "장편",
    genre: "SF, 액션, 어드벤처",
    productionStatus: "개봉",
    director: "제임스 카메론",
    productionCompany: "월트디즈니컴퍼니코리아 유한책임회사",
    releaseDate: "2022-12-14",
  }
];

export const CalendarIcon = LucideCalendarIcon; // Export renamed icon

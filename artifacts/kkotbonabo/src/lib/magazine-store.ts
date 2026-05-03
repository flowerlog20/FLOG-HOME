import mag1 from "@/assets/images/magazine_1.jpg";
import mag2 from "@/assets/images/magazine_2.jpg";
import mag3 from "@/assets/images/magazine_3.jpg";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface MagazineIssue {
  id: string;
  title: string;
  date: string;
  image: string;
  desc: string;
  pages: string[];
  captions: string[];
}

export const DEFAULT_ISSUES: MagazineIssue[] = [
  {
    id: "03",
    title: "여름의 잔상",
    date: "2024 Summer",
    image: mag1,
    desc: "뜨겁고 찬란했던, 그래서 더 아쉬운 우리의 계절에 대하여.",
    pages: [
      mag1,
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80",
    ],
    captions: [
      "Cover — 여름의 잔상",
      "그 여름, 우리는 모든 것이 영원할 것이라 믿었다.",
      "뜨거운 햇살 아래 잠시 멈춘 시간들.",
      "계절이 지나도 남아있는 기억의 온도.",
    ],
  },
  {
    id: "02",
    title: "새벽 두 시",
    date: "2024 Spring",
    image: mag2,
    desc: "가장 깊은 밤, 홀로 깨어있는 시간 속 요동치는 마음들.",
    pages: [
      mag2,
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      "https://images.unsplash.com/photo-1514565131-fce0801e6785?w=800&q=80",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
    ],
    captions: [
      "Cover — 새벽 두 시",
      "아무도 없는 새벽, 도시는 조용히 숨을 쉰다.",
      "이 시간에만 존재하는 나만의 세계.",
      "밤이 깊을수록 생각은 선명해진다.",
    ],
  },
  {
    id: "01",
    title: "첫 만남",
    date: "2023 Winter",
    image: mag3,
    desc: "우리가 처음 마주한 순간, 서툴지만 솔직했던 기록의 시작.",
    pages: [
      mag3,
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
      "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=800&q=80",
      "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=800&q=80",
    ],
    captions: [
      "Cover — 첫 만남",
      "처음은 언제나 서툴고, 그래서 아름답다.",
      "우리가 처음 꽃을 건넸던 그 골목.",
      "끝을 모른 채 시작한 이야기들.",
    ],
  },
];

const STORAGE_KEY = "flog_magazine_issues";
const AUTH_KEY = "flog_admin_auth";
const ADMIN_PASSWORD = "flog2024";
const EVENT_KEY = "flog_event_data";

export interface EventActivity {
  name: string;
  desc: string;
}

export interface EventData {
  active: boolean;
  title: string;
  subtitle: string;
  posterUrl: string;
  date: string;
  location: string;
  description: string;
  activities: EventActivity[];
  galleryImages: string[];
  formsUrl: string;
}

export const DEFAULT_EVENT: EventData = {
  active: true,
  title: "S-LOG",
  subtitle: "STRESS LOG",
  posterUrl: "/slog-poster.jpg",
  date: "2025년 5월 31일 (토)",
  location: "서울 (장소 미정)",
  description: "일상의 스트레스를 해소하고 나만의 것을 손으로 직접 만들어보는 오프라인 체험 행사입니다.",
  activities: [
    { name: "비즈 팔찌 만들기", desc: "나만의 컬러와 패턴으로 세상에 하나뿐인 비즈 팔찌를 만들어보세요." },
    { name: "나만의 키캡 만들기", desc: "커스텀 디자인으로 키보드 키캡을 직접 제작하는 체험입니다." },
    { name: "스트레스 파쇄 부스", desc: "종이 파쇄기에 스트레스 요인을 적어 직접 갈아버리세요." },
  ],
  galleryImages: [],
  formsUrl: "",
};

export function getEventData(): EventData {
  try {
    const raw = localStorage.getItem(EVENT_KEY);
    if (!raw) return DEFAULT_EVENT;
    const stored = JSON.parse(raw) as EventData;
    return {
      ...DEFAULT_EVENT,
      ...stored,
      posterUrl: stored.posterUrl || DEFAULT_EVENT.posterUrl,
    };
  } catch {
    return DEFAULT_EVENT;
  }
}

export function saveEventData(data: EventData): void {
  localStorage.setItem(EVENT_KEY, JSON.stringify(data));
}

export function getMagazineIssues(): MagazineIssue[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ISSUES;
    const parsed = JSON.parse(raw) as MagazineIssue[];
    return parsed;
  } catch {
    return DEFAULT_ISSUES;
  }
}

export function saveMagazineIssues(issues: MagazineIssue[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
}

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function setAdminLoggedIn(v: boolean): void {
  if (v) {
    sessionStorage.setItem(AUTH_KEY, "true");
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

/* ─── Firestore async functions ─── */

export async function getEventDataFromDB(): Promise<EventData> {
  try {
    const snap = await getDoc(doc(db, "config", "event"));
    if (!snap.exists()) return DEFAULT_EVENT;
    const stored = snap.data() as EventData;
    return {
      ...DEFAULT_EVENT,
      ...stored,
      posterUrl: stored.posterUrl || DEFAULT_EVENT.posterUrl,
    };
  } catch {
    return getEventData();
  }
}

export async function saveEventDataToDB(data: EventData): Promise<void> {
  await setDoc(doc(db, "config", "event"), data);
  saveEventData(data);
}

export async function getMagazineIssuesFromDB(): Promise<MagazineIssue[]> {
  try {
    const snap = await getDoc(doc(db, "config", "magazine"));
    if (!snap.exists()) return DEFAULT_ISSUES;
    return (snap.data().issues as MagazineIssue[]) ?? DEFAULT_ISSUES;
  } catch {
    return getMagazineIssues();
  }
}

export async function saveMagazineIssuesToDB(issues: MagazineIssue[]): Promise<void> {
  await setDoc(doc(db, "config", "magazine"), { issues });
  saveMagazineIssues(issues);
}

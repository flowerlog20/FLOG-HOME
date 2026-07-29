import mag1 from "@/assets/images/magazine_1.jpg";
import mag2 from "@/assets/images/magazine_2.jpg";
import mag3 from "@/assets/images/magazine_3.jpg";
import { db } from "./firebase";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";

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
const ADMIN_PASSWORD = "flog2026!";
const EVENT_KEY = "flog_event_data";
const POPUP_KEY = "flog_popup_data";

/* ─── Popup ─── */
export interface PopupData {
  id: string;
  createdAt: number;
  order: number;
  active: boolean;
  title: string;
  subtitle: string;
  posterUrl: string;
}

export const DEFAULT_POPUP: PopupData = {
  id: "",
  createdAt: 0,
  order: 0,
  active: true,
  title: "S-LOG",
  subtitle: "STRESS LOG",
  posterUrl: "/slog-poster.jpg",
};

export async function getPopupsFromDB(): Promise<PopupData[]> {
  try {
    const snap = await getDocs(collection(db, "popups"));
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as PopupData));
    return items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export async function savePopupToDB(popup: PopupData): Promise<void> {
  const { id, ...data } = popup;
  await setDoc(doc(db, "popups", id), data);
}

export async function deletePopupFromDB(id: string): Promise<void> {
  await deleteDoc(doc(db, "popups", id));
}

export interface EventActivity {
  name: string;
  desc: string;
}

export interface EventData {
  id: string;
  createdAt: number;
  active: boolean;
  title: string;
  subtitle: string;
  posterUrl: string;
  posterLink: string;
  date: string;
  location: string;
  fee: string;
  description: string;
  activities: EventActivity[];
  galleryImages: string[];
  formsUrl: string;
}

export const DEFAULT_EVENT: EventData = {
  id: "default",
  createdAt: 0,
  active: true,
  title: "S-LOG",
  subtitle: "STRESS LOG",
  posterUrl: "/slog-poster.jpg",
  posterLink: "",
  date: "2026년 5월 5일 (화) 14:00 - 15:30",
  location: "성수 더브루클린로프트",
  fee: "",
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

/* ─── Events collection (multi-event) ─── */
export async function getEventsFromDB(): Promise<EventData[]> {
  try {
    const snap = await getDocs(collection(db, "events"));
    const events = snap.docs.map(d => ({ ...DEFAULT_EVENT, ...(d.data() as EventData), id: d.id }));
    return events.sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export async function getEventByIdFromDB(id: string): Promise<EventData | null> {
  try {
    const snap = await getDoc(doc(db, "events", id));
    if (!snap.exists()) return null;
    return { ...DEFAULT_EVENT, ...(snap.data() as EventData), id: snap.id };
  } catch {
    return null;
  }
}

export async function saveEventToDB(event: EventData): Promise<void> {
  await setDoc(doc(db, "events", event.id), event);
}

export async function deleteEventFromDB(id: string): Promise<void> {
  await deleteDoc(doc(db, "events", id));
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

/* ─── Home ─── */
export interface InterviewQA {
  imageUrl?: string;
  question: string;
  answer: string;
}

export interface HomeInterview {
  imageUrl: string;
  tag: string;
  title: string;
  name: string;
  content?: InterviewQA[];
}

export interface HomeData {
  heroImages: string[];
  hero: {
    imageUrl: string;
    metaRight: string;
    metaLeft: string;
    title: string;
    desc: string;
  };
  philosophy: {
    quote1: string;
    quote2: string;
  };
  magazinePreview: {
    imageUrl: string;
    title: string;
    desc: string;
  };
  mindProfilePreview: {
    imageUrl: string;
    title: string;
    desc: string;
  };
  cta: {
    title: string;
    desc: string;
  };
  galleryImages: string[];
  interviews: HomeInterview[];
}

export const DEFAULT_HOME: HomeData = {
  heroImages: [],
  hero: {
    imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=2788&auto=format&fit=crop",
    metaRight: "Seoul · Est. 2026",
    metaLeft: "20대 기록 저장소",
    title: "FLOWER LOG MAGAZINE",
    desc: "우리의 20대를 기록합니다",
  },
  philosophy: {
    quote1: "우리는 20대를 기록합니다. 가장 젊은 날의 고민, 관계, 라이프스타일 그리고 내면의 목소리까지.",
    quote2: "불안과 설렘, 성장의 모든 결을 담아, 먼 훗날 당신이 꺼내볼 수 있는 기억의 서랍이 되겠습니다.",
  },
  magazinePreview: {
    imageUrl: "https://images.unsplash.com/photo-1497250681554-1823791a8bc4?q=80&w=2670&auto=format&fit=crop",
    title: "20대 라이프 매거진",
    desc: "20대의 고민과 관계, 라이프스타일을 진솔하게 담은 독립 매거진. 우리의 계절을 기록합니다.",
  },
  mindProfilePreview: {
    imageUrl: "https://images.unsplash.com/photo-1617611519550-4375695b85fe?w=900&auto=format&fit=crop&q=60",
    title: "마인드 프로필",
    desc: "단순히 외면을 담는 것이 아닌, 당신의 내면과 지금의 감정을 사진으로 남깁니다. 가장 자연스러운 모습 속에서 피어나는 각자의 꽃을 포착합니다.",
  },
  cta: {
    title: "우리와 함께 피어나요",
    desc: "FLOG의 에디터, 포토그래퍼, 그리고 모델이 되어주세요.",
  },
  galleryImages: [],
  interviews: [],
};

export async function getHomeDataFromDB(): Promise<HomeData> {
  try {
    const snap = await getDoc(doc(db, "config", "home"));
    if (!snap.exists()) return DEFAULT_HOME;
    const stored = snap.data() as HomeData;
    return {
      heroImages: stored.heroImages ?? DEFAULT_HOME.heroImages,
      hero: { ...DEFAULT_HOME.hero, ...stored.hero, title: stored.hero?.title ?? DEFAULT_HOME.hero.title, desc: stored.hero?.desc ?? DEFAULT_HOME.hero.desc },
      philosophy: { ...DEFAULT_HOME.philosophy, ...stored.philosophy },
      magazinePreview: { ...DEFAULT_HOME.magazinePreview, ...stored.magazinePreview },
      mindProfilePreview: { ...DEFAULT_HOME.mindProfilePreview, ...stored.mindProfilePreview },
      cta: { ...DEFAULT_HOME.cta, ...stored.cta },
      galleryImages: stored.galleryImages ?? DEFAULT_HOME.galleryImages,
      interviews: stored.interviews ?? DEFAULT_HOME.interviews,
    };
  } catch {
    return DEFAULT_HOME;
  }
}

export async function saveHomeDataToDB(data: HomeData): Promise<void> {
  await setDoc(doc(db, "config", "home"), data);
}

/* ─── About ─── */
export interface AboutWhatWeDoItem {
  num: string;
  title: string;
  en: string;
  desc: string;
}

export interface AboutData {
  story: string;
  whatWeDo: AboutWhatWeDoItem[];
  heroImageUrl?: string;
}

export const DEFAULT_ABOUT: AboutData = {
  story: "우리는 20대를 기록합니다. 가장 젊은 날의 고민, 관계, 라이프스타일 그리고 내면의 목소리까지. 불안과 설렘, 성장의 모든 결을 담아, 먼 훗날 당신이 꺼내볼 수 있는 기억의 서랍이 되겠습니다.",
  whatWeDo: [
    { num: "01", title: "매거진", en: "Magazine", desc: "현대를 살아가는 20대의 라이프스타일과 내면을 활자로 기록합니다. 계절마다 새로운 이야기를 엮어 종이 위에 청춘을 새깁니다." },
    { num: "02", title: "마인드 프로필", en: "Mind Profile", desc: "외면이 아닌 내면을 담는 사진. 지금 이 순간 당신이 느끼는 감정과 가장 솔직한 모습을 기록으로 남깁니다." },
    { num: "03", title: "아카이브", en: "Archive", desc: "우리가 함께 쌓아가는 청춘의 기록 저장소. 훗날 꺼내볼 수 있도록, 오늘의 우리를 차곡차곡 보존합니다." },
  ],
};

export async function getAboutDataFromDB(): Promise<AboutData> {
  try {
    const snap = await getDoc(doc(db, "config", "about"));
    if (!snap.exists()) return DEFAULT_ABOUT;
    const stored = snap.data() as AboutData;
    return { ...DEFAULT_ABOUT, ...stored };
  } catch {
    return DEFAULT_ABOUT;
  }
}

export async function saveAboutDataToDB(data: AboutData): Promise<void> {
  await setDoc(doc(db, "config", "about"), data);
}

/* ─── Mind Profile ─── */
export interface MindProfileData {
  subtitle: string;
  images: string[];
  previewImages: string[];
}

export const DEFAULT_MIND_PROFILE: MindProfileData = {
  subtitle: "가장 나다운 순간, 꾸미지 않은 감정의 편린들을 필름 위에 붙잡아둡니다.\n누구에게나 자신만의 고유한 빛이 있음을 기록합니다.",
  images: ["", "", ""],
  previewImages: [],
};

export async function getMindProfileDataFromDB(): Promise<MindProfileData> {
  try {
    const snap = await getDoc(doc(db, "config", "mind-profile"));
    if (!snap.exists()) return DEFAULT_MIND_PROFILE;
    return { ...DEFAULT_MIND_PROFILE, ...(snap.data() as MindProfileData) };
  } catch {
    return DEFAULT_MIND_PROFILE;
  }
}

export async function saveMindProfileDataToDB(data: MindProfileData): Promise<void> {
  await setDoc(doc(db, "config", "mind-profile"), data);
}

/* ─── Join ─── */
export interface JoinItem {
  index: string;
  title: string;
  en: string;
  desc: string;
  note: string;
  cta: string;
}

export interface JoinData {
  items: JoinItem[];
}

export const DEFAULT_JOIN: JoinData = {
  items: [
    {
      index: "01",
      title: "매거진 인터뷰",
      en: "Magazine Interview",
      desc: "당신의 일상, 고민, 그리고 20대라는 시간.\nFLOG는 평범한 하루 안에서 특별한 이야기를 발견합니다.\n우리가 당신의 이야기를 기록하겠습니다.",
      note: "현재는 서울 거주하는 20대 청년을 대상으로만 진행하고 있습니다.",
      cta: "인터뷰 신청",
    },
    {
      index: "02",
      title: "마인드 프로필",
      en: "Mind Profile",
      desc: "나는 어떤 사람인가.\n외면이 아닌 내면을 기록하는 FLOG만의 프로필 촬영.\n심리 기반 질문지와 함께 나를 사진으로 담아냅니다.",
      note: "진행 일정은 별도 안내드립니다.",
      cta: "프로필 신청",
    },
    {
      index: "03",
      title: "협업 및 문의",
      en: "Collaboration",
      desc: "브랜드, 공간, 창작자 누구와도 열려 있습니다.\n20대의 감각으로 함께 만들어갈 수 있다면,\nFLOG는 언제든 대화할 준비가 되어 있습니다.",
      note: "문의는 이메일로 받고 있습니다.",
      cta: "문의하기",
    },
  ],
};

export async function getJoinDataFromDB(): Promise<JoinData> {
  try {
    const snap = await getDoc(doc(db, "config", "join"));
    if (!snap.exists()) return DEFAULT_JOIN;
    return { ...DEFAULT_JOIN, ...(snap.data() as JoinData) };
  } catch {
    return DEFAULT_JOIN;
  }
}

export async function saveJoinDataToDB(data: JoinData): Promise<void> {
  await setDoc(doc(db, "config", "join"), data);
}

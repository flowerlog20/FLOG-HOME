import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  getMagazineIssuesFromDB,
  saveMagazineIssuesToDB,
  getEventDataFromDB,
  saveEventDataToDB,
  saveMagazineIssues,
  checkAdminPassword,
  isAdminLoggedIn,
  setAdminLoggedIn,
  DEFAULT_ISSUES,
  DEFAULT_EVENT,
  type MagazineIssue,
  type EventData,
} from "@/lib/magazine-store";
import {
  FaLock, FaUnlock, FaSignOutAlt, FaPlus, FaTrash,
  FaChevronDown, FaChevronUp, FaTimes, FaCheck, FaArrowLeft,
} from "react-icons/fa";

/* ─── LOGIN ─────────────────────────────────────────────── */
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAdminPassword(pw)) {
      setAdminLoggedIn(true);
      onLogin();
    } else {
      setError("비밀번호가 올바르지 않습니다.");
      setPw("");
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] flex items-center justify-center px-4">
      <div className="w-full max-w-xs">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-11 h-11 border border-foreground/15 mb-7">
            <FaLock className="text-foreground/35 text-xs" />
          </div>
          <h1 className="font-sans font-light text-xl tracking-[0.25em] uppercase text-foreground">FLOG</h1>
          <p className="font-sans text-[9px] tracking-[0.45em] uppercase text-foreground/35 mt-1.5">Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/40 block mb-3">
              비밀번호
            </label>
            <input
              type="password"
              value={pw}
              autoComplete="current-password"
              onChange={(e) => { setPw(e.target.value); setError(""); }}
              placeholder="••••••••"
              className="w-full border-b border-foreground/15 bg-transparent py-2.5 font-sans text-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors placeholder:text-foreground/15"
            />
            {error && (
              <p className="font-sans text-[10px] text-red-400 tracking-wide mt-2">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-foreground text-background font-sans text-[9px] tracking-[0.5em] uppercase hover:bg-foreground/85 transition-colors mt-2"
          >
            로그인
          </button>
        </form>

        <p className="font-sans text-[8px] tracking-widest text-foreground/20 text-center mt-10 uppercase">
          FLOG · Authorized Access Only
        </p>
      </div>
    </div>
  );
}

/* ─── FIELD helpers ──────────────────────────────────────── */
function Field({
  label, children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-sans text-[8.5px] tracking-[0.38em] uppercase text-foreground/35 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border-b border-foreground/12 bg-transparent py-2 font-sans text-[13px] text-foreground/80 focus:outline-none focus:border-foreground/40 transition-colors placeholder:text-foreground/20";

/* ─── ISSUE EDITOR ───────────────────────────────────────── */
function IssueEditor({
  issue,
  onDelete,
  onChange,
}: {
  issue: MagazineIssue;
  onDelete: () => void;
  onChange: (updated: MagazineIssue) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const set = (field: keyof MagazineIssue, val: string) =>
    onChange({ ...issue, [field]: val });

  const setPage = (i: number, val: string) => {
    const pages = [...issue.pages];
    pages[i] = val;
    onChange({ ...issue, pages });
  };

  const setCaption = (i: number, val: string) => {
    const captions = [...issue.captions];
    captions[i] = val;
    onChange({ ...issue, captions });
  };

  const addPage = () =>
    onChange({ ...issue, pages: [...issue.pages, ""], captions: [...issue.captions, ""] });

  const removePage = (i: number) =>
    onChange({
      ...issue,
      pages: issue.pages.filter((_, idx) => idx !== i),
      captions: issue.captions.filter((_, idx) => idx !== i),
    });

  return (
    <div className="bg-white border border-foreground/8 overflow-hidden">
      {/* Accordion header */}
      <div className="flex items-center px-5 py-3.5 gap-3">
        {/* Left: toggle trigger */}
        <button
          className="flex-1 flex items-center gap-3.5 text-left min-w-0"
          onClick={() => setExpanded((v) => !v)}
        >
          <span className="shrink-0 font-sans text-[8px] tracking-[0.45em] uppercase text-foreground/25 bg-foreground/5 px-2 py-1">
            {issue.id}
          </span>
          <span className="font-serif text-[15px] text-foreground/80 truncate">
            {issue.title || "(제목 없음)"}
          </span>
          <span className="font-sans text-[9px] tracking-widest text-foreground/25 shrink-0 hidden sm:inline">
            {issue.date}
          </span>
        </button>

        {/* Right: delete + chevron */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="text-red-400 hover:text-red-500 transition-colors"
            aria-label="이슈 삭제"
            title="이슈 삭제"
          >
            <FaTimes className="text-[13px]" />
          </button>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-foreground/25 hover:text-foreground/50 transition-colors"
          >
            {expanded
              ? <FaChevronUp className="text-[10px]" />
              : <FaChevronDown className="text-[10px]" />}
          </button>
        </div>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="border-t border-foreground/8 px-5 pb-6 pt-5 space-y-7">

          {/* Row 1: ID + Date */}
          <div className="grid grid-cols-2 gap-5">
            <Field label="호수 ID">
              <input className={inputCls} value={issue.id} onChange={(e) => set("id", e.target.value)} />
            </Field>
            <Field label="날짜">
              <input className={inputCls} value={issue.date} placeholder="2024 Summer" onChange={(e) => set("date", e.target.value)} />
            </Field>
          </div>

          {/* Row 2: Title */}
          <Field label="제목">
            <input className={inputCls} value={issue.title} onChange={(e) => set("title", e.target.value)} />
          </Field>

          {/* Row 3: Desc */}
          <Field label="소개 문구">
            <textarea
              className={`${inputCls} resize-none h-14 leading-relaxed`}
              value={issue.desc}
              onChange={(e) => set("desc", e.target.value)}
            />
          </Field>

          {/* Row 4: Cover image */}
          <Field label="커버 이미지 URL">
            <div className="flex gap-4 items-start">
              <input
                className={`${inputCls} flex-1`}
                value={issue.image}
                placeholder="https://..."
                onChange={(e) => set("image", e.target.value)}
              />
              {issue.image && (
                <img
                  src={issue.image}
                  alt="cover"
                  className="w-12 shrink-0 object-cover border border-foreground/8"
                  style={{ aspectRatio: "2159/2794" }}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
            </div>
          </Field>

          {/* Pages section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-sans text-[8.5px] tracking-[0.38em] uppercase text-foreground/35">
                내부 페이지
              </span>
              <button
                onClick={addPage}
                className="flex items-center gap-1.5 font-sans text-[8px] tracking-[0.35em] uppercase text-foreground/35 hover:text-foreground/60 transition-colors border border-foreground/12 px-2.5 py-1"
              >
                <FaPlus className="text-[7px]" /> 페이지 추가
              </button>
            </div>

            <div className="space-y-3">
              {issue.pages.map((pg, i) => (
                <div key={i} className="flex gap-3 items-start p-3 bg-foreground/[0.018] border border-foreground/6">
                  {/* Thumb */}
                  <div className="shrink-0 w-10 bg-foreground/5 border border-foreground/8 overflow-hidden" style={{ aspectRatio: "2159/2794" }}>
                    {pg && (
                      <img
                        src={pg}
                        alt={`p${i + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    )}
                  </div>

                  {/* Inputs */}
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-[8px] text-foreground/25 shrink-0 w-4">P{i + 1}</span>
                      <input
                        className={`${inputCls} text-xs`}
                        value={pg}
                        placeholder="이미지 URL"
                        onChange={(e) => setPage(i, e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-[8px] text-foreground/0 shrink-0 w-4">·</span>
                      <input
                        className={`${inputCls} text-xs text-foreground/50`}
                        value={issue.captions[i] ?? ""}
                        placeholder="캡션 텍스트"
                        onChange={(e) => setCaption(i, e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Delete page */}
                  <button
                    onClick={() => removePage(i)}
                    className="text-red-300 hover:text-red-500 transition-colors mt-1 shrink-0"
                    aria-label="페이지 삭제"
                  >
                    <FaTrash className="text-[10px]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── POPUP EDITOR ───────────────────────────────────────── */
function PopupEditor({ event, onChange }: { event: EventData; onChange: (e: EventData) => void }) {
  const set = (field: keyof EventData, val: unknown) => onChange({ ...event, [field]: val });
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between py-3 border-b border-foreground/8">
        <div>
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/50">팝업 활성화</span>
          <p className="font-sans text-[9px] text-foreground/30 mt-0.5">홈 화면 진입 시 팝업 노출 여부</p>
        </div>
        <button
          onClick={() => set("active", !event.active)}
          className={`relative w-11 h-6 rounded-full transition-colors ${event.active ? "bg-foreground" : "bg-foreground/20"}`}
        >
          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${event.active ? "left-6" : "left-1"}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="이벤트 제목">
          <input className={inputCls} value={event.title} onChange={e => set("title", e.target.value)} placeholder="S-LOG" />
        </Field>
        <Field label="부제 (Subtitle)">
          <input className={inputCls} value={event.subtitle} onChange={e => set("subtitle", e.target.value)} placeholder="STRESS LOG" />
        </Field>
      </div>

      <Field label="포스터 이미지 URL">
        <div className="flex gap-4 items-start">
          <input
            className={`${inputCls} flex-1`}
            value={event.posterUrl}
            onChange={e => set("posterUrl", e.target.value)}
            placeholder="https://..."
          />
          {event.posterUrl && (
            <img
              src={event.posterUrl}
              alt="poster"
              className="w-12 shrink-0 object-cover border border-foreground/8"
              style={{ aspectRatio: "905/1280" }}
              onError={e => (e.currentTarget.style.display = "none")}
            />
          )}
        </div>
      </Field>
    </div>
  );
}

/* ─── EVENT EDITOR ───────────────────────────────────────── */
function EventEditor({ event, onChange }: { event: EventData; onChange: (e: EventData) => void }) {
  const set = (field: keyof EventData, val: unknown) => onChange({ ...event, [field]: val });

  const setActivity = (i: number, field: "name" | "desc", val: string) => {
    const acts = [...event.activities];
    acts[i] = { ...acts[i], [field]: val };
    onChange({ ...event, activities: acts });
  };

  const addActivity = () =>
    onChange({ ...event, activities: [...event.activities, { name: "", desc: "" }] });

  const removeActivity = (i: number) =>
    onChange({ ...event, activities: event.activities.filter((_, idx) => idx !== i) });

  const setGallery = (i: number, val: string) => {
    const imgs = [...event.galleryImages];
    imgs[i] = val;
    onChange({ ...event, galleryImages: imgs });
  };

  const addGallery = () => onChange({ ...event, galleryImages: [...event.galleryImages, ""] });
  const removeGallery = (i: number) =>
    onChange({ ...event, galleryImages: event.galleryImages.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="일시">
          <input className={inputCls} value={event.date} onChange={e => set("date", e.target.value)} placeholder="2025년 5월 31일 (토)" />
        </Field>
        <Field label="장소">
          <input className={inputCls} value={event.location} onChange={e => set("location", e.target.value)} placeholder="서울 홍대" />
        </Field>
      </div>

      <Field label="행사 소개">
        <textarea
          className={`${inputCls} resize-none min-h-[72px]`}
          value={event.description}
          onChange={e => set("description", e.target.value)}
          placeholder="행사 소개 문구"
        />
      </Field>

      {/* Activities */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-sans text-[8.5px] tracking-[0.38em] uppercase text-foreground/35">프로그램</span>
          <button onClick={addActivity} className="flex items-center gap-1.5 font-sans text-[8px] tracking-[0.3em] uppercase text-foreground/40 hover:text-foreground/70 transition-colors">
            <FaPlus className="text-[7px]" /> 추가
          </button>
        </div>
        <div className="space-y-4">
          {event.activities.map((act, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className={inputCls} value={act.name} onChange={e => setActivity(i, "name", e.target.value)} placeholder="활동명" />
                <input className={inputCls} value={act.desc} onChange={e => setActivity(i, "desc", e.target.value)} placeholder="설명" />
              </div>
              <button onClick={() => removeActivity(i)} className="mt-2 text-red-400 hover:text-red-500 transition-colors shrink-0">
                <FaTrash className="text-[10px]" />
              </button>
            </div>
          ))}
          {event.activities.length === 0 && (
            <p className="font-sans text-[9px] text-foreground/25 tracking-wide">프로그램을 추가해주세요</p>
          )}
        </div>
      </div>

      {/* Gallery Images */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-sans text-[8.5px] tracking-[0.38em] uppercase text-foreground/35">예시 이미지 URL</span>
          <button onClick={addGallery} className="flex items-center gap-1.5 font-sans text-[8px] tracking-[0.3em] uppercase text-foreground/40 hover:text-foreground/70 transition-colors">
            <FaPlus className="text-[7px]" /> 추가
          </button>
        </div>
        <div className="space-y-3">
          {event.galleryImages.map((img, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input className={`${inputCls} flex-1`} value={img} onChange={e => setGallery(i, e.target.value)} placeholder="https://..." />
              <button onClick={() => removeGallery(i)} className="text-red-400 hover:text-red-500 transition-colors shrink-0">
                <FaTrash className="text-[10px]" />
              </button>
            </div>
          ))}
          {event.galleryImages.length === 0 && (
            <p className="font-sans text-[9px] text-foreground/25 tracking-wide">이미지 URL을 추가해주세요</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ADMIN PAGE ────────────────────────────────────── */
export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());
  const [issues, setIssues] = useState<MagazineIssue[]>([]);
  const [eventData, setEventData] = useState<EventData>(DEFAULT_EVENT);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"popup" | "event" | "magazine">("popup");
  const [, navigate] = useLocation();

  useEffect(() => {
    if (loggedIn) {
      getEventDataFromDB().then(setEventData);
      getMagazineIssuesFromDB().then(setIssues);
    }
  }, [loggedIn]);

  const handleLogout = () => { setAdminLoggedIn(false); setLoggedIn(false); };

  const handleSave = async () => {
    await Promise.all([
      saveMagazineIssuesToDB(issues),
      saveEventDataToDB(eventData),
    ]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (confirm("기본 데이터로 초기화하시겠습니까?")) {
      setIssues(DEFAULT_ISSUES);
      saveMagazineIssues(DEFAULT_ISSUES);
    }
  };

  const addIssue = () => {
    const newIssue: MagazineIssue = {
      id: String(issues.length + 1).padStart(2, "0"),
      title: "새 이슈",
      date: "2025",
      image: "",
      desc: "",
      pages: [""],
      captions: [""],
    };
    setIssues([newIssue, ...issues]);
  };

  const removeIssue = (idx: number) => {
    if (confirm("이 이슈를 삭제하시겠습니까?")) {
      setIssues(issues.filter((_, i) => i !== idx));
    }
  };

  if (!loggedIn) return <LoginForm onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-[#f4f3ef] flex flex-col">

      {/* ── Top bar ── */}
      <header className="bg-foreground text-background sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-5 md:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaUnlock className="text-background/30 text-[10px]" />
            <span className="font-sans font-light text-sm tracking-[0.22em] uppercase">FLOG</span>
            <span className="font-sans text-[8.5px] tracking-[0.35em] uppercase text-background/30 border-l border-background/10 pl-3">
              관리자
            </span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 font-sans text-[8.5px] tracking-[0.35em] uppercase text-background/35 hover:text-background/70 transition-colors"
            >
              <FaArrowLeft className="text-[8px]" /> 사이트
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 font-sans text-[8.5px] tracking-[0.35em] uppercase text-background/35 hover:text-background/70 transition-colors"
            >
              <FaSignOutAlt className="text-[10px]" /> 로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-8 pb-28">

        {/* Tabs */}
        <div className="flex gap-6 border-b border-foreground/10 mb-8">
          {(["popup", "event", "magazine"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-sans text-[9px] tracking-[0.4em] uppercase pb-3 border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-foreground text-foreground"
                  : "border-transparent text-foreground/35 hover:text-foreground/60"
              }`}
            >
              {tab === "popup" ? "팝업창" : tab === "event" ? "EVENT" : "MAGAZINE"}
            </button>
          ))}
        </div>

        {/* Popup tab */}
        {activeTab === "popup" && (
          <div>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="font-sans text-[8.5px] tracking-[0.45em] uppercase text-foreground/30 mb-1.5">Popup Editor</p>
                <h2 className="font-serif text-[22px] text-foreground/80">팝업창 관리</h2>
              </div>
              <button
                onClick={() => { if (confirm("기본 데이터로 초기화하시겠습니까?")) setEventData(DEFAULT_EVENT); }}
                className="font-sans text-[8.5px] tracking-[0.35em] uppercase text-foreground/30 hover:text-foreground/55 transition-colors"
              >
                초기화
              </button>
            </div>
            <div className="w-full h-px bg-foreground/8 mb-6" />
            <div className="bg-white border border-foreground/8 p-6">
              <PopupEditor event={eventData} onChange={setEventData} />
            </div>
          </div>
        )}

        {/* Event tab */}
        {activeTab === "event" && (
          <div>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="font-sans text-[8.5px] tracking-[0.45em] uppercase text-foreground/30 mb-1.5">Event Editor</p>
                <h2 className="font-serif text-[22px] text-foreground/80">EVENT 관리</h2>
              </div>
              <button
                onClick={() => { if (confirm("기본 데이터로 초기화하시겠습니까?")) setEventData(DEFAULT_EVENT); }}
                className="font-sans text-[8.5px] tracking-[0.35em] uppercase text-foreground/30 hover:text-foreground/55 transition-colors"
              >
                초기화
              </button>
            </div>
            <div className="w-full h-px bg-foreground/8 mb-6" />
            <div className="bg-white border border-foreground/8 p-6">
              <EventEditor event={eventData} onChange={setEventData} />
            </div>
          </div>
        )}

        {/* Magazine tab */}
        {activeTab === "magazine" && (
          <div>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="font-sans text-[8.5px] tracking-[0.45em] uppercase text-foreground/30 mb-1.5">
                  Magazine Issues Editor
                </p>
                <h2 className="font-serif text-[22px] text-foreground/80">매거진 관리</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="font-sans text-[8.5px] tracking-[0.35em] uppercase text-foreground/30 hover:text-foreground/55 transition-colors"
                >
                  초기화
                </button>
                <button
                  onClick={addIssue}
                  className="flex items-center gap-2 font-sans text-[8.5px] tracking-[0.3em] uppercase bg-foreground text-background px-4 py-2 hover:bg-foreground/80 transition-colors"
                >
                  <FaPlus className="text-[7px]" /> 새 이슈
                </button>
              </div>
            </div>
            <div className="w-full h-px bg-foreground/8 mb-5" />
            <div className="space-y-2">
              {issues.map((issue, idx) => (
                <IssueEditor
                  key={idx}
                  issue={issue}
                  onDelete={() => removeIssue(idx)}
                  onChange={(updated) => {
                    const next = [...issues];
                    next[idx] = updated;
                    setIssues(next);
                  }}
                />
              ))}
              {issues.length === 0 && (
                <div className="text-center py-16 border border-dashed border-foreground/10">
                  <p className="font-sans text-[10px] tracking-widest uppercase text-foreground/25">이슈가 없습니다</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ── Sticky save bar ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f4f3ef]/95 backdrop-blur border-t border-foreground/8 z-10">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <p className="font-sans text-[8.5px] tracking-widest uppercase text-foreground/25">
            저장 후 매거진 페이지에 즉시 반영됩니다
          </p>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 font-sans text-[9px] tracking-[0.4em] uppercase px-8 py-3 transition-colors ${
              saved
                ? "bg-foreground/15 text-foreground/50"
                : "bg-foreground text-background hover:bg-foreground/85"
            }`}
          >
            {saved && <FaCheck className="text-[9px]" />}
            {saved ? "저장 완료" : "변경사항 저장"}
          </button>
        </div>
      </div>
    </div>
  );
}

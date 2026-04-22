import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  getMagazineIssues,
  saveMagazineIssues,
  checkAdminPassword,
  isAdminLoggedIn,
  setAdminLoggedIn,
  DEFAULT_ISSUES,
  type MagazineIssue,
} from "@/lib/magazine-store";
import { FaLock, FaUnlock, FaSignOutAlt, FaPlus, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";

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
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 border border-foreground/20 mb-6">
            <FaLock className="text-foreground/40 text-sm" />
          </div>
          <h1 className="font-sans font-light text-2xl tracking-[0.2em] uppercase">FLOG</h1>
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-foreground/40 mt-1">관리자 로그인</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-sans text-[10px] tracking-[0.35em] uppercase text-foreground/50 block mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(""); }}
              placeholder="••••••••"
              className="w-full border-b border-foreground/20 bg-transparent py-2 font-sans text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/20"
            />
          </div>
          {error && (
            <p className="font-sans text-xs text-red-500 tracking-wide">{error}</p>
          )}
          <button
            type="submit"
            className="w-full mt-6 py-3 bg-foreground text-background font-sans text-[10px] tracking-[0.4em] uppercase hover:bg-foreground/80 transition-colors"
          >
            로그인
          </button>
        </form>

        <p className="font-sans text-[9px] tracking-widest text-foreground/25 text-center mt-8 uppercase">
          FLOG Admin · Authorized Access Only
        </p>
      </div>
    </div>
  );
}

function IssueEditor({
  issue,
  index,
  onChange,
}: {
  issue: MagazineIssue;
  index: number;
  onChange: (updated: MagazineIssue) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const update = (field: keyof MagazineIssue, value: string) => {
    onChange({ ...issue, [field]: value });
  };

  const updatePage = (i: number, value: string) => {
    const pages = [...issue.pages];
    pages[i] = value;
    onChange({ ...issue, pages });
  };

  const updateCaption = (i: number, value: string) => {
    const captions = [...issue.captions];
    captions[i] = value;
    onChange({ ...issue, captions });
  };

  const addPage = () => {
    onChange({
      ...issue,
      pages: [...issue.pages, ""],
      captions: [...issue.captions, ""],
    });
  };

  const removePage = (i: number) => {
    const pages = issue.pages.filter((_, idx) => idx !== i);
    const captions = issue.captions.filter((_, idx) => idx !== i);
    onChange({ ...issue, pages, captions });
  };

  return (
    <div className="border border-foreground/10 bg-white">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-foreground/[0.02] transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-4">
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/30">
            Issue {issue.id}
          </span>
          <span className="font-serif text-base text-foreground">{issue.title || "(제목 없음)"}</span>
        </div>
        {expanded ? <FaChevronUp className="text-foreground/30 text-xs" /> : <FaChevronDown className="text-foreground/30 text-xs" />}
      </button>

      {expanded && (
        <div className="px-6 pb-6 space-y-5 border-t border-foreground/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
            <div>
              <label className="label-style">호수 ID</label>
              <input
                className="input-style"
                value={issue.id}
                onChange={(e) => update("id", e.target.value)}
              />
            </div>
            <div>
              <label className="label-style">날짜</label>
              <input
                className="input-style"
                value={issue.date}
                onChange={(e) => update("date", e.target.value)}
                placeholder="예: 2024 Summer"
              />
            </div>
            <div className="md:col-span-2">
              <label className="label-style">제목</label>
              <input
                className="input-style"
                value={issue.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="label-style">소개 문구</label>
              <textarea
                className="input-style resize-none h-16"
                value={issue.desc}
                onChange={(e) => update("desc", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="label-style">커버 이미지 URL</label>
              <input
                className="input-style"
                value={issue.image}
                onChange={(e) => update("image", e.target.value)}
                placeholder="https://..."
              />
              {issue.image && (
                <img
                  src={issue.image}
                  alt="preview"
                  className="mt-2 h-20 object-cover border border-foreground/10"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="label-style mb-0">내부 페이지 이미지 + 캡션</label>
              <button
                onClick={addPage}
                className="flex items-center gap-1.5 font-sans text-[9px] tracking-[0.35em] uppercase text-foreground/40 hover:text-foreground transition-colors"
              >
                <FaPlus className="text-[8px]" /> 페이지 추가
              </button>
            </div>

            <div className="space-y-4">
              {issue.pages.map((pg, i) => (
                <div key={i} className="flex gap-3 items-start p-3 bg-foreground/[0.02] border border-foreground/5">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-[9px] text-foreground/30 w-5 shrink-0">P{i + 1}</span>
                      <input
                        className="input-style flex-1 text-xs"
                        value={pg}
                        onChange={(e) => updatePage(i, e.target.value)}
                        placeholder="이미지 URL"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-[9px] text-foreground/30 w-5 shrink-0"></span>
                      <input
                        className="input-style flex-1 text-xs"
                        value={issue.captions[i] ?? ""}
                        onChange={(e) => updateCaption(i, e.target.value)}
                        placeholder="캡션 텍스트"
                      />
                    </div>
                    {pg && (
                      <div className="flex gap-2 ml-5">
                        <img
                          src={pg}
                          alt={`p${i + 1}`}
                          className="h-14 object-cover border border-foreground/10"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removePage(i)}
                    className="text-red-400/60 hover:text-red-500 transition-colors mt-1 shrink-0"
                    aria-label="삭제"
                  >
                    <FaTrash className="text-xs" />
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

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());
  const [issues, setIssues] = useState<MagazineIssue[]>([]);
  const [saved, setSaved] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (loggedIn) {
      setIssues(getMagazineIssues());
    }
  }, [loggedIn]);

  const handleLogin = () => setLoggedIn(true);

  const handleLogout = () => {
    setAdminLoggedIn(false);
    setLoggedIn(false);
  };

  const handleSave = () => {
    saveMagazineIssues(issues);
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

  if (!loggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      <style>{`
        .label-style {
          display: block;
          font-family: var(--font-sans, sans-serif);
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
          margin-bottom: 6px;
        }
        .input-style {
          width: 100%;
          border-bottom: 1px solid rgba(0,0,0,0.12);
          background: transparent;
          padding: 6px 0;
          font-size: 13px;
          font-family: var(--font-sans, sans-serif);
          color: rgba(0,0,0,0.8);
          outline: none;
          transition: border-color 0.2s;
        }
        .input-style:focus {
          border-color: rgba(0,0,0,0.5);
        }
      `}</style>

      {/* Header */}
      <div className="bg-foreground text-background px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaUnlock className="text-background/40 text-sm" />
          <div>
            <span className="font-sans font-light text-base tracking-[0.2em]">FLOG</span>
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-background/40 ml-3">관리자 페이지</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="font-sans text-[9px] tracking-[0.35em] uppercase text-background/40 hover:text-background transition-colors"
          >
            사이트로 이동
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-sans text-[9px] tracking-[0.35em] uppercase text-background/40 hover:text-background transition-colors"
          >
            <FaSignOutAlt className="text-xs" />
            로그아웃
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl text-foreground">매거진 관리</h2>
            <p className="font-sans text-[10px] tracking-widest text-foreground/40 uppercase mt-1">
              Magazine Issues Editor
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="font-sans text-[9px] tracking-[0.3em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors border-b border-foreground/10 pb-0.5"
            >
              초기화
            </button>
            <button
              onClick={addIssue}
              className="flex items-center gap-2 font-sans text-[9px] tracking-[0.3em] uppercase border border-foreground/20 px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
            >
              <FaPlus className="text-[8px]" /> 새 이슈
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {issues.map((issue, idx) => (
            <div key={idx} className="relative group">
              <IssueEditor
                issue={issue}
                index={idx}
                onChange={(updated) => {
                  const next = [...issues];
                  next[idx] = updated;
                  setIssues(next);
                }}
              />
              <button
                onClick={() => removeIssue(idx)}
                className="absolute top-4 right-10 opacity-0 group-hover:opacity-100 font-sans text-[8px] tracking-widest uppercase text-red-400/60 hover:text-red-500 transition-all"
              >
                이슈 삭제
              </button>
            </div>
          ))}
        </div>

        {/* Save button */}
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={handleSave}
            className="flex-1 py-3.5 bg-foreground text-background font-sans text-[10px] tracking-[0.45em] uppercase hover:bg-foreground/80 transition-colors"
          >
            {saved ? "저장 완료 ✓" : "변경사항 저장"}
          </button>
        </div>
        <p className="font-sans text-[9px] text-foreground/25 tracking-widest text-center mt-4 uppercase">
          저장 후 매거진 페이지에 즉시 반영됩니다
        </p>
      </div>
    </div>
  );
}

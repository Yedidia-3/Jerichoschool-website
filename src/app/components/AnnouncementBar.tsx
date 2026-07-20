import { Link, useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";
import type { MouseEvent } from "react";
import { useAnnouncements } from "../hooks/useAnnouncements";
import type { Announcement, QuickLink } from "../data/announcements";

interface Props {
  announcements: Announcement[];
  quickLinks: QuickLink[];
}

export function AnnouncementBar({ announcements, quickLinks }: Props) {
  const { current, total, index, visible, pause, resume } = useAnnouncements(announcements);
  const navigate = useNavigate();

  const handleQuickLink = (link: QuickLink, e: MouseEvent) => {
    if (!link.scrollTo) return;
    e.preventDefault();
    navigate(link.href);
    setTimeout(() => {
      document.getElementById(link.scrollTo!)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  if (!current) return null;

  return (
    <div
      className="w-full bg-blue-900 dark:bg-slate-900 border-b border-blue-800 dark:border-slate-700"
      role="region"
      aria-label="Announcements and quick links"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">

        {/* LEFT — rotating announcements */}
        <div
          className="flex items-center gap-2 min-w-0 flex-1"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
        >
          {/* "Announcements" label — desktop only */}
          <span className="hidden sm:flex items-center gap-1.5 shrink-0 text-blue-300 dark:text-slate-400 text-[11px] font-semibold uppercase tracking-widest border-r border-blue-700 dark:border-slate-600 pr-3 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-slate-400 animate-pulse" />
            News
          </span>

          {/* Announcement text — slides up/down */}
          <div
            className="overflow-hidden h-5 flex items-center min-w-0 flex-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <Link
              to={current.href}
              className={`
                flex items-center gap-1.5 text-white text-xs sm:text-[13px] font-medium
                truncate transition-all duration-300 ease-in-out
                hover:text-blue-200 dark:hover:text-slate-300
                focus:outline-none focus-visible:underline
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
              `}
            >
              <span className="shrink-0 text-sm leading-none" aria-hidden="true">
                <current.icon className="h-3.5 w-3.5" />
              </span>
              <span className="truncate">{current.title}</span>
              <ChevronRight className="h-3 w-3 shrink-0 opacity-60" />
            </Link>
          </div>

          {/* Dot indicators */}
          {total > 1 && (
            <div className="hidden sm:flex items-center gap-1 shrink-0 ml-2" aria-hidden="true">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={`block rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-3 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-blue-600 dark:bg-slate-600"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-4 w-px bg-blue-700 dark:bg-slate-600 shrink-0" aria-hidden="true" />

        {/* RIGHT — permanent quick links */}
        <nav
          aria-label="Quick links"
          className="flex items-center gap-0.5 shrink-0"
        >
          {quickLinks.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              onClick={(e) => handleQuickLink(link, e)}
              className="
                flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded
                text-blue-200 dark:text-slate-400 text-[11px] sm:text-xs font-medium
                hover:text-white hover:bg-blue-800 dark:hover:bg-slate-700
                focus:outline-none focus-visible:ring-1 focus-visible:ring-white
                transition-colors duration-150
              "
            >
              <span className="shrink-0" aria-hidden="true">
                <link.icon className="h-3.5 w-3.5" />
              </span>
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}
        </nav>

      </div>
    </div>
  );
}

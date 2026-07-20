import type { LucideIcon } from "lucide-react";
import {
  GraduationCap,
  CalendarDays,
  Megaphone,
  Trophy,
  CreditCard,
  FilePen,
  Phone,
} from "lucide-react";

export interface Announcement {
  id: string;
  icon: LucideIcon;
  title: string;
  href: string;
  active: boolean;
  priority: number; // lower number = shown first
}

export interface QuickLink {
  id: string;
  icon: LucideIcon;
  label: string;
  href: string;
  scrollTo?: string; // element id to smooth-scroll to after navigation
}

export const announcements: Announcement[] = [
  {
    id: "admissions-2027",
    icon: GraduationCap,
    title: "Admissions for 2027 are now open",
    href: "/school/apply",
    active: true,
    priority: 1,
  },
  {
    id: "graduation-2025",
    icon: CalendarDays,
    title: "Graduation Ceremony — August 15, 2025",
    href: "/school/news-events",
    active: true,
    priority: 2,
  },
  {
    id: "parent-meeting",
    icon: Megaphone,
    title: "Parent Meeting this Friday at 3:00 PM",
    href: "/school/news-events",
    active: true,
    priority: 3,
  },
  {
    id: "exam-results",
    icon: Trophy,
    title: "National Examination Results Released",
    href: "/school/news-events",
    active: true,
    priority: 4,
  },
];

export const quickLinks: QuickLink[] = [
  { id: "calendar", icon: CalendarDays, label: "Calendar",    href: "/school/news-events" },
  { id: "fees",     icon: CreditCard,   label: "School Fees", href: "/school/news-events?tab=publications" },
  { id: "apply",    icon: FilePen,      label: "Apply Now",   href: "/school/apply" },
  { id: "contact",  icon: Phone,        label: "Contact",     href: "/school", scrollTo: "contact" },
];

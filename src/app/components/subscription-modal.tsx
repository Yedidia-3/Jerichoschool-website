import React, { useState } from "react";
import confetti from "canvas-confetti";
import { X, Mail, User, Info, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("parent");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    // Save interest to localStorage
    const subscriber = { name, email, interest, date: new Date().toISOString() };
    const existing = localStorage.getItem("jericho_subscribers");
    const list = existing ? JSON.parse(existing) : [];
    list.push(subscriber);
    localStorage.setItem("jericho_subscribers", JSON.stringify(list));

    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white/10 dark:bg-slate-900/35 border border-white/20 dark:border-slate-800/40 p-8 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-300 text-slate-800 dark:text-slate-100">
        
        {/* Glowing spots */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-amber-400">
                Enroll Your Interest
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Join the Jericho family today! Subscribe to newsletters and admissions updates.
              </p>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 animate-pulse" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/20 bg-white/5 placeholder-slate-400 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/20 bg-white/5 placeholder-slate-400 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Interest */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Your Primary Interest</label>
                <div className="relative">
                  <Info className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="parent" className="bg-slate-900 text-white">Parent seeking enrollment</option>
                    <option value="student" className="bg-slate-900 text-white">Prospective Student</option>
                    <option value="researcher" className="bg-slate-900 text-white">Academic researcher</option>
                    <option value="supporter" className="bg-slate-900 text-white">Jericho supporter</option>
                  </select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Submit Application
            </Button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-6 relative z-10 animate-in fade-in duration-500">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-bounce">
              <CheckCircle2 className="h-16 w-16" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-extrabold tracking-tight text-emerald-400">
                Welcome to Jericho!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Hi <strong className="text-slate-950 dark:text-slate-50">{name}</strong>, we've registered your interest as a <strong className="text-slate-950 dark:text-slate-50">{interest}</strong>!
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                We've sent a subscription confirmation to <span className="underline">{email}</span>. Look out for admissions newsletters soon!
              </p>
            </div>
            <Button
              onClick={onClose}
              className="w-full py-5 rounded-xl font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-slate-800 dark:text-slate-100 shadow transition-all duration-300 cursor-pointer"
            >
              Explore Gateway
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

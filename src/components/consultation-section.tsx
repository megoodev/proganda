"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Film,
  LoaderCircle,
  Sparkles,
  Users,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ConsultationSection({
  labels,
}: {
  labels: {
    eyebrow: string;
    title: string;
    subtitle: string;
    badge: string;
    track1Title: string;
    track1Desc: string;
    track2Title: string;
    track2Desc: string;
    track3Title: string;
    track3Desc: string;
    name: string;
    email: string;
    type: string;
    date: string;
    notes: string;
    submit: string;
    success: string;
  };
}) {
  const [selectedTrack, setSelectedTrack] = useState<string>("track1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 900);
  };

  const tracks = [
    {
      id: "track1",
      icon: Compass,
      title: labels.track1Title,
      desc: labels.track1Desc,
      accent: "#ccff00",
    },
    {
      id: "track2",
      icon: Film,
      title: labels.track2Title,
      desc: labels.track2Desc,
      accent: "#ff007f",
    },
    {
      id: "track3",
      icon: Users,
      title: labels.track3Title,
      desc: labels.track3Desc,
      accent: "#8a2be2",
    },
  ];

  return (
    <section
      id="consultation"
      className="relative border-y border-white/10 bg-[#0d0d0d] py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#ff007f]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#ccff00]/30 bg-[#ccff00]/10 mb-4">
            <Sparkles className="size-3.5 text-[#ccff00]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ccff00]">
              {labels.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.05em] text-white">
            {labels.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/55 leading-relaxed">
            {labels.subtitle}
          </p>
        </div>

        {/* Tracks Selector */}
        <div className="grid gap-4 md:grid-cols-3 mb-10">
          {tracks.map((track) => {
            const Icon = track.icon;
            const isSelected = selectedTrack === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedTrack(track.id)}
                className={`text-start p-6 border transition-all duration-200 relative ${
                  isSelected
                    ? "border-[#ccff00] bg-white/[0.04] shadow-[0_0_25px_rgba(204,255,0,0.12)]"
                    : "border-white/10 bg-[#141414] hover:border-white/30"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#ccff00]" />
                )}
                <div
                  className="flex size-10 items-center justify-center mb-4 border border-white/15"
                  style={{ backgroundColor: `${track.accent}15` }}
                >
                  <Icon className="size-5" style={{ color: track.accent }} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {track.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  {track.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Booking Form Card */}
        <div className="border border-white/10 bg-[#141414] p-6 sm:p-10">
          {success ? (
            <div className="text-center py-10">
              <CheckCircle2 className="mx-auto size-14 text-[#ccff00] animate-bounce" />
              <h3 className="mt-5 text-2xl font-black text-white">
                {labels.success}
              </h3>
              <p className="mt-2 text-sm text-white/60 max-w-md mx-auto">
                We have reserved your slot. A calendar invitation with Google Meet details has been dispatched.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-6 text-xs uppercase tracking-widest text-[#ccff00] font-bold hover:underline"
              >
                ← Book another session
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/10 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                <Calendar className="size-4 text-[#ccff00]" />
                <span>Session Reservation Form</span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                    {labels.name} *
                  </label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Vance"
                    className="bg-black/50 border-white/15 focus:border-[#ccff00] h-12 text-sm text-white"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                    {labels.email} *
                  </label>
                  <Input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="bg-black/50 border-white/15 focus:border-[#ccff00] h-12 text-sm text-white"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                    {labels.date} *
                  </label>
                  <Input
                    required
                    type="text"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    placeholder="e.g. Next Tuesday at 2:00 PM GMT+3"
                    className="bg-black/50 border-white/15 focus:border-[#ccff00] h-12 text-sm text-white"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                    Consultation Track
                  </label>
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    className="bg-black/50 border border-white/15 focus:border-[#ccff00] h-12 px-3 text-sm text-white outline-none"
                  >
                    <option value="track1">{labels.track1Title}</option>
                    <option value="track2">{labels.track2Title}</option>
                    <option value="track3">{labels.track3Title}</option>
                  </select>
                </div>

                <div className="grid gap-2 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                    {labels.notes}
                  </label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Briefly describe your brand goals or questions for our creative team..."
                    className="bg-black/50 border-white/15 focus:border-[#ccff00] h-12 text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Clock className="size-3.5 text-[#ccff00]" />
                  <span>30 minutes • Google Meet / Zoom • Free advisory</span>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-[#ccff00] text-black font-black uppercase tracking-wider text-xs h-12 px-8 hover:bg-white transition-all shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <LoaderCircle className="size-4 animate-spin" />
                      Booking...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {labels.submit}
                      <ArrowRight className="size-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

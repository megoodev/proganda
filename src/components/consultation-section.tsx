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
  User,
  Mail,
  Layers,
  MessageSquare,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      accent: "var(--primary)",
    },
    {
      id: "track2",
      icon: Film,
      title: labels.track2Title,
      desc: labels.track2Desc,
      accent: "#38bdf8",
    },
    {
      id: "track3",
      icon: Users,
      title: labels.track3Title,
      desc: labels.track3Desc,
      accent: "#a855f7",
    },
  ];

  return (
    <section
      id="consultation"
      className="relative border-y border-border/80 bg-background/50 backdrop-blur-xl py-24 lg:py-32 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 size-96 bg-primary/10 rounded-none blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 size-96 bg-primary/5 rounded-none blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none border border-primary/20 bg-primary/10 text-primary mb-6 shadow-sm">
            <Sparkles className="size-3.5 animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]">
              {labels.badge}
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-foreground leading-[1.05]">
            {labels.title}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {labels.subtitle}
          </p>
        </div>

        {/* Tracks Grid Selector */}
        <div className="grid gap-4 md:grid-cols-3 mb-12">
          {tracks.map((track) => {
            const Icon = track.icon;
            const isSelected = selectedTrack === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedTrack(track.id)}
                className={`group relative text-start p-6 rounded-sm border transition-all duration-300 ease-out overflow-hidden ${
                  isSelected
                    ? "border-primary/80 bg-card/90 shadow-xl shadow-primary/5 ring-1 ring-primary/30"
                    : "border-border/60 bg-card/40 hover:bg-card/80 hover:border-border"
                }`}
              >
                {/* Active Indicator Strip */}
                <div
                  className={`absolute top-0 inset-x-0 h-1 transition-opacity duration-300 ${
                    isSelected ? "opacity-100 bg-primary" : "opacity-0"
                  }`}
                />

                <div className="flex items-center justify-between mb-5">
                  <div className="flex size-11 items-center justify-center rounded-sm bg-primary/10 border border-primary/20 text-primary transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-5" />
                  </div>
                  {isSelected && (
                    <BadgeCheck className="size-5 text-primary animate-in fade-in zoom-in duration-200" />
                  )}
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {track.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {track.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <Card className="relative rounded-sm overflow-hidden border-border/80 bg-card/60 backdrop-blur-md shadow-2xl">
          {success ? (
            <CardContent className="text-center py-16 px-6">
              <div className="inline-flex p-4 rounded-sm bg-primary/10 text-primary border border-primary/20 mb-6">
                <CheckCircle2 className="size-12 animate-in zoom-in duration-300" />
              </div>
              <h3 className="text-3xl font-black text-foreground tracking-tight">
                {labels.success}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                We have reserved your slot. A calendar invitation with video call details has been sent to your email.
              </p>
              <Button
                variant="outline"
                onClick={() => setSuccess(false)}
                className="mt-8 font-bold text-xs uppercase tracking-widest"
              >
                Book another session
              </Button>
            </CardContent>
          ) : (
            <>
              <CardHeader className="p-6 sm:p-10 pb-0 sm:pb-0">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-sm bg-primary/10 text-primary border border-primary/20">
                    <Calendar className="size-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                      Session Reservation
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Fill out your contact info to confirm your slot
                    </p>
                  </div>
                </div>
                <Separator className="mt-6" />
              </CardHeader>

              <CardContent className="p-6 sm:p-10">
                <form onSubmit={handleSubmit} className="grid gap-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="consultation-name">
                        {labels.name} *
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupAddon >
                          <User className="size-4 text-muted-foreground" />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="consultation-name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Alex Vance"
                        />
                      </InputGroup>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="consultation-email">
                        {labels.email} *
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupAddon >
                          <Mail className="size-4 text-muted-foreground" />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="consultation-email"
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@company.com"
                        />
                      </InputGroup>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="consultation-date">
                        {labels.date} *
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupAddon >
                          <Calendar className="size-4 text-muted-foreground" />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="consultation-date"
                          required
                          type="text"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          placeholder="Next Tuesday at 2:00 PM GMT+3"
                        />
                      </InputGroup>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="consultation-track">
                        Consultation Track *
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupAddon >
                          <Layers className="size-4 text-muted-foreground" />
                        </InputGroupAddon>
                        <Select
                          value={selectedTrack}
                          onValueChange={setSelectedTrack}
                        >
                          <SelectTrigger
                            id="consultation-track"
                            className="border-0 shadow-none focus:ring-0 rounded-sm bg-transparent h-full"
                          >
                            <SelectValue placeholder="Select consultation track" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="track1">
                              {labels.track1Title}
                            </SelectItem>
                            <SelectItem value="track2">
                              {labels.track2Title}
                            </SelectItem>
                            <SelectItem value="track3">
                              {labels.track3Title}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </InputGroup>
                    </Field>

                    <Field className="sm:col-span-2">
                      <FieldLabel htmlFor="consultation-notes">
                        {labels.notes}
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupAddon  className="items-start pt-3">
                          <MessageSquare className="size-4 text-muted-foreground" />
                        </InputGroupAddon>
                        <Textarea
                          id="consultation-notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Briefly describe your goals or questions..."
                          rows={4}
                          className="border-0 shadow-none focus-visible:ring-0 rounded-sm bg-transparent resize-none py-2.5"
                        />
                      </InputGroup>
                    </Field>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/80">
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground bg-muted/40 px-3.5 py-2 rounded-sm border border-border/50">
                      <Clock className="size-3.5 text-primary" />
                      <span>30 mins • Remote Call • Advisory</span>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="w-full sm:w-auto h-12 px-8 font-bold uppercase tracking-wider text-xs shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all"
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
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </section>
  );
}
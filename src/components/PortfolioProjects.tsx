import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

type Project = {
  id: string;
  title: string;
  client: string;
  impact: string;
  description: string;
  tags: string[];
  link?: string;
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Predictive Offer Engine",
    client: "NovaReach Media",
    impact: "+41% CPL drop, +27% ROAS",
    description:
      "AI scoring model serving hyper-relevant offers across paid funnels.",
    tags: ["Real-time AI", "Meta Ads", "Offer Scoring"],
    link: "#",
  },
  {
    id: "p2",
    title: "AI Lead Qualifier",
    client: "PixelBridge Agency",
    impact: "3.2× SQL rate",
    description:
      "Voice/chat agent pre-qualifies inbound leads and books calls.",
    tags: ["Voice Agent", "RAG", "HubSpot"],
    link: "#",
  },
  {
    id: "p3",
    title: "Creative Variants Generator",
    client: "AdCraft Labs",
    impact: "+55% creative throughput",
    description:
      "Automated ideation & copy variants with brand guardrails.",
    tags: ["GenAI", "Brand Guardrails", "A/B Testing"],
    link: "#",
  },
  {
    id: "p4",
    title: "Churn Risk Scoring",
    client: "RevLoop Studio",
    impact: "-22% churn in 90 days",
    description:
      "Predicted churn from CRM + billing + support and triggered offers.",
    tags: ["LTV", "Churn ML", "Lifecycle"],
    link: "#",
  },
  {
    id: "p5",
    title: "Search Intent Expansion",
    client: "BrightBeam Growth",
    impact: "+38% qualified traffic",
    description:
      "Keyword clustering & intent mapping for SEO/PPC scaling.",
    tags: ["NLP", "SEO", "Clustering"],
    link: "#",
  },
  {
    id: "p6",
    title: "Revenue Attribution Copilot",
    client: "Orbit Marketing",
    impact: "Full-funnel clarity",
    description:
      "AI copilot answering ‘why’ behind ad spend with plain-English BI.",
    tags: ["Attribution", "BI Copilot", "Multi-Touch"],
    link: "#",
  },
];

export default function PortfolioCarousel() {
  const [page, setPage] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(PROJECTS.length / 2); // always 2 per slide

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  // Touch swipe
  const touch = useRef<{ startX: number; dx: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) =>
    (touch.current = { startX: e.touches[0].clientX, dx: 0 });
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touch.current) return;
    touch.current.dx = e.touches[0].clientX - touch.current.startX;
  };
  const onTouchEnd = () => {
    if (!touch.current) return;
    if (touch.current.dx > 60) goPrev();
    if (touch.current.dx < -60) goNext();
    touch.current = null;
  };

  // Split into chunks of 2
  const slides = useMemo(() => {
    const out: Project[][] = [];
    for (let i = 0; i < PROJECTS.length; i += 2) {
      out.push(PROJECTS.slice(i, i + 2));
    }
    return out;
  }, []);

  return (
    <section
      className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
      aria-label="Our Portfolio"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-thin text-white leading-tight mb-4">
            Proven{" "}
            <span
              className="italic"
              style={{
                background:
                  "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI Outcomes
            </span>
          </h2>
          <p className="text-white/70 font-extralight">
            A snapshot of recent wins for marketing teams.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={wrapRef}
          className="relative overflow-hidden select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Track */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${100 * totalPages}%`,
              transform: `translateX(-${page * (100 / totalPages)}%)`,
            }}
          >
            {slides.map((group, idx) => (
              <div
                key={idx}
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6 px-2"
                style={{ width: `${100 / totalPages}%` }}
              >
                {group.map((p) => (
                  <article
                    key={p.id}
                    className="relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-lg hover:shadow-red-600/30 transition-all duration-300 p-6 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-light text-white">
                        {p.title}
                      </h3>
                      {p.link && (
                        <a
                          href={p.link}
                          className="text-white/70 hover:text-white"
                          aria-label={`Open ${p.client}`}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-white/60 mb-2">{p.client}</p>
                    <p className="text-white/80 font-extralight leading-relaxed mb-4">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-1 rounded-full bg-black/40 border border-white/15 text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-3">
                      <div className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600/30 to-red-500/30 border border-red-500/30">
                        <span className="text-sm text-white/90">{p.impact}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>

        {/* Overlay Arrows — responsive & clamped so they stay visible */}
<button
  onClick={goPrev}
  disabled={page === 0}
  aria-label="Previous"
  className="
    pointer-events-auto absolute top-1/2 -translate-y-1/2 z-20
    flex items-center justify-center
    h-10 w-10 md:h-12 md:w-12 rounded-2xl
    bg-white/10 backdrop-blur-xl border border-white/15
    shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_24px_rgba(0,0,0,.35)]
    text-white hover:bg-white/15 active:bg-white/20
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60
    disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none
    transition-all
  "
  style={{
    /* Keep inside on small screens, push out a bit on large screens, never off-screen */
    left: 'clamp(0.5rem, 2vw, 2rem)',
  }}
>
  <ArrowLeft className="w-5 h-5 md:w-5 md:h-5 block" strokeWidth={1.75} />
</button>

<button
  onClick={goNext}
  disabled={page === totalPages - 1}
  aria-label="Next"
  className="
    pointer-events-auto absolute top-1/2 -translate-y-1/2 z-20
    flex items-center justify-center
    h-10 w-10 md:h-12 md:w-12 rounded-2xl
    bg-white/10 backdrop-blur-xl border border-white/15
    shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_24px_rgba(0,0,0,.35)]
    text-white hover:bg-white/15 active:bg-white/20
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60
    disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none
    transition-all
  "
  style={{
    right: 'clamp(0.5rem, 2vw, 2rem)',
  }}
>
  <ArrowRight className="w-5 h-5 md:w-5 md:h-5 block" strokeWidth={1.75} />
</button>


          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-2 rounded-full transition-all ${
                  i === page
                    ? "w-8 bg-red-500"
                    : "w-4 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

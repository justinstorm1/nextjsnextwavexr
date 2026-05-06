import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const focusAreas = [
  {
    icon: "◈",
    label: "VR Writing",
    desc: "Contributor at UploadVR covering fitness, media, hardware, and immersive experiences from an adult user's perspective.",
  },
  {
    icon: "⬡",
    label: "Immersive Fitness",
    desc: "Passionate advocate for VR as a legitimate fitness platform — exploring how movement and technology intersect.",
  },
  {
    icon: "◎",
    label: "StormXR LLC",
    desc: "Founder and operator of StormXR LLC, the company behind the Next Wave XR project and platform.",
  },
  {
    icon: "⊕",
    label: "Next Wave XR",
    desc: "Creator of Next Wave XR — a space dedicated to exploring XR technology beyond gaming, for everyday users.",
  },
];

const socials = [
  { label: "X / Twitter", href: "https://x.com/StormyCsVR", symbol: "𝕏" },
  { label: "Bluesky", href: "https://bsky.app/profile/stormycsvr.bsky.social", symbol: "☁" },
  { label: "Threads", href: "https://www.threads.net/@StormyCsVR", symbol: "⌘" },
  { label: "UploadVR", href: "https://www.uploadvr.com/writer/craigstorm/", symbol: "↗" },
];

export default function About() {
  return (
    <div
      className="min-h-dvh flex-1 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle farthest-corner at 32.7% 49.8%, rgba(28,88,238,1) 0%, rgba(0,39,137,1) 100.2%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute w-[500px] h-[500px] bg-blue-400/20 blur-3xl rounded-full top-0 -left-32 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-300/15 blur-3xl rounded-full bottom-0 right-0 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 flex flex-col gap-20">

        {/* Hero */}
        <div className="flex flex-col gap-6">
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase">Founder & Creator</p>

          <div className="flex flex-col gap-1">
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-none tracking-tight">
              Craig
            </h1>
            <h1 className="text-6xl md:text-7xl font-bold leading-none tracking-tight"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)", color: "transparent" }}
            >
              Storm
            </h1>
          </div>

          <div className="h-px w-24 bg-white/20" />

          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            VR writer, immersive fitness advocate, and the creator behind Next Wave XR. 
            Craig explores virtual reality from the perspective of everyday adults discovering 
            what XR can be beyond gaming — and building the platforms to share that story.
          </p>

          {/* Socials */}
          <div className="flex flex-wrap gap-3 mt-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/70 text-sm hover:bg-white/15 hover:text-white hover:border-white/40 transition-all backdrop-blur-sm"
              >
                <span className="text-base leading-none">{s.symbol}</span>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* StormXR LLC callout */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-300/10 blur-2xl rounded-full pointer-events-none" />
          <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-3">Company</p>
          <h2 className="text-3xl font-bold text-white mb-3">StormXR LLC</h2>
          <p className="text-white/65 leading-relaxed max-w-xl">
            StormXR LLC is the company Craig founded to power his work in the extended reality space. 
            It's the engine behind Next Wave XR — driving content, community, and exploration at the 
            intersection of immersive technology and real life.
          </p>
        </div>

        {/* Focus areas */}
        <div className="flex flex-col gap-6">
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase">What Craig Does</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {focusAreas.map((area) => (
              <div
                key={area.label}
                className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl text-white/40 group-hover:text-white/70 transition-colors">
                    {area.icon}
                  </span>
                  <h3 className="text-white font-semibold">{area.label}</h3>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-white/10">
          <p className="text-white/50 text-sm">Want to explore what's next in XR?</p>
          <Button
            asChild
            className="font-semibold bg-white text-blue-900 hover:opacity-90 hover:bg-white transition-all shadow-xl"
          >
            <Link href="/articles">Read the Articles</Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
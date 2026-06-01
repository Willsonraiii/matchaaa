import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Leaf, ChevronLeft, ChevronRight, Star } from "lucide-react";

import pure from "@/assets/matcha-pure.png";
import strawberry from "@/assets/matcha-strawberry.png";
import blueberry from "@/assets/matcha-blueberry.png";
import mango from "@/assets/matcha-mango.png";
import raspberry from "@/assets/matcha-raspberry.png";
import cherry from "@/assets/matcha-cherry.png";

type Flavor = {
  id: string;
  name: string;
  tagline: string;
  notes: string;
  price: string;
  image: string;
  accent: string; // hex/oklch for chip glow
  glow: string;
};

const FLAVORS: Flavor[] = [
  { id: "pure", name: "Pure Matcha", tagline: "Ceremonial Origin", notes: "Stone-ground · Uji, Japan", price: "$8", image: pure, accent: "#a3d977", glow: "oklch(0.82 0.18 135 / 0.45)" },
  { id: "strawberry", name: "Strawberry", tagline: "Sun-Ripened", notes: "Real strawberry pulp", price: "$9", image: strawberry, accent: "#f5a3b8", glow: "oklch(0.78 0.18 10 / 0.45)" },
  { id: "blueberry", name: "Blueberry", tagline: "Wild Harvest", notes: "Whole blueberry swirl", price: "$9", image: blueberry, accent: "#8a6dc9", glow: "oklch(0.55 0.2 295 / 0.5)" },
  { id: "mango", name: "Mango", tagline: "Golden Hour", notes: "Alphonso mango puree", price: "$9", image: mango, accent: "#f2b84b", glow: "oklch(0.82 0.18 80 / 0.5)" },
  { id: "raspberry", name: "Raspberry", tagline: "Garden Crush", notes: "Crushed raspberry seeds", price: "$9", image: raspberry, accent: "#e85a7a", glow: "oklch(0.65 0.22 0 / 0.5)" },
  { id: "cherry", name: "Cherry", tagline: "Midnight Bloom", notes: "Dark cherry conserve", price: "$10", image: cherry, accent: "#c43a4e", glow: "oklch(0.5 0.22 20 / 0.55)" },
];

export function MatchaStation() {
  const [activeId, setActiveId] = useState<string>("pure");
  const [cart, setCart] = useState(0);

  const activeIndex = useMemo(() => FLAVORS.findIndex((f) => f.id === activeId), [activeId]);
  const active = FLAVORS[activeIndex];

  const go = (delta: number) => {
    const next = (activeIndex + delta + FLAVORS.length) % FLAVORS.length;
    setActiveId(FLAVORS[next].id);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Floating particles */}
      <Particles />

      {/* Header */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 py-4">
        <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 sm:px-6 py-3">
          <a href="/" className="flex items-center gap-2 text-foreground">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
              Matcha Station
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#flavors" className="hover:text-foreground transition">Flavors</a>
            <a href="#story" className="hover:text-foreground transition">Story</a>
            <a href="#ritual" className="hover:text-foreground transition">Ritual</a>
          </nav>
          <button
            onClick={() => setCart((c) => c + 1)}
            className="relative inline-flex items-center gap-2 rounded-full bg-foreground/10 hover:bg-foreground/15 transition px-4 py-2 text-sm font-medium"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              {cart}
            </span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-4 sm:px-8 pt-6 sm:pt-12 pb-24">
        <div className="mx-auto max-w-7xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Ceremonial Grade · Uji, Japan
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-center text-5xl sm:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight"
          >
            Crafted matcha,
            <br />
            <span className="italic text-gradient">reimagined.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-center text-base sm:text-lg text-muted-foreground"
          >
            Six signature drinks. Stone-ground matcha, layered with real fruit.
            Choose your ritual.
          </motion.p>

          {/* Stage with cup + side cards */}
          <div className="relative mt-10 sm:mt-16">
            {/* Desktop side flavor cards (arc) */}
            <div className="pointer-events-none hidden lg:block">
              {FLAVORS.map((f, i) => {
                // Position: 3 on left, 3 on right
                const isLeft = i < 3;
                const slot = isLeft ? i : i - 3; // 0,1,2
                const top = `${15 + slot * 28}%`;
                const side = isLeft ? { left: "2%" } : { right: "2%" };
                // arc offset
                const offset = slot === 1 ? 60 : 0;
                const sideOffset = isLeft
                  ? { left: `calc(2% + ${offset}px)` }
                  : { right: `calc(2% + ${offset}px)` };
                return (
                  <div
                    key={f.id}
                    className="pointer-events-auto absolute w-64"
                    style={{ top, ...sideOffset }}
                  >
                    <FlavorCard
                      flavor={f}
                      active={f.id === activeId}
                      onClick={() => setActiveId(f.id)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Cup */}
            <div className="relative mx-auto h-[480px] sm:h-[560px] lg:h-[640px] w-full max-w-md flex items-center justify-center">
              {/* Glow halo */}
              <motion.div
                key={active.id + "-halo"}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background: `radial-gradient(circle at 50% 45%, ${active.glow}, transparent 60%)`,
                }}
              />
              {/* Floor shadow */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 h-10 w-3/4 rounded-[50%] blur-2xl"
                style={{ background: "oklch(0 0 0 / 0.55)" }}
              />

              <AnimatePresence mode="wait">
                <motion.img
                  key={active.id}
                  src={active.image}
                  alt={`${active.name} matcha drink in a tall glass`}
                  width={1024}
                  height={1024}
                  initial={{ opacity: 0, y: 30, scale: 0.96, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 h-full w-auto object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.6)]"
                  style={{ animation: "float 6s ease-in-out infinite" }}
                />
              </AnimatePresence>
            </div>

            {/* Flavor info panel below cup */}
            <motion.div
              key={active.id + "-info"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-20 mx-auto mt-4 sm:mt-2 max-w-md text-center"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {active.tagline}
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">{active.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{active.notes}</p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  onClick={() => setCart((c) => c + 1)}
                  className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-[var(--shadow-glow)] hover:scale-[1.03] transition-transform"
                >
                  Add to cart — {active.price}
                </button>
                <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" /> 4.9 · 2.1k
                </span>
              </div>
            </motion.div>
          </div>

          {/* Mobile/tablet swipeable carousel */}
          <div id="flavors" className="lg:hidden mt-10">
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Choose your flavor
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous flavor"
                  className="glass rounded-full p-2 hover:bg-foreground/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next flavor"
                  className="glass rounded-full p-2 hover:bg-foreground/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 scrollbar-hide">
              {FLAVORS.map((f) => (
                <div key={f.id} className="snap-center shrink-0 w-[70vw] sm:w-64">
                  <FlavorCard
                    flavor={f}
                    active={f.id === activeId}
                    onClick={() => setActiveId(f.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story strip */}
      <section id="story" className="px-4 sm:px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">The Ritual</p>
          <h3 className="mt-4 font-display text-4xl sm:text-5xl">
            Stone-ground. Hand-whisked.
            <br />
            <span className="italic text-muted-foreground">Served cold.</span>
          </h3>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { t: "Single Origin", d: "First-harvest tencha from Uji, Japan." },
              { t: "Real Fruit", d: "Cold-pressed purees. No syrups, no shortcuts." },
              { t: "Crafted Daily", d: "Whisked to order. Layered with intent." },
            ].map((item) => (
              <div key={item.t} className="glass rounded-3xl p-6 text-left">
                <p className="font-display text-2xl">{item.t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="ritual" className="border-t border-white/5 px-4 sm:px-8 py-10">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Matcha Station. Brewed with care.</p>
          <p>Uji · Kyoto · Worldwide</p>
        </div>
      </footer>
    </div>
  );
}

function FlavorCard({
  flavor,
  active,
  onClick,
}: {
  flavor: Flavor;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      animate={{ scale: active ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group relative w-full text-left rounded-2xl p-4 transition-all duration-300 ${
        active
          ? "glass shadow-[var(--shadow-glow)]"
          : "glass opacity-80 hover:opacity-100"
      }`}
      style={
        active
          ? { boxShadow: `0 20px 50px -10px ${flavor.glow}, inset 0 0 0 1px ${flavor.accent}55` }
          : undefined
      }
    >
      <div className="flex items-center gap-3">
        <span
          className="h-9 w-9 rounded-full ring-2 ring-white/10 shrink-0"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${flavor.accent}, oklch(0.2 0.05 150))`,
          }}
        />
        <div className="min-w-0">
          <p className="font-display text-lg leading-tight truncate">{flavor.name}</p>
          <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground truncate">
            {flavor.tagline}
          </p>
        </div>
        <span className="ml-auto text-sm text-muted-foreground">{flavor.price}</span>
      </div>
    </motion.button>
  );
}

function Particles() {
  const items = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {items.map((_, i) => {
        const left = (i * 37) % 100;
        const delay = (i * 1.3) % 12;
        const dur = 14 + (i % 5) * 3;
        const size = 3 + (i % 4);
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full bg-primary/40"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              filter: "blur(1px)",
              animation: `particle-rise ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
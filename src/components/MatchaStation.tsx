import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, MapPin, Grid3x3, Instagram, AtSign, Twitter, ChevronLeft, ChevronRight } from "lucide-react";

import { NepalFlag } from "./NepalFlag";

import pure from "@/assets/matcha-pure.png";
import strawberry from "@/assets/matcha-strawberry.png";
import blueberry from "@/assets/matcha-blueberry.png";
import mango from "@/assets/matcha-mango.png";
import raspberry from "@/assets/matcha-raspberry.png";
import cherry from "@/assets/matcha-cherry.png";

import fPure from "@/assets/fruit-pure.png";
import fStrawberry from "@/assets/fruit-strawberry.png";
import fBlueberry from "@/assets/fruit-blueberry.png";
import fMango from "@/assets/fruit-mango.png";
import fRaspberry from "@/assets/fruit-raspberry.png";
import fCherry from "@/assets/fruit-cherry.png";

import mountains from "@/assets/matcha-mountains.png";

type Flavor = {
  id: string;
  name: string;
  price: string;
  cup: string;
  fruit: string;
};

const FLAVORS: Flavor[] = [
  { id: "cherry", name: "Cherry", price: "$18.20", cup: cherry, fruit: fCherry },
  { id: "raspberry", name: "Raspberry", price: "$18.50", cup: raspberry, fruit: fRaspberry },
  { id: "strawberry", name: "Strawberry", price: "$18.99", cup: strawberry, fruit: fStrawberry },
  { id: "blueberry", name: "Blueberry", price: "$19.33", cup: blueberry, fruit: fBlueberry },
  { id: "mango", name: "Mango", price: "$19.50", cup: mango, fruit: fMango },
  { id: "pure", name: "Pure Matcha", price: "$17.50", cup: pure, fruit: fPure },
];

// Order cards visually so selected is centered behind the cup (3 left, 3 right)
// Active index governs which appears closest. We'll position by signed slot.

export function MatchaStation() {
  const [activeId, setActiveId] = useState<string>("blueberry");
  const [cart, setCart] = useState(0);

  const activeIndex = useMemo(() => FLAVORS.findIndex((f) => f.id === activeId), [activeId]);
  const active = FLAVORS[activeIndex];

  const go = (delta: number) => {
    const next = (activeIndex + delta + FLAVORS.length) % FLAVORS.length;
    setActiveId(FLAVORS[next].id);
  };

  // For arc: compute signed position relative to active flavor (-3..-1, 1..3)
  const arcPositions = useMemo(() => {
    const others = FLAVORS.filter((f) => f.id !== activeId);
    // Split into 3 left, 3 right
    return others.map((f, i) => {
      const side = i < others.length / 2 ? -1 : 1;
      const slot = side === -1 ? -(i + 1) : i - others.length / 2 + 1;
      return { flavor: f, slot };
    });
  }, [activeId]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2 text-foreground shrink-0">
            <NepalFlag className="h-7 w-auto drop-shadow-md" />
            <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
              Matcha Station
            </span>
          </a>

          {/* Center icon nav */}
          <nav className="glass hidden sm:flex items-center gap-1 rounded-full px-2 py-1.5">
            {[Grid3x3, Instagram, AtSign, Twitter, ShoppingBag].map((Icon, i) => (
              <button
                key={i}
                onClick={() => Icon === ShoppingBag && setCart((c) => c + 1)}
                className={`grid h-9 w-9 place-items-center rounded-full transition ${
                  Icon === ShoppingBag
                    ? "bg-foreground/15 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/10"
                }`}
                aria-label={Icon.displayName ?? "nav"}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </nav>

          {/* Right location pill */}
          <button
            onClick={() => setCart((c) => c + 1)}
            className="glass grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:text-foreground"
            aria-label="Location"
          >
            <MapPin className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Hero stage */}
      <section className="relative px-2 sm:px-6 pt-6 sm:pt-10 pb-8">
        <div className="relative mx-auto max-w-7xl">
          <div className="relative h-[78vh] min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] w-full">
            {/* Glow behind cup */}
            <motion.div
              key={active.id + "-halo"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[420px] w-[420px] sm:h-[560px] sm:w-[560px] rounded-full blur-3xl"
              style={{
                background: "radial-gradient(circle, oklch(0.7 0.2 135 / 0.35), transparent 65%)",
              }}
            />

            {/* Arc of flavor cards (desktop & tablet) */}
            <div className="absolute inset-0 hidden md:block pointer-events-none">
              {arcPositions.map(({ flavor, slot }) => (
                <ArcCard
                  key={flavor.id}
                  flavor={flavor}
                  slot={slot}
                  onClick={() => setActiveId(flavor.id)}
                />
              ))}
            </div>

            {/* Mountains base */}
            <img
              src={mountains}
              alt=""
              aria-hidden
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[200%] max-w-none sm:w-[160%] lg:w-[130%] pointer-events-none select-none opacity-95 z-10"
              style={{ filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.5))" }}
            />

            {/* The cup */}
            <div className="absolute left-1/2 bottom-[22%] sm:bottom-[24%] -translate-x-1/2 z-20 h-[60%] sm:h-[65%] w-[60%] sm:w-[40%] lg:w-[30%] max-w-[360px] flex items-end justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.id}
                  src={active.cup}
                  alt={`${active.name} matcha drink`}
                  width={1024}
                  height={1024}
                  initial={{ opacity: 0, y: 40, scale: 0.94, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, scale: 0.96, filter: "blur(10px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-contain drop-shadow-[0_50px_40px_rgba(0,0,0,0.7)]"
                  style={{ animation: "float 6s ease-in-out infinite" }}
                />
              </AnimatePresence>
            </div>

            {/* Flavor name floating on cup */}
            <motion.div
              key={active.id + "-label"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="absolute left-1/2 bottom-[30%] sm:bottom-[32%] -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap"
            >
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground/95 drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)]">
                {active.name}
              </h2>
            </motion.div>

            {/* Add to cart pill */}
            <motion.div
              key={active.id + "-cta"}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute left-1/2 bottom-[10%] sm:bottom-[12%] -translate-x-1/2 z-30"
            >
              <button
                onClick={() => setCart((c) => c + 1)}
                className="glass hover:bg-foreground/15 transition flex items-center gap-3 rounded-full pl-4 pr-5 py-2.5 text-sm font-medium shadow-[var(--shadow-glow)]"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to cart</span>
                <span className="text-muted-foreground">|</span>
                <span className="font-semibold">{active.price}</span>
              </button>
            </motion.div>

            {/* Mobile-only side nav arrows */}
            <div className="md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-2 pointer-events-none">
              <button
                onClick={() => go(-1)}
                className="pointer-events-auto glass grid h-10 w-10 place-items-center rounded-full"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                className="pointer-events-auto glass grid h-10 w-10 place-items-center rounded-full"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Headline below stage */}
          <div className="text-center mt-2 sm:mt-4 px-4">
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light text-foreground">
              Choose your <span className="italic text-gradient">matcha tea</span>
            </h1>
          </div>

          {/* Mobile swipe carousel */}
          <div className="md:hidden mt-6">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 scrollbar-hide">
              {FLAVORS.map((f) => (
                <MobileFlavorCard
                  key={f.id}
                  flavor={f}
                  active={f.id === activeId}
                  onClick={() => setActiveId(f.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story strip */}
      <section className="relative px-4 sm:px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">The Ritual</p>
          <h3 className="mt-4 font-display text-3xl sm:text-5xl">
            Stone-ground. Hand-whisked.
            <br />
            <span className="italic text-muted-foreground">Served cold.</span>
          </h3>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { t: "Himalayan Origin", d: "Crafted with care from the foothills of Nepal." },
              { t: "Real Fruit", d: "Cold-pressed purees. No syrups, no shortcuts." },
              { t: "Whisked Daily", d: "Built to order. Layered with intent." },
            ].map((item) => (
              <div key={item.t} className="glass rounded-3xl p-6 text-left">
                <p className="font-display text-2xl">{item.t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-4 sm:px-8 py-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <NepalFlag className="h-5 w-auto" />
            <span>© {new Date().getFullYear()} Matcha Station — Brewed in Nepal.</span>
          </div>
          <span>Cart: {cart} item{cart === 1 ? "" : "s"}</span>
        </div>
      </footer>
    </div>
  );
}

function ArcCard({
  flavor,
  slot,
  onClick,
}: {
  flavor: Flavor;
  slot: number; // -3..-1 or 1..3
  onClick: () => void;
}) {
  // Closer to center => larger, less tilted. Outer => smaller, more tilted.
  const abs = Math.abs(slot);
  const side = slot < 0 ? -1 : 1;
  // Horizontal offset from center as % of stage width
  const x = side * (10 + abs * 11); // 10,21,32 %
  // Vertical lift (closer to cup -> higher)
  const y = -8 - (3 - abs) * 6; // px offset baseline
  const rotate = side * (8 + abs * 4);
  const scale = 1 - (abs - 1) * 0.1;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      onClick={onClick}
      className="pointer-events-auto absolute z-10 group"
      style={{
        left: `calc(50% + ${x}%)`,
        bottom: `calc(28% + ${-y}px)`,
        transform: `translateX(-50%) rotate(${rotate}deg)`,
      }}
      whileHover={{ scale: scale * 1.06, y: -6 }}
    >
      <div className="relative w-28 lg:w-32 aspect-square rounded-3xl bg-[oklch(0.95_0.02_90)] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] ring-1 ring-black/5 grid place-items-center overflow-hidden">
        <img
          src={flavor.fruit}
          alt={flavor.name}
          loading="lazy"
          className="h-3/4 w-3/4 object-contain drop-shadow-md"
        />
      </div>
    </motion.button>
  );
}

function MobileFlavorCard({
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
      whileTap={{ scale: 0.96 }}
      animate={{ scale: active ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`snap-center shrink-0 w-24 aspect-square rounded-3xl grid place-items-center bg-[oklch(0.95_0.02_90)] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)] ring-1 transition ${
        active ? "ring-primary" : "ring-black/5"
      }`}
    >
      <img src={flavor.fruit} alt={flavor.name} className="h-3/4 w-3/4 object-contain" />
    </motion.button>
  );
}
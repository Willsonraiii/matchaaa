import { createFileRoute } from "@tanstack/react-router";
import { MatchaStation } from "@/components/MatchaStation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Matcha Station — Crafted Matcha, Reimagined" },
      { name: "description", content: "Premium ceremonial-grade matcha drinks crafted with real fruit. Six signature flavors — Pure, Strawberry, Blueberry, Mango, Raspberry, Cherry." },
      { property: "og:title", content: "Matcha Station — Crafted Matcha, Reimagined" },
      { property: "og:description", content: "Six signature matcha drinks. Stone-ground, layered with real fruit." },
    ],
  }),
  component: Index,
});

function Index() {
  return <MatchaStation />;
}

import { ElementType } from "./types";

/** Tailwind bg classes for each element type */
export const ELEMENT_BG: Record<ElementType, string> = {
  Fire: "bg-orange-500",
  Water: "bg-blue-500",
  Earth: "bg-amber-700",
  Wind: "bg-sky-300",
  Lightning: "bg-yellow-400",
  Ice: "bg-cyan-300",
  Light: "bg-yellow-100",
  Shadow: "bg-purple-900",
  Metal: "bg-zinc-400",
  Nature: "bg-green-500",
  Poison: "bg-violet-500",
  Psychic: "bg-pink-400",
};

/** Tailwind text classes for each element type */
export const ELEMENT_TEXT: Record<ElementType, string> = {
  Fire: "text-orange-400",
  Water: "text-blue-400",
  Earth: "text-amber-600",
  Wind: "text-sky-300",
  Lightning: "text-yellow-300",
  Ice: "text-cyan-300",
  Light: "text-yellow-200",
  Shadow: "text-purple-400",
  Metal: "text-zinc-300",
  Nature: "text-green-400",
  Poison: "text-violet-400",
  Psychic: "text-pink-400",
};

/** Tailwind border classes for each element type */
export const ELEMENT_BORDER: Record<ElementType, string> = {
  Fire: "border-orange-500",
  Water: "border-blue-500",
  Earth: "border-amber-700",
  Wind: "border-sky-300",
  Lightning: "border-yellow-400",
  Ice: "border-cyan-300",
  Light: "border-yellow-100",
  Shadow: "border-purple-900",
  Metal: "border-zinc-400",
  Nature: "border-green-500",
  Poison: "border-violet-500",
  Psychic: "border-pink-400",
};

export const RARITY_COLORS: Record<string, string> = {
  Common: "text-zinc-400",
  Uncommon: "text-green-400",
  Rare: "text-blue-400",
  Epic: "text-purple-400",
  Legendary: "text-yellow-400",
  Mythic: "text-red-400",
};

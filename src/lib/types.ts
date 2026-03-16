export const ELEMENT_TYPES = [
  "Fire",
  "Water",
  "Earth",
  "Wind",
  "Lightning",
  "Ice",
  "Light",
  "Shadow",
  "Metal",
  "Nature",
  "Poison",
  "Psychic",
] as const;

export type ElementType = (typeof ELEMENT_TYPES)[number];

export const EVOLUTION_STAGES = [
  "Spark",      // Stage 1 — newborn digital essence
  "Sprout",     // Stage 2 — early form taking shape
  "Strike",     // Stage 3 — battle-ready juvenile
  "Surge",      // Stage 4 — powerful adult form
  "Apex",       // Stage 5 — peak evolution
  "Omega",      // Stage 6 — transcendent final form
] as const;

export type EvolutionStage = (typeof EVOLUTION_STAGES)[number];

export const RARITY_TIERS = [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary",
  "Mythic",
] as const;

export type RarityTier = (typeof RARITY_TIERS)[number];

export interface MonStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  special: number;
}

export interface MonAbility {
  name: string;
  description: string;
  element: ElementType;
}

export interface Mon {
  id: string;
  dexNumber: number;
  name: string;
  types: [ElementType] | [ElementType, ElementType];
  stage: EvolutionStage;
  rarity: RarityTier;
  description: string;
  lore: string;
  habitat: string;
  stats: MonStats;
  abilities: MonAbility[];
  /** ID of the mon this evolves from, null if base stage */
  evolvesFrom: string | null;
  /** ID of the mon this evolves into, null if final stage */
  evolvesInto: string | null;
  /** URL or path to the mon's image/sprite */
  image: string;
  /** AI prompt for generating a Strampler pixel art sprite */
  imagePrompt: string;
}

/** A full linear evolution chain */
export interface EvolutionChain {
  id: string;
  name: string;
  stages: string[]; // Mon IDs in order from Spark to Omega
}

import { MealIngredient } from "@/types";

export interface LibraryMeal {
  id: string;
  name: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  ingredients: MealIngredient[];
}

// Real starter meals with sensible macros and ingredient lists so the
// Meal Planner / Shopping List aren't empty on first launch. Users can
// still create their own from scratch (see app/nutrition/meals.tsx).
export const MEAL_LIBRARY: LibraryMeal[] = [
  {
    id: "lib-chicken-rice-bowl",
    name: "Chicken & Rice Bowl",
    calories: 620,
    proteinG: 52,
    carbsG: 68,
    fatG: 14,
    ingredients: [
      { name: "Chicken breast", quantity: "200g", category: "Protein" },
      { name: "Basmati rice", quantity: "150g cooked", category: "Pantry" },
      { name: "Broccoli", quantity: "100g", category: "Produce" },
      { name: "Soy sauce", quantity: "1 tbsp", category: "Pantry" },
    ],
  },
  {
    id: "lib-protein-oats",
    name: "Protein Oats",
    calories: 480,
    proteinG: 38,
    carbsG: 55,
    fatG: 12,
    ingredients: [
      { name: "Rolled oats", quantity: "80g", category: "Pantry" },
      { name: "Whey protein", quantity: "1 scoop", category: "Pantry" },
      { name: "Banana", quantity: "1", category: "Produce" },
      { name: "Peanut butter", quantity: "1 tbsp", category: "Pantry" },
      { name: "Milk", quantity: "250ml", category: "Dairy" },
    ],
  },
  {
    id: "lib-salmon-sweet-potato",
    name: "Salmon & Sweet Potato",
    calories: 590,
    proteinG: 42,
    carbsG: 48,
    fatG: 22,
    ingredients: [
      { name: "Salmon fillet", quantity: "180g", category: "Protein" },
      { name: "Sweet potato", quantity: "250g", category: "Produce" },
      { name: "Asparagus", quantity: "100g", category: "Produce" },
      { name: "Olive oil", quantity: "1 tbsp", category: "Pantry" },
    ],
  },
  {
    id: "lib-steak-egg-breakfast",
    name: "Steak & Eggs",
    calories: 540,
    proteinG: 48,
    carbsG: 6,
    fatG: 34,
    ingredients: [
      { name: "Sirloin steak", quantity: "200g", category: "Protein" },
      { name: "Large eggs", quantity: "3", category: "Dairy" },
      { name: "Spinach", quantity: "50g", category: "Produce" },
      { name: "Butter", quantity: "1 tsp", category: "Dairy" },
    ],
  },
  {
    id: "lib-greek-yogurt-bowl",
    name: "Greek Yogurt Bowl",
    calories: 380,
    proteinG: 32,
    carbsG: 42,
    fatG: 9,
    ingredients: [
      { name: "Greek yogurt", quantity: "250g", category: "Dairy" },
      { name: "Mixed berries", quantity: "100g", category: "Produce" },
      { name: "Granola", quantity: "40g", category: "Pantry" },
      { name: "Honey", quantity: "1 tsp", category: "Pantry" },
    ],
  },
  {
    id: "lib-turkey-wrap",
    name: "Turkey & Avocado Wrap",
    calories: 460,
    proteinG: 34,
    carbsG: 38,
    fatG: 18,
    ingredients: [
      { name: "Turkey breast slices", quantity: "150g", category: "Protein" },
      { name: "Wholemeal wrap", quantity: "1", category: "Pantry" },
      { name: "Avocado", quantity: "0.5", category: "Produce" },
      { name: "Lettuce", quantity: "handful", category: "Produce" },
      { name: "Tomato", quantity: "1", category: "Produce" },
    ],
  },
  {
    id: "lib-beef-stirfry",
    name: "Beef Stir Fry",
    calories: 610,
    proteinG: 45,
    carbsG: 58,
    fatG: 20,
    ingredients: [
      { name: "Lean beef strips", quantity: "200g", category: "Protein" },
      { name: "Egg noodles", quantity: "150g cooked", category: "Pantry" },
      { name: "Mixed stir-fry vegetables", quantity: "200g", category: "Produce" },
      { name: "Soy sauce", quantity: "2 tbsp", category: "Pantry" },
      { name: "Sesame oil", quantity: "1 tsp", category: "Pantry" },
    ],
  },
  {
    id: "lib-protein-shake-snack",
    name: "Protein Shake + Almonds",
    calories: 320,
    proteinG: 30,
    carbsG: 14,
    fatG: 16,
    ingredients: [
      { name: "Whey protein", quantity: "1 scoop", category: "Pantry" },
      { name: "Almonds", quantity: "20g", category: "Pantry" },
      { name: "Milk", quantity: "200ml", category: "Dairy" },
    ],
  },
];

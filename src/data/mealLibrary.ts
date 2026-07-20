import { MealIngredient, MealCategory } from "@/types";

export interface LibraryMeal {
  id: string;
  name: string;
  category: MealCategory;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  ingredients: MealIngredient[];
}

// A real starter meal library — enough variety across breakfast/lunch/
// dinner/snack that the Meal Planner and Shopping List have something
// genuinely useful on first launch. Users can still create their own
// alongside these (see app/nutrition/meals.tsx).
export const MEAL_LIBRARY: LibraryMeal[] = [
  // ---------- BREAKFAST ----------
  {
    id: "lib-protein-oats",
    name: "Protein Oats",
    category: "breakfast",
    calories: 480, proteinG: 38, carbsG: 55, fatG: 12,
    ingredients: [
      { name: "Rolled oats", quantity: "80g", category: "Pantry" },
      { name: "Whey protein", quantity: "1 scoop", category: "Pantry" },
      { name: "Banana", quantity: "1", category: "Produce" },
      { name: "Peanut butter", quantity: "1 tbsp", category: "Pantry" },
      { name: "Milk", quantity: "250ml", category: "Dairy" },
    ],
  },
  {
    id: "lib-steak-eggs",
    name: "Steak & Eggs",
    category: "breakfast",
    calories: 540, proteinG: 48, carbsG: 6, fatG: 34,
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
    category: "breakfast",
    calories: 380, proteinG: 32, carbsG: 42, fatG: 9,
    ingredients: [
      { name: "Greek yogurt", quantity: "250g", category: "Dairy" },
      { name: "Mixed berries", quantity: "100g", category: "Produce" },
      { name: "Granola", quantity: "40g", category: "Pantry" },
      { name: "Honey", quantity: "1 tsp", category: "Pantry" },
    ],
  },
  {
    id: "lib-veggie-omelette",
    name: "Veggie Omelette",
    category: "breakfast",
    calories: 410, proteinG: 30, carbsG: 10, fatG: 27,
    ingredients: [
      { name: "Large eggs", quantity: "4", category: "Dairy" },
      { name: "Bell pepper", quantity: "0.5", category: "Produce" },
      { name: "Mushrooms", quantity: "50g", category: "Produce" },
      { name: "Cheddar cheese", quantity: "30g", category: "Dairy" },
      { name: "Olive oil", quantity: "1 tsp", category: "Pantry" },
    ],
  },
  {
    id: "lib-protein-pancakes",
    name: "Protein Pancakes",
    category: "breakfast",
    calories: 460, proteinG: 36, carbsG: 48, fatG: 12,
    ingredients: [
      { name: "Oat flour", quantity: "60g", category: "Pantry" },
      { name: "Whey protein", quantity: "1 scoop", category: "Pantry" },
      { name: "Large eggs", quantity: "2", category: "Dairy" },
      { name: "Maple syrup", quantity: "1 tbsp", category: "Pantry" },
      { name: "Blueberries", quantity: "60g", category: "Produce" },
    ],
  },
  {
    id: "lib-smoked-salmon-bagel",
    name: "Smoked Salmon Bagel",
    category: "breakfast",
    calories: 490, proteinG: 30, carbsG: 52, fatG: 17,
    ingredients: [
      { name: "Wholemeal bagel", quantity: "1", category: "Pantry" },
      { name: "Smoked salmon", quantity: "80g", category: "Protein" },
      { name: "Cream cheese", quantity: "30g", category: "Dairy" },
      { name: "Red onion", quantity: "small handful", category: "Produce" },
    ],
  },
  {
    id: "lib-cottage-cheese-toast",
    name: "Cottage Cheese Toast",
    category: "breakfast",
    calories: 350, proteinG: 28, carbsG: 34, fatG: 10,
    ingredients: [
      { name: "Sourdough bread", quantity: "2 slices", category: "Pantry" },
      { name: "Cottage cheese", quantity: "150g", category: "Dairy" },
      { name: "Cherry tomatoes", quantity: "80g", category: "Produce" },
      { name: "Black pepper", quantity: "to taste", category: "Pantry" },
    ],
  },
  {
    id: "lib-breakfast-burrito",
    name: "Breakfast Burrito",
    category: "breakfast",
    calories: 560, proteinG: 34, carbsG: 46, fatG: 26,
    ingredients: [
      { name: "Large eggs", quantity: "3", category: "Dairy" },
      { name: "Tortilla wrap", quantity: "1 large", category: "Pantry" },
      { name: "Black beans", quantity: "100g", category: "Pantry" },
      { name: "Cheddar cheese", quantity: "30g", category: "Dairy" },
      { name: "Salsa", quantity: "2 tbsp", category: "Pantry" },
    ],
  },
  {
    id: "lib-overnight-oats-pb",
    name: "Overnight Oats with PB",
    category: "breakfast",
    calories: 420, proteinG: 22, carbsG: 52, fatG: 15,
    ingredients: [
      { name: "Rolled oats", quantity: "70g", category: "Pantry" },
      { name: "Greek yogurt", quantity: "100g", category: "Dairy" },
      { name: "Peanut butter", quantity: "1 tbsp", category: "Pantry" },
      { name: "Chia seeds", quantity: "1 tbsp", category: "Pantry" },
      { name: "Milk", quantity: "150ml", category: "Dairy" },
    ],
  },
  {
    id: "lib-breakfast-hash",
    name: "Turkey Breakfast Hash",
    category: "breakfast",
    calories: 470, proteinG: 36, carbsG: 38, fatG: 18,
    ingredients: [
      { name: "Turkey mince", quantity: "150g", category: "Protein" },
      { name: "Potatoes", quantity: "200g", category: "Produce" },
      { name: "Bell pepper", quantity: "0.5", category: "Produce" },
      { name: "Onion", quantity: "0.5", category: "Produce" },
      { name: "Large eggs", quantity: "1", category: "Dairy" },
    ],
  },

  // ---------- LUNCH ----------
  {
    id: "lib-chicken-rice-bowl",
    name: "Chicken & Rice Bowl",
    category: "lunch",
    calories: 620, proteinG: 52, carbsG: 68, fatG: 14,
    ingredients: [
      { name: "Chicken breast", quantity: "200g", category: "Protein" },
      { name: "Basmati rice", quantity: "150g cooked", category: "Pantry" },
      { name: "Broccoli", quantity: "100g", category: "Produce" },
      { name: "Soy sauce", quantity: "1 tbsp", category: "Pantry" },
    ],
  },
  {
    id: "lib-turkey-wrap",
    name: "Turkey & Avocado Wrap",
    category: "lunch",
    calories: 460, proteinG: 34, carbsG: 38, fatG: 18,
    ingredients: [
      { name: "Turkey breast slices", quantity: "150g", category: "Protein" },
      { name: "Wholemeal wrap", quantity: "1", category: "Pantry" },
      { name: "Avocado", quantity: "0.5", category: "Produce" },
      { name: "Lettuce", quantity: "handful", category: "Produce" },
      { name: "Tomato", quantity: "1", category: "Produce" },
    ],
  },
  {
    id: "lib-tuna-salad",
    name: "Tuna Niçoise Salad",
    category: "lunch",
    calories: 430, proteinG: 38, carbsG: 24, fatG: 20,
    ingredients: [
      { name: "Tuna steak or tinned tuna", quantity: "150g", category: "Protein" },
      { name: "New potatoes", quantity: "120g", category: "Produce" },
      { name: "Green beans", quantity: "80g", category: "Produce" },
      { name: "Large eggs", quantity: "1", category: "Dairy" },
      { name: "Olives", quantity: "30g", category: "Pantry" },
    ],
  },
  {
    id: "lib-chicken-caesar",
    name: "Chicken Caesar Salad",
    category: "lunch",
    calories: 500, proteinG: 44, carbsG: 18, fatG: 28,
    ingredients: [
      { name: "Chicken breast", quantity: "180g", category: "Protein" },
      { name: "Romaine lettuce", quantity: "1 head", category: "Produce" },
      { name: "Parmesan cheese", quantity: "20g", category: "Dairy" },
      { name: "Caesar dressing", quantity: "2 tbsp", category: "Pantry" },
      { name: "Croutons", quantity: "20g", category: "Pantry" },
    ],
  },
  {
    id: "lib-falafel-bowl",
    name: "Falafel & Hummus Bowl",
    category: "lunch",
    calories: 550, proteinG: 20, carbsG: 62, fatG: 24,
    ingredients: [
      { name: "Falafel", quantity: "6 pieces", category: "Frozen" },
      { name: "Hummus", quantity: "60g", category: "Pantry" },
      { name: "Pitta bread", quantity: "1", category: "Pantry" },
      { name: "Cucumber", quantity: "0.5", category: "Produce" },
      { name: "Cherry tomatoes", quantity: "80g", category: "Produce" },
    ],
  },
  {
    id: "lib-beef-burrito-bowl",
    name: "Beef Burrito Bowl",
    category: "lunch",
    calories: 640, proteinG: 42, carbsG: 60, fatG: 24,
    ingredients: [
      { name: "Lean beef mince", quantity: "180g", category: "Protein" },
      { name: "Basmati rice", quantity: "150g cooked", category: "Pantry" },
      { name: "Black beans", quantity: "100g", category: "Pantry" },
      { name: "Sweetcorn", quantity: "60g", category: "Produce" },
      { name: "Cheddar cheese", quantity: "30g", category: "Dairy" },
    ],
  },
  {
    id: "lib-prawn-noodle-salad",
    name: "Prawn Noodle Salad",
    category: "lunch",
    calories: 470, proteinG: 34, carbsG: 52, fatG: 12,
    ingredients: [
      { name: "King prawns", quantity: "180g", category: "Protein" },
      { name: "Rice noodles", quantity: "100g", category: "Pantry" },
      { name: "Carrot", quantity: "1", category: "Produce" },
      { name: "Beansprouts", quantity: "60g", category: "Produce" },
      { name: "Lime", quantity: "1", category: "Produce" },
    ],
  },
  {
    id: "lib-chicken-pesto-pasta",
    name: "Chicken Pesto Pasta",
    category: "lunch",
    calories: 610, proteinG: 44, carbsG: 58, fatG: 22,
    ingredients: [
      { name: "Chicken breast", quantity: "180g", category: "Protein" },
      { name: "Penne pasta", quantity: "100g dry", category: "Pantry" },
      { name: "Pesto", quantity: "2 tbsp", category: "Pantry" },
      { name: "Cherry tomatoes", quantity: "80g", category: "Produce" },
      { name: "Parmesan cheese", quantity: "15g", category: "Dairy" },
    ],
  },
  {
    id: "lib-lentil-soup",
    name: "Lentil & Vegetable Soup",
    category: "lunch",
    calories: 380, proteinG: 22, carbsG: 55, fatG: 8,
    ingredients: [
      { name: "Red lentils", quantity: "100g dry", category: "Pantry" },
      { name: "Carrot", quantity: "2", category: "Produce" },
      { name: "Celery", quantity: "2 stalks", category: "Produce" },
      { name: "Vegetable stock", quantity: "500ml", category: "Pantry" },
      { name: "Crusty bread", quantity: "1 slice", category: "Pantry" },
    ],
  },
  {
    id: "lib-egg-salad-sandwich",
    name: "Egg Salad Sandwich",
    category: "lunch",
    calories: 420, proteinG: 26, carbsG: 38, fatG: 18,
    ingredients: [
      { name: "Large eggs", quantity: "3", category: "Dairy" },
      { name: "Wholemeal bread", quantity: "2 slices", category: "Pantry" },
      { name: "Mayonnaise", quantity: "1 tbsp", category: "Pantry" },
      { name: "Lettuce", quantity: "handful", category: "Produce" },
    ],
  },

  // ---------- DINNER ----------
  {
    id: "lib-salmon-sweet-potato",
    name: "Salmon & Sweet Potato",
    category: "dinner",
    calories: 590, proteinG: 42, carbsG: 48, fatG: 22,
    ingredients: [
      { name: "Salmon fillet", quantity: "180g", category: "Protein" },
      { name: "Sweet potato", quantity: "250g", category: "Produce" },
      { name: "Asparagus", quantity: "100g", category: "Produce" },
      { name: "Olive oil", quantity: "1 tbsp", category: "Pantry" },
    ],
  },
  {
    id: "lib-beef-stirfry",
    name: "Beef Stir Fry",
    category: "dinner",
    calories: 610, proteinG: 45, carbsG: 58, fatG: 20,
    ingredients: [
      { name: "Lean beef strips", quantity: "200g", category: "Protein" },
      { name: "Egg noodles", quantity: "150g cooked", category: "Pantry" },
      { name: "Mixed stir-fry vegetables", quantity: "200g", category: "Produce" },
      { name: "Soy sauce", quantity: "2 tbsp", category: "Pantry" },
      { name: "Sesame oil", quantity: "1 tsp", category: "Pantry" },
    ],
  },
  {
    id: "lib-chicken-curry",
    name: "Chicken Curry & Rice",
    category: "dinner",
    calories: 650, proteinG: 48, carbsG: 62, fatG: 22,
    ingredients: [
      { name: "Chicken thigh", quantity: "220g", category: "Protein" },
      { name: "Basmati rice", quantity: "150g cooked", category: "Pantry" },
      { name: "Coconut milk", quantity: "150ml", category: "Pantry" },
      { name: "Curry paste", quantity: "2 tbsp", category: "Pantry" },
      { name: "Onion", quantity: "1", category: "Produce" },
    ],
  },
  {
    id: "lib-baked-cod-veg",
    name: "Baked Cod & Vegetables",
    category: "dinner",
    calories: 460, proteinG: 40, carbsG: 32, fatG: 16,
    ingredients: [
      { name: "Cod fillet", quantity: "200g", category: "Protein" },
      { name: "New potatoes", quantity: "200g", category: "Produce" },
      { name: "Courgette", quantity: "1", category: "Produce" },
      { name: "Cherry tomatoes", quantity: "100g", category: "Produce" },
      { name: "Olive oil", quantity: "1 tbsp", category: "Pantry" },
    ],
  },
  {
    id: "lib-turkey-chilli",
    name: "Turkey Chilli",
    category: "dinner",
    calories: 560, proteinG: 46, carbsG: 46, fatG: 18,
    ingredients: [
      { name: "Turkey mince", quantity: "200g", category: "Protein" },
      { name: "Kidney beans", quantity: "150g", category: "Pantry" },
      { name: "Chopped tomatoes", quantity: "1 tin", category: "Pantry" },
      { name: "Basmati rice", quantity: "120g cooked", category: "Pantry" },
      { name: "Onion", quantity: "1", category: "Produce" },
    ],
  },
  {
    id: "lib-steak-veg",
    name: "Sirloin Steak & Greens",
    category: "dinner",
    calories: 620, proteinG: 52, carbsG: 20, fatG: 36,
    ingredients: [
      { name: "Sirloin steak", quantity: "220g", category: "Protein" },
      { name: "Tenderstem broccoli", quantity: "150g", category: "Produce" },
      { name: "Mushrooms", quantity: "100g", category: "Produce" },
      { name: "Butter", quantity: "1 tbsp", category: "Dairy" },
    ],
  },
  {
    id: "lib-veggie-stirfry-tofu",
    name: "Tofu Vegetable Stir Fry",
    category: "dinner",
    calories: 480, proteinG: 28, carbsG: 50, fatG: 18,
    ingredients: [
      { name: "Firm tofu", quantity: "200g", category: "Protein" },
      { name: "Jasmine rice", quantity: "150g cooked", category: "Pantry" },
      { name: "Mixed stir-fry vegetables", quantity: "200g", category: "Produce" },
      { name: "Soy sauce", quantity: "2 tbsp", category: "Pantry" },
      { name: "Peanut sauce", quantity: "1 tbsp", category: "Pantry" },
    ],
  },
  {
    id: "lib-lamb-chops-mash",
    name: "Lamb Chops & Mash",
    category: "dinner",
    calories: 680, proteinG: 48, carbsG: 42, fatG: 34,
    ingredients: [
      { name: "Lamb chops", quantity: "250g", category: "Protein" },
      { name: "Potatoes", quantity: "250g", category: "Produce" },
      { name: "Butter", quantity: "1 tbsp", category: "Dairy" },
      { name: "Green beans", quantity: "100g", category: "Produce" },
    ],
  },
  {
    id: "lib-shrimp-fried-rice",
    name: "Prawn Fried Rice",
    category: "dinner",
    calories: 540, proteinG: 34, carbsG: 60, fatG: 16,
    ingredients: [
      { name: "King prawns", quantity: "180g", category: "Protein" },
      { name: "Basmati rice", quantity: "150g cooked", category: "Pantry" },
      { name: "Large eggs", quantity: "2", category: "Dairy" },
      { name: "Frozen peas", quantity: "80g", category: "Frozen" },
      { name: "Spring onion", quantity: "2", category: "Produce" },
    ],
  },
  {
    id: "lib-margherita-chicken",
    name: "Chicken Margherita & Veg",
    category: "dinner",
    calories: 570, proteinG: 50, carbsG: 28, fatG: 26,
    ingredients: [
      { name: "Chicken breast", quantity: "200g", category: "Protein" },
      { name: "Mozzarella", quantity: "60g", category: "Dairy" },
      { name: "Cherry tomatoes", quantity: "100g", category: "Produce" },
      { name: "Basil", quantity: "handful", category: "Produce" },
      { name: "New potatoes", quantity: "150g", category: "Produce" },
    ],
  },

  // ---------- SNACK ----------
  {
    id: "lib-protein-shake-almonds",
    name: "Protein Shake + Almonds",
    category: "snack",
    calories: 320, proteinG: 30, carbsG: 14, fatG: 16,
    ingredients: [
      { name: "Whey protein", quantity: "1 scoop", category: "Pantry" },
      { name: "Almonds", quantity: "20g", category: "Pantry" },
      { name: "Milk", quantity: "200ml", category: "Dairy" },
    ],
  },
  {
    id: "lib-apple-peanut-butter",
    name: "Apple & Peanut Butter",
    category: "snack",
    calories: 250, proteinG: 7, carbsG: 30, fatG: 12,
    ingredients: [
      { name: "Apple", quantity: "1", category: "Produce" },
      { name: "Peanut butter", quantity: "1.5 tbsp", category: "Pantry" },
    ],
  },
  {
    id: "lib-cottage-cheese-pineapple",
    name: "Cottage Cheese & Pineapple",
    category: "snack",
    calories: 220, proteinG: 24, carbsG: 20, fatG: 4,
    ingredients: [
      { name: "Cottage cheese", quantity: "200g", category: "Dairy" },
      { name: "Pineapple chunks", quantity: "100g", category: "Produce" },
    ],
  },
  {
    id: "lib-rice-cakes-turkey",
    name: "Rice Cakes & Turkey Slices",
    category: "snack",
    calories: 210, proteinG: 20, carbsG: 24, fatG: 4,
    ingredients: [
      { name: "Rice cakes", quantity: "3", category: "Pantry" },
      { name: "Turkey breast slices", quantity: "80g", category: "Protein" },
    ],
  },
  {
    id: "lib-boiled-eggs-snack",
    name: "Boiled Eggs & Carrot Sticks",
    category: "snack",
    calories: 230, proteinG: 18, carbsG: 10, fatG: 14,
    ingredients: [
      { name: "Large eggs", quantity: "3", category: "Dairy" },
      { name: "Carrot", quantity: "2", category: "Produce" },
    ],
  },
  {
    id: "lib-protein-bar-banana",
    name: "Protein Bar & Banana",
    category: "snack",
    calories: 340, proteinG: 22, carbsG: 42, fatG: 10,
    ingredients: [
      { name: "Protein bar", quantity: "1", category: "Pantry" },
      { name: "Banana", quantity: "1", category: "Produce" },
    ],
  },
  {
    id: "lib-hummus-veg-sticks",
    name: "Hummus & Vegetable Sticks",
    category: "snack",
    calories: 200, proteinG: 8, carbsG: 20, fatG: 10,
    ingredients: [
      { name: "Hummus", quantity: "60g", category: "Pantry" },
      { name: "Cucumber", quantity: "0.5", category: "Produce" },
      { name: "Bell pepper", quantity: "0.5", category: "Produce" },
      { name: "Carrot", quantity: "1", category: "Produce" },
    ],
  },
  {
    id: "lib-greek-yogurt-honey",
    name: "Greek Yogurt & Honey",
    category: "snack",
    calories: 180, proteinG: 18, carbsG: 18, fatG: 4,
    ingredients: [
      { name: "Greek yogurt", quantity: "170g", category: "Dairy" },
      { name: "Honey", quantity: "1 tsp", category: "Pantry" },
    ],
  },
];

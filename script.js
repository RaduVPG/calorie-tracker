const STORAGE_KEY = 'caltrack_v3';
const LEGACY_KEYS = ['caltrak_v2'];
const PROFILE_COOKIE_KEY = 'caltrack_profile_v1';
const LANGUAGE_COOKIE_KEY = 'caltrack_lang_v1';
const IDB_NAME = 'caltrack_storage';
const IDB_STORE = 'kv';
const PROFILE_IDB_KEY = 'profile';
const STATE_IDB_KEY = 'app_state';
const RING_CIRCUMFERENCE = 471;
const MAX_DAYS_HISTORY = 365;
const INGREDIENT_LIBRARY_URL = './ingredients-library-full.json';
const LANGUAGE_KEY = 'caltrack_lang';

const QUICK_FOODS = [
  { name: { en: 'Rice (200g)', ro: 'Orez (200g)' }, k: 260, p: 5, c: 56, f: 1, e: '🍚' },
  { name: { en: 'Egg', ro: 'Ou' }, k: 78, p: 6, c: 0, f: 5, e: '🥚' },
  { name: { en: 'Chicken (150g)', ro: 'Pui (150g)' }, k: 248, p: 38, c: 0, f: 9, e: '🍗' },
  { name: { en: 'Avocado (100g)', ro: 'Avocado (100g)' }, k: 160, p: 2, c: 9, f: 15, e: '🥑' },
  { name: { en: 'Milk (250ml)', ro: 'Lapte (250ml)' }, k: 122, p: 8, c: 12, f: 5, e: '🥛' },
  { name: { en: 'Banana', ro: 'Banană' }, k: 89, p: 1, c: 23, f: 0, e: '🍌' },
  { name: { en: 'Beef (150g)', ro: 'Vită (150g)' }, k: 300, p: 36, c: 0, f: 17, e: '🥩' },
  { name: { en: 'Bread slice', ro: 'Felie de pâine' }, k: 79, p: 3, c: 15, f: 1, e: '🍞' },
];

const EMOJIS = ['🍚', '🥗', '🍳', '🥩', '🍝', '🥘', '🍜', '🥙', '🫐', '🍌', '🥛', '🍎'];


const CURATED_INGREDIENTS = [
  {
    name: 'Greek Yogurt',
    nameRo: 'Iaurt grecesc',
    category: 'milk-dairy-products',
    serving: '100 g',
    calories: 73,
    caloriesPer100g: 73,
    proteinPer100g: 10,
    carbsPer100g: 3.8,
    fatPer100g: 2,
    aliases: ['greek yogurt', 'greek yoghurt', 'iaurt grecesc', 'iaurt grecesc simplu'],
    source: 'curated',
  },
  {
    name: 'Greek Yogurt, 2% fat',
    nameRo: 'Iaurt grecesc 2% grăsime',
    category: 'milk-dairy-products',
    serving: '100 g',
    calories: 73,
    caloriesPer100g: 73,
    proteinPer100g: 10,
    carbsPer100g: 3.8,
    fatPer100g: 2,
    aliases: ['2 greek yogurt', '2% greek yogurt', '2 percent greek yogurt', '2 percent fat greek yogurt', '2% fat greek yogurt', 'low fat greek yogurt', 'iaurt grecesc 2', 'iaurt grecesc 2 la suta', 'iaurt grecesc 2% grasime'],
    source: 'curated',
  },
  {
    name: 'Greek Yogurt, 0% fat',
    nameRo: 'Iaurt grecesc 0% grăsime',
    category: 'milk-dairy-products',
    serving: '100 g',
    calories: 59,
    caloriesPer100g: 59,
    proteinPer100g: 10.3,
    carbsPer100g: 3.6,
    fatPer100g: 0.4,
    aliases: ['0 greek yogurt', '0% greek yogurt', 'fat free greek yogurt', 'nonfat greek yogurt', 'greek yogurt 0', 'iaurt grecesc 0', 'iaurt grecesc 0% grasime', 'iaurt grecesc degresat'],
    source: 'curated',
  },
  {
    name: 'Plain Yogurt',
    nameRo: 'Iaurt simplu',
    category: 'yogurt',
    serving: '100 g',
    calories: 61,
    caloriesPer100g: 61,
    proteinPer100g: 3.5,
    carbsPer100g: 4.7,
    fatPer100g: 3.3,
    aliases: ['yogurt', 'yoghurt', 'plain yogurt', 'plain yoghurt', 'natural yogurt', 'natural yoghurt', 'iaurt', 'iaurt simplu', 'iaurt natural'],
    source: 'curated',
  },
  {
    name: 'Skyr',
    nameRo: 'Skyr',
    category: 'yogurt',
    serving: '100 g',
    calories: 63,
    caloriesPer100g: 63,
    proteinPer100g: 11,
    carbsPer100g: 3.8,
    fatPer100g: 0.2,
    aliases: ['skyr', 'skyr yogurt', 'skyr yoghurt'],
    source: 'curated',
  },
  {
    name: 'Kefir',
    nameRo: 'Kefir',
    category: 'milk-dairy-products',
    serving: '100 g',
    calories: 52,
    caloriesPer100g: 52,
    proteinPer100g: 3.4,
    carbsPer100g: 4.7,
    fatPer100g: 2,
    aliases: ['kefir', 'chefir'],
    source: 'curated',
  },
  {
    name: 'Milk, whole',
    nameRo: 'Lapte integral',
    category: 'milk-dairy-products',
    serving: '100 ml',
    calories: 61,
    caloriesPer100g: 61,
    proteinPer100g: 3.2,
    carbsPer100g: 4.8,
    fatPer100g: 3.3,
    aliases: ['milk', 'whole milk', 'full fat milk', 'lapte', 'lapte integral'],
    source: 'curated',
  },
  {
    name: 'Milk, 1.5% fat',
    nameRo: 'Lapte 1,5% grăsime',
    category: 'milk-dairy-products',
    serving: '100 ml',
    calories: 47,
    caloriesPer100g: 47,
    proteinPer100g: 3.4,
    carbsPer100g: 4.9,
    fatPer100g: 1.5,
    aliases: ['1.5 milk', 'milk 1.5%', '1.5% milk', 'lapte 1.5', 'lapte 1,5', 'lapte 1.5% grasime', 'lapte 1,5% grasime'],
    source: 'curated',
  },
  {
    name: 'Milk, 2% fat',
    nameRo: 'Lapte 2% grăsime',
    category: 'milk-dairy-products',
    serving: '100 ml',
    calories: 50,
    caloriesPer100g: 50,
    proteinPer100g: 3.4,
    carbsPer100g: 4.9,
    fatPer100g: 2,
    aliases: ['2 milk', 'milk 2%', '2% milk', 'lapte 2', 'lapte 2% grasime', 'lapte 2 la suta'],
    source: 'curated',
  },
  {
    name: 'Rice, white uncooked',
    nameRo: 'Orez alb crud',
    category: 'rice-products',
    serving: '100 g',
    calories: 356,
    caloriesPer100g: 356,
    proteinPer100g: 6.7,
    carbsPer100g: 79,
    fatPer100g: 0.6,
    aliases: ['rice', 'white rice', 'orez', 'orez alb', 'orez crud', 'white rice uncooked'],
    source: 'curated',
  },
  {
    name: 'Rice, white cooked',
    nameRo: 'Orez alb gătit',
    category: 'rice-products',
    serving: '100 g',
    calories: 130,
    caloriesPer100g: 130,
    proteinPer100g: 2.4,
    carbsPer100g: 28.7,
    fatPer100g: 0.3,
    aliases: ['cooked rice', 'white rice cooked', 'orez gatit', 'orez fiert', 'orez alb gatit'],
    source: 'curated',
  },
  {
    name: 'Chicken Breast, skinless',
    nameRo: 'Piept de pui fără piele',
    category: 'poultry-chicken-turkey',
    serving: '100 g',
    calories: 120,
    caloriesPer100g: 120,
    proteinPer100g: 22.5,
    carbsPer100g: 0,
    fatPer100g: 2.6,
    aliases: ['chicken breast', 'chicken', 'pui', 'piept de pui', 'piept pui', 'chicken breast raw'],
    source: 'curated',
  },
  {
    name: 'Chicken Thigh, skinless',
    nameRo: 'Pulpa de pui fără piele',
    category: 'poultry-chicken-turkey',
    serving: '100 g',
    calories: 177,
    caloriesPer100g: 177,
    proteinPer100g: 20.7,
    carbsPer100g: 0,
    fatPer100g: 10.9,
    aliases: ['chicken thigh', 'pulpa de pui', 'pulpe de pui', 'chicken thighs'],
    source: 'curated',
  },
  {
    name: 'Egg',
    nameRo: 'Ou',
    category: 'flour-grains-baking-ingredients',
    serving: '100 g',
    calories: 143,
    caloriesPer100g: 143,
    proteinPer100g: 12.6,
    carbsPer100g: 0.7,
    fatPer100g: 9.5,
    aliases: ['egg', 'eggs', 'ou', 'oua', 'ouă'],
    source: 'curated',
  },
  {
    name: 'Egg White',
    nameRo: 'Albuș de ou',
    category: 'flour-grains-baking-ingredients',
    serving: '100 g',
    calories: 52,
    caloriesPer100g: 52,
    proteinPer100g: 10.9,
    carbsPer100g: 0.7,
    fatPer100g: 0.2,
    aliases: ['egg white', 'egg whites', 'albus', 'albus de ou'],
    source: 'curated',
  },
  {
    name: 'Hot Dog',
    nameRo: 'Hot dog',
    category: 'sausages-cold-cuts',
    serving: '100 g',
    calories: 290,
    caloriesPer100g: 290,
    proteinPer100g: 10.5,
    carbsPer100g: 4.2,
    fatPer100g: 26,
    defaultUnit: 'piece',
    defaultUnitGrams: 52,
    aliases: ['hot dog', 'hotdog', 'hot-dog', 'carnat hot dog'],
    source: 'curated',
  },
  {
    name: 'Ground Beef, lean',
    nameRo: 'Carne tocată de vită slabă',
    category: 'beef-veal',
    serving: '100 g',
    calories: 176,
    caloriesPer100g: 176,
    proteinPer100g: 20,
    carbsPer100g: 0,
    fatPer100g: 10,
    aliases: ['beef', 'ground beef', 'lean beef', 'vita', 'vită', 'carne de vita', 'carne de vită', 'carne tocata de vita', 'carne tocată de vită'],
    source: 'curated',
  },
  {
    name: 'Beef Sirloin',
    nameRo: 'Mușchi de vită',
    category: 'beef-veal',
    serving: '100 g',
    calories: 217,
    caloriesPer100g: 217,
    proteinPer100g: 26,
    carbsPer100g: 0,
    fatPer100g: 12,
    aliases: ['beef steak', 'sirloin', 'beef sirloin', 'muschi de vita', 'mușchi de vită', 'antricot vita'],
    source: 'curated',
  },
  {
    name: 'Olive Oil',
    nameRo: 'Ulei de măsline',
    category: 'oils-fats',
    serving: '100 g',
    calories: 884,
    caloriesPer100g: 884,
    proteinPer100g: 0,
    carbsPer100g: 0,
    fatPer100g: 100,
    aliases: ['olive oil', 'oil', 'ulei', 'ulei de masline', 'ulei de măsline'],
    source: 'curated',
  },
  {
    name: 'Sunflower Oil',
    nameRo: 'Ulei de floarea-soarelui',
    category: 'oils-fats',
    serving: '100 g',
    calories: 884,
    caloriesPer100g: 884,
    proteinPer100g: 0,
    carbsPer100g: 0,
    fatPer100g: 100,
    aliases: ['sunflower oil', 'vegetable oil', 'ulei floarea soarelui', 'ulei de floarea soarelui'],
    source: 'curated',
  },
  {
    name: 'Oats',
    nameRo: 'Ovăz',
    category: 'flour-grains-baking-ingredients',
    serving: '100 g',
    calories: 389,
    caloriesPer100g: 389,
    proteinPer100g: 16.9,
    carbsPer100g: 66.3,
    fatPer100g: 6.9,
    aliases: ['oats', 'rolled oats', 'ovaz', 'ovăz', 'fulgi de ovaz', 'fulgi de ovăz', 'oat flakes'],
    source: 'curated',
  },
  {
    name: 'Potato',
    nameRo: 'Cartof',
    category: 'potato-products',
    serving: '100 g',
    calories: 77,
    caloriesPer100g: 77,
    proteinPer100g: 2,
    carbsPer100g: 17.5,
    fatPer100g: 0.1,
    aliases: ['potato', 'potatoes', 'cartof', 'cartofi', 'white potato'],
    source: 'curated',
  },
  {
    name: 'Potato, boiled',
    nameRo: 'Cartof fiert',
    category: 'potato-products',
    serving: '100 g',
    calories: 87,
    caloriesPer100g: 87,
    proteinPer100g: 1.9,
    carbsPer100g: 20.1,
    fatPer100g: 0.1,
    aliases: ['boiled potato', 'potato boiled', 'cartof fiert', 'cartofi fierti', 'cartofi fierți'],
    source: 'curated',
  },
];

const LOW_SIGNAL_CATEGORIES = new Set(['liquor-cocktails', 'beer', 'wine', 'juice-soft-drinks', 'coffee']);

const GOAL_LABELS = {
  '-500': { en: 'Lose weight', ro: 'Slăbește' },
  '0': { en: 'Maintain', ro: 'Menține' },
  '300': { en: 'Build muscle', ro: 'Pune masă musculară' },
};

const I18N = {
  en: {
    appTitle: 'CalTrack',
    appDescription: 'CalTrack is a private, offline-first calorie and macro tracker that runs entirely in your browser.',
    today: 'Today', history: 'History', recipes: 'Recipes', profile: 'Profile', help: 'Help', meals: 'Meals', savedRecipes: 'Saved recipes',
    letsSetGoal: 'Let’s set your goal',
    letsSetGoalSub: 'We’ll calculate a personal daily calorie target using your stats and activity level.',
    age: 'Age', sex: 'Sex', selectOption: 'Select…', male: 'Male', female: 'Female',
    height: 'Height', heightPrimaryLabel: 'Height primary value', heightUnits: 'Height units', heightInchesLabel: 'Height inches',
    weight: 'Weight', weightValueLabel: 'Weight value', continue: 'Continue', back: 'Back',
    activityLevel: 'Activity level', typicalWeek: 'How active are you during a typical week?',
    sedentary: 'Sedentary', sedentarySub: 'Little or no exercise',
    lightlyActive: 'Lightly active', lightlyActiveSub: '1–3 days / week',
    moderatelyActive: 'Moderately active', moderatelyActiveSub: '3–5 days / week',
    veryActive: 'Very active', veryActiveSub: '6–7 days / week',
    extremelyActive: 'Extremely active', extremelyActiveSub: 'Hard training + physical job',
    whatsYourGoal: 'What’s your goal?', goalSub: 'We’ll adjust calories and macros for your target.',
    loseWeight: 'Lose weight', loseWeightSub: 'About 500 kcal below TDEE',
    maintain: 'Maintain', maintainSub: 'Eat around your TDEE',
    buildMuscle: 'Build muscle', buildMuscleSub: 'About 300 kcal above TDEE',
    calculateMyGoal: 'Calculate my goal',
    yourDailyTarget: 'Your daily target',
    resultSub: 'Based on your estimated BMR, activity level, and goal.',
    kcalPerDay: 'kcal / day',
    protein: 'Protein', carbs: 'Carbs', fat: 'Fat', bmr: 'BMR', tdee: 'TDEE', bmi: 'BMI', goal: 'Goal',
    startTracking: 'Start tracking',
    languageToggle: 'Language toggle',
    sections: 'Sections', addMealAria: 'Add meal', addRecipeAria: 'Add recipe',
    logMeal: 'Log a meal', editMeal: 'Edit meal', quickAdd: 'Quick add', savedRecipe: 'Saved recipe', noneManual: 'None — manual entry', servingG: 'Serving (g)', serving: 'Serving', applyRecipe: 'Apply recipe', quantity: 'Quantity', unit: 'Unit', gramsMode: 'grams', unitsMode: 'units',
    foodName: 'Food name', addMeal: 'Add meal', updateMeal: 'Save meal', cancel: 'Cancel', createRecipe: 'Create recipe', editRecipe: 'Edit recipe', recipeName: 'Recipe name',
    totalCookedWeight: 'Total cooked recipe weight (g)', totalCookedWeightHint: 'Use the final cooked weight if water evaporates or ingredients change weight during cooking.',
    addIngredient: 'Add ingredient', ingredientBuilder: 'Add ingredient', saveRecipe: 'Save recipe', updateRecipe: 'Save recipe changes', loadingLibrary: 'Loading ingredient library…',
    libraryLoaded: '{count} offline ingredients with calories + macros are built into the app.',
    libraryLoadedDetail: 'Search works in English and Romanian. Source: calories.info static dataset bundled with the app.',
    libraryUnavailable: 'Ingredient library unavailable. You can still enter ingredients manually.',
    mealsEmpty: 'No meals logged yet. Tap + to add one.', historyEmpty: 'No history yet.', recipesEmpty: 'No saved recipes yet. Tap + to build one from ingredients.',
    recipeDraftEmpty: 'No ingredients added yet.', days: 'days', day: 'day', remaining: 'remaining', over: 'over',
    yourStats: 'Your stats', calorieTargets: 'Calorie targets', macroTargets: 'Macro targets', about: 'About',
    helpTitle: 'How to use CalTrack', helpIntro: 'A quick walkthrough of the main flows so you can start logging fast without guessing.',
    helpStep1Title: '1. Set your profile and goal', helpStep1Body: 'Complete the onboarding once with age, sex, height, weight, activity, and your goal. CalTrack uses this to calculate your daily calories plus protein, carbs, and fat targets.',
    helpStep2Title: '2. Log meals from Today', helpStep2Body: 'Open the Today tab and tap + to add a meal. You can quick-add common foods, enter macros manually, or apply a saved recipe by grams.',
    helpStep3Title: '3. Build recipes once, reuse them later', helpStep3Body: 'In Recipes, tap + to create a recipe, add ingredients, and enter the final cooked weight. After saving, you can log that recipe in seconds from the meal screen.',
    helpStep4Title: '4. Use ingredient search and favorites', helpStep4Body: 'When building a recipe, start typing an ingredient in English or Romanian. CalTrack auto-fills values from the offline library. Star ingredients you use often so they stay one tap away.',
    helpStep5Title: '5. Check history and profile', helpStep5Body: 'History shows past days and macros, while Profile keeps your targets and stats in one place. If your body weight or goal changes, reset and set up again with the new numbers.',
    helpTipsTitle: 'Helpful tips', helpTipsBody: 'Data stays only on this device/browser. Recipes scale by grams, so weighing cooked food gives the most reliable logs. Use favorites for repeat ingredients and recipes for repeat meals.',
    aboutText: 'Your data stays in this browser only. There is no account, backend, or cloud sync in this version.',
    dataSourceLabel: 'Food data source',
    dataSourceText: 'Offline calories.info library bundled as JSON with kcal, protein, carbs, and fat per 100g.',
    resetStartOver: 'Reset & start over', dailyGoal: 'Daily goal', goalType: 'Goal type',
    recipeSaved: 'Saved recipe: {name}', recipeUpdated: 'Updated recipe: {name}', mealSaved: 'Meal saved.', mealUpdated: 'Meal updated.', recipeNameRequired: 'Recipe name is required.', addAtLeastOneIngredient: 'Add at least one ingredient.',
    enterFinalWeight: 'Enter the final recipe weight in grams.', pickSavedRecipe: 'Pick a saved recipe first.', enterServingWeight: 'Enter a serving weight in grams.',
    mealNameCaloriesRequired: 'Meal name and calories are required.', fillStats: 'Please fill in age, sex, height, and weight.', invalidInputs: 'Some inputs are missing or invalid.', unrealisticStats: 'Those stats look unrealistic. Please check them.',
    profileFirst: 'Set up your profile first.', ingredientNameAndGramsRequired: 'Ingredient name and grams are required.',
    recipeIngredients: 'Recipe ingredients', currentTotals: 'Current totals: {kcal} kcal · P {p}g · C {c}g · F {f}g',
    ingredientsCount: '{count} ingredients · {weight}g total', per100g: '/ 100g', deleteRecipeConfirm: 'Delete recipe "{name}"?',
    ingredientPlaceholder: 'Ingredient name', mealPlaceholder: 'e.g. Chicken breast', recipePlaceholder: 'e.g. Chicken curry',
    ingredientSearchPlaceholder: 'Type in English or Romanian',
    ingredientLibraryHint: 'Search the saved ingredient library to auto-fill calories and macros per 100g.',
    ingredientMatched: '{name} · {kcal} kcal · P {p}g · C {c}g · F {f}g / 100g · {category}',
    ingredientNoMatch: 'No exact ingredient match yet. Keep typing in English or Romanian, or enter values manually.',
    ingredientAutoFilled: 'Autofilled from offline ingredient library.',
    resetConfirm: 'Reset all local data and start over?',
    mealCount: '{count} meal', mealCountPlural: '{count} meals',
    deleteMealAria: 'Delete {name}', deleteRecipeAria: 'Delete {name}', editMealAria: 'Edit {name}', editRecipeAria: 'Edit {name}',
    yearsSuffix: 'yrs', cmSuffix: 'cm', kgSuffix: 'kg',
    favoriteIngredients: 'Favorite ingredients', noFavoriteIngredients: 'Star ingredients to keep them handy here.',
    favoriteIngredientAria: 'Favorite ingredient {name}', unfavoriteIngredientAria: 'Remove {name} from favorites', toggleFavoriteIngredient: 'Toggle ingredient favorite',
    ingredientFavorited: '{name} added to favorites.', ingredientUnfavorited: '{name} removed from favorites.',
    proteinWord: 'Protein', carbsWord: 'Carbs', fatWord: 'Fat',
    editingBadge: 'Editing', duplicateRecipeNamesFixed: 'Recipe names stay unique and linked meals keep working after edits.'
  },
  ro: {
    appTitle: 'CalTrack',
    appDescription: 'CalTrack este un tracker privat, offline-first, pentru calorii și macronutrienți, care rulează complet în browser.',
    today: 'Astăzi', history: 'Istoric', recipes: 'Rețete', profile: 'Profil', help: 'Ajutor', meals: 'Mese', savedRecipes: 'Rețete salvate',
    letsSetGoal: 'Hai să-ți setăm obiectivul',
    letsSetGoalSub: 'Îți calculăm o țintă personală zilnică de calorii pe baza datelor și a nivelului de activitate.',
    age: 'Vârstă', sex: 'Sex', selectOption: 'Selectează…', male: 'Bărbat', female: 'Femeie',
    height: 'Înălțime', heightPrimaryLabel: 'Valoare principală înălțime', heightUnits: 'Unități înălțime', heightInchesLabel: 'Inches',
    weight: 'Greutate', weightValueLabel: 'Valoare greutate', continue: 'Continuă', back: 'Înapoi',
    activityLevel: 'Nivel de activitate', typicalWeek: 'Cât de activ ești într-o săptămână obișnuită?',
    sedentary: 'Sedentar', sedentarySub: 'Foarte puțin sau deloc exercițiu',
    lightlyActive: 'Ușor activ', lightlyActiveSub: '1–3 zile / săptămână',
    moderatelyActive: 'Moderat activ', moderatelyActiveSub: '3–5 zile / săptămână',
    veryActive: 'Foarte activ', veryActiveSub: '6–7 zile / săptămână',
    extremelyActive: 'Extrem de activ', extremelyActiveSub: 'Antrenamente grele + muncă fizică',
    whatsYourGoal: 'Care este obiectivul tău?', goalSub: 'Vom ajusta caloriile și macronutrienții pentru ținta ta.',
    loseWeight: 'Slăbește', loseWeightSub: 'Aproximativ 500 kcal sub TDEE',
    maintain: 'Menține', maintainSub: 'Mănâncă în jurul TDEE-ului tău',
    buildMuscle: 'Pune masă musculară', buildMuscleSub: 'Aproximativ 300 kcal peste TDEE',
    calculateMyGoal: 'Calculează obiectivul',
    yourDailyTarget: 'Ținta ta zilnică',
    resultSub: 'Bazată pe BMR-ul estimat, nivelul de activitate și obiectiv.',
    kcalPerDay: 'kcal / zi',
    protein: 'Proteine', carbs: 'Carbohidrați', fat: 'Grăsimi', bmr: 'BMR', tdee: 'TDEE', bmi: 'IMC', goal: 'Obiectiv',
    startTracking: 'Începe trackingul',
    languageToggle: 'Selector limbă',
    sections: 'Secțiuni', addMealAria: 'Adaugă masă', addRecipeAria: 'Adaugă rețetă',
    logMeal: 'Adaugă o masă', editMeal: 'Editează masa', quickAdd: 'Adăugare rapidă', savedRecipe: 'Rețetă salvată', noneManual: 'Niciuna — introducere manuală', servingG: 'Porție (g)', serving: 'Porție', applyRecipe: 'Aplică rețeta', quantity: 'Cantitate', unit: 'Unitate', gramsMode: 'grame', unitsMode: 'bucăți',
    foodName: 'Nume aliment', addMeal: 'Adaugă masa', updateMeal: 'Salvează masa', cancel: 'Anulează', createRecipe: 'Creează rețetă', editRecipe: 'Editează rețeta', recipeName: 'Nume rețetă',
    totalCookedWeight: 'Greutatea finală gătită a rețetei (g)', totalCookedWeightHint: 'Folosește greutatea finală gătită dacă apa se evaporă sau ingredientele își schimbă greutatea în timpul gătitului.',
    addIngredient: 'Adaugă ingredient', ingredientBuilder: 'Adaugă ingredient', saveRecipe: 'Salvează rețeta', updateRecipe: 'Salvează modificările', loadingLibrary: 'Se încarcă biblioteca de ingrediente…',
    libraryLoaded: '{count} ingrediente offline cu calorii + macronutrienți sunt incluse în aplicație.',
    libraryLoadedDetail: 'Căutarea funcționează în engleză și română. Sursă: dataset static calories.info inclus în aplicație.',
    libraryUnavailable: 'Biblioteca de ingrediente nu este disponibilă. Poți introduce ingredientele manual.',
    mealsEmpty: 'Nu ai mese adăugate încă. Apasă + ca să adaugi una.', historyEmpty: 'Încă nu există istoric.', recipesEmpty: 'Nu ai rețete salvate încă. Apasă + ca să construiești una din ingrediente.',
    recipeDraftEmpty: 'Nu ai adăugat încă niciun ingredient.', days: 'zile', day: 'zi', remaining: 'rămase', over: 'peste',
    yourStats: 'Datele tale', calorieTargets: 'Ținte calorice', macroTargets: 'Ținte macronutrienți', about: 'Despre',
    helpTitle: 'Cum folosești CalTrack', helpIntro: 'Un ghid scurt pentru fluxurile principale, ca să începi rapid fără să bâjbâi.',
    helpStep1Title: '1. Setează profilul și obiectivul', helpStep1Body: 'Completează onboardingul o singură dată cu vârstă, sex, înălțime, greutate, activitate și obiectiv. CalTrack folosește aceste date pentru a calcula ținta zilnică de calorii plus proteine, carbohidrați și grăsimi.',
    helpStep2Title: '2. Adaugă mesele din Astăzi', helpStep2Body: 'Deschide tabul Astăzi și apasă + ca să adaugi o masă. Poți folosi adăugarea rapidă, poți introduce manual macronutrienții sau poți aplica o rețetă salvată în funcție de grame.',
    helpStep3Title: '3. Creează rețete o dată, refolosește-le apoi', helpStep3Body: 'În Rețete, apasă + ca să creezi o rețetă, adaugă ingredientele și introdu greutatea finală gătită. După salvare, poți loga rețeta în câteva secunde din ecranul de masă.',
    helpStep4Title: '4. Folosește căutarea de ingrediente și favoritele', helpStep4Body: 'Când construiești o rețetă, începe să scrii un ingredient în engleză sau română. CalTrack completează automat valorile din biblioteca offline. Pune stea ingredientelor folosite des ca să le ai la un tap distanță.',
    helpStep5Title: '5. Verifică istoricul și profilul', helpStep5Body: 'Istoric arată zilele trecute și macronutrienții, iar Profil păstrează la un loc țintele și datele tale. Dacă ți se schimbă greutatea sau obiectivul, resetează și configurează din nou cu noile valori.',
    helpTipsTitle: 'Sfaturi utile', helpTipsBody: 'Datele rămân doar pe acest device/browser. Rețetele se scalează după grame, deci cântărirea alimentelor gătite oferă cele mai bune loguri. Folosește favorite pentru ingrediente repetate și rețete pentru mesele recurente.',
    aboutText: 'Datele tale rămân doar în acest browser. Nu există cont, backend sau sincronizare în cloud în această versiune.',
    dataSourceLabel: 'Sursa datelor alimentare',
    dataSourceText: 'Bibliotecă offline calories.info inclusă ca JSON cu kcal, proteine, carbohidrați și grăsimi per 100g.',
    resetStartOver: 'Resetează și reîncepe', dailyGoal: 'Ținta zilnică', goalType: 'Tip obiectiv',
    recipeSaved: 'Rețetă salvată: {name}', recipeUpdated: 'Rețetă actualizată: {name}', mealSaved: 'Masă salvată.', mealUpdated: 'Masă actualizată.', recipeNameRequired: 'Numele rețetei este obligatoriu.', addAtLeastOneIngredient: 'Adaugă cel puțin un ingredient.',
    enterFinalWeight: 'Introdu greutatea finală a rețetei în grame.', pickSavedRecipe: 'Alege mai întâi o rețetă salvată.', enterServingWeight: 'Introdu greutatea porției în grame.',
    mealNameCaloriesRequired: 'Numele mesei și caloriile sunt obligatorii.', fillStats: 'Completează vârsta, sexul, înălțimea și greutatea.', invalidInputs: 'Unele date lipsesc sau sunt invalide.', unrealisticStats: 'Valorile par nerealiste. Verifică-le.',
    profileFirst: 'Configurează-ți profilul mai întâi.', ingredientNameAndGramsRequired: 'Numele ingredientului și gramele sunt obligatorii.',
    recipeIngredients: 'Ingredientele rețetei', currentTotals: 'Total curent: {kcal} kcal · P {p}g · C {c}g · F {f}g',
    ingredientsCount: '{count} ingrediente · {weight}g total', per100g: '/ 100g', deleteRecipeConfirm: 'Ștergi rețeta „{name}”?',
    ingredientPlaceholder: 'Nume ingredient', mealPlaceholder: 'ex. Piept de pui', recipePlaceholder: 'ex. Curry de pui',
    ingredientSearchPlaceholder: 'Scrie în engleză sau română',
    ingredientLibraryHint: 'Caută în biblioteca salvată de ingrediente pentru a completa automat caloriile și macronutrienții per 100g.',
    ingredientMatched: '{name} · {kcal} kcal · P {p}g · C {c}g · F {f}g / 100g · {category}',
    ingredientNoMatch: 'Încă nu există potrivire exactă. Continuă să scrii în engleză sau română, sau introdu valorile manual.',
    ingredientAutoFilled: 'Completat automat din biblioteca offline de ingrediente.',
    resetConfirm: 'Resetezi toate datele locale și reîncepi?',
    mealCount: '{count} masă', mealCountPlural: '{count} mese',
    deleteMealAria: 'Șterge {name}', deleteRecipeAria: 'Șterge {name}', editMealAria: 'Editează {name}', editRecipeAria: 'Editează {name}',
    yearsSuffix: 'ani', cmSuffix: 'cm', kgSuffix: 'kg',
    favoriteIngredients: 'Ingrediente favorite', noFavoriteIngredients: 'Pune stea ingredientelor ca să le ai rapid aici.',
    favoriteIngredientAria: 'Ingredient favorit {name}', unfavoriteIngredientAria: 'Scoate {name} din favorite', toggleFavoriteIngredient: 'Schimbă starea de favorit',
    ingredientFavorited: '{name} a fost adăugat la favorite.', ingredientUnfavorited: '{name} a fost scos din favorite.',
    proteinWord: 'Proteine', carbsWord: 'Carbohidrați', fatWord: 'Grăsimi',
    editingBadge: 'Editare', duplicateRecipeNamesFixed: 'Numele rețetelor rămân unice, iar mesele legate de ele continuă să funcționeze după editări.'
  }
};

let state = loadState();
let ingredientLibrary = [];
let ingredientLibraryMap = new Map();
let currentLang = safeGetLocalStorage(LANGUAGE_KEY) || getCookie(LANGUAGE_COOKIE_KEY) || 'en';
let heightUnit = 'cm';
let weightUnit = 'kg';
let selectedActivity = state.profile?.activityFactor || 1.2;
let selectedGoalAdj = state.profile?.goalAdj || -500;
let toastTimer = null;
let recipeDraftIngredients = [];
let mealEditIndex = null;
let recipeEditId = null;

const ui = {
  screens: Array.from(document.querySelectorAll('.screen')),
  heightCmBtn: document.getElementById('btn-cm'),
  heightFtBtn: document.getElementById('btn-ft'),
  weightKgBtn: document.getElementById('btn-kg'),
  weightLbBtn: document.getElementById('btn-lb'),
  inchRow: document.getElementById('in-row'),
  activityCards: Array.from(document.querySelectorAll('[data-activity]')),
  goalCards: Array.from(document.querySelectorAll('[data-goal]')),
  tabs: Array.from(document.querySelectorAll('.tab')),
  tabContents: Array.from(document.querySelectorAll('.tab-content')),
  mealsList: document.getElementById('meals-list'),
  historyTab: document.getElementById('tab-history'),
  recipesTab: document.getElementById('tab-recipes'),
  recipesList: document.getElementById('recipes-list'),
  libraryMetaCard: document.getElementById('library-meta-card'),
  settingsTab: document.getElementById('tab-settings'),
  helpTab: document.getElementById('tab-help'),
  quickFoods: document.getElementById('quick-foods'),
  mealModal: document.getElementById('modal'),
  recipeModal: document.getElementById('recipe-modal'),
  toast: document.getElementById('toast'),
  recipeSelect: document.getElementById('meal-recipe-select'),
  recipePreview: document.getElementById('meal-recipe-preview'),
  recipeDraft: document.getElementById('recipe-draft'),
  ingredientLibraryHint: document.getElementById('ingredient-library-hint'),
  mealIngredientHint: document.getElementById('meal-ingredient-hint'),
  recipeIngredientSuggestions: document.getElementById('recipe-ingredient-suggestions'),
  mealIngredientSuggestions: document.getElementById('meal-ingredient-suggestions'),
  mealServingValue: document.getElementById('meal-serving-value'),
  mealUnitMode: document.getElementById('meal-unit-mode'),
  ingredientServingValue: document.getElementById('ingredient-serving-value'),
  ingredientUnitMode: document.getElementById('ingredient-unit-mode'),
  langButtons: Array.from(document.querySelectorAll('.lang-btn')),
  onboardingLangWrap: document.getElementById('global-lang-wrap-onboarding'),
  favoriteIngredients: document.getElementById('favorite-ingredients'),
  toggleIngredientFavorite: document.getElementById('toggle-ingredient-favorite'),
};

bindEvents();
bootstrap();

function bindEvents() {
  ui.heightCmBtn.addEventListener('click', () => setHeightUnit('cm'));
  ui.heightFtBtn.addEventListener('click', () => setHeightUnit('ft'));
  ui.weightKgBtn.addEventListener('click', () => setWeightUnit('kg'));
  ui.weightLbBtn.addEventListener('click', () => setWeightUnit('lb'));

  document.getElementById('step1-next').addEventListener('click', goStep2);
  document.getElementById('step2-next').addEventListener('click', () => showScreen('s-ob3'));
  document.getElementById('step2-back').addEventListener('click', () => showScreen('s-ob1'));
  document.getElementById('step3-back').addEventListener('click', () => showScreen('s-ob2'));
  document.getElementById('step3-finish').addEventListener('click', calcAndFinish);
  document.getElementById('start-app').addEventListener('click', startApp);

  ui.activityCards.forEach((card) => card.addEventListener('click', () => selectCard(ui.activityCards, card, 'sel')));
  ui.goalCards.forEach((card) => card.addEventListener('click', () => selectCard(ui.goalCards, card, 'sel')));
  ui.tabs.forEach((tab) => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));

  document.getElementById('open-modal').addEventListener('click', () => openMealModal());
  document.getElementById('cancel-meal').addEventListener('click', closeMealModal);
  document.getElementById('add-meal').addEventListener('click', saveMealFromModal);
  document.getElementById('open-recipe-modal').addEventListener('click', () => openRecipeModal());
  document.getElementById('cancel-recipe').addEventListener('click', closeRecipeModal);
  document.getElementById('add-ingredient').addEventListener('click', addIngredientToDraft);
  document.getElementById('save-recipe').addEventListener('click', saveRecipe);
  document.getElementById('apply-recipe').addEventListener('click', applySelectedRecipeToMeal);

  document.getElementById('ingredient-name').addEventListener('input', handleRecipeIngredientInput);
  document.getElementById('ingredient-name').addEventListener('change', handleRecipeIngredientInput);
  document.getElementById('ingredient-grams').addEventListener('input', maybeApplyIngredientLibrary);
  document.getElementById('ingredient-grams').addEventListener('change', maybeApplyIngredientLibrary);
  document.getElementById('ingredient-grams').addEventListener('blur', maybeApplyIngredientLibrary);
  ui.ingredientServingValue.addEventListener('input', maybeApplyIngredientLibrary);
  ui.ingredientServingValue.addEventListener('change', maybeApplyIngredientLibrary);
  ui.ingredientUnitMode.addEventListener('change', maybeApplyIngredientLibrary);
  document.getElementById('meal-name').addEventListener('input', handleMealIngredientInput);
  document.getElementById('meal-name').addEventListener('change', handleMealIngredientInput);
  ui.mealServingValue.addEventListener('input', handleMealServingChange);
  ui.mealServingValue.addEventListener('change', handleMealServingChange);
  ui.mealUnitMode.addEventListener('change', handleMealServingChange);
  ui.toggleIngredientFavorite?.addEventListener('click', toggleCurrentIngredientFavorite);
  ui.langButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  ui.recipeSelect.addEventListener('change', handleMealRecipeSelection);

  [ui.mealModal, ui.recipeModal].forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        if (modal === ui.mealModal) closeMealModal();
        if (modal === ui.recipeModal) closeRecipeModal();
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!ui.mealModal.classList.contains('hidden')) closeMealModal();
    if (!ui.recipeModal.classList.contains('hidden')) closeRecipeModal();
  });
}

async function bootstrap() {
  setHeightUnit('cm');
  setWeightUnit('kg');
  await hydratePersistentState();
  rehydrateSelections();
  applyTranslations();
  renderQuickFoods();
  renderRecipeOptions();
  renderRecipeDraft();
  renderFavoriteIngredients();
  await loadIngredientLibrary();

  if (state.profile) {
    renderResult(state.profile);
    startApp();
    return;
  }

  showScreen('s-ob1');
}

function loadState() {
  const fallback = { profile: null, history: {}, recipes: [], favoriteIngredients: [] };

  try {
    const raw = safeGetLocalStorage(STORAGE_KEY);
    if (raw) return mergeProfileFallback(sanitizeState(JSON.parse(raw)));

    for (const key of LEGACY_KEYS) {
      const legacyRaw = safeGetLocalStorage(key);
      if (!legacyRaw) continue;
      const migrated = sanitizeState(JSON.parse(legacyRaw));
      safeSetLocalStorage(STORAGE_KEY, JSON.stringify(migrated));
      return mergeProfileFallback(migrated);
    }
  } catch (error) {
    console.error('Failed to load local state', error);
  }

  return mergeProfileFallback(fallback);
}

function safeGetLocalStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeRemoveLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

function setCookie(name, value, days = 365) {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {}
}

function getCookie(name) {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

function deleteCookie(name) {
  try {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
  } catch {}
}

function mergeProfileFallback(baseState) {
  if (baseState.profile) return baseState;
  try {
    const rawProfile = getCookie(PROFILE_COOKIE_KEY);
    if (!rawProfile) return baseState;
    const parsedProfile = sanitizeProfile(JSON.parse(rawProfile));
    return { ...baseState, profile: parsedProfile || null };
  } catch {
    return baseState;
  }
}

function persistProfileFallback() {
  if (state?.profile) {
    setCookie(PROFILE_COOKIE_KEY, JSON.stringify(state.profile));
  } else {
    deleteCookie(PROFILE_COOKIE_KEY);
  }
}

function openIdb() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) return reject(new Error('indexedDB unavailable'));
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('indexedDB open failed'));
  });
}

async function idbGet(key) {
  try {
    const db = await openIdb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error || new Error('indexedDB get failed'));
    });
  } catch {
    return null;
  }
}

async function idbSet(key, value) {
  try {
    const db = await openIdb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      const req = tx.objectStore(IDB_STORE).put(value, key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error || new Error('indexedDB put failed'));
    });
    return true;
  } catch {
    return false;
  }
}

async function idbDelete(key) {
  try {
    const db = await openIdb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      const req = tx.objectStore(IDB_STORE).delete(key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error || new Error('indexedDB delete failed'));
    });
  } catch {}
}

async function hydratePersistentState() {
  if (!state.profile) {
    const cookieProfile = mergeProfileFallback(state).profile;
    if (cookieProfile) state.profile = cookieProfile;
  }

  try {
    const rawState = await idbGet(STATE_IDB_KEY);
    if (rawState) {
      const parsedState = sanitizeState(typeof rawState === 'string' ? JSON.parse(rawState) : rawState);
      const hasLocalState = Boolean(state.profile) || Boolean(Object.keys(state.history || {}).length) || Boolean((state.recipes || []).length) || Boolean((state.favoriteIngredients || []).length);
      if (!hasLocalState) {
        state = parsedState;
      } else {
        state = {
          profile: state.profile || parsedState.profile,
          history: Object.keys(state.history || {}).length ? state.history : (parsedState.history || {}),
          recipes: (state.recipes || []).length ? state.recipes : (parsedState.recipes || []),
          favoriteIngredients: (state.favoriteIngredients || []).length ? state.favoriteIngredients : (parsedState.favoriteIngredients || []),
        };
      }
    }
  } catch {}

  if (state.profile) return;

  try {
    const rawProfile = await idbGet(PROFILE_IDB_KEY);
    if (!rawProfile) return;
    const parsedProfile = sanitizeProfile(typeof rawProfile === 'string' ? JSON.parse(rawProfile) : rawProfile);
    if (parsedProfile) {
      state.profile = parsedProfile;
      await saveState();
    }
  } catch {}
}

function storageStatusSummary() {
  const local = safeSetLocalStorage('__caltrack_test__', '1');
  if (local) safeRemoveLocalStorage('__caltrack_test__');
  const cookieBefore = getCookie('__caltrack_cookie_test__');
  setCookie('__caltrack_cookie_test__', '1', 1);
  const cookieOk = getCookie('__caltrack_cookie_test__') === '1';
  deleteCookie('__caltrack_cookie_test__');
  if (cookieBefore) setCookie('__caltrack_cookie_test__', cookieBefore, 1);
  return { local, cookie: cookieOk, indexedDb: Boolean(window.indexedDB) };
}

function t(key, vars = {}) {
  const dict = I18N[currentLang] || I18N.en;
  let text = dict[key] || I18N.en[key] || key;
  for (const [name, value] of Object.entries(vars)) {
    text = text.replaceAll(`{${name}}`, value);
  }
  return text;
}

function setLanguage(lang) {
  currentLang = lang === 'ro' ? 'ro' : 'en';
  safeSetLocalStorage(LANGUAGE_KEY, currentLang);
  setCookie(LANGUAGE_COOKIE_KEY, currentLang);
  applyTranslations();
  renderQuickFoods();
  renderRecipeOptions();
  renderRecipeDraft();
  renderIngredientLibraryOptions();
  renderFavoriteIngredients();
  if (ingredientLibrary.length) renderLibraryMeta();
  if (state.profile) {
    renderResult(state.profile);
    renderMain();
  }
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.title = t('appTitle');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('appDescription'));
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('appDescription'));
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', t('appTitle'));
  document.querySelector('meta[name="apple-mobile-web-app-title"]')?.setAttribute('content', t('appTitle'));

  ui.langButtons.forEach((button) => button.classList.toggle('active', button.dataset.lang === currentLang));

  const setText = (id, key, vars) => {
    const node = document.getElementById(id);
    if (node) node.textContent = t(key, vars);
  };
  const setAria = (id, key) => {
    const node = document.getElementById(id);
    if (node) node.setAttribute('aria-label', t(key));
  };

  setText('global-lang-label-1', 'languageToggle');
  setText('global-lang-label-2', 'languageToggle');
  setText('ob1-title', 'letsSetGoal');
  setText('ob1-sub', 'letsSetGoalSub');
  setText('ob-age-label', 'age');
  setText('ob-sex-label', 'sex');
  setText('sex-option-empty', 'selectOption');
  setText('sex-option-male', 'male');
  setText('sex-option-female', 'female');
  setText('ob-height-label', 'height');
  setAria('ob-h1', 'heightPrimaryLabel');
  document.querySelector('[aria-label="Height units"]')?.setAttribute('aria-label', t('heightUnits'));
  document.getElementById('ob-h2')?.setAttribute('aria-label', t('heightInchesLabel'));
  setText('ob-weight-label', 'weight');
  document.getElementById('ob-w')?.setAttribute('aria-label', t('weightValueLabel'));
  setText('step1-next', 'continue');
  setText('ob2-title', 'activityLevel');
  setText('ob2-sub', 'typicalWeek');
  setText('activity-1-title', 'sedentary');
  setText('activity-1-sub', 'sedentarySub');
  setText('activity-2-title', 'lightlyActive');
  setText('activity-2-sub', 'lightlyActiveSub');
  setText('activity-3-title', 'moderatelyActive');
  setText('activity-3-sub', 'moderatelyActiveSub');
  setText('activity-4-title', 'veryActive');
  setText('activity-4-sub', 'veryActiveSub');
  setText('activity-5-title', 'extremelyActive');
  setText('activity-5-sub', 'extremelyActiveSub');
  setText('step2-next', 'continue');
  setText('step2-back', 'back');
  setText('ob3-title', 'whatsYourGoal');
  setText('ob3-sub', 'goalSub');
  setText('goal-1-title', 'loseWeight');
  setText('goal-1-sub', 'loseWeightSub');
  setText('goal-2-title', 'maintain');
  setText('goal-2-sub', 'maintainSub');
  setText('goal-3-title', 'buildMuscle');
  setText('goal-3-sub', 'buildMuscleSub');
  setText('step3-finish', 'calculateMyGoal');
  setText('step3-back', 'back');
  setText('result-title', 'yourDailyTarget');
  setText('result-sub', 'resultSub');
  setText('result-kcal-unit', 'kcalPerDay');
  setText('res-p-label', 'protein');
  setText('res-c-label', 'carbs');
  setText('res-f-label', 'fat');
  setText('res-bmr-label', 'bmr');
  setText('res-tdee-label', 'tdee');
  setText('res-bmi-label', 'bmi');
  setText('res-goal-label-text', 'goal');
  setText('start-app', 'startTracking');
  setAria('global-lang-toggle-onboarding', 'languageToggle');
  setAria('global-lang-toggle-main', 'languageToggle');
  setText('topbar-title', 'today');
  setText('tab-btn-today', 'today');
  setText('tab-btn-history', 'history');
  setText('tab-btn-recipes', 'recipes');
  setText('tab-btn-settings', 'profile');
  setText('tab-btn-help', 'help');
  document.querySelector('.tabs')?.setAttribute('aria-label', t('sections'));
  setText('meals-section-title', 'meals');
  setAria('open-modal', 'addMealAria');
  setText('recipes-section-title', 'savedRecipes');
  setAria('open-recipe-modal', 'addRecipeAria');
  setText('modal-title', mealEditIndex === null ? 'logMeal' : 'editMeal');
  setText('quick-add-label', 'quickAdd');
  setText('meal-recipe-label', 'savedRecipe');
  setText('meal-serving-label', 'serving');
  setText('apply-recipe', 'applyRecipe');
  setText('meal-name-label', 'foodName');
  setText('add-meal', mealEditIndex === null ? 'addMeal' : 'updateMeal');
  setText('cancel-meal', 'cancel');
  setText('recipe-modal-title', recipeEditId ? 'editRecipe' : 'createRecipe');
  setText('recipe-name-label', 'recipeName');
  setText('recipe-total-weight-label', 'totalCookedWeight');
  setText('recipe-total-weight-hint', 'totalCookedWeightHint');
  setText('ingredient-builder-label', 'ingredientBuilder');
  setText('ingredient-serving-label', 'serving');
  setText('favorite-ingredients-label', 'favoriteIngredients');
  setText('add-ingredient', 'addIngredient');
  setText('save-recipe', recipeEditId ? 'updateRecipe' : 'saveRecipe');
  setText('cancel-recipe', 'cancel');
  document.getElementById('meal-name').placeholder = t('mealPlaceholder');
  document.getElementById('recipe-name').placeholder = t('recipePlaceholder');
  document.getElementById('ingredient-name').placeholder = t('ingredientSearchPlaceholder');
  if (ui.mealUnitMode) {
    const currentMealUnitMode = ui.mealUnitMode.value || 'grams';
    ui.mealUnitMode.innerHTML = `<option value="grams">${escapeHtml(t('gramsMode'))}</option><option value="units">${escapeHtml(t('unitsMode'))}</option>`;
    ui.mealUnitMode.value = currentMealUnitMode;
  }
  if (ui.ingredientUnitMode) {
    const currentIngredientUnitMode = ui.ingredientUnitMode.value || 'grams';
    ui.ingredientUnitMode.innerHTML = `<option value="grams">${escapeHtml(t('gramsMode'))}</option><option value="units">${escapeHtml(t('unitsMode'))}</option>`;
    ui.ingredientUnitMode.value = currentIngredientUnitMode;
  }
  ui.toggleIngredientFavorite?.setAttribute('aria-label', t('toggleFavoriteIngredient'));
  if (!ingredientLibrary.length) {
    ui.libraryMetaCard.textContent = t('loadingLibrary');
  }
  ui.ingredientLibraryHint.textContent = t('ingredientLibraryHint');
  if (ui.mealIngredientHint) ui.mealIngredientHint.textContent = t('ingredientLibraryHint');
  renderRecipeOptions();
}

function sanitizeState(input) {
  const profile = sanitizeProfile(input?.profile);
  const history = {};
  const recipes = Array.isArray(input?.recipes) ? input.recipes.map(sanitizeRecipe).filter(Boolean) : [];
  const favoriteIngredients = Array.isArray(input?.favoriteIngredients)
    ? Array.from(new Set(input.favoriteIngredients.map((item) => normalizeName(item)).filter(Boolean)))
    : [];

  if (input?.history && typeof input.history === 'object') {
    for (const [key, day] of Object.entries(input.history)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) continue;
      const meals = Array.isArray(day?.meals) ? day.meals.map(sanitizeMeal).filter(Boolean) : [];
      history[key] = { meals };
    }
  }

  pruneHistory(history);
  return { profile, history, recipes, favoriteIngredients };
}

function sanitizeProfile(profile) {
  if (!profile || typeof profile !== 'object') return null;

  const age = clampInt(profile.age, 10, 100);
  const heightCm = clampFloat(profile.heightCm, 80, 280);
  const weightKg = clampFloat(profile.weightKg, 20, 350);
  const bmr = clampInt(profile.bmr, 800, 6000);
  const tdee = clampInt(profile.tdee, 800, 8000);
  const goal = clampInt(profile.goal, 800, 8000);
  const prot = clampInt(profile.prot, 0, 500);
  const carb = clampInt(profile.carb, 0, 1000);
  const fat = clampInt(profile.fat, 0, 400);
  const bmi = Number.isFinite(Number(profile.bmi)) ? Number(profile.bmi).toFixed(1) : '0.0';
  const activityFactor = clampFloat(profile.activityFactor, 1.2, 1.9);
  const goalAdj = [-500, 0, 300].includes(Number(profile.goalAdj)) ? Number(profile.goalAdj) : -500;
  const sex = profile.sex === 'female' ? 'female' : 'male';

  return {
    age,
    sex,
    heightCm,
    weightKg,
    bmr,
    tdee,
    goal,
    bmi,
    prot,
    carb,
    fat,
    activityFactor,
    goalAdj,
    goalLabel: goalLabel(goalAdj),
  };
}

function sanitizeMeal(meal) {
  if (!meal || typeof meal !== 'object') return null;

  const name = String(meal.n || '').trim().slice(0, 80);
  const kcal = clampInt(meal.k, 1, 5000);
  if (!name || !kcal) return null;

  return {
    id: String(meal.id || `meal_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`),
    n: name,
    k: kcal,
    p: clampFloat(meal.p, 0, 400) ?? 0,
    c: clampFloat(meal.c, 0, 600) ?? 0,
    f: clampFloat(meal.f, 0, 300) ?? 0,
    emoji: String(meal.emoji || meal.e || '🍽️').slice(0, 2),
    recipeId: meal.recipeId ? String(meal.recipeId) : null,
    grams: clampFloat(meal.grams, 1, 5000),
    quantity: clampFloat(meal.quantity, 0.1, 5000),
    unitMode: meal.unitMode === 'units' ? 'units' : 'grams',
    unitLabel: meal.unitLabel ? String(meal.unitLabel).slice(0, 24) : null,
    unitWeightGrams: clampFloat(meal.unitWeightGrams, 1, 1000),
  };
}

function sanitizeIngredient(ingredient) {
  if (!ingredient || typeof ingredient !== 'object') return null;
  const name = String(ingredient.name || '').trim().slice(0, 80);
  const grams = clampFloat(ingredient.grams, 1, 5000);
  if (!name || !grams) return null;

  return {
    name,
    grams,
    kcal: clampFloat(ingredient.kcal ?? ingredient.k, 0, 5000) ?? 0,
    p: clampFloat(ingredient.p, 0, 400) ?? 0,
    c: clampFloat(ingredient.c, 0, 600) ?? 0,
    f: clampFloat(ingredient.f, 0, 300) ?? 0,
    quantity: clampFloat(ingredient.quantity, 0.1, 5000),
    unitMode: ingredient.unitMode === 'units' ? 'units' : 'grams',
    unitLabel: ingredient.unitLabel ? String(ingredient.unitLabel).slice(0, 24) : null,
    unitWeightGrams: clampFloat(ingredient.unitWeightGrams, 1, 1000),
  };
}

function sanitizeRecipe(recipe) {
  if (!recipe || typeof recipe !== 'object') return null;
  const name = String(recipe.name || recipe.n || '').trim().slice(0, 60);
  const totalWeight = clampFloat(recipe.totalWeight, 1, 20000);
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients.map(sanitizeIngredient).filter(Boolean) : [];
  if (!name || !totalWeight || !ingredients.length) return null;

  const totals = sumIngredientMacros(ingredients);
  const per100 = calculatePer100(totals, totalWeight);

  return {
    id: String(recipe.id || `recipe_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`),
    name,
    totalWeight,
    ingredients,
    totals,
    per100,
  };
}

async function saveState() {
  pruneHistory(state.history);
  persistProfileFallback();
  await idbSet(STATE_IDB_KEY, JSON.stringify(state));
  if (state?.profile) {
    await idbSet(PROFILE_IDB_KEY, JSON.stringify(state.profile));
  } else {
    await idbDelete(PROFILE_IDB_KEY);
  }
  const ok = safeSetLocalStorage(STORAGE_KEY, JSON.stringify(state));
  if (!ok) {
    console.error('Failed to save local state');
    const status = storageStatusSummary();
    showToast(`Storage issue — local:${status.local ? 'ok' : 'no'} cookie:${status.cookie ? 'ok' : 'no'} idb:${status.indexedDb ? 'yes' : 'no'}`);
  }
}

async function loadIngredientLibrary() {
  try {
    const response = await fetch(INGREDIENT_LIBRARY_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const raw = await response.json();
    ingredientLibrary = buildIngredientLibrary(Array.isArray(raw) ? raw : []);
    ingredientLibraryMap = new Map();
    ingredientLibrary.forEach((item) => {
      getIngredientAliases(item).forEach((alias) => {
        const key = normalizeName(alias);
        const existing = ingredientLibraryMap.get(key);
        if (!existing || compareIngredientQuality(item, existing) > 0) ingredientLibraryMap.set(key, item);
      });
    });
    renderIngredientLibraryOptions();
    renderLibraryMeta();
    renderFavoriteIngredients();
  } catch (error) {
    console.error('Failed to load ingredient library', error);
    ingredientLibrary = [];
    ingredientLibraryMap = new Map();
    renderIngredientLibraryOptions();
    renderFavoriteIngredients();
    renderLibraryMeta(t('libraryUnavailable'));
  }
}

function normalizeIngredientItem(item) {
  const safeRo = item.nameRo && !String(item.nameRo).startsWith('QUERY LENGTH LIMIT EXCEEDED') ? String(item.nameRo).trim() : '';
  const name = String(item.name || '').trim();
  return {
    ...item,
    name,
    nameRo: safeRo || name,
    caloriesPer100g: Number(item.caloriesPer100g || item.calories || 0),
    proteinPer100g: Number(item.proteinPer100g || item.protein || 0),
    carbsPer100g: Number(item.carbsPer100g || item.carbs || 0),
    fatPer100g: Number(item.fatPer100g || item.fat || 0),
    category: String(item.category || 'other'),
    aliases: Array.isArray(item.aliases) ? item.aliases.map((alias) => String(alias || '').trim()).filter(Boolean) : [],
  };
}

function buildIngredientLibrary(raw) {
  const normalized = raw.filter(Boolean).map(normalizeIngredientItem);
  const curated = CURATED_INGREDIENTS.map(normalizeIngredientItem);
  return [...curated, ...normalized];
}

function ingredientMacroDensity(item) {
  return (Number(item.proteinPer100g) || 0) + (Number(item.carbsPer100g) || 0) + (Number(item.fatPer100g) || 0);
}

function hasSuspiciousZeroMacros(item) {
  const kcal = Number(item.caloriesPer100g || 0);
  if (kcal < 40) return false;
  if (LOW_SIGNAL_CATEGORIES.has(String(item.category || ''))) return false;
  return ingredientMacroDensity(item) === 0;
}

function compareIngredientQuality(a, b) {
  return ingredientQualityScore(a) - ingredientQualityScore(b);
}

function ingredientQualityScore(item) {
  let score = 0;
  score += ingredientMacroDensity(item) > 0 ? 100 : 0;
  score += hasSuspiciousZeroMacros(item) ? -200 : 0;
  score += item.source === 'curated' ? 60 : 0;
  score += Math.min((Number(item.proteinPer100g) || 0) + (Number(item.carbsPer100g) || 0) + (Number(item.fatPer100g) || 0), 100);
  return score;
}

function displayIngredientName(item) {
  return currentLang === 'ro' && item.nameRo ? item.nameRo : item.name;
}

function getIngredientAliases(item) {
  return Array.from(new Set([item.name, item.nameRo, ...(Array.isArray(item.aliases) ? item.aliases : [])].filter(Boolean)));
}

function renderIngredientLibraryOptions() {
  // Kept as a no-op because mobile Safari is unreliable with datalist-based ingredient search.
}

function renderLibraryMeta(message) {
  if (message) {
    ui.libraryMetaCard.textContent = message;
    return;
  }

  const count = ingredientLibrary.length.toLocaleString(currentLang === 'ro' ? 'ro-RO' : 'en-GB');
  ui.libraryMetaCard.innerHTML = `
    <strong>${t('libraryLoaded', { count })}</strong>
    <div class="library-meta-sub">${t('libraryLoadedDetail')}</div>
    <div class="library-meta-sub">${t('duplicateRecipeNamesFixed')}</div>
  `;
}

function pruneHistory(history) {
  const keys = Object.keys(history).sort();
  if (keys.length <= MAX_DAYS_HISTORY) return;
  const toDelete = keys.slice(0, keys.length - MAX_DAYS_HISTORY);
  toDelete.forEach((key) => delete history[key]);
}

function showScreen(targetId) {
  ui.screens.forEach((screen) => screen.classList.toggle('active', screen.id === targetId));
  ui.onboardingLangWrap?.classList.toggle('hidden', targetId === 's-main');
}

function selectCard(cards, activeCard, className) {
  cards.forEach((card) => card.classList.remove(className));
  activeCard.classList.add(className);

  if (activeCard.dataset.activity) selectedActivity = Number(activeCard.dataset.activity);
  if (activeCard.dataset.goal) selectedGoalAdj = Number(activeCard.dataset.goal);
}

function setHeightUnit(unit) {
  heightUnit = unit;
  ui.heightCmBtn.classList.toggle('sel', unit === 'cm');
  ui.heightFtBtn.classList.toggle('sel', unit === 'ft');
  ui.inchRow.classList.toggle('hidden-row', unit !== 'ft');
  document.getElementById('ob-h1').placeholder = unit === 'cm' ? '175' : '5';
}

function setWeightUnit(unit) {
  weightUnit = unit;
  ui.weightKgBtn.classList.toggle('sel', unit === 'kg');
  ui.weightLbBtn.classList.toggle('sel', unit === 'lb');
  document.getElementById('ob-w').placeholder = unit === 'kg' ? '70' : '154';
}

function goStep2() {
  const age = clampInt(document.getElementById('ob-age').value, 10, 100);
  const sex = document.getElementById('ob-sex').value;
  const heightPrimary = Number(document.getElementById('ob-h1').value);
  const weight = Number(document.getElementById('ob-w').value);

  if (!age || !['male', 'female'].includes(sex) || !Number.isFinite(heightPrimary) || heightPrimary <= 0 || !Number.isFinite(weight) || weight <= 0) {
    showToast(t('fillStats'));
    return;
  }

  showScreen('s-ob2');
}

async function calcAndFinish() {
  const age = clampInt(document.getElementById('ob-age').value, 10, 100);
  const sex = document.getElementById('ob-sex').value;
  const heightPrimary = Number(document.getElementById('ob-h1').value);
  const heightSecondary = Number(document.getElementById('ob-h2').value || 0);
  let weight = Number(document.getElementById('ob-w').value);

  if (!age || !['male', 'female'].includes(sex) || !Number.isFinite(heightPrimary) || heightPrimary <= 0 || !Number.isFinite(weight) || weight <= 0) {
    showToast(t('invalidInputs'));
    return;
  }

  if (weightUnit === 'lb') weight *= 0.453592;

  const heightCm = heightUnit === 'ft'
    ? heightPrimary * 30.48 + (clampFloat(heightSecondary, 0, 11) || 0) * 2.54
    : heightPrimary;

  if (heightCm < 80 || heightCm > 280 || weight < 20 || weight > 350) {
    showToast(t('unrealisticStats'));
    return;
  }

  const bmr = sex === 'male'
    ? 88.362 + 13.397 * weight + 4.799 * heightCm - 5.677 * age
    : 447.593 + 9.247 * weight + 3.098 * heightCm - 4.33 * age;

  const tdee = bmr * selectedActivity;
  const goal = Math.max(800, Math.round(tdee + selectedGoalAdj));
  const bmi = weight / ((heightCm / 100) ** 2);
  const prot = Math.round(weight * 2.0);
  const fat = Math.max(25, Math.round((goal * 0.25) / 9));
  const carb = Math.max(0, Math.round((goal - prot * 4 - fat * 9) / 4));

  state.profile = {
    age,
    sex,
    heightCm: roundTo(heightCm, 1),
    weightKg: roundTo(weight, 1),
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    goal,
    bmi: bmi.toFixed(1),
    prot,
    carb,
    fat,
    activityFactor: selectedActivity,
    goalAdj: selectedGoalAdj,
    goalLabel: goalLabel(selectedGoalAdj),
  };

  await saveState();
  renderResult(state.profile);
  showScreen('s-result');
}

function renderResult(profile) {
  document.getElementById('res-kcal').textContent = profile.goal;
  document.getElementById('res-bmr').textContent = `${profile.bmr} kcal`;
  document.getElementById('res-tdee').textContent = `${profile.tdee} kcal`;
  document.getElementById('res-bmi').textContent = profile.bmi;
  document.getElementById('res-goal-label').textContent = goalLabel(profile.goalAdj);
  document.getElementById('res-p').textContent = `${profile.prot}g`;
  document.getElementById('res-c').textContent = `${profile.carb}g`;
  document.getElementById('res-f').textContent = `${profile.fat}g`;
}

function startApp() {
  if (!state.profile) {
    showToast(t('profileFirst'));
    showScreen('s-ob1');
    return;
  }

  showScreen('s-main');
  renderMain();
}

function renderMain() {
  document.getElementById('main-date').textContent = formatLongDate(new Date());
  document.getElementById('topbar-title').textContent = t('today');
  renderQuickFoods();
  renderRecipeOptions();
  renderTotals();
  renderMeals();
  renderHistory();
  renderRecipes();
  renderSettings();
  renderHelp();
  renderStreak();
  renderFavoriteIngredients();
  switchTab(document.querySelector('.tab.active')?.dataset.tab || 'today');
}

function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function ensureDay(key = todayKey()) {
  if (!state.history[key]) state.history[key] = { meals: [] };
  return state.history[key];
}

function getMealsForDay(key = todayKey()) {
  return ensureDay(key).meals;
}

function renderTotals() {
  const profile = state.profile;
  const meals = getMealsForDay();
  const eaten = meals.reduce((sum, meal) => sum + meal.k, 0);
  const protein = meals.reduce((sum, meal) => sum + meal.p, 0);
  const carbs = meals.reduce((sum, meal) => sum + meal.c, 0);
  const fat = meals.reduce((sum, meal) => sum + meal.f, 0);
  const remaining = profile.goal - eaten;
  const progress = Math.min(eaten / profile.goal, 1);

  document.getElementById('main-kcal-eaten').textContent = eaten;
  document.getElementById('main-remaining').textContent = remaining >= 0 ? `${remaining} ${t('remaining')}` : `${Math.abs(remaining)} ${t('over')}`;

  const ring = document.getElementById('main-ring');
  ring.setAttribute('stroke-dashoffset', String(Math.round(RING_CIRCUMFERENCE * (1 - progress))));
  ring.style.stroke = remaining < 0 ? '#f05a5a' : remaining < 200 ? '#f0a04a' : '#7c6af7';

  document.getElementById('macro-mini').innerHTML = [
    { cls: 'p', label: t('protein'), value: protein, goal: profile.prot },
    { cls: 'c', label: t('carbs'), value: carbs, goal: profile.carb },
    { cls: 'f', label: t('fat'), value: fat, goal: profile.fat },
  ].map((item) => `
    <div class="mm-card ${item.cls}">
      <div class="mm-val">${formatNumber(item.value)}g</div>
      <div class="mm-bar-bg"><div class="mm-bar" style="width:${Math.min(item.value / Math.max(item.goal, 1), 1) * 100}%"></div></div>
      <div class="mm-lbl">${item.label} / ${formatNumber(item.goal)}g</div>
    </div>
  `).join('');
}

function renderMeals() {
  const meals = getMealsForDay();

  if (!meals.length) {
    ui.mealsList.innerHTML = `<div class="empty-state">${t('mealsEmpty')}</div>`;
    return;
  }

  ui.mealsList.innerHTML = meals.map((meal, index) => {
    const name = escapeHtml(meal.n);
    const emoji = escapeHtml(meal.emoji || '🍽️');
    const gramsNote = meal.grams ? ` · ${roundTo(meal.grams, 0)}g` : '';
    return `
      <div class="meal-item">
        <div class="meal-emoji">${emoji}</div>
        <div class="meal-info">
          <div class="meal-name">${name}</div>
          <div class="meal-macros">P: ${formatNumber(meal.p)}g · C: ${formatNumber(meal.c)}g · F: ${formatNumber(meal.f)}g${gramsNote}</div>
        </div>
        <div class="meal-actions">
          <div class="meal-kcal">${formatNumber(meal.k)}</div>
          <div class="item-actions-row">
            <button class="icon-btn" type="button" data-edit-meal="${index}" aria-label="${escapeHtml(t('editMealAria', { name: meal.n }))}">✎</button>
            <button class="icon-btn danger" type="button" data-del-index="${index}" aria-label="${escapeHtml(t('deleteMealAria', { name: meal.n }))}">✕</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  ui.mealsList.querySelectorAll('[data-del-index]').forEach((button) => {
    button.addEventListener('click', () => deleteMeal(Number(button.dataset.delIndex)));
  });
  ui.mealsList.querySelectorAll('[data-edit-meal]').forEach((button) => {
    button.addEventListener('click', () => openMealModal(Number(button.dataset.editMeal)));
  });
}

function deleteMeal(index) {
  const meals = getMealsForDay();
  meals.splice(index, 1);
  saveState();
  renderTotals();
  renderMeals();
  renderHistory();
  renderStreak();
}

function renderHistory() {
  const profile = state.profile;
  const keys = Object.keys(state.history).sort().reverse();

  if (!keys.length) {
    ui.historyTab.innerHTML = `<div class="empty-state" style="padding-top:32px">${t('historyEmpty')}</div>`;
    return;
  }

  ui.historyTab.innerHTML = `<div class="history-list">${keys.map((key) => {
    const meals = state.history[key].meals || [];
    const kcal = meals.reduce((sum, meal) => sum + meal.k, 0);
    const protein = meals.reduce((sum, meal) => sum + meal.p, 0);
    const carbs = meals.reduce((sum, meal) => sum + meal.c, 0);
    const fat = meals.reduce((sum, meal) => sum + meal.f, 0);
    const pct = Math.min(kcal / profile.goal, 1) * 100;
    const color = kcal > profile.goal ? '#f05a5a' : kcal > profile.goal * 0.9 ? '#5edfa8' : '#7c6af7';
    const label = key === todayKey() ? t('today') : formatHistoryDate(key);
    const mealCountLabel = meals.length === 1 ? t('mealCount', { count: meals.length }) : t('mealCountPlural', { count: meals.length });

    return `
      <div class="history-item">
        <div class="hist-top">
          <span class="hist-date">${label}</span>
          <span class="hist-kcal" style="color:${color}">${formatNumber(kcal)} kcal</span>
        </div>
        <div class="hist-bar-bg"><div class="hist-bar" style="width:${pct}%;background:${color}"></div></div>
        <div class="hist-macros">
          <span>P: <b>${formatNumber(protein)}g</b></span>
          <span>C: <b>${formatNumber(carbs)}g</b></span>
          <span>F: <b>${formatNumber(fat)}g</b></span>
          <span>${mealCountLabel}</span>
        </div>
      </div>
    `;
  }).join('')}</div>`;
}

function renderRecipes() {
  const recipes = state.recipes || [];
  if (!recipes.length) {
    ui.recipesList.innerHTML = `<div class="empty-state">${t('recipesEmpty')}</div>`;
    return;
  }

  ui.recipesList.innerHTML = recipes.map((recipe) => `
    <div class="recipe-card">
      <div class="recipe-card-top">
        <div>
          <div class="recipe-name">${escapeHtml(recipe.name)}</div>
          <div class="recipe-meta">${t('ingredientsCount', { count: recipe.ingredients.length, weight: roundTo(recipe.totalWeight, 0) })}</div>
        </div>
        <div class="item-actions-row">
          <button class="icon-btn" type="button" data-edit-recipe="${recipe.id}" aria-label="${escapeHtml(t('editRecipeAria', { name: recipe.name }))}">✎</button>
          <button class="icon-btn danger" type="button" data-delete-recipe="${recipe.id}" aria-label="${escapeHtml(t('deleteRecipeAria', { name: recipe.name }))}">✕</button>
        </div>
      </div>

      <div class="recipe-macros-row">
        <span>${formatNumber(recipe.per100.kcal)} kcal ${t('per100g')}</span>
        <span>${t('proteinWord')} ${formatNumber(recipe.per100.p)}g</span>
        <span>${t('carbsWord')} ${formatNumber(recipe.per100.c)}g</span>
        <span>${t('fatWord')} ${formatNumber(recipe.per100.f)}g</span>
      </div>
    </div>
  `).join('');

  ui.recipesList.querySelectorAll('[data-delete-recipe]').forEach((button) => {
    button.addEventListener('click', () => deleteRecipe(button.dataset.deleteRecipe));
  });
  ui.recipesList.querySelectorAll('[data-edit-recipe]').forEach((button) => {
    button.addEventListener('click', () => openRecipeModal(button.dataset.editRecipe));
  });
}

function renderStreak() {
  let streak = 0;
  const cursor = new Date();

  while (true) {
    const key = todayKey(cursor);
    const day = state.history[key];
    if (!day?.meals?.length) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  document.getElementById('streak-badge').textContent = `🔥 ${streak} ${streak !== 1 ? t('days') : t('day')}`;
}

function renderSettings() {
  const profile = state.profile;
  ui.settingsTab.innerHTML = `
    <div class="settings-wrap">
      <div class="setting-card">
        <h3>${t('yourStats')}</h3>
        <div class="setting-row"><span>${t('age')}</span><span>${profile.age} ${t('yearsSuffix')}</span></div>
        <div class="setting-row"><span>${t('height')}</span><span>${profile.heightCm} ${t('cmSuffix')}</span></div>
        <div class="setting-row"><span>${t('weight')}</span><span>${profile.weightKg} ${t('kgSuffix')}</span></div>
        <div class="setting-row"><span>${t('bmi')}</span><span>${profile.bmi}</span></div>
      </div>

      <div class="setting-card">
        <h3>${t('calorieTargets')}</h3>
        <div class="setting-row"><span>${t('bmr')}</span><span>${profile.bmr} kcal</span></div>
        <div class="setting-row"><span>${t('tdee')}</span><span>${profile.tdee} kcal</span></div>
        <div class="setting-row"><span>${t('dailyGoal')}</span><span>${profile.goal} kcal</span></div>
        <div class="setting-row"><span>${t('goalType')}</span><span>${goalLabel(profile.goalAdj)}</span></div>
      </div>

      <div class="setting-card">
        <h3>${t('macroTargets')}</h3>
        <div class="setting-row"><span>${t('protein')}</span><span>${profile.prot}g</span></div>
        <div class="setting-row"><span>${t('carbs')}</span><span>${profile.carb}g</span></div>
        <div class="setting-row"><span>${t('fat')}</span><span>${profile.fat}g</span></div>
      </div>

      <div class="setting-card">
        <h3>${t('about')}</h3>
        <p class="help-copy">${t('aboutText')}</p>
      </div>

      <div class="setting-card">
        <h3>${t('dataSourceLabel')}</h3>
        <p class="help-copy">${t('dataSourceText')}</p>
      </div>

      <button class="btn-ghost" id="reset-app" type="button" style="color:#f05a5a;border-color:#f05a5a33;">${t('resetStartOver')}</button>
    </div>
  `;

  document.getElementById('reset-app').addEventListener('click', resetApp);
}

function switchTab(tabName) {
  ui.tabs.forEach((tab) => {
    const active = tab.dataset.tab === tabName;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  ui.tabContents.forEach((content) => {
    content.classList.toggle('active', content.id === `tab-${tabName}`);
  });

  if (tabName === 'history') renderHistory();
  if (tabName === 'recipes') renderRecipes();
  if (tabName === 'settings') renderSettings();
  if (tabName === 'help') renderHelp();
}

function renderHelp() {
  ui.helpTab.innerHTML = `
    <div class="settings-wrap help-wrap">
      <div class="setting-card help-hero-card">
        <h3>${t('helpTitle')}</h3>
        <p class="help-copy">${t('helpIntro')}</p>
      </div>

      ${[1, 2, 3, 4, 5].map((step) => `
        <div class="setting-card help-step-card">
          <h3>${t(`helpStep${step}Title`)}</h3>
          <p class="help-copy">${t(`helpStep${step}Body`)}</p>
        </div>
      `).join('')}

      <div class="setting-card help-tips-card">
        <h3>${t('helpTipsTitle')}</h3>
        <p class="help-copy">${t('helpTipsBody')}</p>
      </div>
    </div>
  `;
}

function renderQuickFoods() {
  ui.quickFoods.innerHTML = QUICK_FOODS.map((food, index) => `
    <button class="quick-chip" type="button" data-quick-index="${index}">${food.e} ${escapeHtml(food.name[currentLang] || food.name.en)}</button>
  `).join('');

  ui.quickFoods.querySelectorAll('[data-quick-index]').forEach((button) => {
    button.addEventListener('click', () => fillQuick(Number(button.dataset.quickIndex)));
  });
}

function renderRecipeOptions() {
  const current = ui.recipeSelect.value;
  ui.recipeSelect.innerHTML = [`<option value="">${escapeHtml(t('noneManual'))}</option>`]
    .concat(state.recipes.map((recipe) => `<option value="${recipe.id}">${escapeHtml(recipe.name)}</option>`))
    .join('');
  if (current && state.recipes.some((recipe) => recipe.id === current)) ui.recipeSelect.value = current;
}

function openMealModal(index = null) {
  mealEditIndex = Number.isInteger(index) ? index : null;
  applyTranslations();
  renderRecipeOptions();
  ui.mealModal.classList.remove('hidden');
  ui.mealModal.setAttribute('aria-hidden', 'false');

  if (mealEditIndex !== null) {
    const meal = getMealsForDay()[mealEditIndex];
    if (meal) fillMealModal(meal);
  } else {
    clearMealModal();
  }

  document.getElementById('meal-name').focus();
}

function clearMealModal() {
  ['meal-name', 'meal-kcal', 'meal-p', 'meal-c', 'meal-f'].forEach((id) => {
    document.getElementById(id).value = '';
  });
  ui.mealServingValue.value = '100';
  ui.mealUnitMode.value = 'grams';
  ui.recipeSelect.value = '';
  ui.recipePreview.classList.add('hidden');
  ui.recipePreview.innerHTML = '';
  hideIngredientSuggestions(ui.mealIngredientSuggestions);
  ui.mealIngredientHint.textContent = t('ingredientLibraryHint');
}

function fillMealModal(meal) {
  document.getElementById('meal-name').value = meal.n || '';
  document.getElementById('meal-kcal').value = meal.k || '';
  document.getElementById('meal-p').value = formatFieldNumber(meal.p);
  document.getElementById('meal-c').value = formatFieldNumber(meal.c);
  document.getElementById('meal-f').value = formatFieldNumber(meal.f);
  ui.mealServingValue.value = formatFieldNumber(meal.quantity || meal.grams || 100);
  ui.mealUnitMode.value = meal.unitMode === 'units' ? 'units' : 'grams';
  ui.recipeSelect.value = meal.recipeId || '';
  updateMealRecipePreview();
}

function closeMealModal() {
  ui.mealModal.classList.add('hidden');
  ui.mealModal.setAttribute('aria-hidden', 'true');
  mealEditIndex = null;
  clearMealModal();
  applyTranslations();
}

function openRecipeModal(recipeId = null) {
  recipeEditId = recipeId || null;
  recipeDraftIngredients = [];
  clearRecipeBuilderFields();

  if (recipeEditId) {
    const recipe = getRecipeById(recipeEditId);
    if (recipe) {
      document.getElementById('recipe-name').value = recipe.name;
      document.getElementById('recipe-total-weight').value = formatFieldNumber(recipe.totalWeight);
      recipeDraftIngredients = recipe.ingredients.map((ingredient) => ({ ...ingredient }));
    }
  } else {
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-total-weight').value = '';
  }

  ui.recipeModal.classList.remove('hidden');
  ui.recipeModal.setAttribute('aria-hidden', 'false');
  ui.ingredientLibraryHint.textContent = t('ingredientLibraryHint');
  renderRecipeDraft();
  renderFavoriteIngredients();
  applyTranslations();
  document.getElementById('recipe-name').focus();
}

function clearRecipeBuilderFields() {
  document.getElementById('ingredient-name').value = '';
  ui.ingredientServingValue.value = '100';
  ui.ingredientUnitMode.value = 'grams';
  document.getElementById('ingredient-grams').value = '0';
  document.getElementById('ingredient-kcal').value = '0';
  document.getElementById('ingredient-p').value = '0';
  document.getElementById('ingredient-c').value = '0';
  document.getElementById('ingredient-f').value = '0';
  hideIngredientSuggestions(ui.recipeIngredientSuggestions);
  updateFavoriteToggleButton();
}

function closeRecipeModal() {
  ui.recipeModal.classList.add('hidden');
  ui.recipeModal.setAttribute('aria-hidden', 'true');
  recipeDraftIngredients = [];
  recipeEditId = null;
  document.getElementById('recipe-name').value = '';
  document.getElementById('recipe-total-weight').value = '0';
  ['ingredient-name', 'ingredient-grams', 'ingredient-kcal', 'ingredient-p', 'ingredient-c', 'ingredient-f'].forEach((id) => {
    document.getElementById(id).value = id === 'ingredient-name' ? '' : '0';
  });
  hideIngredientSuggestions(ui.recipeIngredientSuggestions);
  ui.ingredientLibraryHint.textContent = t('ingredientLibraryHint');
  renderRecipeDraft();
  renderFavoriteIngredients();
  applyTranslations();
}

function fillQuick(index) {
  const food = QUICK_FOODS[index];
  if (!food) return;
  ui.recipeSelect.value = '';
  ui.recipePreview.classList.add('hidden');
  document.getElementById('meal-name').value = food.name[currentLang] || food.name.en;
  document.getElementById('meal-kcal').value = food.k;
  document.getElementById('meal-p').value = food.p;
  document.getElementById('meal-c').value = food.c;
  document.getElementById('meal-f').value = food.f;
}

function handleMealRecipeSelection() {
  hideIngredientSuggestions(ui.mealIngredientSuggestions);
  if (!ui.recipeSelect.value) {
    ui.recipePreview.classList.add('hidden');
    ui.mealIngredientHint.textContent = t('ingredientLibraryHint');
    maybeApplyMealIngredientLibrary();
    return;
  }

  if (!ui.mealServingValue.value) ui.mealServingValue.value = '100';
  if (ui.mealUnitMode.value === 'units') ui.mealUnitMode.value = 'grams';
  applySelectedRecipeToMeal();
}

function updateMealRecipePreview() {
  const recipe = getRecipeById(ui.recipeSelect.value);
  const grams = resolveMealServingGrams();
  if (!recipe || !grams) {
    ui.recipePreview.classList.add('hidden');
    return;
  }

  const macros = calculateRecipeServing(recipe, grams);
  ui.recipePreview.classList.remove('hidden');
  ui.recipePreview.innerHTML = `
    <div><strong>${escapeHtml(recipe.name)}</strong> · ${roundTo(grams, 0)}g</div>
    <div class="recipe-preview-line">${formatNumber(macros.k)} kcal · P ${formatNumber(macros.p)}g · C ${formatNumber(macros.c)}g · F ${formatNumber(macros.f)}g</div>
  `;
}

function applySelectedRecipeToMeal() {
  const recipe = getRecipeById(ui.recipeSelect.value);
  const grams = resolveMealServingGrams();
  if (!recipe) {
    showToast(t('pickSavedRecipe'));
    return;
  }
  if (!grams) {
    showToast(t('enterServingWeight'));
    return;
  }

  const macros = calculateRecipeServing(recipe, grams);
  document.getElementById('meal-name').value = recipe.name;
  document.getElementById('meal-kcal').value = macros.k;
  document.getElementById('meal-p').value = macros.p;
  document.getElementById('meal-c').value = macros.c;
  document.getElementById('meal-f').value = macros.f;
  updateMealRecipePreview();
}

async function saveMealFromModal() {
  const selectedRecipe = getRecipeById(ui.recipeSelect.value);
  const grams = resolveMealServingGrams();

  if (selectedRecipe && grams) {
    const macros = calculateRecipeServing(selectedRecipe, grams);
    document.getElementById('meal-name').value = selectedRecipe.name;
    document.getElementById('meal-kcal').value = macros.k;
    document.getElementById('meal-p').value = macros.p;
    document.getElementById('meal-c').value = macros.c;
    document.getElementById('meal-f').value = macros.f;
  }

  const mealMatch = selectedRecipe ? null : findIngredientByName(document.getElementById('meal-name').value);
  const resolvedMeal = selectedRecipe ? {
    grams,
    quantity: grams,
    unitMode: 'grams',
    unitLabel: null,
    unitWeightGrams: null,
  } : resolveQuantityMode(mealMatch, ui.mealServingValue.value, ui.mealUnitMode.value);

  const existingMeal = mealEditIndex !== null ? getMealsForDay()[mealEditIndex] : null;
  const meal = sanitizeMeal({
    id: existingMeal?.id,
    n: document.getElementById('meal-name').value,
    k: document.getElementById('meal-kcal').value,
    p: document.getElementById('meal-p').value,
    c: document.getElementById('meal-c').value,
    f: document.getElementById('meal-f').value,
    emoji: existingMeal?.emoji || EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    recipeId: selectedRecipe?.id || null,
    grams: resolvedMeal.grams,
    quantity: resolvedMeal.quantity,
    unitMode: resolvedMeal.unitMode,
    unitLabel: resolvedMeal.unitLabel,
    unitWeightGrams: resolvedMeal.unitWeightGrams,
  });

  if (!meal) {
    showToast(t('mealNameCaloriesRequired'));
    return;
  }

  const meals = getMealsForDay();
  const isEditing = mealEditIndex !== null;
  if (isEditing) meals[mealEditIndex] = meal;
  else meals.push(meal);

  await saveState();
  closeMealModal();
  renderTotals();
  renderMeals();
  renderHistory();
  renderStreak();
  showToast(t(isEditing ? 'mealUpdated' : 'mealSaved'));
}

function setIngredientMacroFields(kcal = 0, p = 0, c = 0, f = 0) {
  document.getElementById('ingredient-kcal').value = String(kcal);
  document.getElementById('ingredient-p').value = formatFieldNumber(p);
  document.getElementById('ingredient-c').value = formatFieldNumber(c);
  document.getElementById('ingredient-f').value = formatFieldNumber(f);
}


function getDefaultUnitMeta(item) {
  if (!item) return null;
  if (Number(item.defaultUnitGrams) > 0) {
    const label = item.defaultUnitLabel
      || item.defaultUnit
      || (currentLang === 'ro' ? 'buc' : 'unit');
    return { grams: Number(item.defaultUnitGrams), label: String(label) };
  }
  return null;
}

function resolveQuantityMode(item, quantityValue, modeValue) {
  const quantity = clampFloat(quantityValue, 0.1, 5000);
  const defaultUnit = getDefaultUnitMeta(item);
  const unitMode = modeValue === 'units' && defaultUnit ? 'units' : 'grams';
  const grams = unitMode === 'units' ? roundMacroValue((quantity || 0) * defaultUnit.grams, 1) : quantity;
  return {
    quantity,
    grams,
    unitMode,
    unitWeightGrams: unitMode === 'units' ? defaultUnit.grams : null,
    unitLabel: unitMode === 'units' ? defaultUnit.label : null,
    defaultUnit,
  };
}

function setMealMacroFields(kcal = 0, p = 0, c = 0, f = 0) {
  document.getElementById('meal-kcal').value = String(kcal);
  document.getElementById('meal-p').value = formatFieldNumber(p);
  document.getElementById('meal-c').value = formatFieldNumber(c);
  document.getElementById('meal-f').value = formatFieldNumber(f);
}

function formatIngredientAmount(item) {
  if (item?.unitMode === 'units' && item.quantity && item.unitLabel) {
    return `${formatNumber(item.quantity)} ${item.unitLabel} · ${roundTo(item.grams || 0, 0)}g`;
  }
  return `${roundTo(item?.grams || 0, 0)}g`;
}

function maybeApplyIngredientLibrary() {
  const name = document.getElementById('ingredient-name').value;
  const match = findIngredientByName(name);
  const resolved = resolveQuantityMode(match, ui.ingredientServingValue.value, ui.ingredientUnitMode.value);
  document.getElementById('ingredient-grams').value = resolved.grams ? formatFieldNumber(resolved.grams) : '0';
  updateFavoriteToggleButton();

  if (!match) {
    if (!name.trim() || !resolved.grams) setIngredientMacroFields(0, 0, 0, 0);
    ui.ingredientLibraryHint.textContent = name.trim() ? t('ingredientNoMatch') : t('ingredientLibraryHint');
    return;
  }

  if (ui.ingredientUnitMode.value === 'units' && !resolved.defaultUnit) {
    ui.ingredientUnitMode.value = 'grams';
    document.getElementById('ingredient-grams').value = ui.ingredientServingValue.value || '0';
  }
  applyIngredientMacros(match, resolved.grams, resolved);
}

function handleRecipeIngredientInput() {
  maybeApplyIngredientLibrary();
  renderIngredientSuggestions(document.getElementById('ingredient-name').value, ui.recipeIngredientSuggestions, selectRecipeIngredientSuggestion);
}

function handleMealIngredientInput() {
  const name = document.getElementById('meal-name').value;
  const recipeSelected = Boolean(ui.recipeSelect.value);
  if (recipeSelected) {
    hideIngredientSuggestions(ui.mealIngredientSuggestions);
    return;
  }

  renderIngredientSuggestions(name, ui.mealIngredientSuggestions, selectMealIngredientSuggestion);
  maybeApplyMealIngredientLibrary();
}

function handleMealServingChange() {
  const recipe = getRecipeById(ui.recipeSelect.value);
  if (recipe) {
    if (ui.mealUnitMode.value === 'units') ui.mealUnitMode.value = 'grams';
    updateMealRecipePreview();
    applySelectedRecipeToMeal();
    return;
  }
  maybeApplyMealIngredientLibrary();
}

function resolveMealServingGrams() {
  if (ui.mealUnitMode.value === 'units') {
    const match = findIngredientByName(document.getElementById('meal-name').value);
    return resolveQuantityMode(match, ui.mealServingValue.value, ui.mealUnitMode.value).grams;
  }
  return clampFloat(ui.mealServingValue.value, 1, 3000);
}

function maybeApplyMealIngredientLibrary() {
  const name = document.getElementById('meal-name').value;
  const match = findIngredientByName(name);
  const resolved = resolveQuantityMode(match, ui.mealServingValue.value, ui.mealUnitMode.value);
  if (!match) {
    ui.mealIngredientHint.textContent = name.trim() ? t('ingredientNoMatch') : t('ingredientLibraryHint');
    return;
  }

  if (ui.mealUnitMode.value === 'units' && !resolved.defaultUnit) {
    ui.mealUnitMode.value = 'grams';
  }
  applyIngredientMacrosToMeal(match, resolved);
}

function applyIngredientMacrosToMeal(item, resolved = resolveQuantityMode(item, ui.mealServingValue.value, ui.mealUnitMode.value)) {
  const grams = resolved.grams || 0;
  const factor = grams / 100;
  const kcal = roundMacroValue((item.caloriesPer100g || 0) * factor, 0);
  const p = roundMacroValue((item.proteinPer100g || 0) * factor, 1);
  const c = roundMacroValue((item.carbsPer100g || 0) * factor, 1);
  const f = roundMacroValue((item.fatPer100g || 0) * factor, 1);
  setMealMacroFields(kcal, p, c, f);
  ui.mealIngredientHint.textContent = t('ingredientMatched', {
    name: displayIngredientName(item),
    kcal: formatNumber(item.caloriesPer100g),
    p: formatNumber(item.proteinPer100g),
    c: formatNumber(item.carbsPer100g),
    f: formatNumber(item.fatPer100g),
    category: humanizeCategory(item.category),
  }) + ` · ${formatIngredientAmount(resolved)} → ${formatNumber(kcal)} kcal / P ${formatNumber(p)}g / C ${formatNumber(c)}g / F ${formatNumber(f)}g`;
}

function selectRecipeIngredientSuggestion(item) {
  document.getElementById('ingredient-name').value = displayIngredientName(item);
  if (ui.ingredientUnitMode.value === 'units' && getDefaultUnitMeta(item)) ui.ingredientServingValue.value = '1';
  hideIngredientSuggestions(ui.recipeIngredientSuggestions);
  maybeApplyIngredientLibrary();
}

function selectMealIngredientSuggestion(item) {
  ui.recipeSelect.value = '';
  ui.recipePreview.classList.add('hidden');
  document.getElementById('meal-name').value = displayIngredientName(item);
  hideIngredientSuggestions(ui.mealIngredientSuggestions);
  applyIngredientMacrosToMeal(item);
}


function renderIngredientSuggestions(query, container, onSelect) {
  if (!container) return;
  const suggestions = getIngredientSuggestions(query);
  if (!suggestions.length) {
    hideIngredientSuggestions(container);
    return;
  }

  container.innerHTML = suggestions.map((item, index) => `
    <button class="search-suggestion-btn ${index === 0 ? 'active' : ''}" type="button" data-suggestion-key="${escapeHtml(item.name)}">
      <div class="search-suggestion-name">${escapeHtml(displayIngredientName(item))}</div>
      <div class="search-suggestion-meta">${formatNumber(item.caloriesPer100g)} kcal · P ${formatNumber(item.proteinPer100g)}g · C ${formatNumber(item.carbsPer100g)}g · F ${formatNumber(item.fatPer100g)}g / 100g · ${escapeHtml(humanizeCategory(item.category))}</div>
    </button>
  `).join('');
  container.classList.remove('hidden');

  container.querySelectorAll('[data-suggestion-key]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = ingredientLibrary.find((entry) => entry.name === button.dataset.suggestionKey);
      if (item) onSelect(item);
    });
  });
}

function hideIngredientSuggestions(container) {
  if (!container) return;
  container.innerHTML = '';
  container.classList.add('hidden');
}

function getIngredientSuggestions(query) {
  const normalized = normalizeName(query);
  if (!normalized || normalized.length < 2 || !ingredientLibrary.length) return [];

  return ingredientLibrary
    .map((item) => ({ item, score: scoreIngredientMatch(item, normalized) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((entry) => entry.item);
}

function applyIngredientMacros(item, grams, resolved = null) {
  if (!grams) {
    setIngredientMacroFields(0, 0, 0, 0);
    ui.ingredientLibraryHint.textContent = t('ingredientMatched', {
      name: displayIngredientName(item),
      kcal: formatNumber(item.caloriesPer100g),
      p: formatNumber(item.proteinPer100g),
      c: formatNumber(item.carbsPer100g),
      f: formatNumber(item.fatPer100g),
      category: humanizeCategory(item.category),
    });
    updateFavoriteToggleButton();
    return;
  }

  const factor = grams / 100;
  const kcal = roundMacroValue(item.caloriesPer100g * factor, 0);
  const p = roundMacroValue(item.proteinPer100g * factor, 1);
  const c = roundMacroValue(item.carbsPer100g * factor, 1);
  const f = roundMacroValue(item.fatPer100g * factor, 1);

  setIngredientMacroFields(kcal, p, c, f);
  const amountLabel = resolved ? formatIngredientAmount(resolved) : `${formatNumber(grams)}g`;
  ui.ingredientLibraryHint.textContent = t('ingredientMatched', {
    name: displayIngredientName(item),
    kcal: formatNumber(item.caloriesPer100g),
    p: formatNumber(item.proteinPer100g),
    c: formatNumber(item.carbsPer100g),
    f: formatNumber(item.fatPer100g),
    category: humanizeCategory(item.category),
  }) + ` · ${amountLabel} → ${formatNumber(kcal)} kcal / P ${formatNumber(p)}g / C ${formatNumber(c)}g / F ${formatNumber(f)}g`;
  updateFavoriteToggleButton();
}

function addIngredientToDraft() {
  const item = findIngredientByName(document.getElementById('ingredient-name').value);
  const grams = clampFloat(document.getElementById('ingredient-grams').value, 1, 5000);
  if (item) applyIngredientMacros(item, grams);

  const ingredient = sanitizeIngredient({
    name: document.getElementById('ingredient-name').value,
    grams: document.getElementById('ingredient-grams').value,
    quantity: ui.ingredientServingValue.value,
    unitMode: ui.ingredientUnitMode.value,
    unitLabel: resolveQuantityMode(item, ui.ingredientServingValue.value, ui.ingredientUnitMode.value).unitLabel,
    unitWeightGrams: resolveQuantityMode(item, ui.ingredientServingValue.value, ui.ingredientUnitMode.value).unitWeightGrams,
    kcal: document.getElementById('ingredient-kcal').value || 0,
    p: document.getElementById('ingredient-p').value || 0,
    c: document.getElementById('ingredient-c').value || 0,
    f: document.getElementById('ingredient-f').value || 0,
  });

  if (!ingredient) {
    showToast(t('ingredientNameAndGramsRequired'));
    return;
  }

  recipeDraftIngredients.push(ingredient);
  clearRecipeBuilderFields();
  ui.ingredientLibraryHint.textContent = t('ingredientLibraryHint');
  renderRecipeDraft();
}

function renderRecipeDraft() {
  if (!recipeDraftIngredients.length) {
    ui.recipeDraft.innerHTML = `<div class="empty-state recipe-empty">${t('recipeDraftEmpty')}</div>`;
    return;
  }

  const totals = sumIngredientMacros(recipeDraftIngredients);
  ui.recipeDraft.innerHTML = `
    <div class="recipe-draft-card">
      <div class="recipe-draft-title-row">
        <div class="recipe-draft-title">${t('recipeIngredients')}</div>
        ${recipeEditId ? `<span class="draft-badge">${t('editingBadge')}</span>` : ''}
      </div>
      ${recipeDraftIngredients.map((ingredient, index) => {
        const lib = findIngredientByName(ingredient.name);
        const ingName = lib ? displayIngredientName(lib) : ingredient.name;
        const favorite = isFavoriteIngredient(ingredient.name);
        return `
        <div class="ingredient-row ingredient-row-strong">
          <span>${favorite ? '★ ' : ''}${escapeHtml(ingName)} · ${formatIngredientAmount(ingredient)}</span>
          <button class="meal-del" type="button" data-remove-ingredient="${index}">✕</button>
        </div>
      `;}).join('')}
      <div class="recipe-draft-totals">${t('currentTotals', { kcal: formatNumber(totals.kcal), p: formatNumber(totals.p), c: formatNumber(totals.c), f: formatNumber(totals.f) })}</div>
    </div>
  `;

  ui.recipeDraft.querySelectorAll('[data-remove-ingredient]').forEach((button) => {
    button.addEventListener('click', () => {
      recipeDraftIngredients.splice(Number(button.dataset.removeIngredient), 1);
      renderRecipeDraft();
    });
  });
}

async function saveRecipe() {
  const name = String(document.getElementById('recipe-name').value || '').trim().slice(0, 60);
  const totalWeight = clampFloat(document.getElementById('recipe-total-weight').value, 1, 20000);

  if (!name) {
    showToast(t('recipeNameRequired'));
    return;
  }
  if (!recipeDraftIngredients.length) {
    showToast(t('addAtLeastOneIngredient'));
    return;
  }
  if (!totalWeight) {
    showToast(t('enterFinalWeight'));
    return;
  }

  const recipe = sanitizeRecipe({
    id: recipeEditId || `recipe_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name,
    totalWeight,
    ingredients: recipeDraftIngredients,
  });

  const isEditing = Boolean(recipeEditId);
  if (isEditing) {
    state.recipes = state.recipes.map((item) => item.id === recipeEditId ? recipe : item);
  } else {
    state.recipes.unshift(recipe);
  }

  await saveState();
  renderRecipeOptions();
  renderRecipes();
  closeRecipeModal();
  showToast(t(isEditing ? 'recipeUpdated' : 'recipeSaved', { name: recipe.name }));
}

async function deleteRecipe(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return;
  const confirmed = window.confirm(t('deleteRecipeConfirm', { name: recipe.name }));
  if (!confirmed) return;

  state.recipes = state.recipes.filter((item) => item.id !== recipeId);
  for (const day of Object.values(state.history)) {
    day.meals = (day.meals || []).map((meal) => meal.recipeId === recipeId ? { ...meal, recipeId: null } : meal);
  }
  await saveState();
  renderRecipeOptions();
  renderRecipes();
  renderMeals();
}

function getRecipeById(recipeId) {
  return state.recipes.find((recipe) => recipe.id === recipeId) || null;
}

function renderFavoriteIngredients() {
  if (!ui.favoriteIngredients) return;
  const favorites = getFavoriteIngredientItems();
  if (!favorites.length) {
    ui.favoriteIngredients.innerHTML = `<div class="empty-state recipe-empty">${t('noFavoriteIngredients')}</div>`;
    return;
  }

  ui.favoriteIngredients.innerHTML = `
    <div class="favorite-chip-list">
      ${favorites.map((item) => `
        <button class="favorite-chip" type="button" data-favorite-name="${escapeHtml(item.key)}" aria-label="${escapeHtml(t('favoriteIngredientAria', { name: item.label }))}">
          ★ ${escapeHtml(item.label)}
        </button>
      `).join('')}
    </div>
  `;

  ui.favoriteIngredients.querySelectorAll('[data-favorite-name]').forEach((button) => {
    button.addEventListener('click', () => applyFavoriteIngredient(button.dataset.favoriteName));
  });
}

function getFavoriteIngredientItems() {
  return (state.favoriteIngredients || [])
    .map((name) => {
      const item = ingredientLibraryMap.get(normalizeName(name));
      return {
        key: name,
        item,
        label: item ? displayIngredientName(item) : name,
      };
    })
    .filter((item) => item.label)
    .sort((a, b) => a.label.localeCompare(b.label, currentLang === 'ro' ? 'ro' : 'en'));
}

async function toggleCurrentIngredientFavorite() {
  const rawName = document.getElementById('ingredient-name').value;
  const match = findIngredientByName(rawName);
  const name = match?.name || rawName;
  const normalized = normalizeName(name);
  if (!normalized) return;

  const favorites = new Set(state.favoriteIngredients || []);
  const hadFavorite = favorites.has(normalized);
  if (hadFavorite) favorites.delete(normalized);
  else favorites.add(normalized);
  state.favoriteIngredients = Array.from(favorites);
  await saveState();
  renderFavoriteIngredients();
  updateFavoriteToggleButton();
  showToast(t(hadFavorite ? 'ingredientUnfavorited' : 'ingredientFavorited', { name: match ? displayIngredientName(match) : rawName.trim() }));
}

function updateFavoriteToggleButton() {
  if (!ui.toggleIngredientFavorite) return;
  const rawName = document.getElementById('ingredient-name').value;
  const match = findIngredientByName(rawName);
  const normalized = normalizeName(match?.name || rawName);
  const active = normalized && isFavoriteIngredient(normalized);
  ui.toggleIngredientFavorite.textContent = active ? '★' : '☆';
  ui.toggleIngredientFavorite.classList.toggle('active', Boolean(active));
}

function isFavoriteIngredient(name) {
  return (state.favoriteIngredients || []).includes(normalizeName(name));
}

function applyFavoriteIngredient(name) {
  const item = findIngredientByName(name);
  document.getElementById('ingredient-name').value = item ? displayIngredientName(item) : name;
  if (!document.getElementById('ingredient-grams').value) document.getElementById('ingredient-grams').value = '100';
  maybeApplyIngredientLibrary();
  document.getElementById('ingredient-grams').focus();
}

function sumIngredientMacros(ingredients) {
  return ingredients.reduce((acc, ingredient) => ({
    kcal: acc.kcal + (Number(ingredient.kcal) || 0),
    p: acc.p + (Number(ingredient.p) || 0),
    c: acc.c + (Number(ingredient.c) || 0),
    f: acc.f + (Number(ingredient.f) || 0),
  }), { kcal: 0, p: 0, c: 0, f: 0 });
}

function calculatePer100(totals, totalWeight) {
  const factor = 100 / totalWeight;
  return {
    kcal: Math.round(totals.kcal * factor),
    p: roundTo(totals.p * factor, 1),
    c: roundTo(totals.c * factor, 1),
    f: roundTo(totals.f * factor, 1),
  };
}

function calculateRecipeServing(recipe, grams) {
  const factor = grams / 100;
  return {
    k: Math.round(recipe.per100.kcal * factor),
    p: roundTo(recipe.per100.p * factor, 1),
    c: roundTo(recipe.per100.c * factor, 1),
    f: roundTo(recipe.per100.f * factor, 1),
  };
}

function resetApp() {
  const confirmed = window.confirm(t('resetConfirm'));
  if (!confirmed) return;

  safeRemoveLocalStorage(STORAGE_KEY);
  LEGACY_KEYS.forEach((key) => safeRemoveLocalStorage(key));
  safeRemoveLocalStorage(LANGUAGE_KEY);
  deleteCookie(PROFILE_COOKIE_KEY);
  deleteCookie(LANGUAGE_COOKIE_KEY);
  void idbDelete(PROFILE_IDB_KEY);
  void idbDelete(STATE_IDB_KEY);
  state = { profile: null, history: {}, recipes: [], favoriteIngredients: [] };
  selectedActivity = 1.2;
  selectedGoalAdj = -500;
  recipeDraftIngredients = [];
  window.location.reload();
}

function rehydrateSelections() {
  if (!state.profile) return;

  const activityCard = ui.activityCards.find((card) => Number(card.dataset.activity) === Number(selectedActivity));
  const goalCard = ui.goalCards.find((card) => Number(card.dataset.goal) === Number(selectedGoalAdj));
  if (activityCard) selectCard(ui.activityCards, activityCard, 'sel');
  if (goalCard) selectCard(ui.goalCards, goalCard, 'sel');
}

function clampInt(value, min, max) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return null;
  return Math.min(Math.max(number, min), max);
}

function clampFloat(value, min, max) {
  const number = Number.parseFloat(value);
  if (!Number.isFinite(number)) return null;
  return Math.min(Math.max(number, min), max);
}

function roundTo(value, decimals) {
  return Number(Number(value).toFixed(decimals));
}

function roundMacroValue(value, decimals) {
  return decimals === 0 ? Math.round(value) : roundTo(value, decimals);
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat(currentLang === 'ro' ? 'ro-RO' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);
}

function formatHistoryDate(key) {
  const date = new Date(`${key}T12:00:00`);
  return new Intl.DateTimeFormat(currentLang === 'ro' ? 'ro-RO' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
}

function normalizeName(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function findIngredientByName(name) {
  const normalized = normalizeName(name);
  if (!normalized) return null;
  if (ingredientLibraryMap.has(normalized)) return ingredientLibraryMap.get(normalized) || null;

  const scored = ingredientLibrary
    .map((item) => ({ item, score: scoreIngredientMatch(item, normalized) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) return null;
  if (scored.length === 1) return scored[0].item;
  if (scored[0].score - scored[1].score >= 25) return scored[0].item;
  return scored[0].item;
}

function scoreIngredientMatch(item, normalizedQuery) {
  const aliases = getIngredientAliases(item).map((alias) => normalizeName(alias)).filter(Boolean);
  if (!aliases.length) return 0;

  let best = 0;
  aliases.forEach((alias) => {
    if (alias === normalizedQuery) best = Math.max(best, 1000);
    else if (alias.startsWith(normalizedQuery)) best = Math.max(best, 700 - Math.max(alias.length - normalizedQuery.length, 0));
    else if (alias.includes(normalizedQuery)) best = Math.max(best, 500 - Math.max(alias.length - normalizedQuery.length, 0));
    else if (normalizedQuery.startsWith(alias)) best = Math.max(best, 420 - Math.max(normalizedQuery.length - alias.length, 0));
    else {
      const queryTokens = normalizedQuery.split(' ').filter(Boolean);
      const aliasTokens = alias.split(' ').filter(Boolean);
      const tokenHits = queryTokens.filter((token) => aliasTokens.includes(token)).length;
      if (tokenHits) best = Math.max(best, 220 + tokenHits * 40 - Math.max(aliasTokens.length - tokenHits, 0) * 5);
    }
  });

  best += ingredientQualityScore(item);
  if (hasSuspiciousZeroMacros(item)) best -= 400;
  return best;
}

function goalLabel(goalAdj) {
  return GOAL_LABELS[String(goalAdj)]?.[currentLang] || GOAL_LABELS[String(goalAdj)]?.en || 'Custom';
}

function humanizeCategory(category) {
  return String(category || '')
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString(currentLang === 'ro' ? 'ro-RO' : 'en-GB', { maximumFractionDigits: 1 });
}

function formatFieldNumber(value) {
  if (!Number.isFinite(Number(value))) return '';
  return Number.isInteger(Number(value)) ? String(Number(value)) : String(Number(value).toFixed(1));
}

function showToast(message) {
  ui.toast.textContent = message;
  ui.toast.classList.remove('hidden');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => ui.toast.classList.add('hidden'), 2400);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

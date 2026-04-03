const STORAGE_KEY = 'caltrack_v3';
const LEGACY_KEYS = ['caltrak_v2'];
const RING_CIRCUMFERENCE = 471;
const MAX_DAYS_HISTORY = 365;

const QUICK_FOODS = [
  { n: 'Rice (200g)', k: 260, p: 5, c: 56, f: 1, e: '🍚' },
  { n: 'Egg', k: 78, p: 6, c: 0, f: 5, e: '🥚' },
  { n: 'Chicken (150g)', k: 248, p: 38, c: 0, f: 9, e: '🍗' },
  { n: 'Avocado (100g)', k: 160, p: 2, c: 9, f: 15, e: '🥑' },
  { n: 'Milk (250ml)', k: 122, p: 8, c: 12, f: 5, e: '🥛' },
  { n: 'Banana', k: 89, p: 1, c: 23, f: 0, e: '🍌' },
  { n: 'Beef (150g)', k: 300, p: 36, c: 0, f: 17, e: '🥩' },
  { n: 'Bread slice', k: 79, p: 3, c: 15, f: 1, e: '🍞' },
];

const EMOJIS = ['🍚', '🥗', '🍳', '🥩', '🍝', '🥘', '🍜', '🥙', '🫐', '🍌', '🥛', '🍎'];
const GOAL_LABELS = { '-500': 'Lose weight', '0': 'Maintain', '300': 'Build muscle' };

let state = loadState();
let heightUnit = 'cm';
let weightUnit = 'kg';
let selectedActivity = state.profile?.activityFactor || 1.2;
let selectedGoalAdj = state.profile?.goalAdj || -500;
let toastTimer = null;
let recipeDraftIngredients = [];

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
  settingsTab: document.getElementById('tab-settings'),
  quickFoods: document.getElementById('quick-foods'),
  mealModal: document.getElementById('modal'),
  recipeModal: document.getElementById('recipe-modal'),
  toast: document.getElementById('toast'),
  recipeSelect: document.getElementById('meal-recipe-select'),
  recipeGrams: document.getElementById('meal-recipe-grams'),
  recipePreview: document.getElementById('meal-recipe-preview'),
  recipeDraft: document.getElementById('recipe-draft'),
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

  document.getElementById('open-modal').addEventListener('click', openMealModal);
  document.getElementById('cancel-meal').addEventListener('click', closeMealModal);
  document.getElementById('add-meal').addEventListener('click', addMeal);
  document.getElementById('open-recipe-modal').addEventListener('click', openRecipeModal);
  document.getElementById('cancel-recipe').addEventListener('click', closeRecipeModal);
  document.getElementById('add-ingredient').addEventListener('click', addIngredientToDraft);
  document.getElementById('save-recipe').addEventListener('click', saveRecipe);
  document.getElementById('apply-recipe').addEventListener('click', applySelectedRecipeToMeal);

  ui.recipeSelect.addEventListener('change', handleMealRecipeSelection);
  ui.recipeGrams.addEventListener('input', updateMealRecipePreview);

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

function bootstrap() {
  setHeightUnit('cm');
  setWeightUnit('kg');
  rehydrateSelections();
  renderQuickFoods();
  renderRecipeOptions();
  renderRecipeDraft();

  if (state.profile) {
    renderResult(state.profile);
    startApp();
    return;
  }

  showScreen('s-ob1');
}

function loadState() {
  const fallback = { profile: null, history: {}, recipes: [] };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return sanitizeState(JSON.parse(raw));

    for (const key of LEGACY_KEYS) {
      const legacyRaw = localStorage.getItem(key);
      if (!legacyRaw) continue;
      const migrated = sanitizeState(JSON.parse(legacyRaw));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch (error) {
    console.error('Failed to load local state', error);
  }

  return fallback;
}

function sanitizeState(input) {
  const profile = sanitizeProfile(input?.profile);
  const history = {};
  const recipes = Array.isArray(input?.recipes) ? input.recipes.map(sanitizeRecipe).filter(Boolean) : [];

  if (input?.history && typeof input.history === 'object') {
    for (const [key, day] of Object.entries(input.history)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) continue;
      const meals = Array.isArray(day?.meals) ? day.meals.map(sanitizeMeal).filter(Boolean) : [];
      history[key] = { meals };
    }
  }

  pruneHistory(history);
  return { profile, history, recipes };
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
    goalLabel: GOAL_LABELS[String(goalAdj)] || 'Custom',
  };
}

function sanitizeMeal(meal) {
  if (!meal || typeof meal !== 'object') return null;

  const name = String(meal.n || '').trim().slice(0, 80);
  const kcal = clampInt(meal.k, 1, 5000);
  if (!name || !kcal) return null;

  return {
    n: name,
    k: kcal,
    p: clampInt(meal.p, 0, 400),
    c: clampInt(meal.c, 0, 600),
    f: clampInt(meal.f, 0, 300),
    emoji: String(meal.emoji || meal.e || '🍽️').slice(0, 2),
    recipeId: meal.recipeId ? String(meal.recipeId) : null,
    grams: clampFloat(meal.grams, 1, 5000),
  };
}

function sanitizeIngredient(ingredient) {
  if (!ingredient || typeof ingredient !== 'object') return null;
  const name = String(ingredient.name || '').trim().slice(0, 60);
  const grams = clampFloat(ingredient.grams, 1, 5000);
  if (!name || !grams) return null;

  return {
    name,
    grams,
    kcal: clampInt(ingredient.kcal ?? ingredient.k, 0, 5000) ?? 0,
    p: clampInt(ingredient.p, 0, 400) ?? 0,
    c: clampInt(ingredient.c, 0, 600) ?? 0,
    f: clampInt(ingredient.f, 0, 300) ?? 0,
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

function saveState() {
  pruneHistory(state.history);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function pruneHistory(history) {
  const keys = Object.keys(history).sort();
  if (keys.length <= MAX_DAYS_HISTORY) return;
  const toDelete = keys.slice(0, keys.length - MAX_DAYS_HISTORY);
  toDelete.forEach((key) => delete history[key]);
}

function showScreen(targetId) {
  ui.screens.forEach((screen) => screen.classList.toggle('active', screen.id === targetId));
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
    showToast('Please fill in age, sex, height, and weight.');
    return;
  }

  showScreen('s-ob2');
}

function calcAndFinish() {
  const age = clampInt(document.getElementById('ob-age').value, 10, 100);
  const sex = document.getElementById('ob-sex').value;
  let heightPrimary = Number(document.getElementById('ob-h1').value);
  const heightSecondary = Number(document.getElementById('ob-h2').value || 0);
  let weight = Number(document.getElementById('ob-w').value);

  if (!age || !['male', 'female'].includes(sex) || !Number.isFinite(heightPrimary) || heightPrimary <= 0 || !Number.isFinite(weight) || weight <= 0) {
    showToast('Some inputs are missing or invalid.');
    return;
  }

  if (weightUnit === 'lb') weight *= 0.453592;

  const heightCm = heightUnit === 'ft'
    ? heightPrimary * 30.48 + clampFloat(heightSecondary, 0, 11) * 2.54
    : heightPrimary;

  if (heightCm < 80 || heightCm > 280 || weight < 20 || weight > 350) {
    showToast('Those stats look unrealistic. Please check them.');
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
    goalLabel: GOAL_LABELS[String(selectedGoalAdj)] || 'Custom',
  };

  saveState();
  renderResult(state.profile);
  showScreen('s-result');
}

function renderResult(profile) {
  document.getElementById('res-kcal').textContent = profile.goal;
  document.getElementById('res-bmr').textContent = `${profile.bmr} kcal`;
  document.getElementById('res-tdee').textContent = `${profile.tdee} kcal`;
  document.getElementById('res-bmi').textContent = profile.bmi;
  document.getElementById('res-goal-label').textContent = profile.goalLabel;
  document.getElementById('res-p').textContent = `${profile.prot}g`;
  document.getElementById('res-c').textContent = `${profile.carb}g`;
  document.getElementById('res-f').textContent = `${profile.fat}g`;
}

function startApp() {
  if (!state.profile) {
    showToast('Set up your profile first.');
    showScreen('s-ob1');
    return;
  }

  showScreen('s-main');
  renderMain();
}

function renderMain() {
  document.getElementById('main-date').textContent = formatLongDate(new Date());
  renderQuickFoods();
  renderRecipeOptions();
  renderTotals();
  renderMeals();
  renderHistory();
  renderRecipes();
  renderSettings();
  renderStreak();
  switchTab('today');
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
  document.getElementById('main-remaining').textContent = remaining >= 0 ? `${remaining} remaining` : `${Math.abs(remaining)} over`;

  const ring = document.getElementById('main-ring');
  ring.setAttribute('stroke-dashoffset', String(Math.round(RING_CIRCUMFERENCE * (1 - progress))));
  ring.style.stroke = remaining < 0 ? '#f05a5a' : remaining < 200 ? '#f0a04a' : '#7c6af7';

  document.getElementById('macro-mini').innerHTML = [
    { cls: 'p', label: 'Protein', value: protein, goal: profile.prot },
    { cls: 'c', label: 'Carbs', value: carbs, goal: profile.carb },
    { cls: 'f', label: 'Fat', value: fat, goal: profile.fat },
  ].map((item) => `
    <div class="mm-card ${item.cls}">
      <div class="mm-val">${item.value}g</div>
      <div class="mm-bar-bg"><div class="mm-bar" style="width:${Math.min(item.value / Math.max(item.goal, 1), 1) * 100}%"></div></div>
      <div class="mm-lbl">${item.label} / ${item.goal}g</div>
    </div>
  `).join('');
}

function renderMeals() {
  const meals = getMealsForDay();

  if (!meals.length) {
    ui.mealsList.innerHTML = '<div class="empty-state">No meals logged yet. Tap + to add one.</div>';
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
          <div class="meal-macros">P: ${meal.p}g · C: ${meal.c}g · F: ${meal.f}g${gramsNote}</div>
        </div>
        <div class="meal-kcal">${meal.k}</div>
        <button class="meal-del" type="button" data-del-index="${index}" aria-label="Delete ${name}">✕</button>
      </div>
    `;
  }).join('');

  ui.mealsList.querySelectorAll('[data-del-index]').forEach((button) => {
    button.addEventListener('click', () => deleteMeal(Number(button.dataset.delIndex)));
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
    ui.historyTab.innerHTML = '<div class="empty-state" style="padding-top:32px">No history yet.</div>';
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
    const label = key === todayKey() ? 'Today' : formatHistoryDate(key);

    return `
      <div class="history-item">
        <div class="hist-top">
          <span class="hist-date">${label}</span>
          <span class="hist-kcal" style="color:${color}">${kcal} kcal</span>
        </div>
        <div class="hist-bar-bg"><div class="hist-bar" style="width:${pct}%;background:${color}"></div></div>
        <div class="hist-macros">
          <span>P: <b>${protein}g</b></span>
          <span>C: <b>${carbs}g</b></span>
          <span>F: <b>${fat}g</b></span>
          <span>${meals.length} meal${meals.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    `;
  }).join('')}</div>`;
}

function renderRecipes() {
  const recipes = state.recipes || [];
  if (!recipes.length) {
    ui.recipesList.innerHTML = '<div class="empty-state">No saved recipes yet. Tap + to build one from ingredients.</div>';
    return;
  }

  ui.recipesList.innerHTML = recipes.map((recipe) => `
    <div class="recipe-card">
      <div class="recipe-card-top">
        <div>
          <div class="recipe-name">${escapeHtml(recipe.name)}</div>
          <div class="recipe-meta">${recipe.ingredients.length} ingredients · ${roundTo(recipe.totalWeight, 0)}g total</div>
        </div>
        <button class="meal-del" type="button" data-delete-recipe="${recipe.id}" aria-label="Delete ${escapeHtml(recipe.name)}">✕</button>
      </div>

      <div class="recipe-macros-row">
        <span>${recipe.per100.kcal} kcal</span>
        <span>P ${recipe.per100.p}g</span>
        <span>C ${recipe.per100.c}g</span>
        <span>F ${recipe.per100.f}g</span>
        <span>/ 100g</span>
      </div>

      <div class="recipe-ingredients">${recipe.ingredients.map((ingredient) => `
        <div class="ingredient-row">
          <span>${escapeHtml(ingredient.name)}</span>
          <span>${roundTo(ingredient.grams, 0)}g</span>
        </div>
      `).join('')}</div>
    </div>
  `).join('');

  ui.recipesList.querySelectorAll('[data-delete-recipe]').forEach((button) => {
    button.addEventListener('click', () => deleteRecipe(button.dataset.deleteRecipe));
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

  document.getElementById('streak-badge').textContent = `🔥 ${streak} day${streak !== 1 ? 's' : ''}`;
}

function renderSettings() {
  const profile = state.profile;
  ui.settingsTab.innerHTML = `
    <div class="settings-wrap">
      <div class="setting-card">
        <h3>Your stats</h3>
        <div class="setting-row"><span>Age</span><span>${profile.age} yrs</span></div>
        <div class="setting-row"><span>Height</span><span>${profile.heightCm} cm</span></div>
        <div class="setting-row"><span>Weight</span><span>${profile.weightKg} kg</span></div>
        <div class="setting-row"><span>BMI</span><span>${profile.bmi}</span></div>
      </div>

      <div class="setting-card">
        <h3>Calorie targets</h3>
        <div class="setting-row"><span>BMR</span><span>${profile.bmr} kcal</span></div>
        <div class="setting-row"><span>TDEE</span><span>${profile.tdee} kcal</span></div>
        <div class="setting-row"><span>Daily goal</span><span>${profile.goal} kcal</span></div>
        <div class="setting-row"><span>Goal type</span><span>${profile.goalLabel}</span></div>
      </div>

      <div class="setting-card">
        <h3>Macro targets</h3>
        <div class="setting-row"><span>Protein</span><span>${profile.prot}g</span></div>
        <div class="setting-row"><span>Carbs</span><span>${profile.carb}g</span></div>
        <div class="setting-row"><span>Fat</span><span>${profile.fat}g</span></div>
      </div>

      <div class="setting-card">
        <h3>About</h3>
        <p class="help-copy">Your data stays in this browser only. There is no account, backend, or cloud sync in this version.</p>
      </div>

      <button class="btn-ghost" id="reset-app" type="button" style="color:#f05a5a;border-color:#f05a5a33;">Reset &amp; start over</button>
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
}

function renderQuickFoods() {
  ui.quickFoods.innerHTML = QUICK_FOODS.map((food, index) => `
    <button class="quick-chip" type="button" data-quick-index="${index}">${food.e} ${escapeHtml(food.n)}</button>
  `).join('');

  ui.quickFoods.querySelectorAll('[data-quick-index]').forEach((button) => {
    button.addEventListener('click', () => fillQuick(Number(button.dataset.quickIndex)));
  });
}

function renderRecipeOptions() {
  ui.recipeSelect.innerHTML = ['<option value="">None — manual entry</option>']
    .concat(state.recipes.map((recipe) => `<option value="${recipe.id}">${escapeHtml(recipe.name)}</option>`))
    .join('');
}

function openMealModal() {
  ui.mealModal.classList.remove('hidden');
  ui.mealModal.setAttribute('aria-hidden', 'false');
  renderRecipeOptions();
  document.getElementById('meal-name').focus();
}

function closeMealModal() {
  ui.mealModal.classList.add('hidden');
  ui.mealModal.setAttribute('aria-hidden', 'true');
  ['meal-name', 'meal-kcal', 'meal-p', 'meal-c', 'meal-f', 'meal-recipe-grams'].forEach((id) => {
    document.getElementById(id).value = '';
  });
  ui.recipeSelect.value = '';
  ui.recipePreview.classList.add('hidden');
  ui.recipePreview.innerHTML = '';
}

function openRecipeModal() {
  ui.recipeModal.classList.remove('hidden');
  ui.recipeModal.setAttribute('aria-hidden', 'false');
  document.getElementById('recipe-name').focus();
}

function closeRecipeModal() {
  ui.recipeModal.classList.add('hidden');
  ui.recipeModal.setAttribute('aria-hidden', 'true');
  recipeDraftIngredients = [];
  ['recipe-name', 'recipe-total-weight', 'ingredient-name', 'ingredient-grams', 'ingredient-kcal', 'ingredient-p', 'ingredient-c', 'ingredient-f'].forEach((id) => {
    document.getElementById(id).value = '';
  });
  renderRecipeDraft();
}

function fillQuick(index) {
  const food = QUICK_FOODS[index];
  if (!food) return;
  ui.recipeSelect.value = '';
  ui.recipePreview.classList.add('hidden');
  document.getElementById('meal-name').value = food.n;
  document.getElementById('meal-kcal').value = food.k;
  document.getElementById('meal-p').value = food.p;
  document.getElementById('meal-c').value = food.c;
  document.getElementById('meal-f').value = food.f;
}

function handleMealRecipeSelection() {
  if (!ui.recipeSelect.value) {
    ui.recipePreview.classList.add('hidden');
    return;
  }

  if (!ui.recipeGrams.value) ui.recipeGrams.value = '100';
  applySelectedRecipeToMeal();
}

function updateMealRecipePreview() {
  const recipe = getRecipeById(ui.recipeSelect.value);
  const grams = clampFloat(ui.recipeGrams.value, 1, 3000);
  if (!recipe || !grams) {
    ui.recipePreview.classList.add('hidden');
    return;
  }

  const macros = calculateRecipeServing(recipe, grams);
  ui.recipePreview.classList.remove('hidden');
  ui.recipePreview.innerHTML = `
    <div><strong>${escapeHtml(recipe.name)}</strong> · ${roundTo(grams, 0)}g</div>
    <div class="recipe-preview-line">${macros.k} kcal · P ${macros.p}g · C ${macros.c}g · F ${macros.f}g</div>
  `;
}

function applySelectedRecipeToMeal() {
  const recipe = getRecipeById(ui.recipeSelect.value);
  const grams = clampFloat(ui.recipeGrams.value, 1, 3000);
  if (!recipe) {
    showToast('Pick a saved recipe first.');
    return;
  }
  if (!grams) {
    showToast('Enter a serving weight in grams.');
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

function addMeal() {
  const selectedRecipe = getRecipeById(ui.recipeSelect.value);
  const grams = clampFloat(ui.recipeGrams.value, 1, 3000);

  if (selectedRecipe && grams) {
    const macros = calculateRecipeServing(selectedRecipe, grams);
    document.getElementById('meal-name').value = selectedRecipe.name;
    document.getElementById('meal-kcal').value = macros.k;
    document.getElementById('meal-p').value = macros.p;
    document.getElementById('meal-c').value = macros.c;
    document.getElementById('meal-f').value = macros.f;
  }

  const meal = sanitizeMeal({
    n: document.getElementById('meal-name').value,
    k: document.getElementById('meal-kcal').value,
    p: document.getElementById('meal-p').value,
    c: document.getElementById('meal-c').value,
    f: document.getElementById('meal-f').value,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    recipeId: selectedRecipe?.id || null,
    grams: selectedRecipe && grams ? grams : null,
  });

  if (!meal) {
    showToast('Meal name and calories are required.');
    return;
  }

  getMealsForDay().push(meal);
  saveState();
  closeMealModal();
  renderTotals();
  renderMeals();
  renderHistory();
  renderStreak();
}

function addIngredientToDraft() {
  const ingredient = sanitizeIngredient({
    name: document.getElementById('ingredient-name').value,
    grams: document.getElementById('ingredient-grams').value,
    kcal: document.getElementById('ingredient-kcal').value || 0,
    p: document.getElementById('ingredient-p').value || 0,
    c: document.getElementById('ingredient-c').value || 0,
    f: document.getElementById('ingredient-f').value || 0,
  });

  if (!ingredient) {
    showToast('Ingredient name and grams are required.');
    return;
  }

  recipeDraftIngredients.push(ingredient);
  ['ingredient-name', 'ingredient-grams', 'ingredient-kcal', 'ingredient-p', 'ingredient-c', 'ingredient-f'].forEach((id) => {
    document.getElementById(id).value = '';
  });
  renderRecipeDraft();
}

function renderRecipeDraft() {
  if (!recipeDraftIngredients.length) {
    ui.recipeDraft.innerHTML = '<div class="empty-state recipe-empty">No ingredients added yet.</div>';
    return;
  }

  const totals = sumIngredientMacros(recipeDraftIngredients);
  ui.recipeDraft.innerHTML = `
    <div class="recipe-draft-card">
      <div class="recipe-draft-title">Recipe ingredients</div>
      ${recipeDraftIngredients.map((ingredient, index) => `
        <div class="ingredient-row ingredient-row-strong">
          <span>${escapeHtml(ingredient.name)} · ${roundTo(ingredient.grams, 0)}g</span>
          <button class="meal-del" type="button" data-remove-ingredient="${index}">✕</button>
        </div>
      `).join('')}
      <div class="recipe-draft-totals">Current totals: ${totals.kcal} kcal · P ${totals.p}g · C ${totals.c}g · F ${totals.f}g</div>
    </div>
  `;

  ui.recipeDraft.querySelectorAll('[data-remove-ingredient]').forEach((button) => {
    button.addEventListener('click', () => {
      recipeDraftIngredients.splice(Number(button.dataset.removeIngredient), 1);
      renderRecipeDraft();
    });
  });
}

function saveRecipe() {
  const name = String(document.getElementById('recipe-name').value || '').trim().slice(0, 60);
  const totalWeight = clampFloat(document.getElementById('recipe-total-weight').value, 1, 20000);

  if (!name) {
    showToast('Recipe name is required.');
    return;
  }
  if (!recipeDraftIngredients.length) {
    showToast('Add at least one ingredient.');
    return;
  }
  if (!totalWeight) {
    showToast('Enter the final recipe weight in grams.');
    return;
  }

  const recipe = sanitizeRecipe({
    id: `recipe_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name,
    totalWeight,
    ingredients: recipeDraftIngredients,
  });

  state.recipes.unshift(recipe);
  saveState();
  renderRecipeOptions();
  renderRecipes();
  closeRecipeModal();
  showToast(`Saved recipe: ${recipe.name}`);
}

function deleteRecipe(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return;
  const confirmed = window.confirm(`Delete recipe "${recipe.name}"?`);
  if (!confirmed) return;

  state.recipes = state.recipes.filter((item) => item.id !== recipeId);
  saveState();
  renderRecipeOptions();
  renderRecipes();
}

function getRecipeById(recipeId) {
  return state.recipes.find((recipe) => recipe.id === recipeId) || null;
}

function sumIngredientMacros(ingredients) {
  return ingredients.reduce((acc, ingredient) => ({
    kcal: acc.kcal + (ingredient.kcal || 0),
    p: acc.p + (ingredient.p || 0),
    c: acc.c + (ingredient.c || 0),
    f: acc.f + (ingredient.f || 0),
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
  const confirmed = window.confirm('Reset all local data and start over?');
  if (!confirmed) return;

  localStorage.removeItem(STORAGE_KEY);
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
  state = { profile: null, history: {}, recipes: [] };
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
  return Number(value.toFixed(decimals));
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);
}

function formatHistoryDate(key) {
  const date = new Date(`${key}T12:00:00`);
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
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

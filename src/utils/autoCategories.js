export const EXPENSE_CATEGORIES = [
  "Codzienne zakupy", "Transport", "Rachunki", "Używki",
  "Koszty przyszłego dochodu", "Dom", "Rozrywka", "Zdrowie", "Sport",
  "Auto", "Finanse", "Inwestycje", "Podróże", "Fotografia", "Piłka nożna",
  "Randki", "Zakupy internetowe", "Głupoty", "Inne",
];

const rules = {
  "zabka": { category: "Codzienne zakupy", title: "Żabka" },
  "biedronka": { category: "Codzienne zakupy", title: "Biedronka" },
  "lidl": { category: "Codzienne zakupy", title: "Lidl" },
  "auchan": { category: "Codzienne zakupy", title: "Auchan" },
  "carrefour": { category: "Codzienne zakupy", title: "Carrefour" },
  "aldi": { category: "Codzienne zakupy", title: "Aldi" },
  "kaufland": { category: "Codzienne zakupy", title: "Kaufland" },
  "dino": { category: "Codzienne zakupy", title: "Dino" },
  "orlen": { category: "Transport", title: "Orlen" }, "shell": { category: "Transport", title: "Shell" },
  "uber": { category: "Transport", title: "Uber" }, "bolt": { category: "Transport", title: "Bolt" },
  "pkp": { category: "Transport", title: "PKP" }, "parking": { category: "Transport" },
  "bilet": { category: "Transport" }, "mpk": { category: "Transport" },
  "czynsz": { category: "Rachunki" }, "prad": { category: "Rachunki" }, "energia": { category: "Rachunki" },
  "gaz": { category: "Rachunki" }, "woda": { category: "Rachunki" }, "internet": { category: "Rachunki" },
  "telefon": { category: "Rachunki" }, "ubezpieczenie": { category: "Rachunki" },
  "papierosy": { category: "Używki" }, "alkohol": { category: "Używki" }, "piwo": { category: "Używki" },
  "kurs": { category: "Koszty przyszłego dochodu" }, "szkolenie": { category: "Koszty przyszłego dochodu" },
  "reklama": { category: "Koszty przyszłego dochodu" }, "narzedzie": { category: "Koszty przyszłego dochodu" },
  "netflix": { category: "Rozrywka" }, "spotify": { category: "Rozrywka" }, "apteka": { category: "Zdrowie" },
  "kredyt": { category: "Finanse" }, "allegro": { category: "Zakupy internetowe" },
};

export function normalizeText(text = "") {
  return text.trim().replace(/\s+/g, " ").toLocaleLowerCase("pl-PL").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function categorizeExpense(title) {
  const normalized = normalizeText(title);
  for (const [keyword, rule] of Object.entries(rules)) {
    if (normalized.includes(keyword)) return rule;
  }
  return { category: "Inne" };
}

export function detectCategory(title) {
  return categorizeExpense(title).category;
}

export function normalizeMerchant(title) {
  const clean = title.trim().replace(/\s+/g, " ");
  return categorizeExpense(clean).title || clean;
}

export const autoCategories = {
  // JEDZENIE

  "żabka": "Jedzenie",
  "biedronka": "Jedzenie",
  "lidl": "Jedzenie",
  "aldi": "Jedzenie",
  "kaufland": "Jedzenie",
  "auchan": "Jedzenie",
  "carrefour": "Jedzenie",
  "stokrotka": "Jedzenie",
  "dino": "Jedzenie",

  "mcdonald": "Jedzenie",
  "kfc": "Jedzenie",
  "burger king": "Jedzenie",
  "pizza": "Jedzenie",
  "pizzeria": "Jedzenie",
  "kebab": "Jedzenie",
  "sushi": "Jedzenie",

  "kawa": "Jedzenie",
  "coffee": "Jedzenie",

  // TRANSPORT

  "orlen": "Transport",
  "shell": "Transport",
  "bp": "Transport",
  "circle k": "Transport",
  "moya": "Transport",

  "uber": "Transport",
  "bolt": "Transport",

  "pkp": "Transport",
  "intercity": "Transport",

  // DOM

  "czynsz": "Dom",
  "prąd": "Dom",
  "energia": "Dom",
  "gaz": "Dom",
  "woda": "Dom",

  "ikea": "Dom",
  "leroy": "Dom",
  "castorama": "Dom",
  "obi": "Dom",

  // ROZRYWKA

  "netflix": "Rozrywka",
  "spotify": "Rozrywka",
  "youtube": "Rozrywka",
  "hbo": "Rozrywka",
  "disney": "Rozrywka",
  "prime": "Rozrywka",

  "kino": "Rozrywka",

  // SPORT

  "siłownia": "Sport",
  "gym": "Sport",
  "fitness": "Sport",
  "decathlon": "Sport",

  // ZDROWIE

  "apteka": "Zdrowie",
  "dentysta": "Zdrowie",
  "lekarz": "Zdrowie",
  "medicover": "Zdrowie",
  "luxmed": "Zdrowie",

  // AUTO

  "opony": "Auto",
  "warsztat": "Auto",
  "mechanik": "Auto",
  "olej": "Auto",
  "przegląd": "Auto",

  // FINANSE

  "kredyt": "Finanse",
  "pożyczka": "Finanse",

  // PODRÓŻE

"booking": "Podróże",
"airbnb": "Podróże",
"ryanair": "Podróże",
"wizzair": "Podróże",
"lot": "Podróże",
"hotel": "Podróże",
"nocleg": "Podróże",
"wakacje": "Podróże",
"urlop": "Podróże",

// HOBBY - PIŁKA

"piłka": "Piłka nożna",
"football": "Piłka nożna",
"boisko": "Piłka nożna",
"orlik": "Piłka nożna",
"liga": "Piłka nożna",
"mecz": "Piłka nożna",

// HOBBY - FOTOGRAFIA

"fotografia": "Fotografia",
"aparat": "Fotografia",
"obiektyw": "Fotografia",
"canon": "Fotografia",
"nikon": "Fotografia",
"sony": "Fotografia",
"gimbal": "Fotografia",
"lightroom": "Fotografia",
"photoshop": "Fotografia",

// RANDKI

"randka": "Randki",
"kino": "Randki",
"kolacja": "Randki",
"kwiaty": "Randki",
"restauracja": "Randki",
"tinder": "Randki",
"badoo": "Randki",

// ZAKUPY INTERNETOWE

"allegro": "Zakupy internetowe",
"amazon": "Zakupy internetowe",
"temu": "Zakupy internetowe",
"ebay": "Zakupy internetowe",
"aliexpress": "Zakupy internetowe",
"media expert": "Zakupy internetowe",
"x-kom": "Zakupy internetowe",

// GŁUPOTY

"gadżet": "Głupoty",
"pierdoły": "Głupoty",
"zachcianka": "Głupoty",
"impuls": "Głupoty",
"figurka": "Głupoty",
"dekoracja": "Głupoty",

// INWESTYCJE

"mbank": "Inwestycje",
"mbank makler": "Inwestycje",
"xtb": "Inwestycje",
"bossa": "Inwestycje",
"etf": "Inwestycje",
"vwce": "Inwestycje",
"vuaa": "Inwestycje",
"sp500": "Inwestycje",
"bitcoin": "Inwestycje",
"btc": "Inwestycje",
"ethereum": "Inwestycje",
"eth": "Inwestycje",
"obligacje": "Inwestycje",
"ike": "Inwestycje",
"ikze": "Inwestycje",
};

export function detectCategory(
  text
) {
  const lower =
    text.toLowerCase();

  for (const keyword in autoCategories) {
    if (
      lower.includes(keyword)
    ) {
      return autoCategories[
        keyword
      ];
    }
  }

  return "Inne";
}
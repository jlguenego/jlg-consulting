function getLiturgicalColor(date) {
  const year = date.getFullYear();

  const easter = calculateEaster(year);
  const ashWednesday = new Date(easter);
  ashWednesday.setDate(easter.getDate() - 46);
  const pentecost = new Date(easter);
  pentecost.setDate(easter.getDate() + 49);
  const corpusChristi = new Date(easter);
  corpusChristi.setDate(easter.getDate() + 60);
  const adventStart = getAdventStart(year);
  const christmas = new Date(year, 11, 25);
  const baptismOfTheLord = new Date(year, 0, 6);
  baptismOfTheLord.setDate(
    baptismOfTheLord.getDate() + ((7 - baptismOfTheLord.getDay()) % 7),
  );

  function isSameDay(d1, d2) {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  }

  // Cas fixes
  if (isSameDay(date, new Date(year, 10, 1))) return "white"; // Toussaint
  if (isSameDay(date, new Date(year, 10, 2))) return "black"; // Commémoration des défunts

  // Avent
  if (date >= adventStart && date < christmas) return "purple";

  // Noël
  if (date >= christmas && date <= baptismOfTheLord) return "white";

  // Carême
  if (date >= ashWednesday && date < easter) {
    const palmSunday = new Date(easter);
    palmSunday.setDate(easter.getDate() - 7);
    const goodFriday = new Date(easter);
    goodFriday.setDate(easter.getDate() - 2);

    if (isSameDay(date, palmSunday)) return "red";
    if (isSameDay(date, goodFriday)) return "red";
    return "purple";
  }

  // Temps Pascal
  if (date >= easter && date <= pentecost) {
    if (isSameDay(date, pentecost)) return "red";
    return "white";
  }

  // Fête-Dieu (Corpus Christi)
  if (isSameDay(date, corpusChristi)) return "white";

  // Temps Ordinaire
  return "green";
}

// Algorithme de Butcher pour calculer la date de Pâques
function calculateEaster(year) {
  const G = year % 19;
  const C = Math.floor(year / 100);
  const H =
    (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30;
  const I =
    H -
    Math.floor(H / 28) *
      (1 - Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11));
  const J = (year + Math.floor(year / 4) + I + 2 - C + Math.floor(C / 4)) % 7;
  const L = I - J;
  const month = 3 + Math.floor((L + 40) / 44);
  const day = L + 28 - 31 * Math.floor(month / 4);
  return new Date(year, month - 1, day);
}

// Début de l'Avent : 4e dimanche avant Noël
function getAdventStart(year) {
  const christmas = new Date(year, 11, 25);
  const dayOfWeek = christmas.getDay();
  const fourthSunday = new Date(christmas);
  fourthSunday.setDate(christmas.getDate() - dayOfWeek - 21);
  return fourthSunday;
}

// document.documentElement.classList.add(getLiturgicalColor(new Date()));
document.documentElement.classList.add("red");

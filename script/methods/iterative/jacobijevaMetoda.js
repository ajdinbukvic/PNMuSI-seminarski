import { izracunajRazliku } from "./functions.js";

export const jacobijevaMetoda = (matrica, vektor, preciznost, maxIteracija) => {
  const brojJednacina = vektor.length;
  let rezultati = new Array(vektor.length).fill(0);
  let prethodniRezultati = [...rezultati];
  let trenutnaIteracija = 0;
  const tabela = [];
  while (trenutnaIteracija < maxIteracija) {
    tabela.push([...rezultati]);
    rezultati = izracunajRezultate(
      matrica,
      vektor,
      prethodniRezultati,
      brojJednacina
    );
    const razlika = izracunajRazliku(
      rezultati,
      prethodniRezultati,
      brojJednacina
    );
    if (razlika < preciznost) break;
    prethodniRezultati = [...rezultati];
    trenutnaIteracija++;
  }
  if (trenutnaIteracija === maxIteracija)
    throw new Error("Premašen je maksimalni broj iteracija.");
  return tabela;
};

export const izracunajRezultate = (
  matrica,
  vektor,
  rezultati,
  brojJednacina
) => {
  const noviRezultati = [];
  for (let i = 0; i < brojJednacina; i++) {
    let suma = 0;
    for (let j = 0; j < brojJednacina; j++) {
      if (j !== i) suma += matrica[i][j] * rezultati[j];
    }
    noviRezultati[i] = (vektor[i] - suma) / matrica[i][i];
  }
  return noviRezultati;
};

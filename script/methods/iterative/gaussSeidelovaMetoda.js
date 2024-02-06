import { izracunajRazliku } from "./functions.js";

export const gaussSeidelovaMetoda = (
  matrica,
  vektor,
  preciznost,
  maxIteracija
) => {
  const brojJednacina = vektor.length;
  let rezultati = new Array(vektor.length).fill(0);
  let prethodniRezultati = [...rezultati];
  let trenutnaIteracija = 0;
  const tabela = [];
  while (trenutnaIteracija < maxIteracija) {
    tabela.push([...rezultati]);
    rezultati = izracunajRezultate(matrica, vektor, rezultati, brojJednacina);
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
  for (let i = 0; i < brojJednacina; i++) {
    let suma = vektor[i];
    for (let j = 0; j < brojJednacina; j++) {
      if (j !== i) suma -= matrica[i][j] * rezultati[j];
    }
    rezultati[i] = (1 / matrica[i][i]) * suma;
  }
  return rezultati;
};

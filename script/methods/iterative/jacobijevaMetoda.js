export const jacobijevaMetoda = (matrica, vektor, preciznost, maxIteracija) => {
  const brojJednacina = vektor.length;
  let rezultati = new Array(vektor.length).fill(0);
  let prethodniRezultati = [...rezultati];
  let trenutnaIteracija = 0;
  const tabela = [];
  while (trenutnaIteracija < maxIteracija) {
    tabela.push([...rezultati]);
    rezultati = izracunajRezultate(matrica, vektor, rezultati, brojJednacina);
    const razlika = izracunajRazlike(
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

const izracunajRezultate = (matrica, vektor, rezultati, brojJednacina) => {
  for (let i = 0; i < brojJednacina; i++) {
    let suma = 0;
    for (let j = 0; j < brojJednacina; j++) {
      if (j !== i) suma += matrica[i][j] * rezultati[j];
    }
    rezultati[i] = (vektor[i] - suma) / matrica[i][i];
  }
  return rezultati;
};

const izracunajRazlike = (rezultati, prethodniRezultati, brojJednacina) => {
  let maxRazlika = 0;
  for (let i = 0; i < brojJednacina; i++) {
    const razlika = Math.abs(rezultati[i] - prethodniRezultati[i]);
    if (razlika > maxRazlika) maxRazlika = razlika;
  }
  return maxRazlika;
};

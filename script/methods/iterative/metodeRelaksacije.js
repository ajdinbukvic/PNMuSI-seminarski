export const jacobijevaMetodaRelaksacije = (
  matrica,
  vektor,
  preciznost,
  maxIteracija,
  relaksacija
) => {
  const brojJednacina = vektor.length;
  let rezultati = new Array(vektor.length).fill(0);
  let trenutnaIteracija = 0;
  const tabela = [];
  while (trenutnaIteracija < maxIteracija) {
    tabela.push([...rezultati]);
    const noviRezultati = izracunajRezultate(
      matrica,
      vektor,
      rezultati,
      brojJednacina,
      relaksacija
    );
    const greska = izracunajGresku(rezultati, noviRezultati, brojJednacina);
    if (greska < preciznost) break;
    rezultati = [...noviRezultati];
    trenutnaIteracija++;
  }
  if (trenutnaIteracija === maxIteracija)
    throw new Error("Premašen je maksimalni broj iteracija.");
  return tabela;
};

export const gaussSeidelovaMetodaRelaksacije = (
  matrica,
  vektor,
  preciznost,
  maxIteracija,
  relaksacija
) => {
  const brojJednacina = vektor.length;
  let rezultati = new Array(vektor.length).fill(0);
  let trenutnaIteracija = 0;
  const tabela = [];
  while (trenutnaIteracija < maxIteracija) {
    tabela.push([...rezultati]);
    const [maxGreska, noviRezultati] = izracunajRezultateGresku(
      matrica,
      vektor,
      rezultati,
      brojJednacina,
      relaksacija
    );
    if (maxGreska < preciznost) break;
    rezultati = [...noviRezultati];
    trenutnaIteracija++;
  }
  if (trenutnaIteracija === maxIteracija)
    throw new Error("Premašen je maksimalni broj iteracija.");
  return tabela;
};

const izracunajRezultate = (
  matrica,
  vektor,
  rezultati,
  brojJednacina,
  relaksacija
) => {
  const noviRezultati = [];
  for (let i = 0; i < brojJednacina; i++) {
    let suma = 0;
    for (let j = 0; j < brojJednacina; j++) {
      if (j !== i) suma += matrica[i][j] * rezultati[j];
    }
    const noviRezultat =
      (1 - relaksacija) * rezultati[i] +
      (relaksacija / matrica[i][i]) * (vektor[i] - suma);
    noviRezultati.push(noviRezultat);
  }
  return noviRezultati;
};

const izracunajGresku = (rezultati, noviRezultati, brojJednacina) => {
  let greska = 0;
  for (let i = 0; i < brojJednacina; i++)
    greska += Math.abs(noviRezultati[i] - rezultati[i]);
  return greska;
};

const izracunajRezultateGresku = (
  matrica,
  vektor,
  rezultati,
  brojJednacina,
  relaksacija
) => {
  let maxGreska = 0;
  for (let i = 0; i < brojJednacina; i++) {
    let suma = 0;
    for (let j = 0; j < brojJednacina; j++) {
      if (j !== i) suma += matrica[i][j] * rezultati[j];
    }
    const noviRezultat =
      (1 - relaksacija) * rezultati[i] +
      (relaksacija / matrica[i][i]) * (vektor[i] - suma);
    const greska = Math.abs(noviRezultat - rezultati[i]);
    if (greska > maxGreska) maxGreska = greska;
    rezultati[i] = noviRezultat;
  }
  return [maxGreska, rezultati];
};

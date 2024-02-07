import { podaci } from "./data.js";
import {
  ispisRezultata,
  vrijemeIzvrsavanja,
  generisiHTML,
  generisiTabelu,
} from "./helper.js";
import { jacobijevaMetoda } from "./methods/iterative/jacobijevaMetoda.js";
import { gaussSeidelovaMetoda } from "./methods/iterative/gaussSeidelovaMetoda.js";
import {
  jacobijevaMetodaRelaksacije,
  gaussSeidelovaMetodaRelaksacije,
} from "./methods/iterative/metodeRelaksacije.js";

const matrica = [];
const vektor = [];

// DROPDOWNS

const nacinUnosaPodatakaSelect = document.getElementById(
  "nacinUnosaPodatakaSelect"
);

const odabirVrsteMetodeSelect = document.getElementById(
  "odabirVrsteMetodeSelect"
);

const odabirDirektneMetode = document.getElementById("odabirDirektneMetode");
const odabirDirektneMetodeSelect = document.getElementById(
  "odabirDirektneMetodeSelect"
);

const odabirIterativneMetode = document.getElementById(
  "odabirIterativneMetode"
);
const odabirIterativneMetodeSelect = document.getElementById(
  "odabirIterativneMetodeSelect"
);

const odabirMetodeRelaksacije = document.getElementById(
  "odabirMetodeRelaksacije"
);
const odabirMetodeRelaksacijeSelect = document.getElementById(
  "odabirMetodeRelaksacijeSelect"
);

// RUCNI UNOS

const brojJednacina = document.getElementById("brojJednacina");
const brojJednacinaInput = document.getElementById("brojJednacinaInput");

// UNOS MATRICE I VEKTORA

const matricaKoeficijenata = document.getElementById("matricaKoeficijenata");
const matricaKoeficijenataInput = document.getElementById(
  "matricaKoeficijenataInput"
);
const vektorRjesenja = document.getElementById("vektorRjesenja");
const vektorRjesenjaInput = document.getElementById("vektorRjesenjaInput");

// CITANJE DATOTEKE

const odabirDatoteke = document.getElementById("odabirDatoteke");
const odabirDatotekeInput = document.getElementById("odabirDatotekeInput");

// OSTALO

const preciznost = document.getElementById("preciznost");
const preciznostInput = document.getElementById("preciznostInput");
const maxIteracija = document.getElementById("maxIteracija");
const maxIteracijaInput = document.getElementById("maxIteracijaInput");
const relaksacija = document.getElementById("relaksacija");
const relaksacijaInput = document.getElementById("relaksacijaInput");
const jednacine = document.getElementById("jednacine");
const rijesiBtn = document.getElementById("rijesiBtn");
const tabela = document.getElementById("tabela");
const rjesenja = document.getElementById("rjesenja");
const rjesenjaContainer = document.getElementById("rjesenjaContainer");
const greska = document.getElementById("greska");
const greskaContainer = document.getElementById("greskaContainer");

// IIFE

(() => {
  odabirIterativneMetode.style.display = "none";
  odabirMetodeRelaksacije.style.display = "none";
  matricaKoeficijenata.style.display = "none";
  vektorRjesenja.style.display = "none";
  odabirDatoteke.style.display = "none";
  preciznost.style.display = "none";
  maxIteracija.style.display = "none";
  relaksacija.style.display = "none";
  greskaContainer.style.display = "none";
  rjesenjaContainer.style.display = "none";
})();

// ODABIR NACINA UNOSA

nacinUnosaPodatakaSelect.addEventListener("change", (e) =>
  promijeniNacinUnosaPodataka(e.target.value)
);

const promijeniNacinUnosaPodataka = (value) => {
  value = +value;
  resetujInpute();
  if (value === 1 || value === 4) {
    brojJednacina.style.display = "block";
    matricaKoeficijenata.style.display = "none";
    vektorRjesenja.style.display = "none";
    odabirDatoteke.style.display = "none";
    brojJednacinaInput.disabled = false;
  } else if (value === 2) {
    brojJednacina.style.display = "none";
    matricaKoeficijenata.style.display = "block";
    vektorRjesenja.style.display = "block";
    odabirDatoteke.style.display = "none";
  } else if (value === 3) {
    brojJednacina.style.display = "none";
    matricaKoeficijenata.style.display = "none";
    vektorRjesenja.style.display = "none";
    odabirDatoteke.style.display = "block";
  }
  if (value === 4) promijeniPodatke();
};

// ODABIR VRSTE METODE

odabirVrsteMetodeSelect.addEventListener("change", (e) =>
  promijeniOdabirVrsteMetode(e.target.value)
);

const promijeniOdabirVrsteMetode = (value) => {
  value = +value;
  resetujInpute();
  odabirDirektneMetodeSelect.selectedIndex = 0;
  odabirIterativneMetodeSelect.selectedIndex = 0;
  if (value === 1) {
    odabirDirektneMetode.style.display = "block";
    odabirIterativneMetode.style.display = "none";
    odabirMetodeRelaksacije.style.display = "none";
    preciznost.style.display = "none";
    maxIteracija.style.display = "none";
    relaksacija.style.display = "none";
  } else {
    odabirDirektneMetode.style.display = "none";
    odabirIterativneMetode.style.display = "block";
    odabirMetodeRelaksacije.style.display = "none";
    preciznost.style.display = "block";
    maxIteracija.style.display = "block";
    relaksacija.style.display = "none";
  }
  if (+nacinUnosaPodatakaSelect.value === 4) promijeniPodatke();
};

// ODABIR DIREKTNE METODE

odabirDirektneMetodeSelect.addEventListener("change", (e) =>
  promijeniOdabirDirektneMetode()
);

const promijeniOdabirDirektneMetode = () => {
  resetujInpute();
  if (+nacinUnosaPodatakaSelect.value === 4) promijeniPodatke();
};

// ODABIR ITERATIVNE METODE

odabirIterativneMetodeSelect.addEventListener("change", (e) =>
  promijeniOdabirIterativneMetode(e.target.value)
);

const promijeniOdabirIterativneMetode = (value) => {
  value = +value;
  resetujInpute();
  odabirMetodeRelaksacijeSelect.selectedIndex = 0;
  if (value === 3) {
    odabirMetodeRelaksacije.style.display = "block";
    relaksacija.style.display = "block";
  } else {
    odabirMetodeRelaksacije.style.display = "none";
    relaksacija.style.display = "none";
  }
  if (+nacinUnosaPodatakaSelect.value === 4) promijeniPodatke();
};

// GENERISANJE JEDNACINA

const generisiJednacine = (e, br) => {
  let brPodataka;
  if (!e) brPodataka = br;
  else brPodataka = e.target.value;
  jednacine.innerHTML = generisiHTML(brPodataka);
};

brojJednacinaInput.addEventListener("input", generisiJednacine);

// RESETOVANJE INPUTA

const resetujInpute = () => {
  jednacine.innerHTML = "";
  brojJednacinaInput.value = "";
  matricaKoeficijenataInput.value = "";
  vektorRjesenjaInput.value = "";
  // preciznostInput.value = "";
  // maxIteracijaInput.value = "";
  relaksacijaInput.value = "";
};

// TRENUTNO ODABRANA METODA

const trenutnoOdabranaMetoda = () => {
  let odabranaMetoda;
  if (+odabirVrsteMetodeSelect.value === 1) {
    odabranaMetoda =
      odabirDirektneMetodeSelect.options[
        odabirDirektneMetodeSelect.selectedIndex
      ].dataset.name;
  } else {
    if (+odabirIterativneMetodeSelect.value === 3) {
      odabranaMetoda =
        odabirMetodeRelaksacijeSelect.options[
          odabirMetodeRelaksacijeSelect.selectedIndex
        ].dataset.name;
    } else {
      odabranaMetoda =
        odabirIterativneMetodeSelect.options[
          odabirIterativneMetodeSelect.selectedIndex
        ].dataset.name;
    }
  }
  return odabranaMetoda;
};

// POPUNJAVANJE TESTNIH PODATAKA

const popuniPodatke = (odabranaMetoda, brPodataka) => {
  for (let i = 0; i < brPodataka; i++) {
    for (let j = 0; j < brPodataka; j++) {
      document.getElementById(`x-${i}-${j}`).value = Number.parseFloat(
        podaci[odabranaMetoda].matrica[i][j]
      );
    }
    document.getElementById(`y-${i}`).value = Number.parseFloat(
      podaci[odabranaMetoda].vektor[i]
    );
  }
  if (podaci[odabranaMetoda].relaksacija)
    relaksacijaInput.value = +podaci[odabranaMetoda].relaksacija;
};

// PROMJENA TESTNIH PODATAKA

const promijeniPodatke = () => {
  resetujInpute();
  const odabranaMetoda = trenutnoOdabranaMetoda();
  brojJednacinaInput.value = podaci[odabranaMetoda].brojJednacina;
  brojJednacinaInput.disabled = true;
  generisiJednacine(null, +brojJednacinaInput.value);
  popuniPodatke(odabranaMetoda, +brojJednacinaInput.value);
};

// UCITAVANJE PODATAKA IZ DATOTEKE

const ucitajPodatke = (e) => {
  matrica.length = 0;
  vektor.length = 0;
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target.result;
      const lines = csv.trim().split("\n");
      lines.forEach((line) => {
        const values = line.split(",");
        const rowData = values.slice(0, -1).map(parseFloat);
        const lastValue = parseFloat(values[values.length - 1]);
        matrica.push(rowData);
        vektor.push(lastValue);
      });
    };
    reader.readAsText(file);
  }
};

odabirDatotekeInput.addEventListener("change", ucitajPodatke);

// POSTAVLJANJE VRIJEDNOSTI MATRICE I VEKTORA

const postaviVrijednosti = () => {
  if (+nacinUnosaPodatakaSelect.value !== 3) {
    matrica.length = 0;
    vektor.length = 0;
  }
  if (
    +nacinUnosaPodatakaSelect.value === 1 ||
    +nacinUnosaPodatakaSelect.value === 4
  ) {
    for (let i = 0; i < +brojJednacinaInput.value; i++) {
      const temp = [];
      for (let j = 0; j < +brojJednacinaInput.value; j++) {
        const parsedValue = Number.parseFloat(
          document.getElementById(`x-${i}-${j}`).value
        );
        if (!isNaN(parsedValue)) temp.push(parsedValue);
        else
          throw new Error(
            "Vrijednosti koeficijenata nisu u ispravnom formatu."
          );
      }
      matrica.push(temp);
      const parsedResult = Number.parseFloat(
        document.getElementById(`y-${i}`).value
      );
      if (!isNaN(parsedResult)) vektor.push(parsedResult);
      else
        throw new Error(
          "Vrijednosti rezultata jednačine nisu u ispravnom formatu."
        );
    }
  } else if (+nacinUnosaPodatakaSelect.value === 2) {
    const matricaText = matricaKoeficijenataInput.value;
    const matricaFilteredText = matricaText.trim().split("\n");
    for (let i = 0; i < matricaFilteredText.length; i++) {
      const row = matricaFilteredText[i].split(",");
      const parsedRow = row.map((value) => {
        const floatValue = Number.parseFloat(value);
        if (!isNaN(floatValue)) return floatValue;
        throw new Error(
          "Podaci u matrici koeficijenata nisu u ispravnom formatu."
        );
      });
      matrica.push(parsedRow);
    }
    const vektorText = vektorRjesenjaInput.value;
    const vektorFilteredText = vektorText.trim().split(",");
    const parsedVektor = vektorFilteredText.map((value) => {
      const floatValue = Number.parseFloat(value);
      if (!isNaN(floatValue)) vektor.push(floatValue);
      else
        throw new Error("Podaci u vektoru rješenja nisu u ispravnom formatu.");
    });
  }
};

// VALIDACIJA UNOSA

const validirajUnose = () => {
  if (
    +nacinUnosaPodatakaSelect.value === 1 ||
    +nacinUnosaPodatakaSelect.value === 4
  ) {
    if (!+brojJednacinaInput.value)
      throw new Error("Morate unijeti broj jednačina.");
    for (let i = 0; i < +brojJednacinaInput.value; i++) {
      for (let j = 0; j < +brojJednacinaInput.value; j++) {
        if (+!document.getElementById(`x-${i}-${j}`).value)
          throw new Error(
            "Morate unijeti sve vrijednosti koeficijenata (ako ne postoji unijeti 0)."
          );
      }
      if (+!document.getElementById(`y-${i}`).value)
        throw new Error("Morate unijeti sve vrijednosti rezultata jednačine.");
    }
  } else if (+nacinUnosaPodatakaSelect.value === 2) {
    if (!matricaKoeficijenataInput.value)
      throw new Error("Morate unijeti podatke u matrici koeficijenata.");
    if (!vektorRjesenjaInput.value)
      throw new Error("Morate unijeti vrijednost u vektoru rješenja.");
  } else if (+nacinUnosaPodatakaSelect.value === 3) {
    if (!odabirDatotekeInput.files.length)
      throw new Error("Datoteka nije uspješno učitana.");
  }
  if (+odabirVrsteMetodeSelect.value === 2) {
    if (+!preciznostInput.value) throw new Error("Morate unijeti preciznost.");
    if (+!maxIteracijaInput.value)
      throw new Error("Morate unijeti maksimalan broj iteracija.");
  }
  if (+odabirIterativneMetodeSelect.value === 3 && +!relaksacijaInput.value)
    throw new Error("Morate unijeti vrijednost relaksacije.");
  if (!matrica.length)
    throw new Error("Podaci u matrici koeficijenata nisu uspješno učitani.");
  if (!vektor.length)
    throw new Error("Podaci u vektoru rješenja nisu uspješno učitani.");
  if (matrica.length !== vektor.length)
    throw new Error("Matrica i vektor moraju biti iste dužine.");
  const firstRow = matrica[0].length;
  for (let i = 1; i < matrica.length; i++) {
    if (firstRow !== matrica[i].length)
      throw new Error("Podaci u svakom redu matrice moraju biti iste dužine.");
  }
};

// POZIV ODABRANE METODE

const metoda = (odabranaMetoda) => {
  let rezultati;
  switch (odabranaMetoda) {
    case "gaussovaMetoda":
      rezultati = 12;
      break;
    case "gaussJordanovaMetoda":
      rezultati = 13;
      break;
    case "matricnaMetoda":
      rezultati = 14;
      break;
    case "metodaFaktorizacije":
      rezultati = 15;
      break;
    case "jacobijevaMetoda":
      rezultati = jacobijevaMetoda(
        matrica,
        vektor,
        +preciznostInput.value,
        +maxIteracijaInput.value
      );
      break;
    case "gaussSeidelovaMetoda":
      rezultati = gaussSeidelovaMetoda(
        matrica,
        vektor,
        +preciznostInput.value,
        +maxIteracijaInput.value
      );
      break;
    case "jacobijevaMetodaRelaksacije":
      rezultati = jacobijevaMetodaRelaksacije(
        matrica,
        vektor,
        +preciznostInput.value,
        +maxIteracijaInput.value,
        +relaksacijaInput.value
      );
      break;
    case "gaussSeidelovaMetodaRelaksacije":
      rezultati = gaussSeidelovaMetodaRelaksacije(
        matrica,
        vektor,
        +preciznostInput.value,
        +maxIteracijaInput.value,
        +relaksacijaInput.value
      );
      break;
  }
  if (rezultati[0].length > 1) {
    generisiTabelu(tabela, rezultati);
    return rezultati[rezultati.length - 1];
  }
  return rezultati;
};

// RJEŠAVANJE SISTEMA

const rijesiSistem = () => {
  greska.innerHTML = "";
  rjesenja.innerHTML = "";
  greskaContainer.style.display = "none";
  rjesenjaContainer.style.display = "none";
  tabela.innerHTML = "";
  const odabranaMetoda = trenutnoOdabranaMetoda();
  try {
    postaviVrijednosti();
    validirajUnose();
    const pocetak = performance.now();
    const rezultati = metoda(odabranaMetoda);
    const kraj = performance.now();
    const trajanje = Number.parseFloat(((kraj - pocetak) / 100).toFixed(6));
    rjesenja.innerHTML = `${ispisRezultata(rezultati, trajanje)}`;
    rjesenjaContainer.style.display = "block";
  } catch (err) {
    greska.innerHTML = `${err.message}`;
    greskaContainer.style.display = "block";
  }
};

rijesiBtn.addEventListener("click", rijesiSistem);

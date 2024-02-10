import {
  gaussSeidelovaMetodaRelaksacije,
  jacobijevaMetodaRelaksacije,
} from "./methods/iterative/metodeRelaksacije.js";

const generisiCSV = (matrica, vektor, rezultati) => {
  let csv = "";
  const zadnjiRezultati =
    rezultati[0].length > 1 ? rezultati[rezultati.length - 1] : rezultati;
  for (let i = 0; i < matrica.length; i++) {
    csv += matrica[i].join(",") + ",";
    csv += vektor[i] + ",";
    csv += zadnjiRezultati[i] + "\n";
  }
  return csv;
};

const konvertujTabelu = (tabela) => {
  const csv = [];
  const redovi = tabela.querySelectorAll("tr");
  redovi.forEach((red) => {
    const redPodaci = [];
    const celije = red.querySelectorAll("td, th");
    celije.forEach((celija) => {
      redPodaci.push(celija.innerText.trim());
    });
    csv.push(redPodaci.join(","));
  });
  return csv.join("\n");
};

export const spremiCSV = (matrica, vektor, rezultati, nazivFajla, tabela) => {
  let csv = generisiCSV(matrica, vektor, rezultati);
  if (tabela) csv += konvertujTabelu(tabela);
  const csvFile = new Blob([csv], { type: "text/csv" });
  const downloadLink = document.createElement("a");
  downloadLink.download = nazivFajla;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
};

export const optimizacijaRelaksacije = (
  odabranaMetoda,
  matrica,
  vektor,
  preciznost,
  maxIteracija
) => {
  const vrijednosti = {
    brojIteracija: [],
    relaksacije: [],
  };
  const metoda =
    odabranaMetoda === "jacobijevaMetodaRelaksacije"
      ? jacobijevaMetodaRelaksacije
      : gaussSeidelovaMetodaRelaksacije;
  for (let i = 0.1; i < 2; i += 0.1) {
    const relaksacija = i;
    try {
      const rezultati = metoda(
        matrica,
        vektor,
        preciznost,
        maxIteracija,
        relaksacija
      );
      vrijednosti.brojIteracija.push(rezultati.length);
      vrijednosti.relaksacije.push(relaksacija);
    } catch (err) {
      continue;
    }
  }
  prikaziGraf(vrijednosti);
};

const prikaziGraf = (vrijednosti) => {
  const data = [
    {
      x: vrijednosti.relaksacije,
      y: vrijednosti.brojIteracija,
      type: "scatter",
      mode: "lines+markers",
      name: "Vrijednosti faktora relaksacije",
    },
  ];
  const layout = {
    title: "Utjecaj faktora relaksacije na broj iteracija",
    xaxis: {
      title: "Vrijednost faktora ω",
    },
    yaxis: {
      title: "Broj iteracija",
    },
  };
  Plotly.newPlot("plot", data, layout);
};

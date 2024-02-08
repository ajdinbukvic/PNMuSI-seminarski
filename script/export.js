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

export const spremiCSV = (tabela, nazivFajla) => {
  const csv = konvertujTabelu(tabela);
  const csvFile = new Blob([csv], { type: "text/csv" });
  const downloadLink = document.createElement("a");
  downloadLink.download = nazivFajla;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
};

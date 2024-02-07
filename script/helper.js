const ispisRezultata = (rezultati, trajanje) => {
  let str = "";
  for (let i = 0; i < rezultati.length; i++) {
    str += `x${i + 1} = ${rezultati[i]}<br>`;
  }
  str += `<br>Vrijeme izvršavanja: ${trajanje}s.<br>`;
  return str;
};

export const vrijemeIzvrsavanja = (metoda, ...args) => {
  const pocetak = performance.now();
  const rezultati = metoda(...args);
  const kraj = performance.now();
  const trajanje = kraj - pocetak;
  return [trajanje, rezultati];
};

export const generisiInpute = (brPodataka) => {
  let html = "";
  let content = "";
  for (let i = 0; i < brPodataka; i++) {
    content = `<div class="d-flex mb-3 justify-content-center gap-2">`;
    for (let j = 0; j < brPodataka; j++) {
      content += `<div class="d-flex">
                            <input
                              type="text"
                              size="2"
                              style="width: auto"
                              class="form-control"
                              aria-describedby="basic-addon2"
                              id="x-${i}-${j}"
                            />
                            <span
                              class="input-group-text"
                              id="basic-addon2"
                              style="display: inline-block; width: 2.4rem; text-align: center"
                            >x${j + 1}</span>
                        </div>`;
    }
    content += `<div class="d-flex gap-2">
                              <span
                                class="input-group-text"
                                id="basic-addon2"
                                style="display: inline-block; width: 2.4rem; text-align: center"
                                >=</span
                              >
                              <input
                                type="text"
                                size="2"
                                style="width: auto"
                                class="form-control"
                                aria-describedby="basic-addon2"
                                id="y-${i}"
                              />
                            </div>
                            </div>`;
    html += content;
  }
  return html;
};

const generisiTabelu = (rezultati) => {
  const tbody = document.createElement("tbody");
  const headingRow = document.createElement("tr");
  const thIndex = document.createElement("th");
  thIndex.textContent = "Iteracija";
  headingRow.appendChild(thIndex);
  rezultati[0].forEach((cell, j) => {
    const th = document.createElement("th");
    th.textContent = `x${j + 1}`;
    th.style.border = "none";
    headingRow.appendChild(th);
  });
  tbody.appendChild(headingRow);
  rezultati.forEach((row, i) => {
    const tr = document.createElement("tr");
    const tdIndex = document.createElement("td");
    tdIndex.textContent = i + 1;
    tdIndex.style.border = "none";
    tr.appendChild(tdIndex);
    row.forEach((cell, j) => {
      const td = document.createElement("td");
      td.textContent = cell;
      td.style.border = "none";
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  return tbody.innerHTML;
};

const generisiMatricu = (matrica, borderless) => {
  const tableClass = borderless ? "borderless" : "";
  let html = `<tbody class="${tableClass}">`;
  for (let i = 0; i < matrica.length; i++) {
    html += "<tr>";
    for (let j = 0; j < matrica[i].length; j++) {
      html += `<td>${matrica[i][j]}</td>`;
    }
    html += "</tr>";
  }
  html += "</tbody>";
  return html;
};

const generisiVektor = (vektor, nepoznate, borderless) => {
  const tableClass = borderless ? "borderless" : "";
  let html = `<tbody class="${tableClass}">`;
  for (let i = 0; i < vektor.length; i++) {
    html += "<tr>";
    if (nepoznate) html += `<td>x${i + 1}</td>`;
    else html += `<td>${vektor[i]}</td>`;
    html += "</tr>";
  }
  html += "</tbody>";
  return html;
};

export const generisiHTML = (
  nazivMetode,
  matrica,
  vektor,
  rezultati,
  trajanje
) => {
  const html = `<div class="metoda">
                  <div class="mt-3 d-flex">
                    <h4
                      class="text-center text-primary flex-grow-1"
                      id="nazivMetode"
                    >${nazivMetode}</h4>
                    <button type="button" class="btn btn-outline-danger">Ukloni</button>
                  </div>
                  <div class="matricaRjesenjaContainer">
                    <div class="matricaContainer" id="matricaContainer">
                      <table class="matricaTabela">
                        <tbody id="matrica">${generisiMatricu(
                          matrica,
                          false
                        )}</tbody>
                      </table>
                      <table class="matricaTabela">
                        <tbody id="nepoznate">${generisiVektor(
                          vektor,
                          true,
                          false
                        )}</tbody>
                      </table>
                      <div class="equals">=</div>
                      <table class="matricaTabela">
                        <tbody id="vektor">${generisiVektor(
                          vektor,
                          false,
                          false
                        )}</tbody>
                      </table>
                    </div>
                    <div
                      id="rjesenjaContainer"
                      class="card text-white bg-primary mb-3 mt-3"
                      style="max-width: 18rem"
                    >
                      <div class="card-header text-center">RJEŠENJA</div>
                      <div class="card-body">
                        <p class="card-text" id="rjesenja">${
                          rezultati[0].length > 1
                            ? ispisRezultata(
                                rezultati[rezultati.length - 1],
                                trajanje
                              )
                            : ispisRezultata(rezultati, trajanje)
                        }</p>
                      </div>
                    </div>
                  </div>
                  <table class="table table-striped mb-3">
                    <tbody class="mb-3" id="tabela">${
                      rezultati[0].length > 1 ? generisiTabelu(rezultati) : ""
                    }</tbody>
                  </table>
                  <hr>
                </div>`;
  return html;
};

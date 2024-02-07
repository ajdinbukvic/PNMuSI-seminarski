export const ispisRezultata = (rezultati, trajanje) => {
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

export const generisiHTML = (brPodataka) => {
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

export const generisiTabelu = (tabela, rezultati) => {
  tabela.innerHTML = "";
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
  tabela.appendChild(headingRow);
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
    tabela.appendChild(tr);
  });
};

export const generisiMatricu = (matrica, borderless) => {
  var tableClass = borderless ? "borderless" : "";
  var html = '<table class="' + tableClass + '">';

  for (var i = 0; i < matrica.length; i++) {
    html += "<tr>";
    for (var j = 0; j < matrica[i].length; j++) {
      html += "<td>" + matrica[i][j] + "</td>";
    }
    html += "</tr>";
  }
  html += "</table>";
  return html;
};

export const generisiVektor = (vektor, nepoznate, borderless) => {
  var tableClass = borderless ? "borderless" : "";
  var html = '<table class="' + tableClass + '">';

  for (var i = 0; i < vektor.length; i++) {
    html += "<tr>";
    if (nepoznate) html += "<td>" + "x" + (i + 1) + "</td>";
    else html += "<td>" + vektor[i] + "</td>";
    html += "</tr>";
  }
  html += "</table>";
  return html;
};

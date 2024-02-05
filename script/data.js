export const podaci = {
  gaussovaMetoda: {
    brojJednacina: 3,
    matrica: [
      [80, -20, -20],
      [-20, 40, -20],
      [-20, -20, 130],
    ],
    vektor: [20, 20, 20],
  },
  gaussJordanovaMetoda: {
    brojJednacina: 3,
    matrica: [
      [3, 2, 105],
      [3, 2, 105],
      [3, 2, 105],
    ],
    vektor: [104, 98, 3],
  },
  matricnaMetoda: {
    brojJednacina: 3,
    matrica: [
      [80, -20, -20],
      [-20, 40, -20],
      [-20, -20, 130],
    ],
    vektor: [20, 20, 20],
  },
  metodaFaktorizacije: {
    brojJednacina: 5,
    matrica: [
      [4, -1, 0, 1, 0],
      [-1, 4, -1, 0, 1],
      [0, -1, 4, -1, 0],
      [1, 0, -1, 4, -1],
      [0, 1, 0, -1, 4],
    ],
    vektor: [100, 100, 100, 100, 100],
  },
  jacobijevaMetoda: {
    brojJednacina: 5,
    matrica: [
      [4, -1, 0, 1, 0],
      [-1, 4, -1, 0, 1],
      [0, -1, 4, -1, 0],
      [1, 0, -1, 4, -1],
      [0, 1, 0, -1, 4],
    ],
    vektor: [100, 100, 100, 100, 100],
  },
  gaussSeidelovaMetoda: {
    brojJednacina: 5,
    matrica: [
      [4, -1, 0, 1, 0],
      [-1, 4, -1, 0, 1],
      [0, -1, 4, -1, 0],
      [1, 0, -1, 4, -1],
      [0, 1, 0, -1, 4],
    ],
    vektor: [100, 100, 100, 100, 100],
  },
  jacobijevaMetodaRelaksacije: {
    brojJednacina: 5,
    matrica: [
      [4, -1, 0, 1, 0],
      [-1, 4, -1, 0, 1],
      [0, -1, 4, -1, 0],
      [1, 0, -1, 4, -1],
      [0, 1, 0, -1, 4],
    ],
    vektor: [100, 100, 100, 100, 100],
    relaksacija: 1.1,
  },
  gaussSeidelovaMetodaRelaksacije: {
    brojJednacina: 5,
    matrica: [
      [4, -1, 0, 1, 0],
      [-1, 4, -1, 0, 1],
      [0, -1, 4, -1, 0],
      [1, 0, -1, 4, -1],
      [0, 1, 0, -1, 4],
    ],
    vektor: [100, 100, 100, 100, 100],
    relaksacija: 1.1,
  },
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

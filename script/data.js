export const podaci = {
  gaussovaMetoda: {
    brojJednacina: 3,
    matrica: [
      [-2, 3, 1],
      [3, 4, -5],
      [1, -2, 1],
    ],
    vektor: [9, 0, -4],
  },
  gaussJordanovaMetoda: {
    brojJednacina: 3,
    matrica: [
      [3, 2, 105],
      [2, -3, 103],
      [1, 1, 3],
    ],
    vektor: [104, 98, 3],
  },
  matricnaMetoda: {
    brojJednacina: 4,
    matrica: [
      [1, 3, 2, -1],
      [4, 2, 5, 1],
      [3, -3, 2, 4],
      [-1, 2, -3, 5],
    ],
    vektor: [9, 27, 19, 14],
  },
  metodaFaktorizacije: {
    brojJednacina: 4,
    matrica: [
      [2, -2, 2, 1],
      [2, -4, 1, 3],
      [-1, 3, -4, 2],
      [2, 4, 3, -2],
    ],
    vektor: [7, 10, -14, 1],
  },
  jacobijevaMetoda: {
    brojJednacina: 4,
    matrica: [
      [2, 1, 0, 0],
      [1, 2, 1, 0],
      [0, 1, 2, 1],
      [0, 0, 1, 2],
    ],
    vektor: [4, 8, 12, 11],
  },
  gaussSeidelovaMetoda: {
    brojJednacina: 4,
    matrica: [
      [2, 1, 0, 0],
      [1, 2, 1, 0],
      [0, 1, 2, 1],
      [0, 0, 1, 2],
    ],
    vektor: [4, 8, 12, 11],
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

export const metode = {
  gaussovaMetoda: "Gaussova metoda",
  gaussJordanovaMetoda: "Gauss-Jordanova metoda",
  matricnaMetoda: "Matrična metoda",
  metodaFaktorizacije: "Metoda faktorizacije",
  jacobijevaMetoda: "Jacobijeva metoda",
  gaussSeidelovaMetoda: "Gauss-Seidelova metoda",
  jacobijevaMetodaRelaksacije: "Jacobijeva metoda relaksacije",
  gaussSeidelovaMetodaRelaksacije: "Gauss-Seidelova metoda relaksacije",
};

export const gaussMetoda = (matrica, vektor) => {
    const brojJednacina = vektor.length;
  
    for (let i = 0; i < brojJednacina; i++) {
      let max = i;
      for (let j = i + 1; j < brojJednacina; j++) {
        if (Math.abs(matrica[j][i]) > Math.abs(matrica[max][i])) {
          max = j;
        }
      }
      [matrica[i], matrica[max]] = [matrica[max], matrica[i]];
      [vektor[i], vektor[max]] = [vektor[max], vektor[i]];
    }
  
    for (let i = 0; i < brojJednacina; i++) {
      for (let j = i + 1; j < brojJednacina; j++) {
        const umnozak = matrica[j][i] / matrica[i][i];
        vektor[j] -= umnozak * vektor[i];
        for (let k = i; k < brojJednacina; k++) {
          matrica[j][k] -= umnozak * matrica[i][k];
        }
      }
    }
  
    const rjesenje = new Array(brojJednacina);
    for (let i = brojJednacina - 1; i >= 0; i--) {
      let zbir = 0;
      for (let j = i + 1; j < brojJednacina; j++) {
        zbir += matrica[i][j] * rjesenje[j];
      }
      rjesenje[i] = (vektor[i] - zbir) / matrica[i][i];
    }
  
    return rjesenje;
  };
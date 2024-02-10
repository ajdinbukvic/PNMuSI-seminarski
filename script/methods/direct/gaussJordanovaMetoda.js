export const gaussJordanovaMetoda = (matrica, vektor) => {
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
  
      for (let j = i + 1; j < brojJednacina; j++) {
        const umnozak = matrica[j][i] / matrica[i][i];
        vektor[j] -= umnozak * vektor[i];
        for (let k = i; k < brojJednacina; k++) {
          matrica[j][k] -= umnozak * matrica[i][k];
        }
      }
    }  
    for (let i = brojJednacina - 1; i >= 0; i--) {
      for (let j = i - 1; j >= 0; j--) {
        const umnozak = matrica[j][i] / matrica[i][i];
        vektor[j] -= umnozak * vektor[i];
        matrica[j][i] = 0;
      }
    }
  
    for (let i = 0; i < brojJednacina; i++) {
      const faktor = 1 / matrica[i][i];
      vektor[i] *= faktor;
      matrica[i][i] = 1;
    }
  
    return vektor;
  };
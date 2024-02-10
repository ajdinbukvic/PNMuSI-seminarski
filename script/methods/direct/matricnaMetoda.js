export const matricnaMetoda = (matrica, vektor) => {
    const inicijalizacijaInverzneMatrice = (velicina) => {
      return new Array(velicina).fill(null).map(() => new Array(velicina).fill(0));
    };
  
    const probajNaciInverznuMatricu = (matrica, inverznaVrijednost) => {
        console.log("Matrica", matrica);
      const brojRedova = matrica.length;
      let inverzna = inicijalizacijaInverzneMatrice(brojRedova);
  
      const dajDeterminantu = (matrica, velicina) => {
        if (velicina === 1) return matrica[0][0];
  
        let determinanta = 0;
        const vrijednost = inicijalizacijaInverzneMatrice(velicina);
        let znak = 1;
        for (let i = 0; i < velicina; i++) {
          const kofaktori = dajKofaktore(matrica, vrijednost, 0, i, velicina);
          determinanta += znak * matrica[0][i] * dajDeterminantu(kofaktori, velicina - 1);
          znak = -znak;
        }
        return determinanta;
      };
  
      const dajAdjungovanuMatricu = (matrica, velicina) => {
        console.log("Adjungovana matrica",matrica);
        const adjungovana = inicijalizacijaInverzneMatrice(velicina);
  
        if (velicina === 1) {
          adjungovana[0][0] = 1;
          console.log("Adjungovana prvi ret", adjungovana);
          return adjungovana;
        }
  
        const vrijednosti = inicijalizacijaInverzneMatrice(velicina);
        let znak = 1;
        for (let i = 0; i < velicina; i++) {
          for (let j = 0; j < velicina; j++) {
            const kofaktori = dajKofaktore(matrica, vrijednosti, i, j, velicina);
            znak = (i + j) % 2 === 0 ? 1 : -1;
            adjungovana[j][i] = znak * dajDeterminantu(kofaktori, velicina - 1);            
          }
        }
        console.log("Adjungovana prvi ret", adjungovana);
        return adjungovana;
      };
  
      const dajKofaktore = (matrica, vrijednost, izuzmiRed, izuzmiKolona, velicina) => {
        let i = 0, j = 0;
        for (let red = 0; red < velicina; red++) {
          for (let kolona = 0; kolona < velicina; kolona++) {
            if (red !== izuzmiRed && kolona !== izuzmiKolona) {
              vrijednost[i][j++] = matrica[red][kolona];
              if (j === velicina - 1) {
                j = 0;
                i++;
              }
            }
          }
        }
        return vrijednost;
      };
  
      const determinanta = dajDeterminantu(matrica, brojRedova);
      if (determinanta === 0) return false;
  
      const adjungovana = dajAdjungovanuMatricu(matrica, brojRedova);
      for (let i = 0; i < brojRedova; i++) {
        for (let j = 0; j < brojRedova; j++) {
          inverzna[i][j] = adjungovana[i][j] / determinanta;
        }
      }
  
      return inverzna;
    };
  
    const brojRedova = matrica.length;
    const inverznaVrijednost = inicijalizacijaInverzneMatrice(brojRedova);
  
    const inverzna = probajNaciInverznuMatricu(matrica, inverznaVrijednost);
    console.log("Inverzna", inverzna);
    const rezultat = [];
    for (let i = 0; i < brojRedova; i++) {
      let suma = 0;
      for (let j = 0; j < brojRedova; j++) {
        suma += inverzna[i][j] * vektor[j];
      }
      rezultat.push(suma);
    }
    return rezultat;
  };
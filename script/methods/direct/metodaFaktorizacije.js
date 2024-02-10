export const metodaFaktorizacije = (matrica, vektor) => {
    const faktorizacija = doolittleFaktorizacija(matrica);
    const rjesenje = rjesiSustav(faktorizacija.L, faktorizacija.U, vektor);
    return rjesenje;
};

const doolittleFaktorizacija = (matrica) => {
    const n = matrica.length;
    const L = new Array(n).fill(null).map(() => new Array(n).fill(0));
    const U = new Array(n).fill(null).map(() => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let k = i; k < n; k++) {
            let sum = 0;
            for (let j = 0; j < i; j++) {
                sum += L[i][j] * U[j][k];
            }
            U[i][k] = matrica[i][k] - sum;
        }
        for (let k = i; k < n; k++) {
            if (i === k) {
                L[i][i] = 1;
            } else {
                let sum = 0;
                for (let j = 0; j < i; j++) {
                    sum += L[k][j] * U[j][i];
                }
                L[k][i] = (matrica[k][i] - sum) / U[i][i];
            }
        }
    }

    return { L, U };
};

const rjesiSustav = (L, U, vektor) => {
    const n = L.length;
    const y = new Array(n).fill(0);
    const x = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < i; j++) {
            sum += L[i][j] * y[j];
        }
        y[i] = (vektor[i] - sum) / L[i][i];
    }

    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += U[i][j] * x[j];
        }
        x[i] = (y[i] - sum) / U[i][i];
    }

    return x;
};
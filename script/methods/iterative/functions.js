export const izracunajRazliku = (
  rezultati,
  prethodniRezultati,
  brojJednacina
) => {
  let maxRazlika = 0;
  for (let i = 0; i < brojJednacina; i++) {
    const razlika = Math.abs(rezultati[i] - prethodniRezultati[i]);
    if (razlika > maxRazlika) maxRazlika = razlika;
  }
  return maxRazlika;
};

const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

export const fechaHora = (fechaStr) => {
  let date = new Date(fechaStr);
  let hoy = new Date();
  let dif = (hoy.getTime() - date.getTime()) / (1000 * 3600 * 24);

  if (Math.round(dif) < 1)
    return "Hoy ," + date.toLocaleTimeString().slice(0, 5);
  else return dias[date.getDay()] + "," + date.toLocaleTimeString().slice(0, 5);
};

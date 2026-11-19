// Concepto fan: nunca publicar una cifra de piezas o lanzamiento sin confirmación.
export const fichaEstrellaMuerte = [
  { etiqueta: 'Cantidad de piezas', valor: 'Por definir', detalle: 'Se calculará al validar el diseño.' },
  { etiqueta: 'Dimensiones', valor: 'Por definir', detalle: 'Dependerán de la escala final.' },
  { etiqueta: 'Estado actual', valor: 'Concepto', detalle: 'Propuesta en fase de planificación.' },
];

// Etapas previstas del desarrollo, no tareas declaradas como completadas.
export const fasesEstrellaMuerte = [
  {
    numero: '01',
    titulo: 'Diseño y planificación',
    resumen: 'Definir escala, forma esférica y soporte.',
    descripcion:
      'Se propone estudiar la silueta de la estación, dividir el modelo en sectores y elegir una base estable antes de estimar la cantidad exacta de piezas.',
  },
  {
    numero: '02',
    titulo: 'Prototipado por módulos',
    resumen: 'Probar estructura, curvaturas y paneles.',
    descripcion:
      'La siguiente etapa prevista es construir secciones de prueba para revisar uniones, textura exterior, peso y resistencia del conjunto.',
  },
  {
    numero: '03',
    titulo: 'Ensamblaje y detalles',
    resumen: 'Unir los sectores y terminar la exhibición.',
    descripcion:
      'Con un diseño validado, se proyecta ensamblar los módulos, incorporar detalles de superficie y preparar el soporte de exhibición.',
  },
];

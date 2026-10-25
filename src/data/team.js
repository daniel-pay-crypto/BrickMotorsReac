// Fuente de datos simulada del equipo
let team = [
  {
    id: 1,
    name: 'Thomas Osorio',
    role: 'Frontend / Animaciones',
    description: 'El cerebro detrás de las animaciones de batalla y el flujo visual. Si la interfaz se ve impresionante, pasó por sus manos.',
  },
  {
    id: 2,
    name: 'Daniel Leyton',
    role: 'Arquitecto',
    description: 'Encargado de orquestar el código, resolver errores críticos a altas horas de la madrugada y mantener la estructura web a flote.',
  },
  {
    id: 3,
    name: 'Felipe Baez',
    role: 'Backend / Lógica',
    description: 'Especialista en estructurar el control de datos, carritos de compras y asegurar que cada línea de lógica responda a la perfección.',
  },
];

export const getTeam = () => [...team];
export const getMemberById = (id) => team.find((m) => m.id === id);

export const addMember = (member) => {
  const id = team.length ? Math.max(...team.map((m) => m.id)) + 1 : 1;
  const nuevo = { id, ...member };
  team.push(nuevo);
  return nuevo;
};

export const updateMember = (id, changes) => {
  team = team.map((m) => (m.id === id ? { ...m, ...changes } : m));
  return getMemberById(id);
};

export const deleteMember = (id) => {
  team = team.filter((m) => m.id !== id);
};
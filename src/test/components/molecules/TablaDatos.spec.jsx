import React from 'react';
import { render, screen } from '@testing-library/react';
import { TablaDatos } from '../../../components/molecules/TablaDatos';

describe('TablaDatos Component', () => {
  const columnas = [
    { clave: 'nombre', titulo: 'Nombre' },
    { clave: 'precio', titulo: 'Precio' },
  ];
  const filas = [
    { nombre: 'AT-AT', precio: 100 },
    { nombre: 'AT-ST', precio: 50 },
  ];

  it('renderiza los titulos de las columnas', () => {
    render(<TablaDatos columnas={columnas} filas={filas} />);
    expect(screen.getByText('Nombre')).toBeTruthy();
    expect(screen.getByText('Precio')).toBeTruthy();
  });

  it('renderiza los datos de cada fila', () => {
    render(<TablaDatos columnas={columnas} filas={filas} />);
    expect(screen.getByText('AT-AT')).toBeTruthy();
    expect(screen.getByText('AT-ST')).toBeTruthy();
    expect(screen.getByText('100')).toBeTruthy();
  });

  it('renderiza una fila por cada elemento mas la cabecera', () => {
    render(<TablaDatos columnas={columnas} filas={filas} />);
    expect(screen.getAllByRole('row').length).toBe(3);
  });

  it('agrega una columna de acciones cuando se pasa renderAcciones', () => {
    render(
      <TablaDatos
        columnas={columnas}
        filas={filas}
        renderAcciones={(fila) => <button>Editar {fila.nombre}</button>}
      />
    );
    expect(screen.getByText('Acciones')).toBeTruthy();
    expect(screen.getByText('Editar AT-AT')).toBeTruthy();
    expect(screen.getByText('Editar AT-ST')).toBeTruthy();
  });
});

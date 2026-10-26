import { Table } from 'react-bootstrap';

export function TablaDatos({ columnas, filas, renderAcciones }) {
  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          {columnas.map((columna) => (
            <th key={columna.clave}>{columna.titulo}</th>
          ))}
          {renderAcciones && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {filas.map((fila, indice) => (
          <tr key={indice}>
            {columnas.map((columna) => (
              <td key={columna.clave}>{fila[columna.clave]}</td>
            ))}
            {renderAcciones && <td>{renderAcciones(fila)}</td>}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

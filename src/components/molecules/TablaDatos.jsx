import { Table } from 'react-bootstrap';

export function TablaDatos({ columnas, filas }) {
  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          {columnas.map((columna) => (
            <th key={columna.clave}>{columna.titulo}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filas.map((fila, indice) => (
          <tr key={indice}>
            {columnas.map((columna) => (
              <td key={columna.clave}>{fila[columna.clave]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
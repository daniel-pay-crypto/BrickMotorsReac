import { Form } from 'react-bootstrap';

function Select({ name, value, onChange, options, placeholder, isInvalid }) {
  return (
    <Form.Select name={name} value={value} onChange={onChange} isInvalid={isInvalid}>
      <option value="">{placeholder}</option>
      {options.map((opcion) => (
        <option key={opcion} value={opcion}>
          {opcion}
        </option>
      ))}
    </Form.Select>
  );
}

export default Select;
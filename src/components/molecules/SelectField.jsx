import { Form } from 'react-bootstrap';
import Select from '../atoms/Select.jsx';

export function SelectField({ id, label, error, ...selectProps }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Select isInvalid={!!error} {...selectProps} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}
import { Form } from 'react-bootstrap';
import Input from '../atoms/Input.jsx';

export function FormField({ id, label, error, ...inputProps }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Input isInvalid={!!error} {...inputProps} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}
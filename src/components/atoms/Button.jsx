import '../../styles/atoms/Button.css';
// Átomo: botón genérico con variantes de Bootstrap
export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-brick`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
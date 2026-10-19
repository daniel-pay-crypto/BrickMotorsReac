import '../../styles/atoms/RoleBadge.css';
// Átomo: etiqueta con el rol del integrante
export default function RoleBadge({ role }) {
  if (!role) return null;
  return <span className="badge rol-badge">{role}</span>;
}
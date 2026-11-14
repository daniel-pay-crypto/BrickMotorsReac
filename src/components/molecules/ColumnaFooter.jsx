import './ColumnaFooter.css';

export function ColumnaFooter({ titulo, children }) {
  return (
    <div className="columna-footer">
      <h3 className="columna-footer__titulo">{titulo}</h3>
      {children}
    </div>
  );
}

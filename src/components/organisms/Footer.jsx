import './Footer.css';
export function Footer() {
  return (
    <footer>
      <p>&copy; 2026 Brick Motors. Todos los derechos reservados.</p>
      <p>Contactame aqui: brickmotors@gmail.com</p>
      <div className="redes-sociales" style={{ marginTop: '20px' }}>
        <a href="https://www.tiktok.com/@brick_motors1" target="_blank" rel="noreferrer">
          <img src="/img/TikTok.jpg" alt="Síguenos en TikTok" style={{ width: '40px', height: 'auto' }} />
        </a>
      </div>
    </footer>
  );
}
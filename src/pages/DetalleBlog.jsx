import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/organisms/Navbar';
import { Footer } from '../components/organisms/Footer';
import { ArticuloBlog } from '../components/organisms/ArticuloBlog';
import { getArticuloById } from '../data/blogData';

export function DetalleBlog() {
  const { id } = useParams();
  const articulo = getArticuloById(id);

  useEffect(() => {
    document.title = `${articulo.titulo} - Brick Motors`;
  }, [articulo]);

  return (
    <>
      <Navbar />
      <ArticuloBlog articulo={articulo} />
      <Footer />
    </>
  );
}
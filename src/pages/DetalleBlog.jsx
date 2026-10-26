import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArticuloBlog } from '../components/organisms/ArticuloBlog';
import { getArticuloById } from '../data/blogdata';

export function DetalleBlog() {
  const { id } = useParams();
  const articulo = getArticuloById(id);

  useEffect(() => {
    document.title = `${articulo.titulo} - Brick Motors`;
  }, [articulo]);

  return (
    <ArticuloBlog articulo={articulo} />
  );
}
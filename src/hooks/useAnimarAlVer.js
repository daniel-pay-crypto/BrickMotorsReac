import { useEffect, useRef } from 'react';

export function useAnimarAlVer(threshold = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            elemento.classList.add('animar');
          } else {
            elemento.classList.remove('animar');
          }
        });
      },
      { threshold }
    );

    observer.observe(elemento);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

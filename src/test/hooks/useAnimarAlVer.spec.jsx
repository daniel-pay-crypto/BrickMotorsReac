import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAnimarAlVer } from '../../hooks/useAnimarAlVer';

function Caja() {
  const ref = useAnimarAlVer(0.3);
  return <div ref={ref} data-testid="caja">contenido</div>;
}

describe('useAnimarAlVer Hook', () => {
  let observerOriginal;
  let observerFalso;

  beforeEach(() => {
    observerOriginal = window.IntersectionObserver;
    observerFalso = {
      observe: jasmine.createSpy('observe'),
      disconnect: jasmine.createSpy('disconnect'),
      callback: null,
      options: null,
    };
    window.IntersectionObserver = function (callback, options) {
      observerFalso.callback = callback;
      observerFalso.options = options;
      this.observe = observerFalso.observe;
      this.disconnect = observerFalso.disconnect;
    };
  });

  afterEach(() => {
    window.IntersectionObserver = observerOriginal;
  });

  it('observa el elemento con el umbral recibido', () => {
    render(<Caja />);
    expect(observerFalso.observe).toHaveBeenCalledWith(screen.getByTestId('caja'));
    expect(observerFalso.options.threshold).toBe(0.3);
  });

  it('agrega la clase animar cuando el elemento es visible y la quita cuando deja de serlo', () => {
    render(<Caja />);
    const caja = screen.getByTestId('caja');
    observerFalso.callback([{ isIntersecting: true }]);
    expect(caja).toHaveClass('animar');
    observerFalso.callback([{ isIntersecting: false }]);
    expect(caja).not.toHaveClass('animar');
  });

  it('desconecta el observer al desmontar el componente', () => {
    const { unmount } = render(<Caja />);
    unmount();
    expect(observerFalso.disconnect).toHaveBeenCalled();
  });
});

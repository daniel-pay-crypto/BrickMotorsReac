import React from 'react';
import { render, screen } from '@testing-library/react';
import Revelar from '../../../components/atoms/Revelar';

describe('Revelar Component', () => {
  let observerOriginal;
  let observerFalso;

  beforeEach(() => {
    observerOriginal = window.IntersectionObserver;
    observerFalso = { callback: null, options: null };
    window.IntersectionObserver = function (callback, options) {
      observerFalso.callback = callback;
      observerFalso.options = options;
      this.observe = () => {};
      this.disconnect = () => {};
    };
  });

  afterEach(() => {
    window.IntersectionObserver = observerOriginal;
  });

  it('muestra el contenido recibido', () => {
    render(<Revelar><p>Hola</p></Revelar>);
    expect(screen.getByText('Hola')).toBeTruthy();
  });

  it('agrega la clase revelar y la clase extra', () => {
    const { container } = render(<Revelar className="extra"><p>Hola</p></Revelar>);
    expect(container.firstChild).toHaveClass('revelar');
    expect(container.firstChild).toHaveClass('extra');
  });

  it('agrega la clase animar cuando el elemento se hace visible', () => {
    const { container } = render(<Revelar><p>Hola</p></Revelar>);
    observerFalso.callback([{ isIntersecting: true }]);
    expect(container.firstChild).toHaveClass('animar');
  });

  it('usa el umbral que recibe', () => {
    render(<Revelar umbral={0.5}><p>Hola</p></Revelar>);
    expect(observerFalso.options.threshold).toBe(0.5);
  });
});

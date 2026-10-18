import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';


describe('Home Page', () => {
 it('renderiza el título de la página de inicio', () => {
    
   render
   (<BrowserRouter>
   <Home />
   </BrowserRouter>);
   const title = screen.getByText('Página de Inicio');
   expect(title).toBeTruthy();
 });


 it('renderiza el párrafo de bienvenida', () => {
   render
   (<BrowserRouter>
   <Home />
   </BrowserRouter>);

   const paragraph = screen.getByText('Bienvenidos a nuestro sitio web.');
   expect(paragraph).toBeTruthy();
 });


 it('renderiza el contenedor de Bootstrap', () => {
   render
   (<BrowserRouter>
   <Home />
   </BrowserRouter>);

   const container = screen.getByText('Página de Inicio').closest('div');
   expect(container).toHaveClass('container');
   expect(container).toHaveClass('my-5');
 });
});

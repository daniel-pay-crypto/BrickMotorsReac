import {
  esGmailValido,
  esNombreValido,
  tieneLetrasRepetidas,
  tieneDemasiadasConsonantes,
  tienePalabraSinVocales,
  esContrasenaValida,
} from '../../data/Validaciones';

describe('Validaciones', () => {
  it('acepta correos gmail normales y rechaza los de solo caracteres especiales', () => {
    expect(esGmailValido('juan.perez@gmail.com')).toBe(true);
    expect(esGmailValido('admin@gmail.com')).toBe(true);
    expect(esGmailValido('...@gmail.com')).toBe(false);
    expect(esGmailValido('_-_@gmail.com')).toBe(false);
    expect(esGmailValido('.juan@gmail.com')).toBe(false);
    expect(esGmailValido('ju..an@gmail.com')).toBe(false);
    expect(esGmailValido('123@gmail.com')).toBe(false);
    expect(esGmailValido('ab@gmail.com')).toBe(false);
    expect(esGmailValido('juan@hotmail.com')).toBe(false);
  });

  it('detecta letras repetidas 3 veces seguidas', () => {
    expect(tieneLetrasRepetidas('xxx')).toBe(true);
    expect(tieneLetrasRepetidas('Fff')).toBe(true);
    expect(tieneLetrasRepetidas('Aaron')).toBe(false);
  });

  it('valida el nombre: solo letras, sin repetir 3 veces seguidas', () => {
    expect(esNombreValido('Juan Pérez')).toBe(true);
    expect(esNombreValido('María-José')).toBe(true);
    expect(esNombreValido('xxx')).toBe(false);
    expect(esNombreValido('fffff')).toBe(false);
    expect(esNombreValido('J')).toBe(false);
    expect(esNombreValido('Juan123')).toBe(false);
    expect(esNombreValido('...')).toBe(false);
  });

  it('detecta 5 o mas consonantes seguidas', () => {
    expect(tieneDemasiadasConsonantes('Jhfdsk')).toBe(true);
    expect(tieneDemasiadasConsonantes('Bcdfg')).toBe(true);
    expect(tieneDemasiadasConsonantes('Schmidt')).toBe(false);
    expect(tieneDemasiadasConsonantes('Christian')).toBe(false);
  });

  it('detecta palabras sin ninguna vocal', () => {
    expect(tienePalabraSinVocales('Brk')).toBe(true);
    expect(tienePalabraSinVocales('Juan Pdr')).toBe(true);
    expect(tienePalabraSinVocales('Lynn')).toBe(false);
    expect(tienePalabraSinVocales('Juan Pérez')).toBe(false);
  });

  it('el nombre no puede tener muchas consonantes juntas ni palabras sin vocales', () => {
    expect(esNombreValido('Jhfdsk')).toBe(false);
    expect(esNombreValido('Bcdfg Lopez')).toBe(false);
    expect(esNombreValido('Brk')).toBe(false);
    expect(esNombreValido('Schmidt')).toBe(true);
    expect(esNombreValido('Christian Soto')).toBe(true);
    expect(esNombreValido('Lynn')).toBe(true);
  });

  it('valida la contraseña: mayuscula, minuscula, numero y caracter especial', () => {
    expect(esContrasenaValida('Clave123!')).toBe(true);
    expect(esContrasenaValida('mi#Clave9')).toBe(true);
    expect(esContrasenaValida('clave123!')).toBe(false);
    expect(esContrasenaValida('CLAVE123!')).toBe(false);
    expect(esContrasenaValida('Clave!!!!')).toBe(false);
    expect(esContrasenaValida('Clave1234')).toBe(false);
    expect(esContrasenaValida('Cl1!')).toBe(false);
    expect(esContrasenaValida('Clave 123!')).toBe(false);
    expect(esContrasenaValida('Admin123')).toBe(false);
  });
});

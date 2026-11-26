import { instalarApiPrueba } from './apiPrueba.js';
// src/test/setupTests.js
import matchers from '@testing-library/jasmine-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

beforeEach(() => {
 instalarApiPrueba();
 jasmine.getEnv().addMatchers(matchers.default.default);
});
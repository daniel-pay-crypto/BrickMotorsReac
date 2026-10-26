const { createInstrumenter } = require('istanbul-lib-instrument');

const instrumentador = createInstrumenter({ esModules: true, produceSourceMap: false });

module.exports = function (codigo) {
  return instrumentador.instrumentSync(codigo, this.resourcePath);
};

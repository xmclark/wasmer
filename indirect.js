const fs = require("fs");
const buf = fs.readFileSync("./multiply_indirect.wasm");

async function init() {
  const result_object = await WebAssembly.instantiate(new Uint8Array(buf));
  const wasm_instance = result_object.instance;
  const wasm_module = result_object.module;
  const imps = WebAssembly.Module.imports(wasm_module);
  const exps = WebAssembly.Module.exports(wasm_module);
  const memory = wasm_instance.exports.memory;
  console.log(wasm_module, imps, exps);
  console.log(wasm_instance.exports);
  var int32View = new Int32Array(memory.buffer);

  console.log(int32View.filter(r => r != 0));
  console.log(wasm_instance.exports.main());
  console.log(wasm_instance.exports.multiply(2, 3));
  //   console.log(
  //     wasm_instance.exports.dispatch(wasm_instance.exports.multiply, 2, 3)
  //   );
}

init();

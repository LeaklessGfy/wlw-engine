import fakeState from "./src/resources/fake-state";
import CoreEngine from "./src/engine";
import CoreKernel from "./src/kernel";
import EngineFacade from "./src/engine.facade";

const f = fakeState();
const kernel = new CoreKernel();
const engine = new CoreEngine(kernel);
const facade = new EngineFacade(engine);

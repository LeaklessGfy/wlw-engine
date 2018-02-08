import { expect } from 'chai';
import 'mocha';
import Kernel from "./kernel";

const fakeActuator = {
  key: () => "fake",
  operate: (mutable, original) => null
}

const fakeValidator = {
  key: () => "fake",
  validate: (card, original) => null
}

const fakeDistributor = {
  key: () => "fake",
  distribute: (wrestler, original) => null
}

describe('Kernel', () => {
  it('should be able to add actuator', () => {
    const k = new Kernel();
    k.addActuator(fakeActuator);
    expect(k.getActuator("fake")).to.equal(fakeActuator);
  });

  it('should be able to add validator', () => {
    const k = new Kernel();
    k.addValidator(fakeValidator);
    expect(k.getValidator("fake")).to.equal(fakeValidator);
  });

  it('should be able to add distributor', () => {
    const k = new Kernel();
    k.addDistributor(fakeDistributor);
    expect(k.getDistributor("fake")).to.equal(fakeDistributor);
  });

  it('should be able to add directly from constructor', () => {
    const k = new Kernel([fakeActuator], [fakeValidator], [fakeDistributor]);
    expect(k.getActuator("fake")).to.equal(fakeActuator);
    expect(k.getValidator("fake")).to.equal(fakeValidator);
    expect(k.getDistributor("fake")).to.equal(fakeDistributor);
  });

  it('should be able to not confuse actuator, validator and distributor', () => {
    const k = new Kernel();
    k.addActuator(fakeActuator);
    k.addValidator(fakeValidator);
    k.addDistributor(fakeDistributor);
    expect(k.getActuator("fake")).to.not.equal(fakeValidator);
    expect(k.getDistributor("fake")).to.equal(fakeDistributor);
    expect(k.getValidator("fake")).to.not.equal(fakeActuator);
  });
});

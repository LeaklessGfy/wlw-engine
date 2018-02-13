import { Engine, State, Wrestler } from "../models";

type Distributor = (wrestler: Wrestler, mutable: State, engine: Engine) => void;

export default Distributor;

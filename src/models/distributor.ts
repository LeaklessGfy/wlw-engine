import { Engine, Wrestler } from "../models";

type Distributor = (wrestler: Wrestler, engine: Engine) => void;

export default Distributor;

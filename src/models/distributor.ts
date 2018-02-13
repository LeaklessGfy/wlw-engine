import { State, Wrestler } from "../models";

interface Distributor {
  key(): string;
  distribute(wrestler: Wrestler, state: Readonly<State>): void;
}

export default Distributor;

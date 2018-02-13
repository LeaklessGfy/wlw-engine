import { Card, Wrestler } from "../models";

type Distributor = (wrestler: Wrestler, cards: Card[]) => void;

export default Distributor;

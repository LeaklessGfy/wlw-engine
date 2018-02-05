import Wrestler from "./wrestler";
import Card from "./card";

export default interface State {
  active: number;
  targets: number[];
  card: Card;
  wrestlers: Wrestler[];
}

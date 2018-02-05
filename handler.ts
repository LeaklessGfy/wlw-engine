import State from './Model/state';

export default interface Handler {
  key: string;
  //isValid(): boolean;
  apply(state: State, next: State): State;
}

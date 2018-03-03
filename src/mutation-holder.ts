import * as _ from "lodash";

interface StateMutation {
  turn?: number;
  viewer?: string;
  active?: string;
  targets?: string[];
  next?: string[];
  players?: any;
  card?: number;
  mode?: any;
  state?: number;
}

interface Mutation {
  key: string;
  state: StateMutation;
}

class MutationHolder {
  private readonly mutations: Mutation[] = [];

  constructor(private readonly state) {}

  mutate(mutation: Mutation): void {
    this.mutations.push(mutation);
    _.merge(this.state, mutation.state);
  }

  getState() {
    return this.state;
  }
}

export default MutationHolder;

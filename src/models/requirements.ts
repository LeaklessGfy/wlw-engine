interface Requirement {
  number?: number;
  status?: number;
}

interface Requirements {
  SELF?: Requirement[];
  OPPONENT?: Requirement[];
  PARTNER?: Requirement[];
}

export default Requirements;

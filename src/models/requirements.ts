interface Requirement {
  number?: number;
  status?: string;
}

interface Requirements {
  self?: Requirement[];
  opponent?: Requirement[];
  partner?: Requirement[];
}

export default Requirements;

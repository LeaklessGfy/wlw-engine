interface Official {
  id: number;
  type: number; //0 => Referee, 1 => Annouceur, 2 => Commentator, 3 => Manager
  name: string;
  img: string;
}

export default Official;

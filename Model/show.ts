export default interface Show {
  id: number;
  name: string;
  color: string;
  img: string;
  type: number; //0 => Minor, 1 => Major, 2 => PPV
  arena?: any;
  channel?: any;
  referee?: any;
  anouncer?: any;
  commentators?: any[];
  championships?: any[];
  wrestlers?: any[];
}

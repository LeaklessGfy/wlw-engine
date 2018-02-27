import Arena from "./arena";
import Channel from "./channel";
import Official from "./official";
import Wrestler from "./wrestler";

interface Show {
  uid: string;
  type: number;
  name: string;
  color: string;
  img: string;
  arena?: Arena;
  channel?: Channel;
  referee?: Official;
  anouncer?: Official;
  commentators?: Official[];
  championships?: any[];
  wrestlers?: Wrestler[];
}

export default Show;

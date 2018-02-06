interface Effect {
  id: number;
  handlers: string[];
  name: string;
  desc: string;
  duration: number;
  luck: number;
  target: number;
  icon: string;
}

export default Effect;

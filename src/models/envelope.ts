interface Envelope {
  channel: string;
  topic: string;
  data: any;
  headers: any;
  timeStamp: Date;
}

export default Envelope;

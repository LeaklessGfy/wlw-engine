import Record from "../models/record";

class RecordProxy {
  constructor(private readonly record: Record) {}
}

export default RecordProxy;

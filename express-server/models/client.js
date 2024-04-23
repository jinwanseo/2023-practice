import mongoose from "mongoose";

const Schema = mongoose.Schema;
const clientSchema = new Schema({
  managers: {
    type: Array,
  },
});

const Client = mongoose.model("client", clientSchema);
export default Client;

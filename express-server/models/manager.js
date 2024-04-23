import mongoose from "mongoose";

const Schema = mongoose.Schema;
const managerSchema = new Schema({
  userId: {
    type: String, // 타입
    unique: true, // 중복 여부
    required: true, // 필수 입력
    trim: true,
  },
  userPw: {
    type: String,
    required: true,
    trim: true,
  },
  blogUrl: {
    type: String,
    trim: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  created: {
    type: Date,
    default: new Date(),
  },
  storeName: {
    type: String,
    required: true,
    trim: true,
  },
  storeAddress: {
    type: String,
    required: true,
    trim: true,
  },
  storeNumber: {
    type: String,
    required: true,
    trim: true,
  },
  clients: {
    type: Array,
    // clients item 저장 정보
    // clientPk, managerPk, name, phone, created, status
  },
});

const Manager = mongoose.model("manager", managerSchema);
export default Manager;

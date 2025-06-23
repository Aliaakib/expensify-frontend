// src/services/recordService.js
import API from "./api";

// Create a new record
export const createRecord = async (record) => {
  const res = await API.post("/records/create", record);
  return res.data;
};

// Get all records for user
export const getMyRecords = async () => {
  const res = await API.get("/records/my-records");
  return res.data;
};

export const deleteRecord = async (id) => {
  const res = await API.delete(`/records/${id}`);
  return res.data;
};

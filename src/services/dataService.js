// services/dataService.js
import API from "./api";

export const addDataToRecord = async (recordId, data) => {
  const res = await API.post(`/records/${recordId}/data`, data);
  return res.data;
};

export const deleteData = async (recordId, dataId) => {
  const res = await API.delete(`/records/${recordId}/data/${dataId}`);
  return res.data;
};

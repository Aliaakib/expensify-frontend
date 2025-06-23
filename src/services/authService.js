import API from "./api";

export const registerUser = async (formData) => {
  const response = await API.post("/auth/register", formData);
  return response.data;
};
export const loginUser = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

export const resetPassword = async (formData) => {
  const response = await API.post("/auth/reset-password", {
    identifier: formData.identifier,
    newPassword: formData.newPassword,
  });
  return response.data;
};

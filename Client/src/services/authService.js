import API from "./api";

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);

  if (response.data.token) {
    sessionStorage.setItem("token", response.data.token);

    if (response.data.user) {
      sessionStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
    }
  }

  return response.data;
};

export const logoutUser = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};
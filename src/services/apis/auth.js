import api from "./baseApi";

export const authApi = {
  login(params) {
    return api.post("/api/admin/login", params);
  },
  logout() {
    return api.post("api/admin/logout");
  },
  register(params) {
    return api.post("api/register", params);
  },
  forgotPassword(params) {
    return api.post("api/admin/forgot_password/mail", params);
  },
  resetPassword(params) {
    return api.post("api/admin/forgot_password", params);
  },
  verify(params) {
    return api.put("api/verify-code", params);
  },
  editProfile(params) {
    return api.put("api/users/edit-profile", params);
  },
};

import http from "../http-common";

class UserDataService {
  getAll(tok) {
    return http.get("/user", { headers: { Authorization: tok } });
  }

  get(id, tok) {
    return http.get(`/user/${id}`, { headers: { Authorization: tok } });
  }

  create(data, tok) {
    return http.post("/user", data, { headers: { Authorization: tok } });
  }

  update(id, data, tok) {
    return http.put(`/user/${id}`, data, { headers: { Authorization: tok } });
  }

  delete(id, tok) {
    return http.delete(`/user/${id}`, { headers: { Authorization: tok } });
  }

  deleteAll(tok) {
    return http.delete(`/user`, { headers: { Authorization: tok } });
  }

  findByUser(login, tok) {
    return http.get(`/user/${login}`, { headers: { Authorization: tok } });
  }
}

export default new UserDataService();
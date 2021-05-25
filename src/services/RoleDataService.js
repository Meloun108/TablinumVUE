import http from "../http-common";

class RoleDataService {
  getAll(tok) {
    return http.get("/roles", { headers: { Authorization: tok } });
  }

  get(id, tok) {
    return http.get(`/roles/${id}`, { headers: { Authorization: tok } });
  }

  create(data, tok) {
    return http.post("/roles", data, { headers: { Authorization: tok } });
  }

  update(id, data, tok) {
    return http.put(`/roles/${id}`, data, { headers: { Authorization: tok } });
  }

  delete(id, tok) {
    return http.delete(`/roles/${id}`, { headers: { Authorization: tok } });
  }

  deleteAll(tok) {
    return http.delete(`/roles`, { headers: { Authorization: tok } });
  }

  findByRoleName(rolename, tok) {
    return http.get(`/roles/rolename/${rolename}`, { headers: { Authorization: tok } });
  }
}

export default new RoleDataService();
import http from "../http-common";

class GroupDataService {
  getAll(tok) {
    return http.get("/groups", { headers: { Authorization: tok } });
  }

  get(id, tok) {
    return http.get(`/groups/${id}`, { headers: { Authorization: tok } });
  }

  create(data, tok) {
    return http.post("/groups", data, { headers: { Authorization: tok } });
  }

  update(id, data, tok) {
    return http.put(`/groups/${id}`, data, { headers: { Authorization: tok } });
  }

  delete(id, tok) {
    return http.delete(`/groups/${id}`, { headers: { Authorization: tok } });
  }

  deleteAll(tok) {
    return http.delete(`/groups`, { headers: { Authorization: tok } });
  }

  findByDept(dept, tok) {
    return http.get(`/groups/dept/${dept}`, { headers: { Authorization: tok } });
  }
}

export default new GroupDataService();
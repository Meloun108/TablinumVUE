import http from "../http-common";

class DocumentDataService {
  getAll(tok) {
    return http.get("/documents", { headers: { Authorization: tok } });
  }

  get(id, tok) {
    return http.get(`/documents/${id}`, { headers: { Authorization: tok } });
  }

  create(data, tok) {
    return http.post("/documents", data, { headers: { Authorization: tok } });
  }

  update(id, data, tok) {
    return http.put(`/documents/${id}`, data, { headers: { Authorization: tok } });
  }

  delete(id, tok) {
    return http.delete(`/documents/${id}`, { headers: { Authorization: tok } });
  }

  deleteAll(tok) {
    return http.delete(`/documents`, { headers: { Authorization: tok } });
  }

  findByUserGroup(group, tok) {
    return http.get(`/documents/group/${group}`, { headers: { Authorization: tok } });
  }
}

export default new DocumentDataService();
import http from "../http-common";

class InitioDataService {
  getAll(tok) {
    return http.get("/initios", { headers: { Authorization: tok } });
  }

  get(id, tok) {
    return http.get(`/initios/${id}`, { headers: { Authorization: tok } });
  }

  create(data, tok) {
    return http.post("/initios", data, { headers: { Authorization: tok } });
  }

  update(id, data, tok) {
    return http.put(`/initios/${id}`, data, { headers: { Authorization: tok } });
  }

  delete(id, tok) {
    return http.delete(`/initios/${id}`, { headers: { Authorization: tok } });
  }

  deleteAll(tok) {
    return http.delete(`/initios`, { headers: { Authorization: tok } });
  }

  findByInitio(initio, tok) {
    return http.get(`/initios/initio/${initio}`, { headers: { Authorization: tok } });
  }
}

export default new InitioDataService();
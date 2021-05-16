import http from "../http-common";

class InitioDataService {
  getAll() {
    return http.get("/initios");
  }

  get(id) {
    return http.get(`/initios/${id}`);
  }

  create(data) {
    return http.post("/initios", data);
  }

  update(id, data) {
    return http.put(`/initios/${id}`, data);
  }

  delete(id) {
    return http.delete(`/initios/${id}`);
  }

  deleteAll() {
    return http.delete(`/initios`);
  }

  findByInitio(initio) {
    return http.get(`/initios?initio=${initio}`);
  }
}

export default new InitioDataService();
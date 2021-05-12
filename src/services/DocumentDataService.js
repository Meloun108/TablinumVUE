import http from "../http-common";

class DocumentDataService {
  getAll() {
    return http.get("/documents");
  }

  get(id) {
    return http.get(`/documents/${id}`);
  }

  create(data) {
    return http.post("/documents", data);
  }

  update(id, data) {
    return http.put(`/documents/${id}`, data);
  }

  delete(id) {
    return http.delete(`/documents/${id}`);
  }

  deleteAll() {
    return http.delete(`/documents`);
  }

  findByNumber(number) {
    return http.get(`/documents?number=${number}`);
  }
}

export default new DocumentDataService();
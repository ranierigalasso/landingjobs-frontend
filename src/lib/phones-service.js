import axios from 'axios';

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000/api',
    })
  }

  getPhones() {
    return this.api.get('/phones')
      .then(({data}) => data);
  }

  getPhone(id) {
    return this.api.get(`/phones/${id}`);
  }

  editPhone(id, body) {
    return this.api.put(`/phones/${id}`, body);
  }

  createPhone(body) {
    return this.api.post('/phones', body);
  }

  deletePhone(id) {
    return this.api.delete(`/phones/${id}`);
  }
}

const api = new Api();

export default api;
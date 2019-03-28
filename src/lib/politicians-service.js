import axios from 'axios';

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
    })
  }

  getPoliticians() {
    return this.api.get('/politicians')
      .then(({data}) => data);
  }

  getPoliticiansJail() {
    return this.api.get('/politicians-jail')
      .then(({data}) => data);
  }

  getOne(id) {
    return this.api.get(`/${id}`)
    .then(({data}) => data);
  }

  createPolitician(body) {
    return this.api.post('/create', body)
  }

}

const api = new Api();

export default api;
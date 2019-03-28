import axios from 'axios';

class ApiEvents {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
    })
  }

  getEvents(id) {
    return this.api.get(`/events/${id}`)
    .then(({data}) => data);
  }

  createEvent(body) {
    return this.api.post('/events/create', body)
  }
}

const api = new ApiEvents();

export default api;
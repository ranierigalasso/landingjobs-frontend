import React, { Component } from 'react'
import Api from '../lib/phones-service';
import { Link } from 'react-router-dom';

class Home extends Component {

  state = {
    phones: [],
    isLoading: true,
  }

  componentDidMount() {
    Api.getPhones()
      .then((data) => {
        console.log(data);
        this.setState({
          phones: data,
          isLoading: false
        })
      })
      .catch((error) => {

      })
  }

  renderList = () => {
    return this.state.phones.map(({ brand, model, _id }) => 
      <li key={_id}>
        {brand} - <Link to={`/phones/${_id}`}>{model}</Link> 
      </li>)
  }

  render() {
    // console.log(this.state);
    
    return (
      <div>
        <h1>Listado de telefonos</h1>
        <ul>
          {this.state.isLoading ? <h1>Loading</h1> : this.renderList()}
        </ul>
      </div>
    )
  }
}

export default Home;

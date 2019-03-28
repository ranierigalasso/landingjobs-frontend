import React, { Component } from 'react'
import Api from '../lib/politicians-service';
import { Link } from 'react-router-dom';

import '../stylesheets/Create.css';

export default class Create extends Component {
  state = {
    politicians: [],
    name: '',
    joinDate: '',
    superior: '',
  }

  componentDidMount() {
    this.getPoliticians();   
  }

  getPoliticians = () => {
    Api.getPoliticians()
    .then((data) => {
      this.setState({
        politicians: data,
      })
    })
    .catch((error) => {

    })
  }

  renderList = () => {
    return this.state.politicians.map((person,index) => 
        <option key={index}>{person.name}</option>
    )
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, joinDate, superior} = this.state;
    const body = {
      name,
      joinDate,
      superior,
    }
    Api.createPolitician(body)
      .then(() => {
        this.props.history.push('/');
      })
      .catch((error) => {console.log(error.message)}) 
  }

  handleChange = (event) => {  
    this.setState({
      [event.target.name]: event.target.value,
    });
  }


  render() {
    const { name, joinDate, superior } = this.state;
    return (
      <div className='create container'>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" name='name' value={name} onChange={this.handleChange} placeholder="name..."/>
          </div>
          <div className="form-group">
            <label>Joining Date</label>
            <input type="text" className="form-control" name='joinDate' value={joinDate} onChange={this.handleChange} placeholder="example: 1971-12-08..."/>
          </div>
          <div className="form-group">
            <label>Select Superior</label>
            <select className="form-control" name='superior' value={superior} onChange={this.handleChange}>
              <option>Choose a superior</option>
              {this.renderList()}
            </select>
          </div>
          <button type="submit" className="btn btn-success">Create Politician</button>
        </form>
        <Link to='/'><button type="button" className="btn btn-primary">Back</button></Link>
      </div>
    )
  }
}

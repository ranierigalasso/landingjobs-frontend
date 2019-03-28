import React, { Component } from 'react'
import Api from '../lib/politicians-service';
import { Link } from 'react-router-dom';

import '../stylesheets/Politicians.css';

class Politicians extends Component {

  state = {
    politicians: [],
    politiciansJail: [],
  }

  componentDidMount() {
    this.getPoliticians();  
    this.getPoliticiansJail(); 
  }

  getPoliticians = () => {
    Api.getPoliticians()
    .then((data) => {
      this.setState({
        politicians: data,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  getPoliticiansJail = () => {
    Api.getPoliticiansJail()
    .then((data) => {
      this.setState({
        politiciansJail: data,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  sortBySubordinates = () => {
    const { politicians } = this.state;
    const politiciansSorted = politicians.sort((a,b) => {
      return  b.subordinates.length - a.subordinates.length 
    })
    this.setState({
      politicians: politiciansSorted,
    })
  }

  renderFreeList = () => {
    const { politicians } = this.state;
    return politicians.map((person,index) => 
        <span key={index} className="list-group-item list-group-item-action">
          <h2>{person.name}</h2>
          <div>
            <p>Subordinates: {person.subordinates.length}</p>
            <Link to={`/${person._id}`}><button type="button" className="btn btn-secondary">View Details</button></Link>
          </div>
        </span>
    )
  }
  renderJailList = () => {
    const { politiciansJail } = this.state;
    return politiciansJail.map((person,index) => 
        <span key={index} className="list-group-item list-group-item-action">
          <h2>{person.name}</h2>
          <div>
            <p>Subordinates: {person.subordinates.length}</p>
            <Link to={`/${person._id}`}><button type="button" className="btn btn-secondary">View Details</button></Link>
          </div>
        </span>
    )
  }

  render() {
    return (
      <div className="list-group politicians-container">
        <div style={{display:'flex', justifyContent: 'space-around'}}>
          <button type="button" className="btn btn-secondary btn" onClick={this.sortBySubordinates}>Sort by most subordinates</button>
          <Link to='/create'><button type="button" className="btn btn-success">Create New Politician +</button></Link>
        </div>
        <div style={{display:'flex', justifyContent: 'space-around'}}>
          <div className='container'>
            <h1>Free Politicians</h1>
            <div className='list-container'>
              {this.renderFreeList()}
            </div>
          </div>
          <div className='container'>
            <h1>Jailed Politicians</h1>
            <div className='list-container'>
              {this.renderJailList()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Politicians;


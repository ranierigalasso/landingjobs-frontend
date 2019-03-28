import React, { Component } from 'react'
import Api from '../lib/politicians-service';
import ApiEvents from '../lib/events-service';
import NewEvent from '../pages/NewEvent';

import { Link } from 'react-router-dom';

import '../stylesheets/Details.css';

export default class Details extends Component {
  state = {
    name: '',
    joinDate: '',
    superior: '',
    superiorId:'',
    subordinates: [],
    events: [],
    eventDate: '',
    eventType: 'Go to Jail',
    path: this.props.match.params.id,
  }

  componentDidMount = () => {
    this.getDetails();
    this.getEvents();
  }

  getDetails = () => {
    const { id } = this.props.match.params;
    Api.getOne(id)
      .then((data) => {
        if(data.superiorId === undefined) {
          this.setState({
            name: data.name,
            joinDate: data.joinDate,
            superior: ' no superior available',
            superiorId: null,
            subordinates: data.subordinates,
          })
        } else {
          this.setState({
            name: data.name,
            joinDate: data.joinDate,
            superior: data.superiorId.name,
            superiorId: data.superiorId._id,
            subordinates: data.subordinates,
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  renderDetails = () => {
    const { name, joinDate, superior, superiorId, subordinates } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Joined: {joinDate}</h6>
          <h6 className="card-subtitle mb-2 text-muted">
            Superior:
            <Link to={`/${superiorId}`}>{superior}</Link>
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            Number of Subordinates: {subordinates.length}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            Subordinates: 
            {subordinates.map((sub,index) => {
              return <Link key={index} to={`/${sub._id}`}>{sub.name}    </Link>
            })}
          </h6>
        </div>
      </div>
    )
  }

  getEvents = () => {
    const { id } = this.props.match.params;
    ApiEvents.getEvents(id)
      .then((data) => {
        this.setState({
          events: data,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  renderEvents = () => {
    const { events } = this.state;
    return events.map((event, index) => {
      if(event.eventType === 'InJail') {
        return (
          <div key={index} className="card">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Went to jail on: {event.eventDate}</h6>
            </div>
          </div>
        )
      } else {
        return (
          <div key={index} className="card">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Was released from jail on: {event.eventDate}</h6>
            </div>
          </div>
        )
      }
    })
  }

  handleFormSubmit = () => {
    const { eventDate, eventType, events} = this.state;
    const body = {
      eventDate,
      eventType,
      politicianId: this.props.match.params.id,
    }
    ApiEvents.createEvent(body)
      .then((data) => {
        const newEvents = [...events,data.data]
        this.setState({
          events: newEvents,
        })
      })
      .catch((error) => {console.log(error.message)}) 
  }

  handleChange = (event) => {  
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidUpdate(prevProps, prevState){
    const oldId = prevProps.match.params.id;
    const {id} = this.props.match.params;
    if(id !== oldId) {
      this.getDetails();
      this.getEvents();
    }
  }

  render() {
    return (
      <div className='details-container'>
        {this.renderDetails()}
        <NewEvent 
          handleForm={this.handleFormSubmit} 
          eventDate={this.state.eventDate} 
          eventType={this.state.eventType}
          handleChange={this.handleChange}
          />
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Events History</h5>
            {this.renderEvents()}
          </div>
        </div>
        <Link to='/'><button type="button" className="btn btn-primary">Back</button></Link>
      </div>
    )
  }
}

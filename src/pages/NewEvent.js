import React, { Component } from 'react'

export default class NewEvent extends Component {
 
  handleClick = (event) => {
    event.preventDefault();
    this.props.handleForm();
  }

  handleChange = (event) => {
    this.props.handleChange(event);
  }

  render() {
    const { eventDate, eventType } = this.props;
    return (        
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Create an Event</h5>
          <form onSubmit={this.handleClick}>
            <div className="form-group">
              <input type="text" className="form-control" name='eventDate' value={eventDate}  onChange={this.handleChange} placeholder="example: 1971-12-08..."/>
            </div>
            <div className="form-group">
              <select className="form-control" name='eventType' value={eventType} onChange={this.handleChange}>
                <option>Go to Jail</option>
                <option>Release from Jail</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">Create Event</button>
          </form>
        </div>
      </div>
    )
  }
}

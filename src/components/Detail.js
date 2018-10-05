import React, { Component, Fragment } from 'react'
import Api from  '../lib/phones-service';
import { Link } from 'react-router-dom';

export default class Detail extends Component {
  
  state = {
    phone: {},
    isLoading: true,
  }

  componentDidMount() {
    const { id } = this.props.match.params; 
    Api.getPhone(id)
      .then(({data}) => {
        this.setState({
          phone: data,
          isLoading: false,
        })
      })
  }

  renderInfo = () => {
    const { brand, model } = this.state.phone;
    return (
      <Fragment>
        <h3>Brand</h3>
        <p>{brand}</p>
        <h3>Model</h3>
        <p>{model}</p>
        <Link to="/">Back to home</Link>
      </Fragment>
    );
  }

  render() {
    
    return (
      <div>
        { !this.state.isLoading ? this.renderInfo() : <div>Loading</div>}
      </div>
    )
  }
}

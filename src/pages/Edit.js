import React, { Component } from 'react'
import Api from '../lib/phones-service';

export default class Edit extends Component {
  state = { 
    brand: '',
    model: '',
    image: '',
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    Api.getPhone(id)
    .then(({ data }) => {
      const { brand, model, image } = data;
      this.setState({
        brand,
        model,
        image,
      })
    })
    .catch(error => {

    })
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { brand, model, image } = this.state;
    const { id } = this.props.match.params;
    Api.editPhone( id, { brand, model, image })
      .then((result) => {
        this.props.history.push(`/`);
      })
      .catch((error) => {console.log(error)})
  }

  render() {
    const { brand, model, image } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Brand</label>
          <input type="text" value={brand} name="brand" onChange={this.handleOnChange}/>
          <label htmlFor="">Model</label>
          <input type="text" value={model} name="model" onChange={this.handleOnChange}/>
          <label htmlFor="">image</label>
          <input type="text" value={image} name="image" onChange={this.handleOnChange}/>
          <input type="submit" value="create"/>
        </form>
      </div>
    )
  }
}

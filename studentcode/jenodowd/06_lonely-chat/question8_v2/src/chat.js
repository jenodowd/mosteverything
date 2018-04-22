import React, { Component } from 'react';
import './App.css';

class Chat extends Component {

  constructor() {
    super()
    this.state = { inputContent: "", msgs: [] }
  }


  handleSubmit = (event) => {
    let content = this.state.inputContent;
    let newMsgs = this.state.msgs.concat(this.props.user + ": " + content);
    this.clearForm()
    setTimeout(this.response, 1000)
    this.setState({ msgs: newMsgs })
    event.preventDefault() // STOPS PAGE FROM RELOADING
  }

  response = () => {
    let random = (Math.floor(Math.random() * 7) + 1)
    let newMsgs = this.state.msgs.concat(this.props.name + this.props.randomResponse[random]);
    this.setState({ msgs: newMsgs })
  }

  updateInputContent = (event) => {
    this.setState({ inputContent: event.target.value })
  }

  clearForm = () => {
    this.setState({ inputContent: "" })
  }

  
  render() {
    let makeLi = elem => (<li> {elem} </li>);
    return (
      <div>
        <div> 
        <ul className = "chatContent" style={{ "list-style-type": "none" }}>
          <li>{this.props.name}Hello</li>
          {this.state.msgs.map(makeLi)}
        </ul>
        </div>
        <div className = "form" >
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="text" value={this.state.inputContent} onChange={this.updateInputContent} />
            <input type="submit" />
          </div>
        </form>
        </div>
      </div>
    );
  }

  

}

export default Chat;

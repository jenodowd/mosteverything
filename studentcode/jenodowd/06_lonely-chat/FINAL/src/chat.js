import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
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
    let makeLi = (elem, ind) => (<ScrollIntoViewIfNeeded><li id = "showLi" key={ind}>{elem}</li></ScrollIntoViewIfNeeded>);
    return (
      <div>
        <div>
          <ul style={{ "list-style-type": "none" }}>
            <li className="bold">{this.props.name}Entered the chat!</li>
            {this.state.msgs.map(makeLi)}
          </ul>
        </div>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <div>
              <input className="chatText" type="text" value={this.state.inputContent} onChange={this.updateInputContent} />
              <button className="chatButton" type="submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }



}

export default Chat;

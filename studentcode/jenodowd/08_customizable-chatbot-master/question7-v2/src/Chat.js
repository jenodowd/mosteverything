import React, { Component } from 'react';
import ChatLine from './ChatLine.js'

// There are three different screens. The first screen shown to the user is the login.
let LOGIN_SCREEN = "login"
let CHAT_SCREEN = "chat"
let PROFILE_SCREEN = "profile"

class Chat extends Component {
  constructor(props) {
    super(props);
    //this.state = { allMsgs: [], currentMsg: "" }
    this.changeHandler = this.changeHandler.bind(this);
  }

  handleSubmit = (event) => {
    let newMsgs = this.props.allMsgs;
    newMsgs = newMsgs.concat({userName : this.props.username , text: this.props.currentMsg});
    newMsgs = newMsgs.concat({userName : "barbara", text: this.props.botMessage});
    newMsgs = newMsgs.concat({userName :"peter" ,text:this.props.PbotMessage});
    // Fires when the submit button is clicked
    this.props.updateAllMsgs(newMsgs);
    this.props.buttonCounter();
    event.preventDefault();
  }

  changeHandler(event) {
    // Fires when the input box is updated
    this.props.updateCurrentMsg(event.target.value)
    //this.setState({ currentMsg: event.target.value })
  }

  clearChat = () => {
    //this.setState({ allMsgs: [] })
    this.props.clearChat()
    this.props.buttonCounter();
  }

  render() {
    let list = this.props.allMsgs.map((el,id)=>{
      return(
        <li> 
          <ChatLine deleteItem={this.props.deleteItem} index={id} userName={el.userName} text={el.text}/>
        </li>
      )
    })
    return (<div>
      <ul>
        {list}
      </ul>
      <form onSubmit={this.handleSubmit}>
        <label> Chat message <input value={this.props.currentMsg} onChange={this.changeHandler} type="text" /> </label>
        <input type="submit" value="submit"></input>
      </form>
      <button onClick={this.clearChat}>Clear Chat</button>
      <button onClick={this.props.gotoSettings}>Go to settings page</button></div>)

  }
}

export default Chat;

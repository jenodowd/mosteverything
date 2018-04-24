import React, { Component } from 'react';

// There are three different screens. The first screen shown to the user is the login.
let LOGIN_SCREEN = "login"
let CHAT_SCREEN = "chat"
let PROFILE_SCREEN = "profile"

class ChatLine extends Component {


  render() {
    let list = this.props.allMsgs.map((el,id)=>{
      return(
        <li> {el.userName + " : " + el.text}</li>
      )
    })
  }
}

export default ChatLine;

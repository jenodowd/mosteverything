import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './chat.js'

class App extends Component {

    constructor() {
        super()
        this.state = { user: "", switch: true, chat: true, msgs: [] }
        this.bResponse = [" ", "that's cool", "love it!", "that's interesting...", "sounds fun!", "great idea", "lol", "..."]
        this.fResponse = [" ", "ok", "how do you feel about it?", "nice!", "I guess", "Bob's right", "haha", "?"]
    }

    changeUserName = (event) => {
        this.setState({ user: event.target.value })
    }

    toggle = () => {
        this.setState({ switch: !this.state.switch })
    }

    chatFred = () => {
        this.setState({ chat: false })
    }

    chatBob = () => {
        this.setState({ chat: true })
    }

    render() {
        return (
            <div>
                {this.state.switch ?
                    <div className="user">
                        User Name: <input type="text" value={this.state.user} onChange={this.changeUserName} /><button onClick={this.toggle}>Start Chatting</button>
                    </div>
                    : <div className="user">
                        Welcome {this.state.user}! <button onClick={this.toggle}>Change User Name</button></div>}

                <div className="container">

                    {this.state.chat ?
                        <div className="chat1"><Chat name="Bob: " user={this.state.user} randomResponse={this.bResponse} msgs={this.state.msgs} /></div>
                        : <div className="chat2"><Chat name="Frederic: " user={this.state.user} randomResponse={this.fResponse} /></div>}

                </div>
                <div>
                    <button onClick={this.chatBob}>Chat Bob</button>
                    <button onClick={this.chatFred}>Chat Fred</button>
                </div>
            </div>
        )
    }

}

export default App;
import React, { Component } from 'react';
import './App.css';
import Chat from './chat.js'
import logo from './logo.png'

class App extends Component {

    constructor() {
        super()
        this.state = { user: "", switch: true, chatBob: true, chatFred: false, msgsB: [], msgsF: [] }
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
        this.setState({ chatFred: true })
        this.setState({ chatBob: false })
    }

    chatBob = () => {
        this.setState({ chatBob: true })
        this.setState({ chatFred: false })
    }

    render() {
        return (
            <div>
                <div className="topBanner"><img width="220px" src={logo} alt={logo}  ></img></div>
                <div className="changeChat">
                    <div className="user">
                        {this.state.switch ?
                            <div>
                                User Name: <input className="userInput" type="text" value={this.state.user} onChange={this.changeUserName} /><br /><button className="userButton" onClick={this.toggle}>START CHATTING</button>
                            </div>
                            :
                            <div>
                                Welcome <h2>{this.state.user}!</h2> <br /><button className="userButton" onClick={this.toggle}>CHANGE USER NAME</button>
                            </div>}
                    </div>
                    <button className="button" onClick={this.chatBob}>Add Bob</button>
                    <button className="button" onClick={this.chatFred}>Add Fred</button>
                </div>

                <div>
                    {this.state.chatBob ?
                        <div className="chat1"> <Chat name="Bob: " user={this.state.user} randomResponse={this.bResponse} msgs={this.state.msgsB} /> </div>
                        : null
                    }
                    {this.state.chatFred ?
                        <div className="chat2"> <Chat name="Frederic: " user={this.state.user} randomResponse={this.fResponse} msgs={this.state.msgsF} /> </div>
                        : null
                    }
                </div>

            </div>
        )
    }

}

export default App;
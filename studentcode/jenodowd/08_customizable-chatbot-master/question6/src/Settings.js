import React, { Component } from 'react';

class Settings extends Component {
  constructor(props) {
    super(props); // Absolutely needed since we're using props
    this.state = { botSays: this.props.botMessage, PbotSays: this.props.PbotMessage }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.settingsSubmit(this.props.newusername);
    this.props.setBotMessage(this.state.botSays);
    this.props.setPBotMessage(this.state.PbotSays);
    this.props.buttonCounter();
  }
  changeHandler = (event) => {
    // Fires when the input box is updated
    //this.setState({ currentName: event.target.value })
    this.props.changeName(event.target.value)
  }
  changeBotSaysHandler = (event) => {
    this.setState({ botSays: event.target.value })
  }
  changePBotSaysHandler = (event) => {
    this.setState({ PbotSays: event.target.value })
  }
  render() {
    return (<form onSubmit={this.handleSubmit} className="basic-grey">
      <label> Change your name to
        <input value={this.props.username}
          onChange={this.changeHandler}
          type="text" />
      </label>
      <label> What should the Barbara say?
        <input value={this.state.botSays}
          onChange={this.changeBotSaysHandler}
          type="text" />
      </label>
      <label> What should the Peter say?
        <input value={this.state.PbotSays}
          onChange={this.changePBotSaysHandler}
          type="text" />
      </label>
      <input type="submit" />
    </form>)

  }
}

export default Settings;

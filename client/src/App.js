import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function LanguageItems(props) {
  return (
    <option>
      {props.value}
    </option>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
    this.state = { language: "eng" };
    this.state = { subtitles: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleChangeSelect(event) {
    this.setState({ language: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state);
    const title = this.state.title;
    const language = this.state.language;
    axios.post(`http://localhost:8000/api/${title}/${language}`).then(res => {
      const subtitles = res.data.data.map(obj => obj);
      this.setState({ subtitles });
    });
    event.preventDefault();
  }

  render() {
    const languages = ["eng", "ger", "rus"];
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={this.handleSubmit}>
          Title:{" "}
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <select
            value={this.state.language}
            onChange={this.handleChangeSelect}
          >
            {languages.map(data => <LanguageItems key={data} value={data} />)}
          </select>
          <input type="submit" value="Submit" />
        </form>
        <div>
          {this.state.subtitles.map(subtitle =>
            <div key={subtitle.file_num}>
              {subtitle.filename}
              <a href={subtitle.link}>Download</a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { githubData: [] };
  }

  componentWillMount() {
    fetch("https://api.github.com/users/wilfredruck/followers").then(
      response => response.json()).then(
        data => {
          let info = []
          for(let i = 0; i < data.length; i++) {
            info.push({username: data[i].login, link: data[i].html_url, id: data[i].id});
          }

          this.setState({ githubData: info })
        }
      )
  }
  
  render() {
    const sortedInfo = this.state.githubData.sort((a,b) => a.id - b.id);
    const usernames = sortedInfo.map((info, idx) => 
      <li key={idx}> <a href={info.link}> {info.username} </a> </li>
    )
    const ids = sortedInfo.map((info, idx) =>
      <li key={idx}> {info.id} </li>
    )

    return (
      <div className="App">
        <h1>Marketproof</h1>
        <div className="data-table">
          <ul>
            {usernames}
          </ul>
          <ul>
            {ids}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

import logo from './logo.svg';
import './App.css';
import Countdown from './countdown/Countdown';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Countdown />
        <br />
        <a>
        <a
          className="App-link"
          href="https://github.com/margohpolo/Countdown"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a> 🤟</a>
      </header>
    </div>
  );
}

export default App;

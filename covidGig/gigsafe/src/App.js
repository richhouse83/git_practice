import React from 'react';
import UserComponent from './components/UserComponent';
import GigComponent from './components/GigComponent';
import VenueComponent from './components/VenueComponent';
import AttendedComponent from './components/AttendedComponent';
import TransmissionComponent from './components/TransmissionComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GigSafe</h1>
        <p>
          Add number and passcode to register
        </p>
        <div>
          <UserComponent />
        </div>
        <div>
          <VenueComponent />
        </div>
        <div>
          <GigComponent />
        </div>
        <div>
          <AttendedComponent />
        </div>
        <div>
          <TransmissionComponent />
        </div>
      </header>
    </div>
  );
}

export default App;

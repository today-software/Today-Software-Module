import React from 'react';
import './App.scss';
import Toolbar from './components/toolbar';
import Sidebar from './components/sidebar';
import MainLayout from './containers/mainLayout';

function App() {
  return (
    <div className="App">
        <Toolbar/>
        <div>
          <Sidebar/>
          <MainLayout/>
        </div>
      
    </div>
  );
}

export default App;

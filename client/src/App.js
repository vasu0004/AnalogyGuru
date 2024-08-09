
import './App.css';
import React from 'react';
//import NavigationBar from './components/NavigationBar'; 
import Header from './components/Header'; 
import myimg from './assets/AnalogyGuru_pic.png';

import Analogies from './components/Analogies';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <img className='image' src={myimg} alt='imag'></img>
      
      <div className='container'>
        <Header />
        <h2 className='h22'>Learn With an Analogy</h2>
        <p className='pp'>Unlock complex concepts with simple analogies.Discover learning made fun.</p>
      <Analogies />
      
      </div>
     
    
    
     </div>
      

   
  );
}

export default App;

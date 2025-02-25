// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//     </div>
//   );
// }

// export default App;






import React from 'react';
import Calendar from './Calendar'; // Adjust the path if your Calendar component is in a different folder
 // Optional, for global styles if needed

function App() {
  return (
    <div className="App">
      
      <main>
        <Calendar />
      </main>
    </div>
  );
}

export default App;

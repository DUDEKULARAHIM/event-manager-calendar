// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();






// import React, { useState } from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// // Register the Service Worker for PWA
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then((registration) => {
//         console.log('Service Worker registered with scope: ', registration.scope);
//       })
//       .catch((error) => {
//         console.log('Service Worker registration failed: ', error);
//       });
//   });
// }

// // File Download Functionality
// const CalendarDownload = () => {
//   const [events, setEvents] = useState([
//     { date: '2025-01-06', title: 'Event 1', description: 'Description for Event 1' },
//     { date: '2025-01-07', title: 'Event 2', description: 'Description for Event 2' },
//     // Add more events here
//   ]);

//   // Function to download the events as a JSON file
//   const downloadEvents = () => {
//     const data = JSON.stringify(events, null, 2); // Convert events to JSON string
//     const blob = new Blob([data], { type: 'application/json' }); // Create a blob of the data
//     const url = URL.createObjectURL(blob); // Create a URL for the blob
//     const a = document.createElement('a'); // Create an anchor element
//     a.href = url; // Set the href of the anchor to the blob URL
//     a.download = 'events.json'; // Specify the download file name
//     a.click(); // Trigger the download by simulating a click
//     URL.revokeObjectURL(url); // Clean up the URL object
//   };

//   return (
//     <div>
//       <button
//         onClick={downloadEvents}
//         style={{
//           backgroundColor: '#28a745',
//           color: 'white',
//           border: 'none',
//           padding: '10px 15px',
//           borderRadius: '5px',
//           cursor: 'pointer'
//         }}
//       >
//         Download Events as JSON
//       </button>
//     </div>
//   );
// };

// // Render the app with the CalendarDownload component and App component
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//     <CalendarDownload />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();












import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import Calendar from './Calendar';  
import reportWebVitals from './reportWebVitals';
import { jsPDF } from 'jspdf';

// Register the Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope: ', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}

// File Download Functionality
const CalendarDownload = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events')) || {};
    const allEvents = [];
    Object.keys(storedEvents).forEach((date) => {
      storedEvents[date].forEach((event) => {
        allEvents.push({ date, ...event });
      });
    });
    setEvents(allEvents);
  }, []);

  // Function to download events as a PDF file
  const downloadEventsAsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Event List', 10, 10);

    let yOffset = 20; // Vertical offset for content
    events.forEach((event, index) => {
      doc.setFontSize(12);
      doc.text(`Event ${index + 1}:`, 10, yOffset);
      yOffset += 7;
      doc.text(`Date: ${event.date}`, 10, yOffset);
      yOffset += 7;
      doc.text(`Title: ${event.title}`, 10, yOffset);
      yOffset += 7;
      doc.text(`Description: ${event.description}`, 10, yOffset);
      yOffset += 10;

      // Ensure page overflow is handled
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20;
      }
    });

    doc.save('events.pdf');
  };

  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <button
        onClick={downloadEventsAsPDF}
        style={{
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Download Events as PDF
      </button>
    </div>
  );
};

// Render the app with the CalendarDownload component and Calendar component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Calendar /> */}
    <CalendarDownload />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();

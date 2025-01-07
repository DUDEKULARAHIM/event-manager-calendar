
// import React, { useState, useEffect } from "react";
// import "./Calendar.css"; // Ensure to add your CSS styles here

// const Calendar = () => {
//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const today = new Date();
//   const [currentMonth, setCurrentMonth] = useState(today.getMonth());
//   const [currentYear, setCurrentYear] = useState(today.getFullYear());
//   const [selectedDate, setSelectedDate] = useState(today.toDateString());
//   const [events, setEvents] = useState(
//     JSON.parse(localStorage.getItem("events")) || {}
//   );
//   const [showEventForm, setShowEventForm] = useState(false);
//   const [newEvent, setNewEvent] = useState({ title: "", description: "" });

//   useEffect(() => {
//     localStorage.setItem("events", JSON.stringify(events));
//   }, [events]);

//   const daysInMonth = (month, year) => 32 - new Date(year, month, 32).getDate();

//   const generateCalendarDays = () => {
//     const firstDay = new Date(currentYear, currentMonth).getDay();
//     const days = daysInMonth(currentMonth, currentYear);
//     let calendar = [];
//     let date = 1;

//     for (let i = 0; i < 6; i++) {
//       let week = [];
//       for (let j = 0; j < 7; j++) {
//         if (i === 0 && j < firstDay) {
//           week.push(null);
//         } else if (date > days) {
//           week.push(null);
//         } else {
//           const cellDate = new Date(currentYear, currentMonth, date).toDateString();
//           week.push({ date: cellDate, day: date });
//           date++;
//         }
//       }
//       calendar.push(week);
//     }
//     return calendar;
//   };

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//   };

//   const handleEventSave = () => {
//     if (newEvent.title && newEvent.description) {
//       setEvents((prev) => ({
//         ...prev,
//         [selectedDate]: [...(prev[selectedDate] || []), newEvent]
//       }));
//       setNewEvent({ title: "", description: "" });
//       setShowEventForm(false);
//     }
//   };

//   const handleEventDelete = (date, index) => {
//     setEvents((prev) => {
//       const updatedEvents = { ...prev };
//       updatedEvents[date].splice(index, 1);
//       if (updatedEvents[date].length === 0) {
//         delete updatedEvents[date];
//       }
//       return updatedEvents;
//     });
//   };

//   const navigateMonth = (direction) => {
//     let newMonth = currentMonth + direction;
//     let newYear = currentYear;
//     if (newMonth < 0) {
//       newMonth = 11;
//       newYear -= 1;
//     } else if (newMonth > 11) {
//       newMonth = 0;
//       newYear += 1;
//     }
//     setCurrentMonth(newMonth);
//     setCurrentYear(newYear);
//   };

//   const todayEvents = events[selectedDate] || [];

//   return (
//     <div className="calendar-container">
//       <div className="calendar-header">
//         <button onClick={() => navigateMonth(-1)}>Previous</button>
//         <h2>{`${months[currentMonth]} ${currentYear}`}</h2>
//         <button onClick={() => navigateMonth(1)}>Next</button>
//       </div>

//       <table className="calendar">
//         <thead>
//           <tr>
//             {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//               <th key={day}>{day}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {generateCalendarDays().map((week, i) => (
//             <tr key={i}>
//               {week.map((day, j) =>
//                 day ? (
//                   <td
//                     key={j}
//                     className={
//                       day.date === today.toDateString()
//                         ? "today"
//                         : day.date === selectedDate
//                         ? "selected"
//                         : ""
//                     }
//                     onClick={() => handleDateClick(day.date)}
//                   >
//                     {day.day}
//                     {events[day.date] && <div className="event-indicator" />}
//                   </td>
//                 ) : (
//                   <td key={j} className="empty"></td>
//                 )
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="events-box">
//         <h4>Events for {selectedDate}</h4>
//         <ul>
//           {todayEvents.length === 0 ? (
//             <li>No events</li>
//           ) : (
//             todayEvents.map((event, index) => (
//               <li key={index}>
//                 {event.title} - {event.description}
//                 <button onClick={() => handleEventDelete(selectedDate, index)}>
//                   Delete
//                 </button>
//               </li>
//             ))
//           )}
//         </ul>
//         <button onClick={() => setShowEventForm(true)}>Add Event</button>
//       </div>

//       {showEventForm && (
//         <div className="event-form">
//           <input
//             type="text"
//             placeholder="Event Title"
//             value={newEvent.title}
//             onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//           />
//           <textarea
//             placeholder="Event Description"
//             value={newEvent.description}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, description: e.target.value })
//             }
//           />
//           <button onClick={handleEventSave}>Save Event</button>
//           <button onClick={() => setShowEventForm(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Calendar;










import React, { useState, useEffect } from "react";
import "./Calendar.css"; // Ensure to add your CSS styles here
import "./App.css"
const Calendar = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.toDateString());
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || {}
  );
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", description: "" });
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [customYear, setCustomYear] = useState(currentYear);
  const [customMonth, setCustomMonth] = useState(currentMonth + 1); // Month is 1-indexed for input
  const [showAllEvents, setShowAllEvents] = useState(false);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const daysInMonth = (month, year) => 32 - new Date(year, month, 32).getDate();

  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth).getDay();
    const days = daysInMonth(currentMonth, currentYear);
    let calendar = [];
    let date = 1;

    for (let i = 0; i < 6; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(null);
        } else if (date > days) {
          week.push(null);
        } else {
          const cellDate = new Date(currentYear, currentMonth, date).toDateString();
          week.push({ date: cellDate, day: date });
          date++;
        }
      }
      calendar.push(week);
    }
    return calendar;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleEventSave = () => {
    if (newEvent.title && newEvent.description) {
      setEvents((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), newEvent]
      }));
      setNewEvent({ title: "", description: "" });
      setShowEventForm(false);
    }
  };

  const handleEventDelete = (date, index) => {
    setEvents((prev) => {
      const updatedEvents = { ...prev };
      updatedEvents[date].splice(index, 1);
      if (updatedEvents[date].length === 0) {
        delete updatedEvents[date];
      }
      return updatedEvents;
    });
  };

  const navigateMonth = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const goToCustomDate = () => {
    setCurrentYear(customYear);
    setCurrentMonth(customMonth - 1); // Month is 1-indexed for input
    setShowCustomDate(false);
  };

  const todayEvents = events[selectedDate] || [];

  const toggleAllEvents = () => {
    setShowAllEvents(!showAllEvents);
  };

  const allEventsList = () => {
    const allEvents = [];
    Object.keys(events).forEach((date) => {
      events[date].forEach((event, index) => {
        allEvents.push({ date, event, index });
      });
    });
    return allEvents;
  };

  return (
    <div>
      <header><center><b>Event Calender</b></center></header>
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => navigateMonth(-1)}>   ←   Previous</button>
        <h2>{`${months[currentMonth]} ${currentYear}`}</h2>
        <button onClick={() => navigateMonth(1)}>  →  Next</button>
      </div>
{/* Custom Date Input */}
<div className="custom-date-buttons" style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
  <button 
    onClick={() => setShowCustomDate(!showCustomDate)} 
    style={{
      backgroundColor: '#007bff', 
      color: 'white', 
      border: 'none', 
      padding: '10px 15px', 
      borderRadius: '5px', 
      cursor: 'pointer'
    }}>
    Custom Date
  </button>
  <button 
    onClick={() => {
      setCurrentMonth(today.getMonth());
      setCurrentYear(today.getFullYear());
    }} 
    style={{
      backgroundColor: '#28a745', 
      color: 'white', 
      border: 'none', 
      padding: '10px 15px', 
      borderRadius: '5px', 
      cursor: 'pointer'
    }}>
    Current Date
  </button>
</div>

{showCustomDate && (
  <div className="custom-date-input" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
    <input
      type="number"
      value={customYear}
      onChange={(e) => setCustomYear(Number(e.target.value))}
      placeholder="Year"
      style={{
        padding: '10px',
        fontSize: '1em',
        borderRadius: '5px',
        border: '1px solid #ddd',
        width: '100px',
        marginRight: '10px'
      }}
    />
    <input
      type="number"
      value={customMonth}
      min="1"
      max="12"
      onChange={(e) => setCustomMonth(Number(e.target.value))}
      placeholder="Month"
      style={{
        padding: '10px',
        fontSize: '1em',
        borderRadius: '5px',
        border: '1px solid #ddd',
        width: '100px',
        marginRight: '10px'
      }}
    />
    <button 
      onClick={goToCustomDate}
      style={{
        backgroundColor: '#ffc107',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
      Go
    </button>
  </div>
)}

      <table className="calendar">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {generateCalendarDays().map((week, i) => (
            <tr key={i}>
              {week.map((day, j) =>
                day ? (
                  <td
                    key={j}
                    className={
                      day.date === today.toDateString()
                        ? "today"
                        : day.date === selectedDate
                        ? "selected"
                        : ""
                    }
                    onClick={() => handleDateClick(day.date)}
                  >
                    {day.day}
                    {events[day.date] && <div className="event-indicator" />}
                  </td>
                ) : (
                  <td key={j} className="empty"></td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>

     {/* Event Box */}
<div className="events-box" style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
  <h4 style={{ margin: '0 0 10px', fontSize: '1.2em' }}>Events for {selectedDate}</h4>
  <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'center' }}>
    {todayEvents.length === 0 ? (
      <li style={{ padding: '8px 10px', borderBottom: '1px solid #ddd' }}>No events</li>
    ) : (
      todayEvents.map((event, index) => (
        <li key={index} style={{ padding: '8px 10px', borderBottom: '1px solid #ddd' }}>
          {event.title} - {event.description}
         <button 
           onClick={() => handleEventDelete(selectedDate, index)}
            style={{
             backgroundColor: '#dc3545', 
             color: 'white', 
              border: 'none', 
              padding: '5px 10px', 
              borderRadius: '5px', 
              cursor: 'pointer', 
              marginLeft: '10px'
            }}>
            //Delete
              ...
          </button>
        </li>
      ))
    )}
  </ul>
  <button 
    onClick={() => setShowEventForm(true)} 
    style={{
      backgroundColor: '#28a745', 
      color: 'white', 
      border: 'none', 
      padding: '10px 15px', 
      borderRadius: '5px', 
      cursor: 'pointer', 
      marginTop: '10px'
    }}>
    Add Event
  </button>
</div>

{/* Add Event Form */}
{showEventForm && (
  <div className="event-form" style={{ marginTop: '10px', padding: '15px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
    <input
      type="text"
      placeholder="Event Title"
      value={newEvent.title}
      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
      style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
    />
    <textarea
      placeholder="Event Description"
      value={newEvent.description}
      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
      style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
    />
    <button 
      onClick={handleEventSave} 
      style={{
        backgroundColor: '#28a745', 
        color: 'white', 
        border: 'none', 
        padding: '10px 15px', 
        borderRadius: '5px', 
        cursor: 'pointer', 
        marginRight: '10px'
      }}>
      Save Event
    </button>
    <button 
      onClick={() => setShowEventForm(false)} 
      style={{
        backgroundColor: '#dc3545', 
        color: 'white', 
        border: 'none', 
        padding: '10px 15px', 
        borderRadius: '5px', 
        cursor: 'pointer'
      }}>
      Cancel
    </button>
  </div>
)}

{/* Show All Events Button */}
<button 
  onClick={toggleAllEvents}
  style={{
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '15px'
  }}>
  All Event List
</button>

{/* All Events List */}
{/* Show All Events Button */}
<button 
  onClick={toggleAllEvents} 
  style={{
    backgroundColor: '#007bff', 
    color: 'white', 
    border: 'none', 
    padding: '10px 15px', 
    borderRadius: '5px', 
    cursor: 'pointer',
    marginTop: '15px'
  }}>
  All Event List
</button>

{showAllEvents && (
  <div className="all-events-list" style={{ marginTop: '20px' }}>
    <h4>All Events</h4>
    <ul style={{ listStyleType: 'none', padding: '0' }}>
      {allEventsList().map(({ date, event, index }) => (
        <li key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>Date:</strong> {date}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Title:</strong> {event.title}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Description:</strong> {event.description}
          </div>
          <button 
            onClick={() => handleEventDelete(date, index)} 
            style={{
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              padding: '5px 10px', 
              borderRadius: '5px', 
              cursor: 'pointer'
            }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
</div>
  );
};


export default Calendar;

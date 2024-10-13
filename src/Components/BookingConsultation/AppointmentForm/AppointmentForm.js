import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setSelectedDate] = useState('');
    const [time, setSelectedTime] = useState('');
    const timeSlots = [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
      ];
  
    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, phoneNumber, date, time });
        setName('');
        setPhoneNumber('');
        setSelectedDate('');
        setSelectedTime('');
      };
    
      return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Select Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>
        <div className="form-group">
        <label htmlFor="time">Select Time:</label>
        <select
          id="time"
          value={time}
          onChange={(e) => setSelectedTime(e.target.value)}
          required
        >
          <option value="" disabled>Select a time</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>
          <button type="submit">Book Now</button>
        </form>
      );
    };
    
    export default AppointmentForm;

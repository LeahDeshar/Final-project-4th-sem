import React, { useContext, useState } from 'react';
import { ServiceContext } from '../utils/ServContext';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const { updateServiceDate} = useContext(ServiceContext)
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handlePrevMonth = () => {
    const newMonth = currentMonth - 1;
    if (newMonth < 0) {
      setCurrentYear((prevYear) => prevYear - 1);
      setCurrentMonth(11); // December
    } else {
      setCurrentMonth(newMonth);
    }
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth + 1;
    if (newMonth > 11) {
      setCurrentYear((prevYear) => prevYear + 1);
      setCurrentMonth(0); // January
    } else {
      setCurrentMonth(newMonth);
    }
  };

  const handleMonthChange = (event) => {
    const month = parseInt(event.target.value, 10);
    setCurrentMonth(month);
    setShowMonthDropdown(false);
  };

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setCurrentYear(year);
    setShowYearDropdown(false);
  };

  

  const renderMonthDropdown = () => {
    const monthOptions = [];
    for (let month = 0; month < 12; month++) {
      monthOptions.push(
        <option key={month} value={month}>
          {new Date(currentYear, month).toLocaleString('default', { month: 'long' })}
        </option>
      );
    }

    return (
      <select value={currentMonth} onChange={handleMonthChange}>
        {monthOptions}
      </select>
    );
  };

  const renderYearDropdown = () => {
    const yearOptions = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      yearOptions.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }

    return (
      <select value={currentYear} onChange={handleYearChange}>
        {yearOptions}
      </select>
    );
  };

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDayOfMonth.getDay();
    const numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarCells = [];

    for (let i = 0; i < startingDay; i++) {
      calendarCells.push(<td key={`empty-${i}`} />);
    }

    for (let day = 1; day <= numDaysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected = selectedDate && date.getTime() === selectedDate.getTime();

      calendarCells.push(
        <td key={day} className={isSelected ? 'selected' : ''} onClick={() => handleDateClick(date)}>
          {day}
        </td>
      );
    }

    const totalCells = startingDay + numDaysInMonth;
    const numRows = Math.ceil(totalCells / 7);
    const numEmptyCells = numRows * 7 - totalCells;

    for (let i = 0; i < numEmptyCells; i++) {
      calendarCells.push(<td key={`empty-${numDaysInMonth + i}`} />);
    }

    const calendarRows = [];
    for (let row = 0; row < numRows; row++) {
      const startIndex = row * 7;
      const endIndex = startIndex + 7;
      calendarRows.push(<tr key={row}>{calendarCells.slice(startIndex, endIndex)}</tr>);
    }

    return calendarRows;
  };
  if(selectedDate)
  {
    const dateOfService =selectedDate.toDateString()
    // TEST
    updateServiceDate(dateOfService)
    console.log(dateOfService)

  }

  return (
    <div>
      <div className='calendar__container'>
        <button onClick={handlePrevMonth}>{'<'}</button>
        {renderMonthDropdown()}
        {renderYearDropdown()}
        <button onClick={handleNextMonth}>{'>'}</button>
      </div>
      <table>
        <thead className='calenTheme'>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody className='calenTheme'>{renderCalendar()}
        
      

        </tbody>
      </table>
      <div className='selectedDate'>
        <p className="selectTheme">
      {selectedDate && <p>Selected date: {selectedDate.toDateString()}</p>}


        </p>
        </div>
        
    </div>
  );
};

export default Calendar;

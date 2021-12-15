import React, { useEffect, useState } from "react";

const Timer = (props) => {
  const {timePassed} = props
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let hours = Math.floor(timePassed / 3600);
    setHours((hours.toString().length === 1 ? "0" : "") + hours);

    let minutes = Math.floor((timePassed % 3600) / 60);
    setMinutes((minutes.toString().length === 1 ? "0" : "") + minutes);

    let seconds = timePassed % 60;
    setSeconds((seconds.toString().length === 1 ? "0" : "") + seconds);
  }, [timePassed]);

  return (
    <>
      <div className="timer_container">
        <div className="timer_item">
          <h3>{hours}</h3>
        </div>
        <p>:</p>
        <div className="timer_item">
          <h3>{minutes}</h3>
        </div>
        <p>:</p>
        <div className="timer_item">
          <h3>{seconds}</h3>
        </div>
      </div>
    </>
  );
};

export default Timer;

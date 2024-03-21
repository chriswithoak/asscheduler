import React, { useState } from 'react';
import './css/global.css';
import Header from './components/header';
import SchedulerForm from './components/scheduler-form';

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const liftFormSubmittedState = ( data:any ) => { 
    setFormSubmitted(data);
  };

  return (
    <div className="as-scheduler">
      {!formSubmitted && <Header />}
      <SchedulerForm formSubmitted={formSubmitted} liftFormSubmittedState={liftFormSubmittedState}/>
    </div>
  );
}

export default App;

import React from 'react';
import './css/global.css';
import Header from './components/header';
import SchedulerForm from './components/scheduler-form';

function App() {
  return (
    <div className="as-scheduler">
      <Header />
      <SchedulerForm />
    </div>
  );
}

export default App;

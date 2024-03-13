import React, {useEffect  } from 'react';
import './css/global.css';
import Header from './components/header';
import SchedulerForm from './components/scheduler-form';

function App() {

  const handleMessageEvent = ( event:any ) => {
    if (event.origin !== "https://oakdevsandbox.wpenginepowered.com") return;

    sessionStorage.setItem("utm_campaign", event.data.utm_campaign);
    sessionStorage.setItem("utm_medium", event.data.utm_medium);
    sessionStorage.setItem("utm_source", event.data.utm_source);
    sessionStorage.setItem("AdSrc", event.data.AdSrc);
  }

  useEffect(() => {
    window.addEventListener("message", handleMessageEvent);
  }, []);

  return (
    <div className="as-scheduler">
      <Header />
      <SchedulerForm />
    </div>
  );
}

export default App;

import React, {useEffect  } from 'react';
import './css/global.css';
import Header from './components/header';
import SchedulerForm from './components/scheduler-form';

function App() {
  useEffect(() => {
    window.addEventListener("message", ( event ) => {
      console.log("HANDLED ON APP");
      console.log(event);
      if (event.origin !== "http://localhost:3000" && event.origin !== "https://oakdevsandbox.wpenginepowered.com") return;

      sessionStorage.setItem("utm_campaign", event.data.utm_campaign);
      sessionStorage.setItem("utm_medium", event.data.utm_medium);
      sessionStorage.setItem("utm_source", event.data.utm_source);
      sessionStorage.setItem("AdSrc", event.data.AdSrc);
      console.log("SAVED ON APPP");

    });
  }, []);

  return (
    <div className="as-scheduler">
      <Header />
      <SchedulerForm />
    </div>
  );
}

export default App;

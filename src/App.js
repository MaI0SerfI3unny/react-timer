import { useState } from "react";
import Timer from "./components/Timer/Timer.jsx";
import { interval } from "rxjs";
import { map } from "rxjs/operators";
import { storage } from "./storage/storage.js"


const App = () => {
  const delay = 1000;
  const [timer, setTimer] = useState(0);
  const [diff, setDiff] = useState(0);
  const [subscription, setSubscription] = useState("");
  const [prevent, setPrevent] = useState(true);

  const onStartHandler = () => {
    if (!subscription) {
      const timerSubscription = interval(delay)
        .pipe(map((v) => v + 1))
        .subscribe((v) => {
          setTimer(v + diff);
        });
      setSubscription(timerSubscription);
    } else {
      subscription.unsubscribe();
      setTimer(0);
      setDiff(0);
      setSubscription("");
    }
  };

  const onWaitHandler = (event) => {
    if (prevent) {
      setPrevent(false);
      const timerInstance = setTimeout(() => {
        setPrevent(true);
        clearTimeout(timerInstance);
      }, 300);
    } else {
      if (subscription) {
        subscription.unsubscribe();
      }

      setDiff(timer);
      setSubscription("");
    }
  };

  const onResetHandler = () => {
    if (subscription) {
      subscription.unsubscribe();
    }
    const timerSubscription = interval(delay).subscribe((v) => {
      setTimer(v);
    });
    setSubscription(timerSubscription);
  };

  return (
    <div className="App">
      <Timer timePassed={timer ? timer : diff} />
      <div>
      <div style={{display: 'grid'}}>
      {storage.button.map((el,key) =>
        <button key={key} onClick={eval(el.func)} className="buttonPanel">
          {el.name}
        </button>)}
        </div>
      </div>
    </div>
  );
}

export default App;

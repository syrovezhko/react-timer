import './App.css';
import Display from './components/Display';
import Button from './components/Button';
import { useState } from 'react';

function App() {
  const [time, setTime] = useState({s: 3, m: 1, h: 23});
  const [showBtn, setShowBtn] = useState(true);
  const [interv, setInterv] = useState();
  const [pause, setPause] = useState(false);

  const title = pause ? "продолжить" : "пауза";

  const startFunc = () => {
    run();
    setInterv(setInterval(run, 100)); 
    setShowBtn(false);
  }

  var updateHour   = time.h;
  var updateMinute = time.m;
  var updateSecond = time.s;

  const run = () => {
    if (updateSecond === 0) {
      updateMinute--;
      updateSecond = 60;
    }
    updateSecond--;
    if (updateMinute < 0){
      updateHour--;
      updateMinute = 59;
    }
    return setTime({s: updateSecond, m: updateMinute, h: updateHour})
  }
  
  const pauseFunc = () => {
    if (!pause) {
      clearInterval(interv);
      setPause(!pause)
    } else {
      startFunc();
      setPause(!pause)
    }
  }

  return (
    <div className="App">
      <Display time={time} showBtn={showBtn} />
      {showBtn
        ? <Button name={"запуск"} click={startFunc} />
        : <div className='btn-container'>
            <Button name={"стоп"}/>
            <Button name={title} click={pauseFunc} />
          </div>
      }
    </div>
  );
}

export default App;

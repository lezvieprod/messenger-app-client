import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import socket from '../socket';


/*
 *=== ХУК ДЛЯ ДЛЯ СОЗДАНИЯ ТАЙМЕРА  ===* 
*/

export const useTimer = (firstName: string, dialogId: string) => {


  const [initialTime, setInitialTime] = useState<number>(0);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [stopTimer, setStopTimer] = useState<boolean>(false)

  useEffect(() => {
    let timeOut;

    if (initialTime > 0) {

      timeOut = setTimeout(() => {
        setInitialTime(initialTime - 1);
      }, 1000);

      if (stopTimer) {
        clearTimeout(timeOut)
        setInitialTime(initialTime);
      }
    }
     console.log('INITIAL TIME IN HOOK', initialTime);

    if (initialTime === 0 && startTimer) {
      console.log('END TIMER');
     
      

      // socket.emit('MESSAGE:WRITING_MESSAGE', firstName, false, dialogId)
      setStartTimer(false);
      // setInitialTime(0);
    }
  }, [initialTime, startTimer]);

  return { setInitialTime, setStartTimer, initialTime, setStopTimer } as const
}
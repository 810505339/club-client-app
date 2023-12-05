import { useImmer } from 'use-immer';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
export default function () {
  const [timer, setTimer] = useImmer({
    time: new Date(),
    showTime: false,
  });

  const onChange = (event: DateTimePickerEvent, selectDate?: Date) => {
    const currentDate = selectDate || timer.time;

    setTimer(draft => {
      draft.time = currentDate;
      draft.showTime = false;
    });
  };

  const setShowTime = (showTime: boolean) => {
    setTimer(draft => {
      draft.showTime = showTime;
    });
  };


  return {
    time: timer.time,
    showTime: timer.showTime,
    onChange,
    setShowTime,
  };
}

import React,{useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { setHours, setMinutes, getMinutes, getHours } from 'date-fns';


const Time = ({onChange}) => {
    // 시작 시간
    const [startTime, setStartTime] = useState(null);
    // 종료 시간
    const [endTime, setEndTime] = useState(null);
    // 시작 시간을 선택했는지
    const [isSelected, setIsSelected] = useState(false);

    // 시작 시간이 선택되면 해당 시간 적용 및 isSelected를 true, endTime을 null로
    const onSelect = (time) => {
        setStartTime(time);
        setIsSelected(true);
        setEndTime(null);
        
    };

    useEffect(() => {
        onChange(startTime, endTime);
      }, [startTime, endTime]);


    return (
        <>
            <div><DatePicker
                selected={startTime}
                onChange={onSelect}
                locale={ ko }
                showTimeSelect
                dateFormat="HH:mm"
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                placeholderText="시작 시간"
                timeFormat="HH:mm"
            /></div>

            {isSelected ? // 시작 시간을 선택해야 종료 시간 선택 가능
                <div><DatePicker
                selected={endTime}
                onChange={(time) => setEndTime(time)}
                locale={ ko }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                placeholderText="종료 시간"
                timeFormat="HH:mm"
                dateFormat="HH:mm"
            /></div>  
                : null 
            }
        </>
    );
};
export default Time
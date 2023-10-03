import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { setHours, setMinutes } from 'date-fns';
import './Time.css'; // 스타일링을 위한 CSS 파일을 임포트합니다.

const Time = ({ onChange }) => {
    // 시작 시간 (기본 값: "00:00")
    const [startTime, setStartTime] = useState(setMinutes(setHours(new Date(), 0), 0));
    // 종료 시간 (기본 값: "23:59")
    const [endTime, setEndTime] = useState(setMinutes(setHours(new Date(), 23), 59));
    // 시작 시간을 선택했는지
    const [isSelected, setIsSelected] = useState(false);

    // 시작 시간이 선택되면 해당 시간 적용 및 isSelected를 true로 설정
    const onSelect = (time) => {
        setStartTime(time);
        setIsSelected(true);
    };

    useEffect(() => {
        onChange(startTime, endTime);
    }, [startTime, endTime]);

    return (
        <>  <div className="time-container">
            <div className="time-picker">
                <DatePicker
                    selected={startTime}
                    onChange={onSelect}
                    locale={ko}
                    showTimeSelect
                    dateFormat="HH:mm"
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    placeholderText="시작 시간"
                    timeFormat="HH:mm"
                />
            </div>

            {isSelected ? (
                <>
                <span className="time-separator">~</span>
                <div className="time-picker">
                    <DatePicker
                        selected={endTime}
                        onChange={(time) => setEndTime(time)}
                        locale={ko}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Time"
                        placeholderText="종료 시간"
                        timeFormat="HH:mm"
                        dateFormat="HH:mm"
                    />
                </div>
                </>
            ) : null}
            </div>
        </>
    );
};
export default Time;
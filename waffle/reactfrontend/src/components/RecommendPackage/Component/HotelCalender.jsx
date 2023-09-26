import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

class HotelCalendarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
        };
    }

    setChangeDate = (dates) => {
        const [start, end] = dates;
        
        // 첫 번째 선택일로부터 2일 후의 날짜 계산
        const maxDate = start ? new Date(start.getTime()) : null;
        if (maxDate) {
            maxDate.setDate(maxDate.getDate() + 2);
        }

        this.setState({ startDate: start, endDate: end, maxDate: maxDate });
    const handleDateChange = (startDate, endDate) => {
            this.props.onDateChange(startDate, endDate);
        };

    render() {
        return (
            <div>
                <DatePicker
                    selectsRange={true}
                    className="datepicker"
                    locale={ko}
                    dateFormat="yyyy년 MM월 dd일"
                    selected={this.state.startDate}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    minDate={new Date()}
                    maxDate={this.state.maxDate}
                    onChange={(dates) => { const { startDate, endDate } = this.setChangeDate(dates);
                    this.handleDateChange(startDate, endDate);}}
                />
            </div>
        );
    }
}
export default HotelCalendarComponent;
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate:null,
            endDate:null,
        }
    }
    
    setChangeDate=(dates)=>{
        const [start,end]=dates;
        this.setState({startDate:start,endDate:end})
    }
    
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

                    onChange={(dates)=>this.setChangeDate(dates)}/>
            </div>
        );
    }
}
export default CalendarComponent;
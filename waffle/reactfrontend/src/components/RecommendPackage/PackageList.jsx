import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { IoAirplaneSharp } from "react-icons/io5";

const PackageList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = [location.state.value.package];
    const data2 = [location.state.value.userPackage];
  
    const sitelogo = [
        ["아고다" , "/cardlogo/agoda.png"],
        ["인터파크", "/cardlogo/interpark.png"],
        ["트립닷컴", "/cardlogo/trip.png"],
    ]
    
    console.log(data)

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
  
    return (
        <Container>
            <div>내 카드 패키지</div>
            {data && data.map(({hotel,plane}) => (
            <Content>
                <Airbox>
                    <div>항공권</div>                
                    {plane && plane.map(({company, discountPrice,during, endPlace,endTime,layover,originPrice,planeDate,site,startPlace,startTime }) => (
                    <Smallairbox>
                        <Aircompanybox>
                            <div className="site-box">
                            <div className="plane-date">{planeDate}</div>
                            {(site === "인터파크"? (<Companylogo src={"/cardlogo/interpark.png"} alt="logo" />):(<Companylogo src={ "/cardlogo/trip.png"} alt="logo" />))}

                            </div>
                            <div className="company-box">{company}</div>
                        </Aircompanybox>
                        
                        <Airplacebox>
                            <div className="layover">
                                <div>{layover}</div>
                                <div>{during}</div>
                            </div>
                            <div className="air-place">
                                <div>
                                    <div>{startPlace.substr(0,3)}</div>
                                    <div>{startTime}</div>
                                </div>
                                <IoAirplaneSharp className="air-icon"></IoAirplaneSharp> 
                                <div>
                                    <div>{endPlace.substr(0,3)}</div>
                                    <div>{endTime}</div>
                                </div>
                            </div>
                            <div>
                                {(discountPrice === originPrice ? (<div></div>) : (<div>{discountPrice.toLocaleString("ko-KR")}</div>))}
                                <div>{originPrice.toLocaleString("ko-KR")}원</div>
                            </div>
                        </Airplacebox>
                        
                    </Smallairbox>
                    ))}
                </Airbox>
                <div>
                    <div>숙박</div>
                    {hotel && hotel.map(({hotelName,discountPrice,end,img,originPrice,site,start,url }) => (
                    <Hotelbox>
                        <div>{hotelName}</div>
                    </Hotelbox>
                    ))}
                </div>
            </Content>))}
            {/* {data && data2.plane.map(({card,hotel,plane}) => (
            <Content>
                <div>내 카드 패키지</div>
                <div>
                    <div>항공권</div>
                    <Airbox>
                    </Airbox>
                </div>
                <div>
                    <div>숙박</div>
                    <Hotelbox>
                    </Hotelbox>
                </div>
            </Content>))} */}
      </Container>
    );
  };

export default PackageList

const Container = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  
  width: 400px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Smallairbox = styled.div`
    width: 330px;
    height: 200px;
    border: 1px solid #B3B1B1;
    border-radius: 7px;
    margin-bottom: 30px;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
`
const Airplacebox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .layover{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 150px;
        margin: 10px;
    }
    .air-place{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 150px;

    }
    .air-icon{
        color: #9AC5F4;
        font-size: 30px;
    }
`


const Aircompanybox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .company-box{
        height: 80px;
        display: flex;
        justify-self: center;
        align-self: center;
    

    }
    .site-box{
        height: 30px;
        padding: 2px;
        display: flex;
        flex-direction: column;
    
}
    .plane-date{
        height: 30px;
        padding: 2px;
        display: flex;
        justify-self: center;
        align-items: center;
    
}
 
`
const Companylogo = styled.img`
    width: 80px;

`

const Airbox = styled.div`
    width: 340px;
    height: 300px;
    border: 1px solid #B3B1B1;
    border-radius: 7px;
    margin-bottom: 30px;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

const Hotelbox = styled.div`
    width: 340px;
    height: 300px;
    border: 1px solid #B3B1B1;
    border-radius: 7px;
    margin-bottom: 30px;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
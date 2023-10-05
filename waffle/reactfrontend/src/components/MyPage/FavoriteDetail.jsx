import React,{useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { IoAirplaneSharp } from "react-icons/io5";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { Nav } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { requestPostNode,setToken,requestPost } from "../../lib/api";
import axios from "axios";

const FavoriteDetail = () => {
    const location = useLocation();
    const data = [location.state.value.plane];
    const data2 = [location.state.value.hotel];
    const data3 = [location.state.value.card];
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState()
    const [clickedTab, setClickedTab] = useState(0)
    const [favoriteId, setFavoriteId] = useState()
    const [favoriteId2, setFavoriteId2] = useState()
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);



    const sitelogo = [
        ["아고다" , "/cardlogo/agoda.png"],
        ["인터파크", "/cardlogo/interpark.png"],
        ["트립닷컴", "/cardlogo/trip.png"],
    ]


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

      function solution(string) {
        const stack = [];
      
        for (const x of string) {
          if (x === ')') {
            while (stack.pop() !== '(') {}
          } else {
            stack.push(x);
          }
        }
      
        return stack.join('');
      }

    function formatDate(input) {
        const str = input.toString();
        return `${str.substring(0, 4)}-${str.substring(4, 6)}-${str.substring(6, 8)}`;
    }

    function truncateString(str, num) {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + "...";
    }

    function goToUrl(url) {
        window.open(url, '_blank');
    }

    useEffect(() => {
      setToken()
      }, []);


  return (
    <Container>
        <>
        
            <Content>
             <Favoritebox>
                 <div>{data3}</div>
                 <button onClick={console.log(data)}>data</button>
             </Favoritebox>
             <Airbox>
                 <div className="airfont">항공권</div>
                <Slider {...settings}>
                 {data && data.map(({company, discountPrice,during, endPlace,endTime,layover,originPrice,planeDate,site,startPlace,startTime,companyImg,url }) => (
                 <Smallairbox onClick={() => goToUrl(url)} >
                <div className="small-box">
                 <Aircompanybox>
                    <div className="plane-date">{formatDate(planeDate)}</div>
                    <div className="site-box">
                        {(site === "인터파크"? (<Companylogo src={"/cardlogo/interpark.png"} alt="logo" />):(<Companylogo src={ "/cardlogo/trip.png"} alt="logo" />))}
                    </div>
                    <img src={`${companyImg}`} alt="" />
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
                     <div className="price-box">
                         {(discountPrice === originPrice ? (<div></div>) : (<div className="origin-price">{originPrice.toLocaleString("ko-KR")}원</div>))}
                         <Discountprice>{discountPrice.toLocaleString("ko-KR")}원</Discountprice>
                     </div>
                 </Airplacebox>
                 </div>   
             </Smallairbox>
             ))}
            </Slider>
         </Airbox>
         <Hotelbox>
             <div className="hotelfont">숙박</div>
             <Slider {...settings}>
             {data2 && data2.map(({hotelName,discountPrice,end,img,originPrice,site,start,url }) => (
             <Hotelcontent onClick={() => goToUrl(url)}>
                  {( img === 0)? (<RanHotelimg src={"/cardlogo/hotel.png"} alt="img" />):(<Hotelimg src={`${img}`} alt="img" />)}
                 <div className="hotel-content">
                     <Hoteldate>
                         {(site === "인터파크"? (<Companylogo src={"/cardlogo/interpark.png"} alt="logo" />):(<Companylogo src={ "/cardlogo/agoda.png"} alt="logo" />))}
                         <div>{start}</div>
                     </Hoteldate>
                     <div className="hotelname">{truncateString(solution(hotelName), 20)}</div>
                     <div className="price-box">
                         {/* {(discountPrice === originPrice ? (<div></div>) : (<div className="origin-price">{originPrice.toLocaleString("ko-KR")}원</div>))} */}
                     </div>
                     <Discountprice2>{discountPrice.toLocaleString("ko-KR")}원</Discountprice2>
                 </div>
             </Hotelcontent>
             ))}
             </Slider>
         </Hotelbox>
     </Content>
</>
    </Container>
    )}
export default FavoriteDetail

const Favoritebox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    font-size: 2vh;
    .start {
        color: #9AC5F4;
    }

`

const StyledNav = styled(Nav)`
  padding: 10px 10px;
  .nav-item {
    margin: 0 10px;

    .nav-link {
      color: #888;
      font-weight: 600;
      text-decoration: none; 

      &.active {
        color: #9AC5F4;
        border-bottom: #9AC5F4;
      }

      &:hover {
        color: #9AC5F4;
        text-decoration: underline;  // 호버 상태에서 밑줄 추가
      }

    }
  }
`;

const Hoteldate = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1vh;
`


const Discountprice = styled.div`
    font-size: 2.5vh;
    margin-top: 0.5vh;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-self: end;
    width: 15vh;
    color: #9AC5F4;
    margin-bottom: 1vh;
`
const Discountprice2 = styled.div`
    font-size: 2.5vh;
    margin-top: 1vh;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-self: end;
    color: #9AC5F4;
    margin-bottom: 1vh;
`

const Container = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  height: 100vh;
  width: 100%;

  .Navecontainer{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
    height: 3vh;
    font-size: 2vh;
    margin-bottom: 2vh;
  }
  .Nav-Item{
    margin-right: 2vh;
  }
`;
const RanHotelimg = styled.img`
    width: 50%;
    max-height: 16vh;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
`
const Smallairbox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 100%;
    border: 1px solid #B3B1B1;
    border-radius: 7px;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
    margin-top: 2vh;

    .small-box{
        width: 100%;
        display: flex;
    }
    
`
const Airplacebox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    justify-items: end;
    align-items: center;
    margin-top: 1.4vh;
    margin-right: 0.4vh;

    .layover{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;

    }
    .air-place{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 90%;
    }
    .air-icon{
        color: #9AC5F4;
        font-size: 30px;
    }
    .price-box{
    }
    .discount-price{
        height: calc(4);
    }
    .origin-price{
        display: flex;
        flex-direction: row;
        justify-content: end;
        text-decoration-line: line-through;
    }

`


const Aircompanybox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 90%;
    height: 100%;


    .company-box{
        height: 5vh;
        display: flex;
        justify-self: center;
        align-self: center;
    

    }
    .site-box{
        width: 100%;
        height: 2vh;
        margin-top: 0.5vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    
}
    .plane-date{
        bottom: 10px;
        padding: 2px;
        position: relative;
        left: 58%;
        background-color: white;


    
}
    & > img {
     width: 4vh;
     margin-top: 4vh;
     margin-bottom: 2vh;
 }
 
`
const Companylogo = styled.img`
    width: 22vw;
    margin-top: 1vh;

`

const Airbox = styled.div`
    width: 90%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 3vh;

    .airfont{
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: start;
        width: 85%;
        margin-top: 1vh;
        font-size: 25px;
    }
`

const Hotelbox = styled.div`
    width: 90%;
    height: 40%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10vh;
    .hotelfont{
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: start;
        width: 85%;
        height: 1vh;
        font-size: 25px;
        margin: 2vh;
        margin-bottom: 2vh;
    }
    
`

const Hotelcontent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 100%;
    border: 1px solid #B3B1B1;
    border-radius: 7px;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
    margin-top: 2vh;
    .hotel-content{
        width: 90%;
        margin-top: 1vh;
        margin-left: 3vw;
    }
    .hotelname{
    }

`
const Hotelimg = styled.img`
    width: 100%;
    max-height: 16vh;

`
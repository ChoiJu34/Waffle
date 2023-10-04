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



const PackageList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [favorite, setFavorite] = useState()
    const data = [location.state.value.package];
    const favoritedata = location.state.value.package
    const favoritedata2 = location.state.value.userPackage
    const data2 = [location.state.value.userPackage];
    const [clickedTab, setClickedTab] = useState(0)
    const [favoriteId, setFavoriteId] = useState()
    const [favoriteId2, setFavoriteId2] = useState()
    const [trueFavorite, setTrueFavorite] = useState(false)
    const [trueFavorite2, setTrueFavorite2] = useState(false)
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
    
    const PostFavorite = async () => {
        
        try {
            console.log(data)
            const authorization = localStorage.getItem('access_token');
            const headers = {
              'Content-Type': 'application/json;charset=UTF-8',
              "Authorization": "Bearer " + authorization,
            };
            
            const resData = await axios.post('https://j9d109.p.ssafy.io:8081/package/add-favorite', favoritedata, headers);
            console.log("res", resData);
            setFavoriteId(resData.data.id)
            setTrueFavorite(true)

        } catch (error) {
          console.error('포스트 에러', error);
        } 
      };
    
    const UnFavorite = async () => {
        try {
            const authorization = localStorage.getItem('access_token');
            const headers = {
              'Content-Type': 'application/json;charset=UTF-8',
              "Authorization": "Bearer " + authorization,
            };
            const resData = await axios.delete(`https://j9d109.p.ssafy.io:8081/package/delete-favorite/${favoriteId}`, headers);
          console.log("res", resData);
          setTrueFavorite(false)
        } catch (error) {
          console.error('포스트 에러', error);
        } 
      };

    const PostFavorite2 = async () => {
        
        try {
            console.log(data)
            const authorization = localStorage.getItem('access_token');
            const headers = {
              'Content-Type': 'application/json;charset=UTF-8',
              "Authorization": "Bearer " + authorization,
            };
            
            const resData = await axios.post('https://j9d109.p.ssafy.io:8081/package/add-favorite', favoritedata2, headers);
            console.log("res", resData);
            setFavoriteId2(resData.data.id)
            setTrueFavorite2(true)

        } catch (error) {
          console.error('포스트 에러', error);
        } 
      };
    
    const UnFavorite2 = async () => {
        try {
            const authorization = localStorage.getItem('access_token');
            const headers = {
              'Content-Type': 'application/json;charset=UTF-8',
              "Authorization": "Bearer " + authorization,
            };
            const resData = await axios.delete(`https://j9d109.p.ssafy.io:8081/package/delete-favorite/${favoriteId2}`, headers);
          console.log("res", resData);
          setTrueFavorite2(false)
        } catch (error) {
          console.error('포스트 에러', error);
        } 
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
      console.log(data)
      console.log(data2)
      }, []);
  
  
    return (
        <Container>
            <StyledNav className="Navecontainer" variant="tabs" defaultActiveKey={0}>
                <Nav.Item className="Nav-Item">
                    <Nav.Link eventKey="0" onClick={()=>setClickedTab(0)}>최저가 패키지</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="1" onClick={()=>setClickedTab(1)}>내카드 패키지</Nav.Link>
                </Nav.Item>
            </StyledNav>
            {(clickedTab === 0 ? (
            <>
            {data && data.map(({card,hotel,plane}) => (
             <Content>
             <Favoritebox>
                 <div>{card}</div>
                 {(trueFavorite2 === false? (<AiOutlineStar size={30} color="#9AC5F4" onClick={()=> PostFavorite2()}>즐겨찾기</AiOutlineStar>):(<AiFillStar className="start" size={30} onClick={()=> UnFavorite2()}>즐겨찾기</AiFillStar>))}
             </Favoritebox>
             <Airbox>
                 <div className="airfont">항공권</div>
        
                 {plane && plane.map(({company, discountPrice,during, endPlace,endTime,layover,originPrice,planeDate,site,startPlace,startTime,companyImg }) => (
                 <Smallairbox>
                 <Aircompanybox>
                     <div className="site-box">
                     <div className="plane-date">{formatDate(planeDate)}</div>
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
                 
             </Smallairbox>
             ))}

         </Airbox>
         <Hotelbox>
             <div className="hotelfont">숙박</div>
             {hotel && hotel.map(({hotelName,discountPrice,end,img,originPrice,site,start,url }) => (
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
         </Hotelbox>
     </Content>))}
           </> ) : ( <>
            {data2 && data2.map(({hotel,plane,card}) => (
            <Content>
                <Favoritebox>
                    <div>{card}</div>
                    {(trueFavorite2 === false? (<AiOutlineStar size={30} color="#9AC5F4" onClick={()=> PostFavorite2()}>즐겨찾기</AiOutlineStar>):(<AiFillStar className="start" size={30} onClick={()=> UnFavorite2()}>즐겨찾기</AiFillStar>))}
                </Favoritebox>
                <Airbox>
                    <div className="airfont">항공권</div>
           
                    {plane && plane.map(({company, discountPrice,during, endPlace,endTime,layover,originPrice,planeDate,site,startPlace,startTime,companyImg }) => (
                    <Smallairbox>
                    <Aircompanybox>
                        <div className="site-box">
                        <div className="plane-date">{formatDate(planeDate)}</div>
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
                    
                </Smallairbox>
                ))}

            </Airbox>
            <Hotelbox>
                <div className="hotelfont">숙박</div>
                {hotel && hotel.map(({hotelName,discountPrice,end,img,originPrice,site,start,url }) => (
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
            </Hotelbox>
        </Content>))}
       </>))}
      </Container>
    )}
export default PackageList

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
    width: 100%;
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
  height: calc(var(--vh, 1vh) * 80);
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
const Smallairbox = styled.div`
    width: 90%;
    height: 60%;
    border: 1px solid #B3B1B1;
    border-radius: 7px;
    margin-bottom: 2vh;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
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
        justify-content: space-between;
        align-items: center;
        width: 80%;
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
    justify-content: space-around;
    align-items: center;
    justify-items: center;
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
        margin-top: 0.3vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    
}
    .plane-date{
        height: 30px;
        padding: 2px;
        position: relative;

        left: 9vh;
        background-color: white;


    
}
    & > img {
     width: 4vh;
     margin-top: 2vh;
     margin-bottom: 1vh;
 }
 
`
const Companylogo = styled.img`
    width: 9vh;
    max-height: 3vh;

`

const Airbox = styled.div`
    width: 85%;
    height: 40%;
    border: 1px solid #B3B1B1;
    border-radius: 7px;
    margin-bottom: 30px;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .airfont{
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: start;
        width: 85%;
        height: 1vh;
        font-size: 2vh;
    }
`

const Hotelbox = styled.div`
    width: 85%;
    height: 60%;
    border: 1px solid #B3B1B1;
    border-radius: 7px;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-bottom: 10vh;
    .hotelfont{
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: start;
        width: 85%;
        height: 1vh;
        font-size: 2vh;
        margin: 2vh;
    }
    
`

const Hotelcontent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 90%;
    height: 75%;
    border: 1px solid #B3B1B1;
    border-radius: 7px;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
    .hotel-content{
        margin-top: 1vh;
        width: 80%;
    }
    .hotelname{
    }

`
const Hotelimg = styled.img`
    width: 100%;
    max-height: 16vh;
    margin-bottom:1vh;

`

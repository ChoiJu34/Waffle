import React,{useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { IoAirplaneSharp } from "react-icons/io5";
import { AiOutlineStar } from "react-icons/ai";
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
    const data2 = [location.state.value.userPackage];
    const [clickedTab, setClickedTab] = useState(0)
    const [favoriteId, setfavoriteId] = useState()
    console.log(favoritedata)



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
          const resData = await requestPost('package/add-favorite', favoritedata);
          console.log("res", resData);

        } catch (error) {
          console.error('포스트 에러', error);
        } 
      };
    
    const UnFavorite = async () => {
        try {
          const resData = await requestPostNode(`package/delete-favorite`,data);
          console.log("res", resData);
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
                        <Nav.Link eventKey="1"onClick={()=>setClickedTab(1)}>내카드 패키지</Nav.Link>
                    </Nav.Item>
                </StyledNav>
            {(clickedTab === 0 ? (
                <>
            {data && data.map(({card,hotel,plane}) => (
            <Content>
                <Favoritebox>
                    <div>{card}</div>
                    <AiOutlineStar size={30} onClick={()=> PostFavorite()}>즐겨찾기</AiOutlineStar>
                </Favoritebox>
                <Airbox>
                    <div className="airfont">항공권</div>                
                    {plane && plane.map(({company, discountPrice,during, endPlace,endTime,layover,originPrice,planeDate,site,startPlace,startTime,companyImg }) => (
                    <Smallairbox>
                        <Aircompanybox>
                            <div className="site-box">
                            <div className="plane-date">{planeDate}</div>
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
                    <div className="airfont">숙박</div>
                    {hotel && hotel.map(({hotelName,discountPrice,end,img,originPrice,site,start,url }) => (
                    <Hotelcontent>
                        <div>{start}</div>
                         {( img === "이미지를 가지고 오지 못했습니다.")? (<Hotelimg src={"/cardlogo/hotel.png"} alt="img" />):(<Hotelimg src={`${img}`} alt="img" />)}
                        <div>{solution(hotelName)}</div>
                        {(site === "인터파크"? (<Companylogo src={"/cardlogo/interpark.png"} alt="logo" />):(<Companylogo src={ "/cardlogo/agoda.png"} alt="logo" />))}
                        {(discountPrice === originPrice ? (<div></div>) : (<div className="origin-price">{originPrice.toLocaleString("ko-KR")}원</div>))}
                        <Discountprice>{discountPrice.toLocaleString("ko-KR")}원</Discountprice>
                        
                    </Hotelcontent>
                    ))}
                </Hotelbox>
            </Content>))}
           </> ) : ( <>
            {data2 && data2.map(({hotel,plane,card}) => (
            <Content>
                <Favoritebox>
                <p>{card}</p>
                <AiOutlineStar size={30} onClick={()=> PostFavorite()}>즐겨찾기</AiOutlineStar>
                </Favoritebox>
                <Airbox>
                    <div className="airfont">항공권</div>                
                    {plane && plane.map(({company, discountPrice,during, endPlace,endTime,layover,originPrice,planeDate,site,startPlace,startTime,companyImg }) => (
                    
                    <Smallairbox>
                        <Aircompanybox>
                            <div className="site-box">
                            <div className="plane-date">{planeDate}</div>
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
                    <div className="airfont">숙박</div>
                    {hotel && hotel.map(({hotelName,discountPrice,end,img,originPrice,site,start,url }) => (
                    <Hotelcontent>
                        {( img === "이미지를 가지고 오지 못했습니다.")? (<Hotelimg src={"/cardlogo/hotel.png"} alt="img" />):(<Hotelimg src={`${img}`} alt="img" />)}
                        <div>{solution(hotelName)}</div>
                        <div>
                            {(site === "인터파크"? (<Companylogo src={"/cardlogo/interpark.png"} alt="logo" />):(<Companylogo src={ "/cardlogo/agoda.png"} alt="logo" />))}
                            <div>{start}</div>
                        </div>
                        <div className="price-box">
                            {(discountPrice === originPrice ? (<div></div>) : (<div className="origin-price">{originPrice.toLocaleString("ko-KR")}원</div>))}
                            <Discountprice>{discountPrice.toLocaleString("ko-KR")}원</Discountprice>
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

`

const StyledNav = styled(Nav)`
  padding: 10px 10px;



  .nav-item {
    margin: 0 10px;

    .nav-link {
      color: #888;
      font-weight: 600;
      transition: color 0.2s;
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

const Discountprice = styled.div`
    font-size: 2vh;
    margin-top: 0.5vh;
    display: flex;
    flex-direction: row;
    align-self: end;
    height: 2vh;
    color: #9AC5F4;
`
const Container = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  height: calc(var(--vh, 1vh) * 80);
  width: 97vw;

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
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
const Smallairbox = styled.div`
    width: 33vh;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    justify-items: end;
    align-items: center;
    margin-top: 2.5vh;

    .layover{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        height: calc(2);
    }
    .air-place{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        height: calc(6);
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
    width: 90%;

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
    & > img {
     margin-top: 2vh;
     margin-bottom: 0vh;
 }
 
`
const Companylogo = styled.img`
    width: 9vh;

`

const Airbox = styled.div`
    width: 85%;
    height: 30%;
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
        margin: 1vh;
        margin-top: 2cqh;

    }
`

const Hotelbox = styled.div`
    width: 85%;
    height: 50%;
    border: 1px solid #B3B1B1;
    border-radius: 7px;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10vh;

   
`

const Hotelcontent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 80%;
    border: 1px solid #B3B1B1;
    border-radius: 7px;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);


`
const Hotelimg = styled.img`
    width: 100%;
    height: 50%;
`
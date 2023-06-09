import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import { useEffect, useState, Suspense } from 'react';
import data from './data.js'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './detail.js';
import axios from 'axios';
import Cart from './Cart.js';
import { useQuery } from 'react-query';

function App() {

  let [shoes, setShoes] = useState(data);
  // console.log(shoes[0].title);

  let navigate = useNavigate();
  
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleClick = () => {
    setIsButtonVisible(false);
  }
  
  const buttonStyle = {
    display: isButtonVisible ? 'block' : 'none'    
  }
  

  //locaolStoarge
  //let obj = {name : 'kim'}
                                                    //object array자료형은 문자로 강제로 변환하면깨짐 하려면 json자료변환해보자
  //localStorage.setItem('data',JSON.stringify(obj) ) //localStorage에 넣는방법//json이용해서 문자형식으로 저장가능 //형식 setItem(keyName, keyValue)
  //console.log(obj)

  //let get = localStorage.getItem('data') //꺼내기
  //console.log(get.name) //이렇게하면 undefined나옴
  //console.log(JSON.parse(get).name); //json문자형식을 다시 오브젝트변환하려면 parse사용
  
  // 최근본상품보기기능구현용
  // useEffect(()=>{
  //   localStorage.setItem('watched', JSON.stringify([]))
  // },[])
  
  //react-query(실시간 대이터요청)
  //reactQuery사용  
  //장점1: 성공,실패,로딩중 쉽게 파악가능
  //result.data(성공) result.error(실패)  result.isLoading(로딩중)  
   let result = useQuery('name찾기', ()=>
     axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      // console.log(a.data);
      return a.data;
     }),
     {staleTime : 2000} //장점2: 자동으로 refetch해줌
   )
   //장점3: 실패시 자동으로 retry해주고 ajax로 가져온 결과는 state공유 안해도됨
   
  

  
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={()=>{navigate('/')}}>shoeshop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/Cart')}}>Cart</Nav.Link>
            {/* <Nav.Link onClick={()=>{navigate('-1')}}>뒤로가기</Nav.Link> */}
          </Nav>
          <Nav className='ms-auto'>
            {/* {result.isLoading ? '로딩중' : result.data.name} */} {/*isLoading일때 로딩중 아니면 해당데이터보여줌 */}
            {result.isLoading && '로딩중'} {/*isLoading일때 로딩중 */}
            {result.error && 'error'}   {/*error일때 에러 */}
            {result.data && result.data.name} {/*data성공시 해당데이터 */}
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    {/* <Link to="/">홈</Link>
    <Link to="/detail">상세페이지</Link> */}
    <Routes>
     <Route path="/" element={
        <>
        <div className='main-bg'></div>
      <div className='container'>
        <div className='row'>
          {/* <Card shoes={shoes[0]} i={1}></Card>
          <Card shoes={shoes[1]} i={2}></Card>
          <Card shoes={shoes[2]} i={3}></Card> */}
          {
          shoes.map((a,i)=>{
            return (
              <Card shoes={shoes[i]} key={i} i={i+1}></Card>  // 0부터 돌아서 i값에 +1을 해주면 1->2->3이렇게 된다
            )
          })
          }
        </div>
      </div>
       <button className='more-btn' style={buttonStyle} onClick={()=>{       
        handleClick();

        //get요청
        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((res)=>{
          // console.log(res.data)
          // console.log(shoes)
          
          //배열합치기
          //1. spread연산자 사용방법
          let copy = [...shoes, ...res.data];
          setShoes(copy);
          
          //2. concat 사용방법
          // let copy = shoes.concat(res.data);
          // setShoes(copy);
          

         //post요청
          // axios.post('url',{name : 'kim'})

         //여러개 요청(전부 요청되었을때 실행해주세요)
        //  Promise.all([axios.get('/url'), axios.get('/url2')])

        })
        .catch(()=>{
          console.log('실패시 콘솔로그')
        })
       }}>더보기
       </button>
        </>
        }> 
     </Route>
      
        <Route 
        path='/detail/:id' 
        element={
        <Suspense fallback={<div>로딩중입니다..</div>}> {/*suspense 페이지로딩전 보여주는페이지 */}
        <Detail shoes={shoes}/>
        </Suspense>
      } />  {/*detail에 useparam으로 :id값가져감*/}
      
        <Route path='/cart' element={<Cart />}/>
        {/* nested Route */}
        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>about의 nestedRotuer</div>}></Route>  {/* /about/member */} {/*about페이지 안의 페이지*/}
          <Route path='location' element={<div>about의 nestedRotuer2</div>}></Route> {/* /about/location */}
        </Route>  

        <Route path='/event' element={<Event/>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path='two' element={<div>생일기념 쿠폰받기</div>}></Route>
        </Route>
        
        <Route path='*' element={404} /> {/*404페이지 */}
    </Routes>
    
    </div>
  );
}

//카드 컴포넌트
function Card(props) {
  return (
    <div className='col-md-4'>
    <img src={"https://codingapple1.github.io/shop/shoes"+ props.i + '.jpg'} width="80%"></img> {/*문자형으로 바꿔서 이용 */}
    {/* <img src={"https://codingapple1.github.io/shop/shoes"+ (props.i+1) + '.jpg'} width="80%"></img> */} {/*이렇게 props.i에 +1가능 */}
    {/* <img src="/logo192.png" width="80%"></img> public폴더 이미지 불러오기 /이용*/}
    <h4>{props.shoes.title}</h4>
    <p>{props.shoes.price}</p>
   </div>
  )
}

//about 컴포넌트 //nested Router 연습용
function About() {
  return (
    <div>
      <h4>정보</h4>
      <Outlet></Outlet> {/*nested Router를 보여주는 역할 */}
    </div>
  )
}

//event 컴포넌트
function Event() {
  return(
    <div>
      <h3>오늘의 이벤트</h3>
      <Outlet></Outlet> 
    </div>
  )
}


export default App;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from './data.js'
import Nav from 'react-bootstrap/Nav';
import { addStock } from "./store.js";
import { useDispatch } from "react-redux";

function Detail(props) {

   let {id} = useParams(); //유저가 url파라미터에 입력한거 가져오기
//   console.log(id);
    let product = props.shoes.find((productNum)=>productNum.id == id); //find함수를 이용해서 id값을 찾아줌    
    // console.log(product);
    

    //useEffect안의 코드는 html 랜더링 이후에 동작 , 시간오래걸리는코드는 useEffect안에 넣어서 사용하자(복잡연산, 타이머, 서버데이터작업 등)
    let [alert, setAlert] = useState(true);
    useEffect(()=>{
      let timer = setTimeout(()=>{setAlert(false)},2000);
      return ()=>{ 
        clearTimeout(timer)
      } //여기 return은 useEffect동작전 실행
    },[]);   //[]안에가 변할때만 실행, 1회만 실행시키고싶으면 []빈칸으로두면됨


    //input에 숫자이외의값 체크

    let [inputValue,setInputValue] = useState("");  //""를 useState에 넣어야 alert가 detail페이지가 열렸을때 반응하지않음
    useEffect(()=>{
      if(isNaN(inputValue) == true){
        console.log(inputValue);
        window.alert("숫자만 입력하세요");
      }
    },[inputValue])

  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
    
    let [visibility, setVisibility] = useState(''); //빈칸의 스테이트 생성
    useEffect(()=>{
         setTimeout(()=>{         //1초뒤에 visible이라는 글자를 classname의 container뒤에 붙힐거임
          setVisibility('visible') 
         }, 1000)
    },[visibility])

    let dispatch = useDispatch()


    //detail 상품id가져오기 최근본상품기능구현
    useEffect(()=>{
      let set = localStorage.setItem('watched', JSON.stringify([product.id])) //watched에 상품아이디넣기
      console.log(product.id)
      let get = localStorage.getItem('watched')
      get = JSON.parse(get)
      get.push(product.id)
      console.log(get)
    },[])

  return(
    <div className="container"> {/*classname에 클래스이름을 넣으며 조절 */}
     
         {
          alert === true ? <div className="alert alert-warning">2초이내 구매시 할인</div> : null
         }
         <div className={"detail "+ visibility}>
         <div className="row">
      <div className="col-md-6 ">
        <img src={"https://codingapple1.github.io/shop/shoes"+(product.id+1)+".jpg"} width="100%" /> {/*id가 0부터시작 하기 때문에 1을 더해줌*/}
      </div>
      <div className="col-md-6">
        <input type="text" onChange={handleInputChange}></input>
        <h4 className="pt-5">{product.title}</h4>
        <p>{product.content}</p>
        <p>{product.price}원</p>
        <button className="btn btn-danger" onClick={()=>{dispatch(addStock({id:2, name: 'Red', count : 1}))
      }}>주문하기</button> 
      </div>  
    </div>
         </div>

    <TabMenu />
    
  </div> 
  )
}


function TabMenu(){

   //tap메뉴
   let [tap, setTap] = useState(0);  //onclick이벤트 이용해서 useState가 0, 1, 2 일때 각각 원하는 화면 보여줌

   //tap메뉴 fade이벤트
   let [fade, setFade] = useState('');
  //  console.log(fade)
   useEffect(()=>{
    let timer2 = setTimeout(()=> {     //0.1초후에 fade에 end를 넣어줌
      setFade('end');    
    }, 100)
    return()=>{
      clearTimeout(timer2)
      setFade('')  //위 setTimeout 동작전 실행 fade에 ''공백란 넣어줌
    }    
   }, [tap]);

   return(
    <>
    <Nav
      variant="tabs"
      // activeKey="/home"
      defaultActiveKey="link-1"
    >
      <Nav.Item>
        <Nav.Link onClick={()=> setTap(0)} eventKey="link-1">버튼1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={()=> setTap(1)} eventKey="link-2">버튼2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={()=> setTap(2)} eventKey="link-3">버튼3</Nav.Link>
      </Nav.Item>
    </Nav>
    <div className={'start ' +fade}>  
  {
    tap === 0 ? (<div>a</div>) : null
  }
      {
    tap === 1 ? (<div>b</div>) : null
  }
      {
    tap === 2 ? (<div>c</div>) : null
  }
  </div>
    </>

   )
  
}

export default Detail;
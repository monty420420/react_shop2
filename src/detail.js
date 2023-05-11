import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from './data.js'

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

    let [inputValue,setInputValue] = useState();
    useEffect(()=>{
      if(isNaN(inputValue) == true){
        console.log(inputValue);
        window.alert("숫자만 입력하세요");
      }
    },[inputValue])

  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
    



  return(
    <div className="container">
       
         {
          alert === true ? <div className="alert alert-warning">2초이내 구매시 할인</div> : null
         }
         
    <div className="row">
      <div className="col-md-6">
        <img src={"https://codingapple1.github.io/shop/shoes"+(product.id+1)+".jpg"} width="100%" /> {/*id가 0부터시작 하기 때문에 1을 더해줌*/}
      </div>
      <div className="col-md-6">
        <input type="text" onChange={handleInputChange}></input>
        <h4 className="pt-5">{product.title}</h4>
        <p>{product.content}</p>
        <p>{product.price}원</p>
        <button className="btn btn-danger">주문하기</button> 
      </div>
    </div>
  </div> 
  )
}

export default Detail;
import { useState } from "react";
import { useParams } from "react-router-dom";
import data from './data.js'

function Detail(props) {

   let {id} = useParams(); //유저가 url파라미터에 입력한거 가져오기
//   console.log(id);
    let product = props.shoes.find((productNum)=>productNum.id == id); //find함수를 이용해서 id값을 찾아줌
    
    console.log(product);

  return(
    <div className="container">
    <div className="row">
      <div className="col-md-6">
        <img src={"https://codingapple1.github.io/shop/shoes"+(product.id+1)+".jpg"} width="100%" /> {/*id가 0부터시작 하기 때문에 1을 더해줌*/}
      </div>
      <div className="col-md-6">
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
import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, changeNum } from './store.js'

function Cart() {
    
    //1.
    // let a = useSelector((state)=> { return state })

    //2.
    // let a = useSelector((state)=>  state.user )
    // console.log(a.user);
    // console.log(a);

    //3.
    // let b = useSelector((state)=> { return state.user })
    // console.log(b);
    
    let state = useSelector((state)=> state) //store의 state를 사용할수있게해줌
    // console.log(state.cart[0]);
    // console.log(state.user);
   
    let dispatch = useDispatch()  //store.js에 요청하는 함수
    
    return(
        <div>
            
     <Table>
        <thead>
            <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            </tr>
        </thead>
        <tbody>
            {/* <tr>
                <td>1</td>
                <td>{state.cart[0].name}</td>
                <td>2</td>
                <td>확인</td>
            </tr> */}
            {
                state.cart.map((a,i)=>
                    <tr key={i}>
                        <td>{state.cart[i].id}</td>
                        <td>{state.cart[i].name}</td>
                        <td>{state.cart[i].count}</td>
                        <td><button 
                          onClick={()=>{
                            dispatch(changeNum(state.cart[i].id)) //count1증가를 위해 store.js에 있는 cart변수에서 id값을찾아서 changeNum함수실행 
                          }}
                            >+</button>
                        </td>
                    </tr>
                )
            }
        </tbody>
     </Table>
        </div>
    )
}

export default Cart
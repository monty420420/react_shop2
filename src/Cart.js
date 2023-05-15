import {Table} from 'react-bootstrap'
import { useSelector } from 'react-redux'

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
    
    let state = useSelector((state)=> state)
    // console.log(state.cart[0]);

    
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
                        <td>확인</td>
                    </tr>
                )
            }
        </tbody>
     </Table>
        </div>
    )
}

export default Cart
import {Table} from 'react-bootstrap'

function Cart() {
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
            <tr>
                <td>1</td>
                <td>신발</td>
                <td>2</td>
                <td>확인</td>
            </tr>
        </tbody>
     </Table>
        </div>
    )
}

export default Cart
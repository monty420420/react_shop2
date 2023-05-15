import { configureStore, createSlice } from "@reduxjs/toolkit";

//redux사용
//1.index에 Provider생성 (index.js참조)
//2. createSlice함수이용 name과 initalState 만들어주기
//3. configureStore에 reducer생성
//4. 원하는곳에 바인딩하기 (Cart.js 참조)

// let user = createSlice({
//     name : 'user',
//     initialState : 'kim'
// })

// let stock = createSlice({
//     name : 'stock',
//     initialState : [10,11,12]
// })

    const cart = createSlice({
        name: 'cart',
        initialState: [
            {id : 0, name : 'White and Black', count : 2},
            {id : 1, name : 'Grey Yordan', count : 1}
        ]
    })

//redux 정보변경
    let user = createSlice({ 
        name : 'user',
        initialState : 'kim',
        reducers : {
            changeName(state){        //john kim 으로 바꾸는 함수
                return 'john' + state   //john kim 으로 바꾸기
            }
        }
    }) 
    
    export let { changeName } = user.actions // changeName함수 import할수있게 해줌 




    // configureStore함수에 reducer만들기
export default configureStore({
    reducer: {
    //   user : user.reducer ,
    //   stock : stock.reducer,
    cart : cart.reducer,
    user : user.reducer
    }
})
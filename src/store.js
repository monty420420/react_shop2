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
        ],
        reducers : { 
            changeNum(state, action){
               //방법1 스테이트에서 count1에 1증가시키는방법
               //state[action.payload].count++        //payload는 스프레드함수쓴것과 같다 //함수실행시 위 스테이트에서 count에 +1해줌
               
               //방법2 스테이트에서 변수를만들고 findindex함수사용해서 id값이 같은것을 찾아 count에 +1해줌 
               let num = state.findIndex((a)=>{return a.id === action.payload})
               state[num].count++
            },
            addStock(state, action){
              state.push(action.payload);  //함수 실행시 위 스테이트에 추가
            }
        }
    })

    export let {changeNum , addStock} = cart.actions
    
    

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
    
    export let { changeName } = user.actions // 여러 함수 import할수있게 해줌 

//redux 배열변경    
    let user2 = createSlice({ 
        name : 'user2',
        initialState : {name : 'kim', age : 20},
        reducers : {
            changeName(state){   
                //방법1 
                return {name: 'park', age : 20}   //name을 park으로변경

                //방법2
                //state.name = 'park' //name을 park으로변경   
            }
        }
    }) 




    // configureStore함수에 reducer만들기
export default configureStore({
    reducer: {
    //   stock : stock.reducer,
    cart : cart.reducer,
    user : user.reducer
    }
})
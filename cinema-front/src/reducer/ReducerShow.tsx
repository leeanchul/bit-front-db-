import { MovieAll } from "../page/movie/MovieAll"

export const initialstateS = {
    input:{
        type:'',
        roomNum:'',
        age:'',
        movieId:'',
        showTime:0,
        cinemaId:''
    },
    movieList:[],
    showList:[]
}

export function ReducerShow(state,action){
    switch(action.type){
        case 'ON_CHANGE':
        return {
            ...state,
            input: {...state.input, [action.name]: action.value}
        }
        case 'ON_MOVIEALL':
            return{
                ...state,
                movieList:action.movieList
            }
        case 'ON_SHOWALL':
            return{
                ...state,
                showList:action.showList
            }
        case 'RESET_SHOW':
            return {
                ...state,  // 영화 리스트 상태는 유지
                input: initialstateS.input  // movie만 초기화
            }
    }

}
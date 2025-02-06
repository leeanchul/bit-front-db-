
export const initialstate={
    user:{
        username:'',
        password:'',
        nickname:''
    },
    movie:{
        title:'',
        content:'',
        director:'',
        date:''
    },
    movieOne:{
        id:'',
        title:'',
        director:'',
        content:'',
        relaseDate:'',
        fileName:'',
        filePath:''
    },
    movieAll:{
        list:[],
        startPage:1,
        endPage: 0,
        maxPage: 0,
        currentPage: 0
    },
    reviewList:[]
}


export function Reducer(state,action){
    switch (action.type) {
        case 'RESET':
            return initialstate
        case 'ON_CHANGE':
            return {
                ...state,
                user: {...state.user, [action.name]: action.value}
            }
        case 'ON_SHOWALL':
            return{
                ...state,
                movieList:action.movieList
            }
        case 'ON_MOVIEALL':
            return{
                ...state,
                movieAll:{
                    list:action.list,
                    startPage: action.startPage,
                    endPage: action.endPage,
                    maxPage: action.maxPage,
                    currentPage: action.currentPage
                }
            }
        case 'ON_CHANGE_MOVIE':
            return {
                movie: {...state.movie, [action.name]: action.value}
            }
        case 'ON_SHOWONE':
            return{
                ...state,
                movieOne:action.movieOne
            }
        case 'ON_REVIEW':
            return{
                ...state,
                reviewList:action.reviewList
            }
        default:
            return state;
    }
}
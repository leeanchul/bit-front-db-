

export const initialState = {
    inputs: {
        username: '',
        password: '',
        nickname: '',
    },
    list:[],
    movie:{
        list: [],
        startPage: 1,
        endPage: 0,
        maxPage: 0,
        currentPage: 0
    }
    ,insert:{
        title:'',
        director:'',
        content:''
    },
    movieOne:{
        id:'',
        title:'',
        director:'',
        content:'',
        entryDate:'',
        modifyDate:'',
        author:'',
        fileName:'',
        filePath:''
    },
    reviewList:[]

};

export function Reducer( state, action) {
    switch (action.type) {
        case 'ON_CHANGE':
            return {
                inputs: {...state.inputs, [action.name]: action.value}
            }
        case 'ON_CHANGE_MOVIE':
            return {
                insert: {...state.insert, [action.name]: action.value}
            }
        case 'RESET':
            return initialState
        case 'ON_SHOWALL':
            return{
                ...state,
                list:action.list
            }
        case 'ON_SHOWALL_PAGE':
            return{
                ...state,
                list:action.list,
                startPage: action.startPage,
                endPage: action.endPage,
                maxPage: action.maxPage,
                currentPage: action.currentPage
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
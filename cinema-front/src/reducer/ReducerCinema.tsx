export const initialstateC = {
    cinema: {
        id: 0,
        spotName: '',
        area: ''
    },
    list: [],
    cinemaAll:{
        list:[],
        startPage:1,
        endPage: 0,
        maxPage: 0,
        currentPage: 0
    }
}

export function ReducerCinema(state, action) {
    switch (action.type) {
        case 'ON_CHANGE':

            return {
                ...state,
                cinema: {...state.cinema, [action.name]: action.value}
            }
        case 'CINEMAALL':
            return {
                ...state,
                list: action.list
            }
        case 'ON_CINEMAALL' :
            return{
                ...state,
                cinemaAll:{
                    list:action.list,
                    startPage: action.startPage,
                    endPage: action.endPage,
                    maxPage: action.maxPage,
                    currentPage: action.currentPage
                }
            }
        case 'ON_RESET':
            console.log('실행')
            return {
                ...state,
                cinema: {
                    id: 0,
                    spotName: '',
                    area: ''
                }

            }
    }
}
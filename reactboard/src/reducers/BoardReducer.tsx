export function reducer(state, action) {
    switch (action.type) {
        case 'ON_SHOW_ALL_LOAD':
            return ({
                list: action.temp.list,
                startPage: action.temp.startPage,
                endPage: action.temp.endPage,
                maxPage: action.temp.maxPage,
                currentPage: action.temp.currentPage
            })
        case 'ON_SHOW_ONE_LOAD':
            return ({
                id: action.item.id,
                writerNickname:action.item.writerNickname,
                title: action.item.title,
                content: action.item.content,
                entryDate: action.item.entryDate,
                modifyDate: action.item.modifyDate,
                formattedEntryDate: action.item.formattedEntryDate,
                formattedModifyDate: action.item.formattedModifyDate
            })
        case 'ON_REPLY_LOAD':
            return ({
                list: action.list
            })
        case 'ON_CHANGE':
            return {
                ...state,
                inputs: {...state.inputs, [action.name]: action.value}
            }
        default:
            return state
    }
}
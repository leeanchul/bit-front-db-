export function reducer(state, action) {
    switch (action.type) {
        case 'ON_CHANGE':
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.name]: action.value
                }
            }
        case 'ON_INSERT':
            return {
                inputs: {
                    date: new Date('YYYY-MM-DD'),
                    task: '',

                },
                todos: [...state.todos, action.todo]
            }
        case 'ON_TOGGLE':
            return {
                ...state,
                todos:state.todos.map(t=>t.id===action.id? {...t, isCompleted:!t.isCompleted}: t )
            }
        default:
            return state
    }
}
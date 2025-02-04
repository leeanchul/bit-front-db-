export function UserReducer(state, action) {
    switch (action.type) {
        case 'ON_CHANGE':
            return {
                inputs: {...state.inputs, [action.name]: action.value}
            }
    }
}
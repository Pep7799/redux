const redux = require('redux')
const createStore = redux.createStore
const CAKE_ORDERED = 'CAKE_ORDERED'             //Action & Action Creator

function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
}

//Reducers 

const initialState = {                                  //initial state
    numOfCakes: 10
}


const reducer = (state = initialState, action) => {               //reducer  //referencing to te initial state of the application
    switch (action.type) {
        case CAKE_ORDERED:                                              //needed actions 
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
            default:
                return state
    }
}

const store = createStore(reducer)                  //redux store created
console.log('initial state', store.getState())          //initial state logged in to console

const unsubscribe = store.subscribe(() => console.log('update state', store.getState()))    //subscribe for every time the store updates

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

unsubscribe()          //then unsubscribe to any changes in the store


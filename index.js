const redux = require('redux')
const createStore = redux.createStore
const CAKE_ORDERED = 'CAKE_ORDERED'             //Action & Action Creator
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const bindActionCreators =redux.bindActionCreators         //Action creators binder

function orderCake() {
    return {                    //action creator
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake (qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty 
        
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
        case CAKE_RESTOCKED: 
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }    
            default:
                return state
    }
}

const store = createStore(reducer)                  //redux store created
console.log('initial state', store.getState())          //initial state logged in to console

const unsubscribe = store.subscribe(() => console.log('update state', store.getState()))    //subscribe for every time the store updates

//store.dispatch(orderCake())
//store.dispatch(orderCake())
//store.dispatch(orderCake())
//store.dispatch(restoreCake(3))

const actions = bindActionCreators({orderCake, restockCake}, store.dispatch) //binf action creators

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)


unsubscribe()          //then unsubscribe to any changes in the store


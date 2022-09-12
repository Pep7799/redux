const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators =redux.bindActionCreators         //Action creators binder
const combineReducers = redux.combineReducers 
const applyMiddleware = redux.applyMiddleware                       //Middleware


const reduxLogger = require("redux-logger")             //Redux-logger
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED'             //Action & Action Creator
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'         //...defining the action creators (1)
const ICECREAM_RESTORED = 'ICECREAM_RESTORED'

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


//(2) Ation creators

function orderIcecream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIcecream(qty = 1 ) {
    return {
        type: ICECREAM_RESTORED,
        payload: qty
}
}
//(2) ended
//Reducers 

const initialCakeState = {                                  //initial state
    numOfCakes: 10,
                                       //(3) setting ice-cream initial state
}
const initialIcecreamState = {                                  //initial state
    
    numOfIcecreams: 20                                      //(3) setting ice-cream initial state
}


const cakeReducer = (state = initialCakeState, action) => {               //reducer  //referencing to the initial state of the application
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

const iceCreamReducer = (state = initialIcecreamState, action) => {               //reducer  //referencing to the initial state of the application
    switch (action.type) {
   
        case ICECREAM_ORDERED:                                              //needed actions 
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams - 1
            }
        case ICECREAM_RESTORED: 
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams + action.payload
            }    
            default:
                return state
    }
}

//combine reducer (2) after calling it
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer                       //from the reducers above
})

const store = createStore(rootReducer, applyMiddleware(logger))                  //redux store created
console.log('initial state', store.getState())          //initial state logged in to console

//const unsubscribe = store.subscribe(() => 
//console.log('update state', store.getState()))    //subscribe for every time the store updates


const unsubscribe = store.subscribe(() => {})    //same as above but middleware doing the job of console log 

//store.dispatch(orderCake())
//store.dispatch(orderCake())
//store.dispatch(orderCake())
//store.dispatch(restoreCake(3))

const actions = bindActionCreators({orderCake, restockCake, orderIcecream, restockIcecream}, store.dispatch) //bind action creators

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)

actions.orderIcecream()
actions.orderIcecream()
actions.orderIcecream()
actions.restockIcecream(5)


unsubscribe()          //then unsubscribe to any changes in the store


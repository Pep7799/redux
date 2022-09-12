const redux = require('redux')
const produce = require ('immer').produce

const initialState = {                              //define initial sates(1)
    name: "Pep",
    address: {
        street: "Someewhere",
        city: "Lag",
        state: "Ng"
    },
}

//if user wants to update just the street 
const STREET_UPDATED = 'STREET_UPDATED'                 //defining action creators(2)

                                                        //action object (3)

const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street                 //passed in parameter is the apyload
    }
}

                        //(4)- Reducer fr the action
const reducer = (state = initialState, action) => {               //reducer  //referencing to the initial state of the application
    switch (action.type) {
        case STREET_UPDATED:                                              //needed actions 
           /* return {
                ...state,
                address: {
                    ...state.address,
                    street: action.payload
                }, 
            }*/

            return produce(state, (draft) => {
                draft.address.street = action.payload                               //using immer instead of above technique
            })
               
            default:
                return state
    }
}

const store = redux.createStore(reducer)                ///direct calling
console.log('Initial state', store.getState())          //initial state logged in to console

const unsubscribe = store.subscribe(() => 
console.log('Updated state ', store.getState()))    //subscribe for every time the store updates

store.dispatch(updateStreet('Alternate area'))          //updateStreet from action object(3)--final sep
unsubscribe()

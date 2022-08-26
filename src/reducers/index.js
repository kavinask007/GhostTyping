import { SET_PUNCTUATIONS,SET_MODE,SET_REFRESH,SET_GHOST_SPEED} from "../actions";
import {SET_WRONG_LETTERS,SET_RAW_WPM,SET_ACCURACY,SET_IN_PROGRESS} from "../actions"
import {SETTIME,SETGAMEOVER,SET_FINAL_TIME,SET_CORRECT_LETTERS} from "../actions"
const INITIAL_STATE={
    testtime:60,
    gameover:false,
    finaltime:0,
    wrong:0,
    correct:0,
    rawwpm:[],
    accuracy:0,
    punct:false,
    mode:'paragraph',
    updated:false,
    ghostspeed:40,
    inprogress:false,
}
export const reducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case SETTIME:
            return {
                ...state,
                testtime:action.payload,
            }
        case SETGAMEOVER:
            return{
                ...state,
                gameover:action.payload
            }

        case SET_WRONG_LETTERS:
            return{
                ...state,
                wrong:action.payload
            }
        case SET_CORRECT_LETTERS:
            return{
                ...state,
                correct:action.payload
            }
        case SET_FINAL_TIME:
            return {
                ...state,
                finaltime:action.payload
            }
        case SET_RAW_WPM:
            return{
                ...state,
                rawwpm:action.payload
            }
       case SET_ACCURACY:
           return{
               ...state,
               accuracy:action.payload
           }
        case SET_PUNCTUATIONS:
            return{
                ...state,
                punct:action.payload
            }
        case SET_MODE:
            return{
                ...state,
                mode:action.payload
            }
        case SET_REFRESH:
            return{
                ...state,
                updated:!state.updated
            }
        case SET_GHOST_SPEED:
            return{
                ...state,
                ghostspeed:action.payload
            }
        case SET_IN_PROGRESS:
            return {
                ...state,
                inprogress:action.payload
            }
        default:
            return state
    }
}
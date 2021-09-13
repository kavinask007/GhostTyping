import { SETTIME,SETGAMEOVER,SET_FINAL_TIME,SET_CORRECT_LETTERS,SET_WRONG_LETTERS,SET_RAW_WPM} from "../actions";
const INITIAL_STATE={
    time:60,
    gameover:false,
    finaltime:0,
    wrong:0,
    correct:0,
    rawwpm:[]
    
}
export const reducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case SETTIME:
            return {
                ...state,
                time:action.payload,
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
       
        default:
            return state
    }
}
export const SETTIME="SETTIME"
export const SETGAMEOVER='SETGAMEOVER'
export const SET_CORRECT_LETTERS='SETCORRECTLETTERS'
export const SET_WRONG_LETTERS='SETWRONGLETTERS'
export const SET_FINAL_TIME='SETFINALTIME'
export const SET_RAW_WPM='SETRAWWPM'
export const setTime=(data)=>{
    return{type:SETTIME,payload:data}
}
export const setgameover=(data) => {
  return {type:SETGAMEOVER,payload:data}
}
export const setcorrectletters=(data) => {
  return {type:SET_CORRECT_LETTERS,payload:data}
}
export const setwrongletters = (data) => {
  return{type:SET_WRONG_LETTERS,payload:data}
}
export const setfinaltime=(data) => {
  return{type:SET_FINAL_TIME,payload:data}
}
export const setrawwpm=(data)=>{
  return{type:SET_RAW_WPM,payload:data}
}
export const SETTIME="SETTIME"
export const SETGAMEOVER='SETGAMEOVER'
export const SET_CORRECT_LETTERS='SETCORRECTLETTERS'
export const SET_WRONG_LETTERS='SETWRONGLETTERS'
export const SET_FINAL_TIME='SETFINALTIME'
export const SET_RAW_WPM='SETRAWWPM'
export const SET_ACCURACY="SETACCURACY"
export const SET_PUNCTUATIONS='SETPUNTUATIONS'
export const SET_MODE='SETMODE'
export const SET_REFRESH='SETREFRESH'
export const SET_GHOST_SPEED="SETGHOSTSPEED"
export const SET_IN_PROGRESS='SETINPROGRESS'
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
export const setaccuracy=(data) => {
  return {type:SET_ACCURACY,payload:data}
}
export const setpuntuation=(data) => {
  return {type:SET_PUNCTUATIONS,payload:data}
}
export const setmode=(data) => {
  return{type:SET_MODE,payload:data}}
export const setrefresh=(data)=>{
  return {type:SET_REFRESH,payload:data}
} 
export const setghostspeed=(data)=>{
  return {type:SET_GHOST_SPEED,payload:data}
}
export const setinprogress=(data)=>{
  return {type:SET_IN_PROGRESS,payload:data}
}
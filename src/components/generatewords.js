import { lyrics } from "./words/songlyrics"
import {proverbs} from "./words/proverbs"
import { paragraph } from "./words/paragraph";
import { Typinglogic } from "./typinglogic"
import { useEffect,useState } from "react";
// to generate the words based on the type seleted on the header
export function Generatewords(){
    const sentence=paragraph[0]
  const[isloaded,setisloaded]=useState(false)
  useEffect(() => {
   setisloaded(true) 
  },[])
    return<div>{sentence.map((e)=>{return<Word word={e}/>})} {isloaded&& <Typinglogic timer={true}sec={60}/>}</div>
}

function Word(props) {
    const word = props.word.split("");
    return (
      <div className="word">
        {word.map((e, index) => {
          return (
            <Letter
              key={index}
              letter={e}
              difficulty={props.difficulty}
            />
          );
        })}
      </div>
    );
  }

  function Letter(props) {
      return (
        <span className="letter" >
          {props.letter}
        </span>
      );
    
  }
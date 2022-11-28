import { paragraph } from "./words/paragraph";
import { words } from "./words/words";
import { Typinglogic } from "./typinglogic";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
// to generate the words based on the type seleted on the header
function Generatewords(props) {
  const sentence = generate_paragraph(500);
  const [isloaded, setisloaded] = useState(false);
  useEffect(() => {
    setisloaded(true);
  }, [sentence]);
  return (
    <>
      <>
        {sentence.map((e, index) => {
          return <Word word={e} key={index} updated={props.updated} />;
        })}
        {isloaded && <Typinglogic timer={true} sec={props.testtime} />}
      </>
      )
    </>
  );
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
            updated={props.updated}
          />
        );
      })}
    </div>
  );
}

function Letter(props) {
  return (
    <span className="letter" data={props.updated}>
      {props.letter}
    </span>
  );
}

const mapStateToProps = (state) => {
  return {
    testtime: state.testtime,
    punct: state.punct,
    mode: state.mode,
    updated: state.updated,
  };
};

function generate_paragraph(length){
let array=[]
while (array.length<length){
  array.push(words[Math.floor(Math.random()*words.length)]);
}
return array
}
export default connect(mapStateToProps, {})(Generatewords);

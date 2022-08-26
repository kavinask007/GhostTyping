import { lyrics } from "./words/songlyrics";
import { paragraph } from "./words/paragraph";
import { Typinglogic } from "./typinglogic";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
// to generate the words based on the type seleted on the header
function Generatewords(props) {
  const [sentence, setSentence] = useState(paragraph[1]);
  const [isloaded, setisloaded] = useState(false);
  useEffect(() => {
    setisloaded(false);
    setSentence(paragraph[1]);
    setisloaded(true);
  }, [props.updated]);
  return (
    <>
      {props.updated != undefined && (
        <div>
          {sentence.map((e, index) => {
            return <Word word={e} key={index} />;
          })}
          {isloaded && <Typinglogic timer={true} sec={props.testtime} />}
        </div>
      )}
    </>
  );
}

function Word(props) {
  const word = props.word.split("");
  return (
    <div className="word">
      {word.map((e, index) => {
        return <Letter key={index} letter={e} difficulty={props.difficulty} />;
      })}
    </div>
  );
}

function Letter(props) {
  return <span className="letter">{props.letter}</span>;
}

const mapStateToProps = (state) => {
  return {
    testtime: state.testtime,
    punct: state.punct,
    mode: state.mode,
    updated: state.updated,
  };
};
export default connect(mapStateToProps, {})(Generatewords);

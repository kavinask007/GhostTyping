import Generatewords from "./generatewords";
import { useSelector } from "react-redux";
import Reloadbutton  from "./reloadbutton";
import  Resultpage  from "./resultpage";
//main function is to house generated words and reload button
export function Main() {
  const is_gameover = useSelector((state) => state.gameover);
  const updated = useSelector((state) => state.updated);
  console.log(updated)
  return (
    <div>
      {!is_gameover &&updated!=undefined ? (
        <div className="typingarea">
          <div id="carret"></div>
          <div id="ghost"></div>
          <div id="time">0</div>
          <div className="wordscontainer">
            <Generatewords updated={updated}/>
          </div>
          <Reloadbutton result={false} />
        </div>
      ) : (
        <Resultpage  />
      )}
    </div>
  );
}

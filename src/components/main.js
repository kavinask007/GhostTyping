import Generatewords from "./generatewords";
import { useSelector } from "react-redux";
import Reloadbutton from "./reloadbutton";
import Resultpage from "./resultpage";
//main function is to house generated words and reload button
export function Main() {
  const is_gameover = useSelector((state) => state.gameover);
  const loading = useSelector((state) => state.updated);
  return (
    <div>
      {!is_gameover ? (
        <div className="typingarea">
          <div id="carret"></div>
          <div id="ghost"></div>
          <div id="time">0</div>
          <div className="wordscontainer">
            <Generatewords  />
          </div>
          <Reloadbutton result={false} />
        </div>
      ) : (
        <>
          {loading ? (
            <div class="flex"><div class="spinner-box">
              <div class="configure-border-1">
                <div class="configure-core"></div>
              </div>
              <div class="configure-border-2">
                <div class="configure-core"></div>
              </div>
            </div></div>
          ) : (
            <Resultpage />
          )}
        </>
      )}
    </div>
  );
}

import { update_carret_pos } from "./caret";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// 1000/((wpm / 60) * 5 )
import {
  setgameover,
  setfinaltime,
  setcorrectletters,
  setwrongletters,
  setrawwpm,
  setaccuracy,
  setinprogress,
} from "../actions";
import update_ghost_pos from "./ghostCaret";
export function Typinglogic(props) {
  const dispatch = useDispatch();
  const ghostspeed = useSelector((state) => state.ghostspeed);
  const words = document.getElementsByClassName("word");
  const all_letters = [];
  for (let i = 0; i < words.length; i++) {
    var letters = words[i].getElementsByClassName("letter");
    for (let j = 0; j < letters.length; j++) {
      all_letters.push(letters[j]);
    }
  }
  var gamestart = true;
  var totalkeystrokes = 0;
  var counter = 1;
  // for current word
  var wordnum = 0;
  // for current letter
  var letternum = 0;
  // for  all letters in current word
  var letterarray = [];
  // for skiping to next word
  var nextword = false;
  // for creating new extra error letters
  var newelement;
  // cap for error letters
  var newelementcap = 0;
  var timerinterval;
  var ghostinterval;
  // for unnecessary keys
  const skipkeys = [
    "Shift",
    "Alt",
    "Control",
    "Tab",
    "Enter",
    "CapsLock",
    "EndPage",
    "ArrowUp",
    "ArrowDown",
    "ArrowRight",
    "ArrowLeft",
    "Home",
    "PageUp",
    "PageDown",
  ];

  //updating initial carret position
  update_carret_pos(0, 0, false);
  update_ghost_pos(all_letters, 0, false);
  //event listener for typing
  useEffect(() => {
    window.addEventListener("keydown", handlekeypress);
    window.addEventListener("resize", handleresize);
    window.addEventListener("blur", (e) => {});
    window.addEventListener("focus", (e) => {});
    return () => {
      window.removeEventListener("keydown", handlekeypress);
      window.removeEventListener("resize", handleresize);
      clearInterval(timerinterval);
      clearInterval(ghostinterval);
      var ghost = document.getElementById("ghost");
      if (ghost != undefined) {
        ghost.style.visibility = "hidden";
      }
    
    };
  }, [props, ghostspeed]);

  function handleresize() {
    update_carret_pos(wordnum, letternum);
    update_ghost_pos(all_letters, letternum);
  }

  // function to handle the key pressed
  function handlekeypress(e) {
    //skiping unnecessary keystrokes
    if (skipkeys.indexOf(e.key) >= 0) {
      return;
    }

    // backspace handler
    if (e.key == "Backspace") {
      // preset nextword as false
      nextword = false;

      letterarray = words[wordnum].getElementsByClassName("letter");
      // check if backspace is pressed at the start of a word (letternum==0) if yes change to previous word(wordum-=1)
      if (letternum == 0 && wordnum > 0) {
        wordnum -= 1;
        letterarray = words[wordnum].getElementsByClassName("letter");
        letternum = letterarray.length;
        update_carret_pos(wordnum, letternum - 1, true);
        nextword = true;
        return;
      }
      // decrement the letternum since backspace is pressed
      if (!letternum == 0) {
        letternum -= 1;
      }
      letterarray = words[wordnum].getElementsByClassName("letter");
      //check if the letter we need to erase is an extra error letter
      if (letterarray[letternum].classList.contains("extra")) {
        letterarray[letternum].remove();
        update_carret_pos(wordnum, letternum - 1, true);
        if (!letterarray[letternum - 1].classList.contains("extra")) {
          newelementcap = 0;
        }
        nextword = true;
      } else {
        letterarray[letternum].classList.remove("correct");
        letterarray[letternum].classList.remove("wrong");
        update_carret_pos(wordnum, letternum, false);
        if (letternum == letterarray.length) {
          nextword = true;
          newelementcap = 0;
        }
      }

      return;
    }
    // skip to next word only if space is pressed
    if (nextword) {
      if (e.key == " ") {
        letternum = 0;
        wordnum = wordnum + 1;
        update_carret_pos(wordnum, letternum, false);
        nextword = false;
        newelementcap = 0;
      }
      // limit for number of wrong letters in a word and displaying extra error letters in the word
      else if (newelementcap < 10) {
        newelement = document.createElement("span");
        newelement.classList.add("letter");
        newelement.classList.add("wrong");
        newelement.classList.add("extra");
        newelement.textContent = e.key;
        words[wordnum].appendChild(newelement);
        newelement = null;
        update_carret_pos(wordnum, letternum, true);
        newelementcap += 1;
        letternum = letternum + 1;
      }
      return;
    }
    letterarray = words[wordnum].getElementsByClassName("letter");

    // check if the key pressed is equal the current letter
    if (e.key === letterarray[letternum].textContent) {
      totalkeystrokes += 1;
      letterarray[letternum].classList.add("correct");
      if (gamestart) {
        timerfunction(props.timer, props.sec);
        ghosttimer(ghostspeed);
        dispatch(setinprogress(true));
        gamestart = false;
      }
    }
    // if wrong key is pressed
    else {
      totalkeystrokes += 1;
      letterarray[letternum].classList.add("wrong");
      if (gamestart) {
        timerfunction(props.timer, props.sec);
        ghosttimer(ghostspeed);
        dispatch(setinprogress(true));
        gamestart = false;
      }
    }
    //check if skiping to next word is required
    if (letternum == letterarray.length - 1) {
      nextword = true;
      update_carret_pos(wordnum, letternum, true);
    }
    letternum = letternum + 1;
    if (letternum <= letterarray.length - 1) {
      update_carret_pos(wordnum, letternum, false);
    }
  }

  var real_time_raw_wpm = [];
  var ghost_letternum = 0;
  function ghosttimer(wpm) {
    ghostinterval = setInterval(() => {
      ghost_letternum += 1;
      update_ghost_pos(all_letters, ghost_letternum, false);
    }, Math.round(1000 / ((wpm / 60) * 5)));
  }
  function timerfunction(timer, sec) {
    timerinterval = setInterval(() => {
      real_time_raw_wpm.push(calculate_wpm(counter));
      counter += 1;
      document.getElementById("time").textContent = counter;
      if (timer && counter == sec) {
        real_time_raw_wpm.push(calculate_wpm(counter));
        gameover();
      }
    }, 1000);
  }

  function gameover() {
    window.removeEventListener("keydown", handlekeypress);
    window.removeEventListener("resize", handleresize);
    clearInterval(timerinterval);
    clearInterval(ghostinterval);
    dispatch(
      setcorrectletters(document.getElementsByClassName("correct").length)
    );
    dispatch(setwrongletters(document.getElementsByClassName("wrong").length));
    dispatch(setfinaltime(counter));
    dispatch(setrawwpm(real_time_raw_wpm));
    dispatch(
      setaccuracy(
        Math.round(
          (document.getElementsByClassName("correct").length /
            totalkeystrokes) *
            100
        )
      )
    );
    dispatch(setgameover(true));
    dispatch(setinprogress(false));
    return null;
  }
  return null;

  function calculate_wpm(counter) {
    return Math.round(
      document.getElementsByClassName("correct").length / 5 / (counter / 60)
    );
  }
}

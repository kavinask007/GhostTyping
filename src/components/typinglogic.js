import { update_carret_pos } from "./caret";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setgameover,setfinaltime,setcorrectletters,setwrongletters,setrawwpm} from "../actions";
export  function Typinglogic(props) {
	
	const dispatch=useDispatch()
	const words = document.getElementsByClassName("word");
	var gamestart=true
	var counter=1
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
	var timerinterval	
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

	//event listener for typing
	useEffect(() => {
		window.addEventListener("keydown", handlekeypress);
		window.addEventListener("resize",handleresize)
		window.addEventListener("blur",(e) => {
	 
		})
		window.addEventListener('focus',(e) => {
		  
		})
	},[])
	

	function handleresize(){
		update_carret_pos(wordnum,letternum)
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
				if (letternum== letterarray.length) {
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
			letterarray[letternum].classList.add("correct");
			if(gamestart){
				timerfunction(props.timer,props.sec)
				gamestart=false
			}
			
		}
		// if wrong key is pressed
		else {
			letterarray[letternum].classList.add("wrong");
			if(gamestart){
				timerfunction(props.timer,props.sec)
				gamestart=false
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
	
var real_time_raw_wpm=[]
function timerfunction(timer,sec){
	timerinterval=setInterval(() => {	
		real_time_raw_wpm.push(calculate_wpm(counter))
		counter+=1
		if(timer && counter==sec){
			real_time_raw_wpm.push(calculate_wpm(counter))
			console.log(real_time_raw_wpm)
			gameover()
		}
	}, 1000);
	
}

function gameover(){
	window.removeEventListener('keydown',handlekeypress)
	window.removeEventListener("resize",handleresize)
	clearInterval(timerinterval)
	dispatch(setcorrectletters(document.getElementsByClassName('correct').length))
	dispatch(setwrongletters(document.getElementsByClassName('wrong').length))
	dispatch(setfinaltime(counter))
	dispatch(setrawwpm(real_time_raw_wpm))
	dispatch(setgameover(true))
	return null
}
return null

function calculate_wpm(counter){
		return Math.round((document.getElementsByClassName('correct').length/5)/(counter/60))
	
}


}

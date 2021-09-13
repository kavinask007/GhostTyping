import { Generatewords } from "./generatewords";
import { useState} from "react";
import { useSelector } from "react-redux";
import { Reloadbutton } from "./reloadbuttonsvg";
import {Resultpage} from './resultpage'
//main function is to house generated words and reload button
export function Main() {
	const is_gameover=useSelector((state) =>state.gameover)
	return (
		<div>{!is_gameover?<div className="typingarea">
			<div id="carret"></div>
			<div className="wordscontainer">
				<Generatewords />
			</div>
			<Reloadbutton/>

		</div>:<Resultpage/>}

		</div>
	);
}

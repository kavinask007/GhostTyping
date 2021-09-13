import gsap from "gsap";
// to update the carret position
var initialY=0;
var rowcounter=0;
var firstrow=0
export function update_carret_pos(wordnum, letternum, is_offset) {
	var offsetX;
	var letterarray = document
		.getElementsByClassName("word")
		[wordnum].getElementsByClassName("letter");
	if(letternum>=letterarray.length){
		letternum=letterarray.length-1
		is_offset=true
	}
	if (is_offset) {
		offsetX = letterarray[letternum].getClientRects()[0].width;
	} else {
		offsetX = -2;
	}
	const carret = document.getElementById("carret");

	//set initial carret position
	if (wordnum == 0 && letternum == 0) {
		carret.style.left =
			Math.round(letterarray[letternum].getClientRects()[0].x) - 2 + "px";
		carret.style.top =
			Math.round(letterarray[letternum].getClientRects()[0].y) - 1 + "px";
	}
	// move carret (if already initialized )using gsap(green sock animation package)
	else {
		gsap.to("#carret", {
			left:
				Math.round(letterarray[letternum].getClientRects()[0].x) +
				offsetX +
				"px",
			top: Math.round(letterarray[letternum].getClientRects()[0].y) - 1 + "px",
			duration: 0.1,
		});
	}

	if(initialY==0){
		initialY=Math.round(letterarray[letternum].getClientRects()[0].y)
	}
	if(Math.round(letterarray[letternum].getClientRects()[0].y)>initialY){
		initialY=Math.round(letterarray[letternum].getClientRects()[0].y)
		rowcounter+=1
		if(rowcounter==2){
			firstrow=wordnum-1
		}
	}
	if(rowcounter==3){
		for (var i=0;i<=firstrow;i++){
			document.getElementsByClassName("word")[i].style.display="none"
		}
		firstrow=0;
		rowcounter=1;
		initialY=0;
		var letter=document.getElementsByClassName('word')[wordnum].getElementsByClassName('letter')[0]
		gsap.to("#carret", {
			left:
				Math.round(letter.getClientRects()[0].x) -2 +
				"px",
			top: Math.round(letter.getClientRects()[0].y) - 1 + "px",
			duration: 0.1,
		});
	}
	
}




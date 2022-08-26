import gsap from "gsap";
// to update the carret position

export default function update_ghost_pos(letterarray, letternum) {
  const ghost = document.getElementById("ghost");
  ghost.style.visibility="visible"
  if (isVisible(letterarray[letternum])) {
    ghost.style.display = "inline";
  } else {
    ghost.style.display = "none";
    return
  }
  //set initial ghost position
  if (letternum == 0) {
    ghost.style.left =
      Math.round(letterarray[letternum].getClientRects()[0].x) - 2 + "px";
    ghost.style.top =
      Math.round(letterarray[letternum].getClientRects()[0].y) - 1 + "px";
  }
  // move ghost (if already initialized )using gsap(green sock animation package)
  else {
    gsap.to("#ghost", {
      left: Math.round(letterarray[letternum].getClientRects()[0].x) + "px",
      top: Math.round(letterarray[letternum].getClientRects()[0].y) - 1 + "px",
      duration: 0.1,
    });
  }
}
function isVisible(elem) {
  if (!(elem instanceof Element))
    throw Error("DomUtil: elem is not an element.");
  const style = getComputedStyle(elem);
  if (style.display === "none") return false;
  if (style.visibility !== "visible") return false;
  if (style.opacity < 0.1) return false;
  if (
    elem.offsetWidth +
      elem.offsetHeight +
      elem.getBoundingClientRect().height +
      elem.getBoundingClientRect().width ===
    0
  ) {
    return false;
  }
  const elemCenter = {
    x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
    y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
  };
  if (elemCenter.x < 0) return false;
  if (
    elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)
  )
    return false;
  if (elemCenter.y < 0) return false;
  if (
    elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)
  )
    return false;
  let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
  do {
    if (pointContainer === elem) return true;
  } while ((pointContainer = pointContainer.parentNode));
  return false;
}

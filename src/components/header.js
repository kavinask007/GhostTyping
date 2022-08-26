import { setghostspeed, setTime } from "../actions";
import { connect } from "react-redux";
// Header file to house logo on the left and typing settings on the right
function Header(props) {
  function getclassName(mode_, value) {
    if (mode_ == value) {
      return "options active";
    }
    return "options";
  }
  return (
    <>
      {!props.inprogress&&
      <div className="header">
        <h1 className="title">GhostTypes</h1>
        <div className="optionscontainer">
          <div className="optionsdiv">
            <span className="options"> Time(s):</span>
            <span
              className={getclassName(props.time, 15)}
              onClick={() => props.setTime(15)}
            >
              15
            </span>
            <span
              className={getclassName(props.time, 30)}
              onClick={() => props.setTime(30)}
            >
              30
            </span>
            <span
              className={getclassName(props.time, 60)}
              onClick={() => props.setTime(60)}
            >
              60
            </span>
            <span
              className={getclassName(props.time, 120)}
              onClick={() => props.setTime(120)}
            >
              120
            </span>
          </div>
          <div className="optionsdiv">
            <span className="options"> Ghost Speed(wpm):</span>
            <span
              className={getclassName(props.ghostspeed, 40)}
              onClick={() => props.setghostspeed(40)}
            >
              40
            </span>
            <span
              className={getclassName(props.ghostspeed, 60)}
              onClick={() => props.setghostspeed(60)}
            >
              60
            </span>
            <span
              className={getclassName(props.ghostspeed, 80)}
              onClick={() => props.setghostspeed(80)}
            >
              80
            </span>
            <span
              className={getclassName(props.ghostspeed, 100)}
              onClick={() => props.setghostspeed(100)}
            >
              100
            </span>
          </div>
        </div>
      </div>}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    time: state.testtime,
    ghostspeed: state.ghostspeed,
    inprogress: state.inprogress,
  };
};
export default connect(mapStateToProps, { setTime, setghostspeed })(Header);

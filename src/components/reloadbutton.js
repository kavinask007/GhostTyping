import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { setrefresh, setgameover, setinprogress } from "../actions";
function Reloadbutton(props) {
  const dispatch = useDispatch();
  const secondarycolor = getComputedStyle(document.body).getPropertyValue(
    "--secondary-color"
  );
  const primarycolor = getComputedStyle(document.body).getPropertyValue(
    "--primary-color"
  );
  const [color, setcolor] = useState(secondarycolor);
  // set the reload button to primary color on mouse enter
  function setprimarycolor() {
    setcolor(primarycolor);
  }
  //set the reload button to secondary color on mouse leave
  function setsecondarycolor() {
    setcolor(secondarycolor);
  }
 
  return (
    <div
      id="reloadbutton"
      className="reloadbutton"
      onClick={() => {
        if (props.result) {
          dispatch(setgameover(false));
        } else {
          dispatch(setrefresh(true));
          dispatch(setgameover(true));
          setTimeout(() => {
            dispatch(setgameover(false));
            dispatch(setinprogress(false));
            dispatch(setrefresh(false));
          }, 1);
        }
      }}
    >
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        onMouseEnter={setprimarycolor}
        onMouseLeave={setsecondarycolor}
      >
        <g id="refresh">
          <path
            id="Vector"
            d="M20.3 13.43C20.048 13.3515 19.7752 13.3757 19.5411 13.4975C19.3069 13.6192 19.1304 13.8286
19.05 14.08C18.5776 15.5245 17.6566 16.7805 16.421 17.6654C15.1854 18.5503 13.6997 19.0178 12.18 19C10.3003 
19.0214 8.48894 18.2965 7.14297 16.9842C5.79701 15.672 5.02635 13.8796 5 12C5.02635 10.1204 5.79701 8.32798 7.14297 7.01576C8.48894 5.70354 10.3003 4.97863 12.18 5C13.8776 4.9959 15.5229 5.5868 16.83 6.67L14.66 6.31C14.5299 6.2886 14.3969 6.29312 14.2686 6.3233C14.1403 6.35348 14.0193 6.40873 13.9124 6.48586C13.8055 6.563 13.715 6.6605 13.6459 6.77276C13.5768 6.88502 13.5307 7.00982 13.51 7.14C13.4886 7.27005 13.4931 7.40305 13.5233 7.53135C13.5535 7.65965 13.6087 7.78072 13.6859 7.88759C13.763 7.99446 13.8605 8.08503 13.9728 8.15409C14.085 8.22315 14.2098 8.26934 14.34 8.29L18.58 8.99H18.75C18.866 8.98986 18.981 8.96956 19.09 8.93C19.1266 8.91609 19.1605 8.89577 19.19 8.87C19.2617 8.84334 19.3291 8.80627 19.39 8.76L19.48 8.65C19.48 8.6 19.57 8.56 19.61 8.5C19.65 8.44 19.61 8.4 19.66 8.36C19.6876 8.30176 19.711 8.2416 19.73 8.18L20.48 4.18C20.505 4.04867 20.5038 3.91372 20.4766 3.78285C20.4494 3.65198 20.3967 3.52774 20.3215 3.41724C20.2462 3.30674 20.15 3.21213 20.0382 3.13883C19.9264 3.06552 19.8013 3.01495 19.67 2.99C19.5387 2.96505 19.4037 2.9662 19.2729 2.99341C19.142 3.02061 19.0177 3.07332 18.9072 3.14854C18.6841 3.30044 18.5304 3.53478 18.48 3.8L18.21 5.25C16.536 3.79924 14.3952 3.00043 12.18 3C9.76993 2.97866 7.44984 3.91429 5.7288 5.60158C4.00777 7.28886 3.02639 9.58998 3 12C3.02639 14.41 4.00777 16.7111 5.7288 18.3984C7.44984 20.0857 9.76993 21.0213 12.18 21C14.1331 21.03 16.0443 20.4321 17.6321 19.2944C19.22 18.1566 20.4005 16.5391 21 14.68C21.0379 14.552 21.0498 14.4176 21.035 14.2849C21.0202 14.1522 20.9789 14.0238 20.9137 13.9073C20.8485 13.7908 20.7605 13.6886 20.6551 13.6066C20.5497 13.5246 20.429 13.4646 20.3 13.43Z"
            fill={color}
          />
        </g>
      </svg>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    updated: state.updated,
  };
};

export default connect(mapStateToProps, { setrefresh, setgameover })(
  Reloadbutton
);

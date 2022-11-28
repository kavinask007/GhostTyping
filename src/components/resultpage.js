import { useEffect } from "react";
import { connect} from "react-redux";
import { Chart, registerables } from "chart.js";
import Reloadbutton  from "./reloadbutton";
Chart.register(...registerables);
function Resultpage(props) {
	const primarycolor=getComputedStyle(document.body).getPropertyValue(
		"--primary-color"
	);
	function calculate_raw_wpm(){
		let x=Math.round((props.correct/5)/(props.finaltime/60))
		if (x<0){
			return 0
		}
		return x
	}	
	function calculate_wpm(){
		let x=Math.round(((props.correct/5)-props.wrong)/(props.finaltime/60))
		if (x<0){
			return 0
		}
		return x
	}
	useEffect(() => {
		var ctx = document.getElementById("myChart");
		var labels = [];
		var ghost=Array(props.wpm.length).fill(props.ghostspeed)
		console.log(ghost);
		for (let i = 0; i < props.wpm.length; i++) {
			labels.push(i + 1);
		}
		const data = {
			labels: labels,
			datasets: [
				{
					data: props.wpm,
					fill: false,
					borderColor: primarycolor,
					tension: 0.1,
				},
				{
					data: ghost,
					fill: false,
					borderColor: "red",
					tension: 0.1,
				},
			],
		};
		var myChart = new Chart(ctx, {
			type: "line",
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					x: {
					  display: true,
					  title: {
						display: true,
						text: 'Time (secs)'
					  }
					},
					y: {
					  display: true,
					  title: {
						display: true,
						text: 'w p m'
					  }
					}}
			},
		});
	}, []);
	return (
		<div className="resultpage">
			<div className="chartholder">
				<canvas id="myChart" width="700" height="300"></canvas>
			</div>
			<div className="resultdata">
				<span className="heading">wpm : <span>{calculate_wpm()}</span></span>
				<span className="heading">Raw wpm : <span>{calculate_raw_wpm()}</span></span>
				<h3 className="heading">Accuracy : <span>{props.accuracy}</span></h3>
				<h3 className="heading">Time : <span>{props.finaltime}</span></h3>
			</div>
			<Reloadbutton result={true}/>
		</div>
	);
}
const mapStateToProps=(data)=>{
	return {
		wpm:data.rawwpm,
		finaltime:data.finaltime,
		correct:data.correct,
		wrong:data.wrong,
		accuracy:data.accuracy,
		ghostspeed:data.ghostspeed
	}
}

export default connect(mapStateToProps,{})(Resultpage)
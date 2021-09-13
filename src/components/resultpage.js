import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export function Resultpage() {
	const wpm = useSelector((state) => state.rawwpm);
	const finaltime = useSelector((state) => state.finaltime);
	const correct = useSelector((state) => state.correct);
	const wrong = useSelector((state) => state.wrong);
	const primarycolor=getComputedStyle(document.body).getPropertyValue(
		"--primary-color"
	);
	useEffect(() => {
		var ctx = document.getElementById("myChart");
		var labels = [];
		for (let i = 0; i < wpm.length; i++) {
			labels.push(i + 1);
		}
		const data = {
			labels: labels,
			datasets: [
				{
					data: wpm,
					fill: false,
					borderColor: primarycolor,
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
				<div><span className="heading">wpm</span>
				<span className="heading">raw wpm</span></div>
				<h3 className="heading">Accuracy</h3>
				<h3 className="heading">Time</h3>
				<h3 className="heading">Accuracy</h3>
			</div>
		</div>
	);
}

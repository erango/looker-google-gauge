google.charts.load('current', {'packages':['gauge']});

var chart;

function drawChart() {
	var data = google.visualization.arrayToDataTable([
		['Label', 'Value'],
		['', 0]
	]);

	var options = {
		width: 400, height: 120,
		redFrom: 90, redTo: 100,
		yellowFrom:75, yellowTo: 90,
		minorTicks: 5
	};

	chart = new google.visualization.Gauge(document.getElementById('vis'));

	chart.draw(data, options);
}

looker.plugins.visualizations.add({
	create: function(element, config){
		element.innerHTML = "...";
		console.log(config)
		google.charts.setOnLoadCallback(drawChart);
	},
	updateAsync: function(data, element, config, queryResponse, details, doneRendering){
// 		var html = "";
// 		for(var row of data) {
// 			var cell = row[queryResponse.fields.dimensions[0].name];
// 			html += LookerCharts.Utils.htmlForCell(cell);
// 		}
// 		element.innerHTML = html;
		
		var value = data[0][queryResponse.fields.dimensions[0].name]
		data.setValue(0, 1, value)
          	chart.draw(data, options);
		doneRendering()
	}
});

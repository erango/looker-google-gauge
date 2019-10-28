google.charts.load('current', {'packages':['gauge']});

var chart, updateRequested, value = 0;

var options = {
		width: 400, height: 120,
		redFrom: 90, redTo: 100,
		yellowFrom:75, yellowTo: 90,
		minorTicks: 5
	};

function drawChart() {
	var data = google.visualization.arrayToDataTable([
		['Label', 'Value'],
		['', value]
	]);

	chart = new google.visualization.Gauge(document.getElementById('vis-chart'));
	chart.draw(data, options);
}

looker.plugins.visualizations.add({
	create: function(element, config){
		element.innerHTML = '<div style="text-align: center"><div id="vis-chart"/></div>';
		google.charts.setOnLoadCallback(drawChart);
	},
	updateAsync: function(data, element, config, queryResponse, details, doneRendering){
		value = data[0][queryResponse.fields.dimensions[0].name].value;
		console.log('value is', value);
          	chart && chart.draw(data, options);
		doneRendering()
	}
});

google.charts.load('current', {'packages':['gauge']});

var chart, updateRequested, value;

function drawChart() {
	var data = google.visualization.arrayToDataTable([
		['Label', 'Value'],
		['', value || 0]
	]);

	var options = {
		width: 400, height: 120,
		redFrom: 90, redTo: 100,
		yellowFrom:75, yellowTo: 90,
		minorTicks: 5
	};

	chart = new google.visualization.Gauge(document.getElementById('vis'));

	chart.draw(data, options);
	console.log('draw finished')
}

looker.plugins.visualizations.add({
	create: function(element, config){
		element.innerHTML = "...";
				console.log('create');

		google.charts.setOnLoadCallback(drawChart);
	},
	updateAsync: function(data, element, config, queryResponse, details, doneRendering){
		console.log('updateAsync');
		console.log(data);
		value = data[0][queryResponse.fields.dimensions[0].name]
          	chart && chart.draw(data, options);
		doneRendering()
	}
});

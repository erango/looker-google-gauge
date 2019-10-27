function drawChart(element) {

  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Rank', 20 - 3]
  ]);
  var options = {
    width: 250,
    height: 250,
    redFrom: 0,
    redTo: 10,
    yellowFrom: 10,
    yellowTo: 15,
    greenFrom: 15,
    greenTo: 20,
    minorTicks: 20,
    max: 20,
    min: 0,
    majorTicks: ['20', '1']
  };

  var chart = new google.visualization.Gauge(element);
  chart.draw(data, options);
}

looker.plugins.visualizations.add({
	create: function(element, config){
		element.innerHTML = "<h1>Ready to render!</h1>";
		
		google.charts.load('current', {'packages':['gauge']});
		google.charts.setOnLoadCallback(drawChart(element));
	},
	updateAsync: function(data, element, config, queryResponse, details, doneRendering){
// 		var html = "";
// 		for(var row of data) {
// 			var cell = row[queryResponse.fields.dimensions[0].name];
// 			html += LookerCharts.Utils.htmlForCell(cell);
// 		}
// 		element.innerHTML = html;
// 		doneRendering()
	}
});

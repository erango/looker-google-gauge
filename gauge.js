google.charts.load('current', {'packages':['gauge']});

var chart, updateRequested, value = 0;

var options = {
		min: 0, max: 100,
		width: 169, height: 169,
		redFrom: 90, redTo: 100,
		yellowFrom:75, yellowTo: 90,
		greenFrom: 0, greenTo: 30,
		greenColor: '#33cc99', yellowColor: '#fdaf48', redColor: '#f06e7f',
		minorTicks: 5
	};

function updateOptions(newOptions) {
	if(newOptions.redFrom) options.redFrom = newOptions.redFrom;
	if(newOptions.redTo) options.redTo = newOptions.redTo;
	if(newOptions.yellowFrom) options.yellowFrom = newOptions.yellowFrom;
	if(newOptions.yellowTo) options.yellowTo = newOptions.yellowTo;
	if(newOptions.greenFrom) options.greenFrom = newOptions.greenFrom;
	if(newOptions.greenTo) options.greenTo = newOptions.greenTo;
	if(newOptions.minorTicks) options.minorTicks = newOptions.minorTicks;
	if(newOptions.min) options.min = newOptions.min;
	if(newOptions.max) options.max = newOptions.max;
}

function getDataTable() {
	return google.visualization.arrayToDataTable([
		['Label', 'Value'],
		['', value]
	]);
}

function drawChart() {
	var data = getDataTable();
	chart = new google.visualization.Gauge(document.getElementById('vis-chart'));
	chart.draw(data, options);
}

looker.plugins.visualizations.add({
	create: function(element, config){
		element.innerHTML = '<div style="display: table; margin: auto;"><div id="vis-chart"/></div>';
		google.charts.setOnLoadCallback(drawChart);
	},
	updateAsync: function(data, element, config, queryResponse, details, doneRendering){
		value = data[0][queryResponse.fields.dimensions[0].name].value;
		updateOptions(config);
          	chart && chart.draw(getDataTable(), options);
		doneRendering()
	},
	options: {
	    color_range: {
	      type: "array",
	      label: "Color Range",
	      display: "colors"
	    },
	   min: {
	      type: "number",
	      label: "From",
	      placeholder: "Min value",
	      default: 0
	    },
	   max: {
	      type: "number",
	      label: "To",
	      placeholder: "Max value",
	      default: 100
	    },
	   redFrom: {
	      type: "number",
	      label: "Red starts at",
	      default: 0
	    },
	    redTo: {
	      type: "number",
	      label: "Red ends at",
	      default: 30
	    },
		
	   yellowFrom: {
	      type: "number",
	      label: "Yellow starts at",
	      default: 70
	    },
	    yellowTo: {
	      type: "number",
	      label: "Yellow ends at",
	      default: 90
	    },
		
	   greenFrom: {
	      type: "number",
	      label: "Red starts at",
	      default: 90
	    },
	    greenTo: {
	      type: "number",
	      label: "Red ends at",
	      default: 100
	    },
	    minorTicks: {
	      type: "number",
	      label: "Red starts at",
	      default: 0
	    },
	}
});

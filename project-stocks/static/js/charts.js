var apiKey = "Z1SWFKTG08NRZOO7";

/* global Plotly */
// var url =
//   `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

ticker='IBM'
var url = 
`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${ticker}&apikey=${apiKey}`
/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High 
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}


function buildPlot() {
  d3.json(url).then(function(data) {
    // Returns: YYYY-MM-DD
    // Grab values from the data json object to build the plots
    var name = data["Meta Data"]["2. Symbol"];
    var weeklyTimeSeries = data["Weekly Time Series"];
    var timeSeries = [];
    var dates=[]

    for ( var i in weeklyTimeSeries) {
      if (dates.length < 51) {
        timeSeries.push(weeklyTimeSeries[i]);
        dates.push(i)
      }
  }
    // startDate=dates[0];
    // endDate=dates[dates.length];
    console.log("Name :", name);
    console.log("Weekly time series :", weeklyTimeSeries)
    console.log(dates)
    var high = timeSeries.map(function (a) { return a["2. high"] });
    var low = timeSeries.map(function (a) { return a["3. low"] });
    console.log(high)
    console.log(low)
 
   
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: high,
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1];

    var layout = {
      title: `${ticker} 52 weeks high`,
      xaxis: {
        range: [dates[0], dates[dates.length]],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

//     Plotly.newPlot("plot", data, layout);

  });
}

 buildPlot();

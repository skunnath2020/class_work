var apiKey = "Z1SWFKTG08NRZOO7";
ticker='AMZN'
var url = 
`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${apiKey}`

function buildPlot() {
  d3.json(url).then(function(data) {

    function unpack(rows, index) {
      return rows.map(function(row) {
        return row[index];
      });
    }
    // Returns: YYYY-MM-DD
    // Grab values from the data json object to build the plots
    var name = data['symbol'];
    var quartReports=data["quarterlyReports"];
    sDate =new Date()
    eDate= new Date(sDate.getFullYear(),sDate.getMonth(), sDate.getDate()-365)
    console.log(eDate);
    console.log(name);
    console.log(quartReports)

    //Filter the Quarterly data for the past year
    var yearData = quartReports.filter(x => {
        var date = new Date(x["fiscalDateEnding"])
        return (date >= eDate && date <= sDate)
    })
    console.log(yearData)
    var totalRevenue = unpack(yearData, "totalRevenue"); 
    var dates = unpack(yearData, "fiscalDateEnding")
    console.log(totalRevenue)
    console.log(dates)
    var trace1 = {
      type: "bar",
      mode: "lines",
      name: "high",
      x: dates,
      y: totalRevenue ,
      marker: {
        color: 'rgba(50,171,96,0.6)',
        line: {
          color: 'rgba(50,171,96,1.0)',
          width: 1
        }
        }    
    };

    var layout = {
      grid: {rows: 1, columns: 2, pattern: 'independent'},
      showlegend: false,
      autosize: true,
      width: 400,
      height: 280,
      xaxis: {
        type: "date",
        tickfont: {
            family: 'Old Standard TT, serif',
            size: 10,
            color: 'black'
          },
      },
      yaxis: {
        autorange: true,
        type: "linear",
        tickfont: {
            family: 'Old Standard TT, serif',
            size: 10,
            color: 'black'
          },
      }
      
    };
    layout.title = { 
        text: `${ticker}<br> Revenue by Quarter`, 
        font: {
          size: 14,
        // color: 'purple'
        },
        x: 0.3,
        y: 2.2,
        xanchor: 'center',
        yanchor: 'top',
      };
  
    var data = [trace1];
  
    //   Plotly.newPlot("plot", data, layout); 
    Plotly.newPlot('plot', data, layout);
  });
}

buildPlot();

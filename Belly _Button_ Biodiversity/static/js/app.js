function init() {

    // Dropdown options
    d3.json("samples.json").then(function(data) {
       d3.select("#selDataset").selectAll("option")
           .data(data.names)
            .enter()
            .append("option")
            .html((d) => 
                `<option>${d}</option>`)
            // First plot
            id = data.names[0];
            plotting(id);
    });
};

// Handler function.
function changed(id) {
    plotting(id)
};

// Plotting function
function plotting(id){
    d3.json("samples.json").then(function(data) {
        
        var index = data.names.indexOf(id);
        var meta = data.metadata[index];
        var sample = data.samples[index];
    
        // OTU samples.
        var otuIds = sample.otu_ids;
        var otuLabels = sample.otu_labels;
        var sampleValues = sample.sample_values;
    
        // Subjects
        var entries = Object.entries(meta);
        
        var barTrace = {
            x: sampleValues.slice(0,10).reverse(),
            y: otuIds.slice(0,10).reverse().map(otuId => "OTU " + otuId),
            text: otuLabels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        };

    
        var bubble = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            // Markers format
            marker: {
                size: sampleValues.map(value => value * 0.75),
                color: otuIds
            }
        };

      
        var gauge = {
                value: meta.wfreq,
                title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: {visible: true, range: [null, 9], tickmode: "linear", nticks: 10},
                    steps: [
                        { range: [0,1], color: "rgb(247, 243, 236)"},
                        { range: [1,2], color: "rgb(243, 241, 229)"},
                        { range: [2,3], color: "rgb(233, 231, 202)"},
                        { range: [3,4], color: "rgb(229, 233, 177)"},
                        { range: [4,5], color: "rgb(213, 229, 149)"},
                        { range: [5,6], color: "rgb(184, 205, 139)"},
                        { range: [6,7], color: "rgb(135, 193, 128)"},
                        { range: [7,8], color: "rgb(133, 189, 139)"},
                        { range: [8,9], color: "rgb(128, 182, 134)"},
                    ]
                }
            };

        // bar chart 
        var barLayout = {
            xaxis: {
                title:{
                    text: "Sample values"
                }
            },
            yaxis: {
                title:{
                    text: "OTU ID"
                }
            }
        };
        // bubble chart
        var bubLayout = {
            xaxis: {
                title:{
                    text: "OTU ID"
                }
            },
            yaxis: {
                title:{
                    text: "Sample values"
                }
            }
        };

        //  Gauge chart
        var gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

         
        var barData = [barTrace];
        var bubData = [bubble];
        var gaugeData = [gauge];
        
        Plotly.newPlot("bar", barData, barLayout);
        Plotly.newPlot("bubble", bubData, bubLayout);
        Plotly.newPlot("gauge", gaugeData, gaugeLayout);
         
        
        d3.select("#sample-metadata").html("")
        
        d3.select("#sample-metadata").selectAll("p")
            .data(entries)
            .enter()
            .append("p")
            .html((d) => 
                `<p>${d[0]}: ${d[1]}</p>`)
    });
};

init();
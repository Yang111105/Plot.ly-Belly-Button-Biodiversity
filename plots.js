// Part of the codes (Initial function and DrawBarchart function) are from Dom's office hours demo on Dec 11th

console.log("plots.js loaded")

function DrawBarchart(sampleId) {
    console.log(`DrawBarchart${sampleId}`);
    d3.json("samples.json").then(data => {

        let sample = data.samples;
        let resultArray = sample.filter(s => s.id === sampleId);
        let result = resultArray[0];
        
        console.log(result);

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        let yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();

        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation:"h"        
        };

        let barArray = [barData];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t:30 },
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" }
          
        }

        Plotly.newPlot("bar", barArray, barLayout);
    });
}


function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart${sampleId}`);
    d3.json("samples.json").then(data => {

        let sample = data.samples;
        let resultArray = sample.filter(s => s.id === sampleId);
        let result = resultArray[0];
        
        console.log(result);

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                color: otu_ids,
                size: sample_values,
            },
            text: otu_labels
        };

        let bubbleArray = [bubbleData];

        let bubbleLayout = {
            title: "Bacteria Cultures Found",
            margin: { t:30 },
            xaxis: { title: "OTU IDs" },
            yaxis: { title: "Sample Values" },
            height: 400,
            width: 1200
        }

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });
}


function popMetadata(sampleId) {
    console.log(`popMetadata${sampleId}`);
    d3.json("samples.json").then(data => {

        let metadata  = data.metadata;
        // console.log(metadata);
        let metaArray = metadata.filter(m => m.id === parseInt(sampleId));
        let result = metaArray[0];
        let infoArray = Object.entries(result);
        console.log(infoArray);

        let selector = d3.select("#sample-metadata");
        infoArray.forEach(([key,value]) => {
            upperKey = key.toUpperCase();
            selector.append("p")
                .text(`${upperKey}:${value}`);
        });
    });
}


function optionChanged(id) {
    console.log(`${id}`);

    DrawBarchart(id);
    DrawBubblechart(id);
    popMetadata(id);
    DrawGauge(id);
}


function InitDashboard()
{
    console.log("Initializing Dashboard");

    let selector = d3.select("#selDataset");

    d3.json("samples.json").then(data => {

        console.log(data);

        let sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);

        });

        let sampleId = sampleNames[0];

        DrawBarchart(sampleId);
        DrawBubblechart(sampleId);
        popMetadata(sampleId);
        DrawGauge(sampleId);
    });
}

InitDashboard();

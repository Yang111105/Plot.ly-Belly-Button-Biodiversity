function DrawGauge(sampleId) {
    console.log(`Draw Gauge${sampleId}`);
    d3.json("samples.json").then(data => {

        let metadata  = data.metadata;
        // console.log(metadata);
        let metaArray = metadata.filter(m => m.id === parseInt(sampleId));
        let wfreq = metaArray[0].wfreq;
        
        console.log(wfreq);
        
        var data = [
        {
          value: wfreq,
          title: { text: "Scrubs per Week" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 3], color: "lightblue" },
              { range: [3, 6], color: "blue" },
              { range: [6, 9], color: "darkblue" }
            ],
            threshold: {
              line: { color: "purple", width: 4 },
              thickness: 0.75,
              value: wfreq
            }
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 30, b: 0 }, title: "Belly Button Washing Frequency"};
      Plotly.newPlot('gauge', data, layout);
    });

}

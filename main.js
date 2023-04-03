async function getData() {
  const rawdata = await fetch("./SharkTankIndia.csv");
  const dataText = await rawdata.text();
  let data = d3.csvParse(dataText);

  let height = 400;
  let width = 800;

  data = data.map((d) => ({
    d,
    x: Math.random() * width,
    y: Math.random() * height,
  }));

  const svg = d3.select("svg").attr("viewBox", [0, 0, width, height]);

  const circles = svg
    .append("g")
    .attr("id", "companies")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 3)
    .style("fill", "red");

  const maprawdata = await fetch("./IndianMap.json");
  const mapdataText = await maprawdata.text();
  let india_map = JSON.parse(mapdataText);

  function drawMap() {
    console.log("drawing map");
    const path = d3.geoPath();
    const maps = svg
      .append("g")
      .attr("id", "map")
      .selectAll("path")
      .data(topojson.feature(india_map, india_map.objects.states).features)
      .join("path")
      .attr("class", (d) => {
        return d.properties.district;
      })
      .attr("d", path);

    let parentElement = document.querySelector("svg");
    // Get the parent's first child
    let theFirstChild = parentElement.firstChild;

    // Insert the new element before the first child
    parentElement.insertBefore(document.querySelector("#map"), theFirstChild);

    console.log("map", document.querySelector("#map"));
  }

  function moveLeft() {
    // circles.transition().duration(750).attr("cx", 10);
  }

  function moveX() {
    circles
      .transition()
      .duration(750)
      .attr("cx", (d) => d.x);
  }

  function moveY() {
    circles
      .transition()
      .duration(750)
      .attr("cy", (d) => d.y);
  }

  function moveXY() {
    circles
      .transition()
      .duration(750)
      .attr("cx", (d) => 135.781)
      .attr("cy", (d) => 343.095);
  }

  const callbacks = [moveLeft, drawMap, moveXY];

  // instantiate the scrollama
  const scroller = scrollama();
  const steps = d3.selectAll(".step");
  // setup the instance, pass callback functions
  scroller
    .setup({
      step: ".step",
    })
    .onStepEnter((response) => {
      callbacks[response.index]();
      steps.style("opacity", 0.1);
      d3.select(response.element).style("opacity", 1);
      if (response.element.className === "step step-TotalPitch") {
        console.log(circles);
      }
      // { element, index, direction }
      console.log("enter", response);
    })
    .onStepExit((response) => {
      console.log("exit", response);
      // { element, index, direction }
    });
}
getData();

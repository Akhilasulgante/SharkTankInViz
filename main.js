async function getData() {
  const rawdata = await fetch("./SharkTankIndia.csv");
  const dataText = await rawdata.text();
  const data = d3.csvParse(dataText);
  return data;
}
const height = 400;
const width = 400;
const data = d3
  .range(320)
  .map(() => ({ x: Math.random() * width, y: Math.random() * height }));

const circles = d3
  .select("svg")
  .selectAll("circle")
  .data(data)
  .join("circle")
  .attr("cx", width / 2)
  .attr("cy", height / 2)
  .attr("r", 10)
  .style("fill", "red");

function moveLeft() {
  circles.transition().duration(750).attr("cx", 10);
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

const callbacks = [
  moveLeft,
  moveX,
  moveY,
  moveLeft,
  moveX,
  moveY,
  moveLeft,
  moveX,
  moveY,
  moveLeft,
  moveX,
  moveY,
  moveLeft,
  moveX,
  moveY,
  moveLeft,
  moveX,
  moveY,
  moveLeft,
  moveX,
  moveY,
];

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
    // { element, index, direction }
    console.log("enter", response);
  })
  .onStepExit((response) => {
    console.log("exit", response);
    // { element, index, direction }
  });

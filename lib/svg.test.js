const { SVG } = require("./svg");
const { Square } = require("./shapes");

test("should render a 300 x 200 svg element", () => {
  const expectedSvg =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"></svg>';
  const svg = new SVG();
  expect(svg.render()).toEqual(expectedSvg);
});

test("should append text element", () => {
  const expectedSvg =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><text x="150" y="125" font-family="monospace" font-size="50" text-anchor="middle" fill="white">A</text></svg>';
  const svg = new SVG();
  expect(svg.setText("A", "white")).toEqual(expectedSvg);
});

test("should set text message and color", () => {
  const expectedSvg =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><text x="150" y="125" font-family="monospace" font-size="50" text-anchor="middle" fill="#333">SVG</text></svg>';
  const svg = new SVG();
  expect(svg.setText("SVG", "#333")).toEqual(expectedSvg);
});

// An exception test checks for code that should throw an error.
test("should throw if text exceeds 3 characters", () => {
  const expectedError = new Error("Text must not exceed 3 characters.");
  const svg = new SVG();
  expect(() => svg.setText("HELLO", "#333")).toThrow(expectedError);
});

test("should include a shape", () => {
  const expectedSvg =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect x="90" y="40" width="120" height="120" fill="dodgerblue" /><text x="150" y="125" font-family="monospace" font-size="50" text-anchor="middle" fill="#333">SVG</text></svg>';
  const svg = new SVG();
  const square = new Square("dodgerblue");
  const renderedString = svg.setText("SVG", "#333");
  //svg shape-specific string
  const shapeString = square.render();
  const combinedString = renderedString.replace("svg\">","svg\">" + shapeString);

  expect(combinedString).toEqual(expectedSvg);
});

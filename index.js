const inquirer = require("inquirer");
const MaxLengthInputPrompt = require("inquirer-maxlength-input-prompt");
const fs = require("fs");
const isColor = require("is-color");
const shapeClasses = require("./lib/shapes");
const svgClass = require("./lib/svg");

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)

//Use WRITEFILE to create SVG logo
function writeToFile(data) {
    fs.writeFile("logo.svg", data, (err) => { if (err) console.error(err) });
}

//Inquire user responses
function init() {
    inquirer
        .prompt([
            //text
            {
                type: "maxlength-input",
                message: "What text would you like inside your logo\n",
                maxLength: 3,
                name: "text"
            },
            //shape color
            {
                type: "name",
                message: "Shape color: What color would you like your logo to be? Please enter a color keyword or a hexadecimal value\n",
                name: "color"
            },
            //text color
            {
                type: "name",
                message: "Text color: What color would you like the text inside your logo to be? Please enter a color keyword or a hexadecimal value\n",
                name: "textColor"
            },
            //shape
            {
                type: "list",
                message: "What shape would you like your logo to be?\n",
                choices: ["Square", "Triangle", "Circle"],
                name: "shape"
            }
        ])
        .then(data => {
            data.text = data.text.toUpperCase();

            //in the case that the user does not enter a real shape color
            if (!isColor(data.color)) {
                console.log("\nThe input shape color is not a color. Color will default to aliceblue.\n");
                data.color = "aliceblue";
            }

            //in the case that the user does not enter a real text color
            if (!isColor(data.textColor)) {
                console.log("\nThe input text color is not a color. Color will default to black.\n");
                data.textColor = "black";
            }

            let shape = "";
            switch (data.shape) {
                case "Square":
                    shape = new shapeClasses.Square(data.color, data.text);
                    break;

                case "Triangle":
                    shape = new shapeClasses.Triangle(data.color, data.text);
                    break;

                case "Circle":
                    shape = new shapeClasses.Circle(data.color, data.text);
                    break;
            }

            const svg = new svgClass.SVG;
            //svg document general syntax
            const renderedString = svg.setText(data.text, data.textColor);
            //svg shape-specific string
            const shapeString = shape.render();

            const combinedString = renderedString.replace("svg\">","svg\">" + shapeString); 

            writeToFile(combinedString);
            console.log("Generated logo.svg")

        })
}

//initialize function
init();
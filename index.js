const inquirer = require("inquirer");
const MaxLengthInputPrompt = require("inquirer-maxlength-input-prompt");
const fs = require("fs");
const isColor = require("is-color");

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)

//TODO: create shape parent class, then extend class with
//circle, rectangle, triangle

class SVG {
    constructor() {
        //takes in no arguments, empty constructor
    }
    //renders a 300 x 200 svg element
    render () {
        return "<svg version=\"1.1\" width=\"300\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\"></svg>";
    }

    setText(text, textColor) {
        if (text.length > 3) {
            throw new Error ("Text must not exceed 3 characters.");
        }
        return '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><text x="150" y="125" font-family="monospace" font-size="50" text-anchor="middle" fill="' + textColor + '">' + text + '</text></svg>';
    }
}

class Shape {
    constructor(color, text) {
        this.color = color;
        this.text = text;
    }

    render() {
        //string that is then passed to writeToFile
        return "This is the svg shape";
    }

    setColor(color) {
        this.color = color;
    }
}

class Circle extends Shape {
    constructor(color, text) {
        super(color, text);
    }

    render() {
        return "<circle cx=\"150\" cy=\"100\" r=\"80\" fill=\"" + this.color + "\"/>";
    }
}

class Rectangle extends Shape {
    constructor(color, text) {
        super(color, text);
    }

    render() {
        return "<rect x=\"90\" y=\"40\" width=\"120\" height=\"120\" fill=\"" + this.color + "\"/>";
    }
}

class Triangle extends Shape {
    constructor(color, text) {
        super(color, text);
    }

    render() {
        return "<polygon points=\"150, 18 244, 182 56, 182\" fill=\"" + this.color + "\"/>"
    }
}

//TODO: use WRITEFILE to create SVG logo
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
                choices: ["Rectangle", "Triangle", "Circle"],
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
                case "Rectangle":
                    shape = new Rectangle(data.color, data.text);
                    break;

                case "Triangle":
                    shape = new Triangle(data.color, data.text);
                    break;

                case "Circle":
                    shape = new Circle(data.color, data.text);
                    break;
            }

            const svg = new SVG;
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
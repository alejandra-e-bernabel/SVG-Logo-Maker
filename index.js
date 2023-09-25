const inquirer = require("inquirer");
const MaxLengthInputPrompt = require("inquirer-maxlength-input-prompt");
const fs = require("fs");
const isColor = require("is-color");

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)

//TODO: create shape parent class, then extend class with
//circle, rectangle, triangle

class Shape {
    constructor (color, text) {
        this.color = color;
        this.text = text;
    }

    render() {
        //string that is then passed to writeToFile
        return "This is the sgv shape";
    }
}

class Circle extends Shape {
    constructor (color, text) {
        super (color, text);
    }
}

class Rectangle extends Shape {
    constructor (color, text) {
        super (color, text);
    }
}

class Triangle extends Shape {
    constructor (color, text) {
        super (color, text);
    }
}

//TODO: use WRITEFILE to create SVG logo
function writeToFile(fileName, data) {
    fs.writeFile("logo.sgv", data, (err) => {if (err) console.error(err)});
}

//Inquire user responses
function init() {
    inquirer
        .prompt ([
            //text
            {
                type: "maxlength-input",
                message: "What text would you like inside your logo\n",
                maxLength: 3,
                name: "text"
            },
            //color
            {
                type: "name",
                message: "What color would you like your logo to be? Please enter a color keyword or a hexadecimal value\n",
                name: "color"
            },
            //shape
            {
                type: "list",
                message: "What shape would you like your logo to be?\n",
                choices: ["Rectangle", "Triangle", "Circle"],
                name: "shape"
            }
        ])
        .then (data => {
            console.log ("The shape is " + data.shape);
            console.log ("The color is " + data.color);
            console.log ("The text is " + data.text);

            if (isColor(data.color)) {
                console.log("The input value is a color");
            } else  {
                console.log ("The input value is not a color");
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

        })
}


//initialize function
init();
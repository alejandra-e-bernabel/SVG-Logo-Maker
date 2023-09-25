const inquirer = require("inquirer");
const MaxLengthInputPrompt = require("inquirer-maxlength-input-prompt");

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)

//TODO: create shape parent class, then extend class with
//circle, rectangle, triangle

//TODO: Inquire user responses
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
        })
}

//TODO: use WRITEFILE to create SVG logo

//initialize function
init();
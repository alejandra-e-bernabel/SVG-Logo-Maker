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

    setShape (shape) {
        return 
    }
}

module.exports = {
    SVG
}
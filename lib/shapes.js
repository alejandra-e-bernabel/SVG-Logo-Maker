//will hold shape objects

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

//export shapes using module.exports
module.exports = {
    Circle,
    Triangle,
    Rectangle
}


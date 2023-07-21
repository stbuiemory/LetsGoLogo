const fs = require('fs');
const inquirer = require('inquirer');
const { Triangle, Circle, Square } = require('./lib/shapes');

// Prompts for user to input data
const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Please enter up to 3 characters.',
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Please enter a text color (keyword or hexadecimal number).',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Please choose your shape.',
        choices: [
            'Circle',
            'Triangle',
            'Square'
        ]
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Please enter a shape color (keyword or hexadecimal number).',
    }
]

// SVG File Class
class svgFile {
    constructor() {
        this.textElement = ``;
        this.shapeElement = ``;
    }
    // Render SVG string
    render() {
        return `<svg version="1.1" xmlns="https://www.w3.org/TR/SVG2/" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    // Set SVG shape element
    setShapeElement(shape) {
        this.shapeElement = shape.render()
    }
    // Set SVG text element
    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
}

// Write data to file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            throw err;
        }
        console.log('Generated logo.svg')
    });
}

// Initialize app
function init() {
    let svgText = '';
    let svgLogo = "logo.svg";

    // Prompt user with questions and handle answers
    inquirer.prompt(questions)
        .then(answers => {
            let userText = answers.text;
            let userTextColor = answers.textColor;
            let userShape = answers.shape;
            let userShapeColor = answers.shapeColor;

            // Chosen shape based on user choice
            let shapeChoice;
            if (userShape === `Circle`) {
                shapeChoice = new Circle();
            }
            else if (userShape === `Triangle`) {
                shapeChoice = new Triangle();
            }
            else {
                shapeChoice = new Square();
            }
            shapeChoice.setColor(userShapeColor);

            // SVG instance and add elements
            let logo = new svgFile();
            logo.setTextElement(userText, userTextColor);
            logo.setShapeElement(shapeChoice);
            svgText = logo.render();

            writeToFile(svgLogo, svgText);
        });
}

init();
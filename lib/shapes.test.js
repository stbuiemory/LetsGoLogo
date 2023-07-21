// Test cases for my render methods for circle, triangle and square
const inquirer = require('inquirer');
const { Circle, Triangle, Square } = require("./shapes")

// Circle
describe('Circle', () => {
    test('Circle rendered correctly', () => {
        const shape = new Circle();
        shape.setColor('red');
        expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="red" />`);
    });
});

// Triangle
describe('Triangle', () => {
    test('Triangle rendered correctly', () => {
        const shape = new Triangle();
        shape.setColor('blue');
        expect(shape.render()).toEqual(`<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="blue" />`);
    });
});

// Square
describe('Square', () => {
    test('Square rendered correctly', () => {
        const shape = new Square();
        shape.setColor('yellow');
        expect(shape.render()).toEqual(`<rect x="50" height="200" width="200" fill="yellow" />`);
    });
});
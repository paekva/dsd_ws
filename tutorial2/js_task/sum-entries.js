/** 
 * Credit to https://adventofcode.com/ for this exercise
 * 
 * The list below provides a set of numbers. The objective is to find the two numbers that sum up to 2021. 
 * After finding those numbers, multiply them and store the output in the results variable.
*/ 

const numbers = [1722, 920, 299, 446, 1011, 655];
let results;

// Write your code here
const magicNumber = 2021;

for(var k=0; k<numbers.length; k++) {
    if(numbers[k] > magicNumber) continue;
    
    for(var i = k+1; i < numbers.length; i++) {
        if(numbers[k] + numbers[i] === magicNumber) {
            results = numbers[k] * numbers[i];

            console.warn(numbers[k] + ' ' + numbers[i] + ' ' +  results)

            break;
        }
    }

    if(results) break;
};
/** 
 * Credit to https://adventofcode.com/ for this exercise
 * The list below provides a set of numbers. The objective is to find the three numbers that sum up to 2021. 
 * After finding those numbers, multiply them and store the output in the results variable.
*/ 

const numbers = [1722, 920, 299, 446, 1011, 655];
let results;

// Write your code here
const magicNumber = 2021;

for(var k = 0; k < numbers.length; k++) {
    if(numbers[k] >= magicNumber) continue;

    for(var l=k+1; l<numbers.length; l++) {
        var rest = magicNumber - (numbers[k] + numbers[l]);
        if(rest <= 0) continue;

       var ind = numbers.findIndex((v) => v== rest);

       if( ind != null && ind != k && ind != l && ((numbers[ind] + numbers[l] + numbers[k]) == magicNumber)){
           results = numbers[ind] * numbers[l] * numbers[k];
           console.warn(numbers[k] + ' ' + numbers[l] + ' ' +  numbers[ind] + ' ' + results)
           break;
       }
    }

    if(results) break;
}
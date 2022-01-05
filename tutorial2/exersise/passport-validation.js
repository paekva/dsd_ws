/**
 * Credit to https://adventofcode.com/ for this exercise
 * 
 * Each object in the passportList gives a passport which is represented as a sequence of key:value pairs. 
 * The expected field in the passportList are: byr (Birth Year), iyr (Issue Year), eyr (Expiration Year), hgt (Height), hcl (Hair Color), ecl (Eye Color), pid (Passport ID), cid (Country ID)
 * 
 * The goal is to count the number of passports that are valid. 
 * 
 * In the list, the first passport is valid because all eight fields are present, the second passport is invalid because it is missing hgt field. 
 * The third passport is valid, it only misses the cid field. The fourth passport is missing two fields: cid and byr. Missing cid is fine, but missing any other filed is not, so this passport is invalid.
 * 
 * In the list 2 passwords are valid. Find the number of valid passwords and store the output in the count variable.
 
 */

 const passportList = [
    { ecl: 'gry', pid: '860033327', eyr: '2021', hcl:'#fffffd', byr: '1937', iyr: '2017', cid: '147', hgt: '183cm'},
    { iyr: '2013', ecl: 'amb', cid: '350', eyr: '2023', pid: '028048884', hcl: '#cfa07d', byr: '1929'},
    { hcl: '#ae17e1', iyr: '2013', eyr: '2024', ecl: 'brn', pid: '760753108', byr: '1931', hgt: '179cm'},
    { hcl: '#cfa07d', eyr: '2025', pid: '166559648', iyr: '2011', ecl: 'brn', hgt: '59in'}
];

let count;

// Write your code here

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl',  'pid'];

count = Object.values(passportList).reduce((pv, cv, index) => {
    const fields = Object.keys(cv);

    const isValid = requiredFields.reduce((prev, curr) => prev && fields.includes(curr) && cv[curr] != null, true);
    
    return pv + (isValid ? 1 : 0);
}, 0);

console.warn(count);
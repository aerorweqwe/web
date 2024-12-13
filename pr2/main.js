
function countA(row) {
    return row.split('').filter(char => char.toLowerCase() === 'a').length;
}

function getRow(firstRow, secondRow) {
    const countFirst = countA(firstRow);
    const countSecond = countA(secondRow);

    if (countFirst > countSecond) {
        return firstRow;
    } else if (countSecond > countFirst) {
        return secondRow;
    } else {
        return 'Both rows have the same number of "a" letters';
    }
}

function formattedPhone(phone) {
    const countryCode = phone.slice(0, 3);
    const operatorCode = phone.slice(3, 6); 
    const firstPart = phone.slice(6, 9);
    const secondPart = phone.slice(9, 11); 
    const thirdPart = phone.slice(11); 

    return `${countryCode} (${operatorCode}) ${firstPart}-${secondPart}-${thirdPart}`;
}

console.log(formattedPhone('+380664567890')); 

const firstRow = 'Slow and steady wins the race';
const secondRow = 'You can say that again';

console.log(getRow(firstRow, secondRow)); 
export function random(num) {
    return Math.ceil(Math.random() * num);
}

export function addLog(message, $logs) {
    const logEntry = document.createElement('p');
    logEntry.innerText = message;
    $logs.prepend(logEntry);
}

export function clickCounter(limit) {
    let count = 0;
    return function (button) {
        if (count < limit) {
            count++;
            console.log(`Button ${button} clicked ${count} times. Remaining: ${limit - count}`);
            return true;
        } else {
            console.log(`Button ${button} click limit reached.`);
            return false;
        }
    };
}
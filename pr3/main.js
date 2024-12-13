const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');
const $logs = document.getElementById('logs');

const logs = [
    '[ПЕРСОНАЖ №1] вспомнил что-то важное, но неожиданно [ПЕРСОНАЖ №2], не помня себя от испуга, ударил в предплечье врага.',
    '[ПЕРСОНАЖ №1] поперхнулся, и за это [ПЕРСОНАЖ №2] с испугу приложил прямой удар коленом в лоб врага.',
    '[ПЕРСОНАЖ №1] забылся, но в это время наглый [ПЕРСОНАЖ №2], приняв волевое решение, неслышно подойдя сзади, ударил.',
    '[ПЕРСОНАЖ №1] пришел в себя, но неожиданно [ПЕРСОНАЖ №2] случайно нанес мощнейший удар.',
    '[ПЕРСОНАЖ №1] поперхнулся, но в это время [ПЕРСОНАЖ №2] нехотя раздробил кулаком <вырезанно цензурой> противника.',
    '[ПЕРСОНАЖ №1] удивился, а [ПЕРСОНАЖ №2] пошатнувшись влепил подлый удар.',
    '[ПЕРСОНАЖ №1] высморкался, но неожиданно [ПЕРСОНАЖ №2] провел дробящий удар.',
    '[ПЕРСОНАЖ №1] пошатнулся, и внезапно наглый [ПЕРСОНАЖ №2] беспричинно ударил в ногу противника',
    '[ПЕРСОНАЖ №1] расстроился, как вдруг, неожиданно [ПЕРСОНАЖ №2] случайно влепил стопой в живот соперника.',
    '[ПЕРСОНАЖ №1] пытался что-то сказать, но вдруг, неожиданно [ПЕРСОНАЖ №2] со скуки, разбил бровь сопернику.'
];

function createCharacter(name, defaultHP, healthId, progressbarId) {
    const elHP = document.getElementById(healthId);
    const elProgressbar = document.getElementById(progressbarId);

    function renderHPLife(damageHP) {
        elHP.innerText = `${damageHP} / ${defaultHP}`;
    }

    function renderProgressbarHP(damageHP) {
        const percent = (damageHP / defaultHP) * 100;
        elProgressbar.style.width = `${percent}%`;
        elProgressbar.classList.remove('low', 'critical');

        if (percent <= 20) {
            elProgressbar.classList.add('critical');
        } else if (percent <= 50) {
            elProgressbar.classList.add('low');
        }
    }

    function renderHP(damageHP) {
        renderHPLife(damageHP);
        renderProgressbarHP(damageHP);
    }

    function changeHP(count, enemy) {
        damageHP = Math.max(0, damageHP - count);
        const log = logs[Math.floor(Math.random() * logs.length)]
            .replace('[ПЕРСОНАЖ №1]', name)
            .replace('[ПЕРСОНАЖ №2]', enemy.name);

        renderHP(damageHP);
        addLog(`${log} Втрата: ${count}. Залишилось: ${damageHP}.`);

        if (damageHP === 0) {
            alert(`Бідний ${name} програв битву!`);
            disableButtons();
        }
    }

    let damageHP = defaultHP;

    return { name, changeHP, renderHP };
}

const character = createCharacter("Pikachu", 100, "health-character", "progressbar-character");
const enemy = createCharacter("Charmander", 100, "health-enemy", "progressbar-enemy");

function init() {
    console.log('Start Game!');
    character.renderHP(100);
    enemy.renderHP(100);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function disableButtons() {
    $btnKick.disabled = true;
    $btnSpecial.disabled = true;
}

function addLog(message) {
    const logEntry = document.createElement('p');
    logEntry.innerText = message;
    $logs.prepend(logEntry);
}

$btnKick.addEventListener('click', function () {
    console.log('Kick');
    const damageToEnemy = random(20);
    const damageToCharacter = random(20);
    enemy.changeHP(damageToEnemy, character);
    character.changeHP(damageToCharacter, enemy);
});

$btnSpecial.addEventListener('click', function () {
    console.log('Special Attack');
    const damageToEnemy = random(30);
    const damageToCharacter = random(30);
    enemy.changeHP(damageToEnemy, character);
    character.changeHP(damageToCharacter, enemy);
});

init();

import { logs } from './modules/logs.js';
import { random, clickCounter } from './modules/utils.js';
import { Pokemon } from './modules/pokemon.js';

const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');
const $logs = document.getElementById('logs');

const character = new Pokemon("Pikachu", 100, "health-character", "progressbar-character");
const enemy = new Pokemon("Charmander", 100, "health-enemy", "progressbar-enemy");

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}

const kickCounter = clickCounter(6);
const specialCounter = clickCounter(6);

$btnKick.addEventListener('click', function () {
    if (kickCounter('Kick')) {
        const damageToEnemy = random(20);
        const damageToCharacter = random(20);
        enemy.changeHP(damageToEnemy, character, $logs);
        character.changeHP(damageToCharacter, enemy, $logs);
    }
});

$btnSpecial.addEventListener('click', function () {
    if (specialCounter('Special')) {
        const damageToEnemy = random(30);
        const damageToCharacter = random(30);
        enemy.changeHP(damageToEnemy, character, $logs);
        character.changeHP(damageToCharacter, enemy, $logs);
    }
});

init();
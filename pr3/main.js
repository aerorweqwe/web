const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');

function createCharacter(name, defaultHP, healthId, progressbarId) {
    return {
        name,
        defaultHP,
        damageHP: defaultHP,
        elHP: document.getElementById(healthId),
        elProgressbar: document.getElementById(progressbarId),

        renderHPLife() {
            this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
        },

        renderProgressbarHP() {
            const percent = (this.damageHP / this.defaultHP) * 100;
            this.elProgressbar.style.width = `${percent}%`;
            this.elProgressbar.classList.remove('low', 'critical');

            if (percent <= 20) {
                this.elProgressbar.classList.add('critical');
            } else if (percent <= 50) {
                this.elProgressbar.classList.add('low');
            }
        },

        renderHP() {
            this.renderHPLife();
            this.renderProgressbarHP();
        },

        changeHP(count) {
            this.damageHP = Math.max(0, this.damageHP - count);

            if (this.damageHP === 0) {
                alert(`Бідний ${this.name} програв битву!`);
                disableButtons();
            }

            this.renderHP();
        }
    };
}

const character = createCharacter("Pikachu", 100, "health-character", "progressbar-character");
const enemy = createCharacter("Charmander", 100, "health-enemy", "progressbar-enemy");

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function disableButtons() {
    $btnKick.disabled = true;
    $btnSpecial.disabled = true;
}

$btnKick.addEventListener('click', function () {
    console.log('Kick');
    enemy.changeHP(random(20));
    character.changeHP(random(20));
});

$btnSpecial.addEventListener('click', function () {
    console.log('Special Attack');
    enemy.changeHP(random(30));
    character.changeHP(random(30));
});

init();
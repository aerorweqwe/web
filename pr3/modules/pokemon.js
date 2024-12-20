import { logs } from './logs.js';
import { addLog } from './utils.js';

export class Pokemon {
    constructor(name, defaultHP, healthId, progressbarId) {
        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = defaultHP;
        this.elHP = document.getElementById(healthId);
        this.elProgressbar = document.getElementById(progressbarId);
    }

    renderHPLife() {
        this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
    }

    renderProgressbarHP() {
        const percent = (this.damageHP / this.defaultHP) * 100;
        this.elProgressbar.style.width = `${percent}%`;
        this.elProgressbar.classList.remove('low', 'critical');

        if (percent <= 20) {
            this.elProgressbar.classList.add('critical');
        } else if (percent <= 50) {
            this.elProgressbar.classList.add('low');
        }
    }

    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    changeHP(count, enemy, $logs) {
        this.damageHP = Math.max(0, this.damageHP - count);
        const log = logs[Math.floor(Math.random() * logs.length)]
            .replace('[ПЕРСОНАЖ №1]', this.name)
            .replace('[ПЕРСОНАЖ №2]', enemy.name);

        this.renderHP();
        addLog(`${log} Втрата: ${count}. Залишилось: ${this.damageHP}.`, $logs);

        if (this.damageHP === 0) {
            alert(`Бідний ${this.name} програв битву!`);
        }
    }
}
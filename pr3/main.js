const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');

// Функція створення персонажа
function createCharacter(name, defaultHP, healthId, progressbarId) {
    return {
        name,
        defaultHP,
        damageHP: defaultHP,
        elHP: document.getElementById(healthId),
        elProgressbar: document.getElementById(progressbarId),
    };
}

// Створюємо персонажів
const character = createCharacter("Pikachu", 100, "health-character", "progressbar-character");
const enemy = createCharacter("Charmander", 100, "health-enemy", "progressbar-enemy");

// Функція ініціалізації гри
function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy);
}

// Рендер стану HP
function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

// Оновлення тексту HP
function renderHPLife(person) {
    person.elHP.innerText = `${person.damageHP} / ${person.defaultHP}`;
}

// Оновлення прогрессбару HP
function renderProgressbarHP(person) {
    const percent = (person.damageHP / person.defaultHP) * 100;
    person.elProgressbar.style.width = `${percent}%`;

    // Видаляємо попередні класи
    person.elProgressbar.classList.remove('low', 'critical');

    // Додаємо клас залежно від рівня HP
    if (percent <= 20) {
        person.elProgressbar.classList.add('critical');
    } else if (percent <= 50) {
        person.elProgressbar.classList.add('low');
    }
}

// Зміна HP
function changeHP(count, person) {
    person.damageHP = Math.max(0, person.damageHP - count);

    if (person.damageHP === 0) {
        alert(`Бідний ${person.name} програв битву!`);
        disableButtons();
    }
    
    renderHP(person);
}

// Випадкове число
function random(num) {
    return Math.ceil(Math.random() * num);
}

// Деактивація кнопок
function disableButtons() {
    $btnKick.disabled = true;
    $btnSpecial.disabled = true;
}

// Обробник натискання кнопки "Kick"
$btnKick.addEventListener('click', function () {
    console.log('Kick');
    attack(random(20));
});

// Обробник натискання кнопки "Special Attack"
$btnSpecial.addEventListener('click', function () {
    console.log('Special Attack');
    attack(random(30));
});

// Універсальна функція атаки
function attack(damage) {
    changeHP(damage, enemy);
    changeHP(random(damage), character);
}

init();
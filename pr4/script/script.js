document.addEventListener('DOMContentLoaded', function () {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const sendButton = document.querySelector('#send');

    const questions = [
        {
            question: "Якого кольору бургер?",
            answers: [
                { title: 'Стандарт', url: './image/burger.png' },
                { title: 'Чорний', url: './image/burgerBlack.png' }
            ],
            type: 'radio'
        },
        {
            question: "З якого м'яса котлета?",
            answers: [
                { title: 'Курка', url: './image/chickenMeat.png' },
                { title: 'Яловичина', url: './image/beefMeat.png' },
                { title: 'Свинина', url: './image/porkMeat.png' }
            ],
            type: 'radio'
        },
        {
            question: "Додаткові інгредієнти?",
            answers: [
                { title: 'Помідор', url: './image/tomato.png' },
                { title: 'Огірок', url: './image/cucumber.png' },
                { title: 'Салат', url: './image/salad.png' },
                { title: 'Цибуля', url: './image/onion.png' }
            ],
            type: 'checkbox'
        },
        {
            question: "Додати соус?",
            answers: [
                { title: 'Часниковий', url: './image/sauce1.png' },
                { title: 'Томатний', url: './image/sauce2.png' },
                { title: 'Гірчичний', url: './image/sauce3.png' }
            ],
            type: 'radio'
        }
    ];

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });

    const playTest = () => {
        const finalAnswers = [];
        let numberQuestion = 0;

        const updateButtonVisibility = () => {
            prevButton.style.display = numberQuestion === 0 ? 'none' : 'block';
            nextButton.style.display = numberQuestion === questions.length ? 'none' : 'block';
            sendButton.style.display = numberQuestion === questions.length ? 'block' : 'none';
        };

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${answer.url}" alt="${answer.title}">
                        <span>${answer.title}</span>
                    </label>
                `;
                formAnswers.appendChild(answerItem);
            });
        };

        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = '';
            if (indexQuestion < questions.length) {
                questionTitle.textContent = questions[indexQuestion].question;
                renderAnswers(indexQuestion);
            } else {
                renderFinalScreen();
            }
            updateButtonVisibility();
        };

        const renderFinalScreen = () => {
            questionTitle.textContent = "Завершення опитування";
            formAnswers.innerHTML = `
               <div class="form-group">
                    <label for="numberPhone">Введіть ваш номер телефону</label>
                    <input type="phone" class="form-control" id="numberPhone">
                </div>
            `;
        };

        const checkAnswer = () => {
            const obj = {};
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');

            inputs.forEach((input) => {
                obj[questions[numberQuestion]?.question || "Final"] = input.value;
            });

            finalAnswers[numberQuestion] = obj;
        };

        renderQuestions(numberQuestion);

        nextButton.onclick = () => {
            if (numberQuestion < questions.length) {
                checkAnswer();
            }
            numberQuestion++;
            renderQuestions(numberQuestion);
        };

        prevButton.onclick = () => {
            if (numberQuestion > 0) {
                numberQuestion--;
                renderQuestions(numberQuestion);
            }
        };

        sendButton.onclick = () => {
            const phoneInput = document.querySelector('#numberPhone').value;
            console.log("Ваша відповідь:", finalAnswers);
            console.log("Номер телефону:", phoneInput);

            alert('Дякуємо за ваші відповіді!');

            setTimeout(() => {
                modalBlock.classList.remove('d-block');
            }, 2000); 
        };
    };
});

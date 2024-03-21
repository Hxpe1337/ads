let currentQuestionIndex = 0;
let lives = 5; // Liczba żyć
let score = 0; // Liczba punktów

let wrongAnswers = 0; // Liczba błędnych odpowiedzi
const questions = [
  { question: "Co oznacza 'brazo' po polsku?", answers: ["Noga", "Ręka", "Ucho", "Oko"], correct: 1 },
  { question: "Jak po hiszpańsku powiemy 'stopa'?", answers: ["El pie", "La mano", "El codo", "La cabeza"], correct: 0 },
  { question: "Jakiego słowa użyjemy mówiąc po hiszpańsku 'przyjaciel'?", answers: ["Amiga", "Amigo", "Chico", "Chica"], correct: 1 },
  { question: "Jak przetłumaczymy 'relajarse'?", answers: ["Zrelaksować się", "Wysilać się", "Podnieść się", "Biegać"], correct: 0 },
  { question: "Jak powiemy 'kłamać' po hiszpańsku?", answers: ["Decir", "Hablar", "Mentir", "Escribir"], correct: 2 },
  { question: "Co znaczy 'divertirse'?", answers: ["Zmęczyć się", "Cieszyć się", "Uczyć się", "Denerwować się"], correct: 1 },
  { question: "Co oznacza 'serio'?", answers: ["Śmieszny", "Wesoły", "Poważny", "Zmartwiony"], correct: 2 },
  { question: "Co znaczy hiszpańskie słowo 'cabeza'?", answers: ["Ramię", "Kolano", "Głowa", "Pięta"], correct: 2 },
  { question: "Jak po hiszpańsku jest 'palec'?", answers: ["El dedo", "La boca", "El brazo", "La pierna"], correct: 0 },
  { question: "Jak przetłumaczymy 'dormir la siesta'?", answers: ["Iść spać", "Położyć się", "Zdrzemnąć się", "Odpoczywać"], correct: 2 },
  { question: "Co oznacza 'comer'?", answers: ["Biegać", "Śpiewać", "Jeść", "Pisać"], correct: 2 },
  { question: "Jak hiszpańskie 'estar de buen humor' przetłumaczymy na polski?", answers: ["Być w złym humorze", "Być w dobrym nastroju", "Być smutnym", "Być zdenerwowanym"], correct: 1 },
  { question: "Jakiego wyrażenia użyjemy mówiąc 'podróżować' po hiszpańsku?", answers: ["Viajar", "Dormir", "Comer", "Descansar"], correct: 0 },
  { question: "Jak powiemy 'ryba' po hiszpańsku?", answers: ["El pez", "El pollo", "La vaca", "El cerdo"], correct: 0 },
  { question: "Co znaczy 'cansado'?", answers: ["Głodny", "Spragniony", "Zmęczony", "Chory"], correct: 2 },
  { question: "Jak przetłumaczymy 'aburrido'?", answers: ["Zainteresowany", "Znudzony", "Zabawny", "Szczęśliwy"], correct: 1 },
  { question: "Co oznacza 'la nariz'?", answers: ["Usta", "Oczy", "Nos", "Włosy"], correct: 2 },
  { question: "Jak po hiszpańsku powiemy 'długość'?", answers: ["La anchura", "La altura", "La longitud", "El peso"], correct: 2 },
  { question: "Co znaczy 'abierto'?", answers: ["Zamknięty", "Szczęśliwy", "Otwarty", "Wypełniony"], correct: 2 },
  { question: "Co znaczy 'estar de pie' w języku hiszpańskim?", answers: ["być smutnym", "stać", "biegać", "być zadowolonym"], correct: 1 },
  { question: "Jak po hiszpańsku jest 'szyja'?", answers: ["la cabeza", "el cuello", "el dedo", "el ojo"], correct: 1 },
  { question: "Jak powiesz 'łokieć' po hiszpańsku?", answers: ["la rodilla", "el codo", "la mano", "el pie"], correct: 1 },
  // ... Wstaw tu kolejne pytania ...
  { question: "Jak przetłumaczymy 'sentarse'?", answers: ["leżeć", "stać", "siedzieć", "chodzić"], correct: 2 },
  // ... Kontynuuj dodawanie pytań ...
  { question: "Co oznacza 'alegre'?", answers: ["smutny", "zadowolony", "zamyślony", "zirytowany"], correct: 1 },
  { question: "Co oznacza hiszpańskie 'hacer gimnasia'?", answers: ["robić zakupy", "grać na instrumencie", "ćwiczyć gimnastykę", "gotować"], correct: 2 },

];
function startGame() {
    const nickname = document.getElementById("nickname-input").value;
    if (nickname) {
      document.getElementById("nickname-form").style.display = "none";
      document.querySelector(".quiz-container").style.display = "block";
      showQuestion(currentQuestionIndex);
      displayLives(); // Wywołanie funkcji do wyświetlania liczby żyć
    } else {
      alert("Wprowadź swój nick!");
    }
  }
  
  function showQuestion(questionIndex) {
    const quiz = document.getElementById("quiz");
    const questionObj = questions[questionIndex];
    let questionText = questionObj.question;
  
    // Zastąp pojedyncze cudzysłowy i zawarty w nich tekst tagiem <span>
    questionText = questionText.replace(/'([^']+)'/g, "<span class='highlighted'>$1</span>");
  
    document.getElementById("question").innerHTML = questionText; // Użyj innerHTML zamiast innerText, aby uwzględnić tagi HTML
  
    const buttons = quiz.querySelectorAll(".answer-btn");
    buttons.forEach((button, index) => {
      button.innerText = questionObj.answers[index];
      button.disabled = false;
      button.style.backgroundColor = ""; // Resetowanie koloru tła przycisku
    });
  }
  function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Przemieszaj tylko pierwszych 10 pytań przed rozpoczęciem gry
  shuffleQuestions(questions.slice(0, 10));
  function finishQuiz() {
    // Wyświetl wyniki końcowe
    document.getElementById('final-score').innerText = score;
  
    // Pokaż kontener z przewijanym tekstem
    document.getElementById('crawl-container').style.display = 'block';
  
    // Po zakończeniu przewijania (lub po upływie czasu) ukryj kontener
    setTimeout(function() {
      document.getElementById('crawl-container').style.display = 'none';
    }, 60000); // 60 sekund to czas trwania animacji przewijania tekstu
  }
  
  function checkAndDisplayImage() {
    const image = document.getElementById("special-image");
    if (currentQuestionIndex == 7) { 
      image.style.display = "block";
      // Ustaw timer, który ukryje obrazek po 0.5 sekundy (500 milisekund)
      setTimeout(function() {
        image.style.display = "none";
      }, 200);
    }
  }
  
  
  function selectAnswer(answerIndex) {
    const question = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".answer-btn");
  
    if (answerIndex === question.correct) {
      score++; // Zwiększ punkty za poprawną odpowiedź
      if (currentQuestionIndex < questions.length - 1) {
        document.getElementById('correct-effect').style.display = 'block';
        checkAndDisplayImage(); // Call the function to check if it's time to display the image

        setTimeout(function() {
            document.getElementById('correct-effect').style.display = 'none';
        }, 1000);

        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateProgress(); // Aktualizuj postęp po każdej odpowiedzi
        } else {
          document.querySelector(".quiz-container").style.display = "none";
          alert(`Gratulacje, ukończyłeś quiz!`); 
        }
    } else {
        document.getElementById('glow-effect').style.display = 'block';
        
        // Wyłączenie efektu "glow" po 1 sekundzie
        setTimeout(function() {
            document.getElementById('glow-effect').style.display = 'none';
        }, 1000);
        


        buttons[answerIndex].style.backgroundColor = "lightcoral";
        buttons[answerIndex].disabled = true;
        lives--;
        wrongAnswers++;
        displayLives(); // Aktualizacja liczby żyć

        if (lives === 0 || wrongAnswers % 5 === 0) {
            const messageText = document.getElementById("message-text");
            const messageContainer = document.getElementById("message-container");
    
            // Rozmycie tła zamiast ukrywania
            document.querySelector(".quiz-container").classList.add("blur-effect");
            messageContainer.style.display = "block";
    
            if (lives === 0) {
                messageText.innerText = "Koniec gry!";
            } else {
                messageText.innerText = "Przekroczyłeś limit błędnych odpowiedzi! Koniec gry.";
            }
        }
    }
}
function updateProgress() {
  const progressText = `Odpowiedziano ${currentQuestionIndex + 1} z ${questions.length} pytań`;
  document.getElementById("progress").innerText = progressText;
}

  function displayLives() {
    const livesContainer = document.getElementById("lives");
    livesContainer.innerHTML = "";
    for (let i = 0; i < lives; i++) {
      // Dodanie klasy 'life-icon' do tagu <img>
      livesContainer.innerHTML += "<img src='spain.png' alt='Życie' class='life-icon'>";
    }
  }
  function restartGame() {
    currentQuestionIndex = 0;
    lives = 5;
    score = 0;
    wrongAnswers = 0;
    document.getElementById("message-container").style.display = "none";
    document.querySelector(".quiz-container").style.display = "none"; // Ukryj kontener quizu, aby ponownie pokazać formularz z nickiem
    document.getElementById("nickname-form").style.display = "block"; // Pokaż formularz z nickiem
    document.querySelector(".quiz-container").classList.remove("blur-effect"); // Usuń efekt rozmycia, jeśli był zastosowany
    // Resetuj wszelkie inne zmiany stanu interfejsu, które były stosowane podczas gry
    // Może to obejmować usunięcie specyficznych dla gry klas CSS, resetowanie tekstu lub stanu przycisków itp.
    updateProgress(); // Zaktualizuj postęp, aby odzwierciedlił reset
}
  function startGame() {
    document.getElementById("nickname-form").style.display = "none";
    document.querySelector(".quiz-container").style.display = "block";
    showQuestion(currentQuestionIndex);
    displayLives(); // Wywołanie funkcji do wyświetlania liczby żyć
    updateProgress(); // Aktualizacja postępu na początku gry
}

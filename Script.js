document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const heartsContainer = document.querySelector(".hearts-container");
  const nameInput = document.getElementById("nameInput");
  const enterBtn = document.getElementById("enterBtn");
  const errorMsg = document.getElementById("errorMsg");
  const friendName = document.getElementById("friendName");
  const footerText = document.getElementById("footerText");
  const finalMessage = document.getElementById("finalMessage");
  const photoCards = document.querySelectorAll(".photo-card");

  // Floating hearts animation
  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 800);

  // Show specific section
  function showSection(id) {
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  // Handle "Enter" button
  enterBtn.addEventListener("click", () => {
    const val = nameInput.value.trim().toLowerCase();
    const name = nameInput.value.trim();

    if (val === "lisa" || val === "kritika") {
      friendName.textContent = `Forever & Always, ${name}!`;
      footerText.textContent = `Happy Friendship Day, ${name}! 🎉✨🌸`;
      finalMessage.innerHTML = finalMessage.innerHTML.replace("[name]", name);
      showSection("section2");
      errorMsg.textContent = "";

      // Hide back button in section2
      const section2 = document.getElementById("section2");
      const backBtn = section2.querySelector(".backBtn");
      if (backBtn) backBtn.style.display = "none";
    } else {
      errorMsg.textContent = "Wrong name! Try again.";
    }
  });

  // Handle photo card clicks
  photoCards.forEach(card => {
    card.addEventListener("click", () => {
      photoCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      document.getElementById("mainText").textContent = card.dataset.text;
    });
  });

  // Navigation
  document.getElementById("moreBtn").addEventListener("click", () => showSection("section3"));
  document.getElementById("playBtn").addEventListener("click", () => showSection("section4"));

  // Back buttons (except section2)
  document.querySelectorAll(".backBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      showSection("section1");
    });
  });

  // Game navigation
  document.getElementById("memoryGameBtn").addEventListener("click", startMemoryGame);
  document.getElementById("targetGameBtn").addEventListener("click", startTargetGame);
  document.getElementById("quizGameBtn").addEventListener("click", startQuiz);

  /* ---------- MEMORY GAME ---------- */
  function startMemoryGame() {
    const memoryGame = document.getElementById("memoryGame");
    memoryGame.innerHTML = "";
    showSection("memorySection");

    const emojis = ["😀", "😍", "🥳", "😎", "🤩", "😘", "🎉", "💕"];
    const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    let flipped = [];

    cards.forEach(emoji => {
      const card = document.createElement("div");
      card.classList.add("memory-card");
      card.textContent = "❓";
      memoryGame.appendChild(card);

      card.addEventListener("click", () => {
        if (card.classList.contains("flipped") || flipped.length === 2) return;
        card.classList.add("flipped");
        card.textContent = emoji;
        flipped.push(card);

        if (flipped.length === 2) {
          setTimeout(() => {
            if (flipped[0].textContent === flipped[1].textContent) {
              flipped[0].classList.add("matched");
              flipped[1].classList.add("matched");
            } else {
              flipped.forEach(c => {
                c.classList.remove("flipped");
                c.textContent = "❓";
              });
            }
            flipped = [];
          }, 800);
        }
      });
    });
  }

  /* ---------- TARGET GAME ---------- */
  function startTargetGame() {
    const targetBoard = document.getElementById("targetBoard");
    const scoreDisplay = document.getElementById("scoreDisplay");
    const startBtn = document.getElementById("startTargetGame");
    let score = 0;
    let time = 15;
    let interval;

    showSection("targetSection");
    targetBoard.innerHTML = "";
    scoreDisplay.textContent = "Score: 0";
    startBtn.textContent = "Start";

    startBtn.onclick = () => {
      if (startBtn.textContent === "Start") {
        score = 0;
        scoreDisplay.textContent = "Score: 0";
        startBtn.textContent = "Stop";
        interval = setInterval(spawnTarget, 800);
        setTimeout(endGame, time * 1000);
      } else {
        endGame();
      }
    };

    function spawnTarget() {
      targetBoard.innerHTML = "";
      const target = document.createElement("div");
      target.classList.add("target");
      target.style.top = Math.random() * 210 + "px";
      target.style.left = Math.random() * 210 + "px";
      target.addEventListener("click", () => {
        score++;
        scoreDisplay.textContent = "Score: " + score;
      });
      targetBoard.appendChild(target);
    }

    function endGame() {
      clearInterval(interval);
      targetBoard.innerHTML = "";
      startBtn.textContent = "Start";
      alert("Game Over! Your score: " + score);
    }
  }

  /* ---------- QUIZ GAME ---------- */
  const quizQuestions = [
    { q: "What Game We First Meet?", a: "Brookhaven" },
    { q: "Which color do I like the most?", a: "Red" },
    { q: "Who is handsome u or me?", a: "You" }
  ];
  let currentQuiz = 0;

  function startQuiz() {
    currentQuiz = 0;
    showSection("quizSection");
    document.getElementById("quizBox").innerHTML = `
      <p id="quizQuestion">Question will appear here</p>
      <input id="quizInput" placeholder="Your answer..." />
      <button id="quizSubmit">Submit</button>
    `;
    document.getElementById("quizResult").textContent = "";
    loadQuestion();

    document.getElementById("quizSubmit").addEventListener("click", () => {
      const userAnswer = document.getElementById("quizInput").value.trim().toLowerCase();
      const correctAnswer = quizQuestions[currentQuiz].a.toLowerCase();
      const result = document.getElementById("quizResult");

      if (userAnswer === correctAnswer) {
        result.textContent = "Correct! 🎉";
        currentQuiz++;
        setTimeout(() => {
          document.getElementById("quizInput").value = "";
          result.textContent = "";
          loadQuestion();
        }, 800);
      } else {
        result.textContent = "Nope! Try again. 💔";
      }
    });
  }

  function loadQuestion() {
    if (currentQuiz >= quizQuestions.length) {
      document.getElementById("quizBox").innerHTML = "<h3>🎉 You finished the quiz! 🎉</h3>";
      return;
    }
    document.getElementById("quizQuestion").textContent = quizQuestions[currentQuiz].q;
  }
});

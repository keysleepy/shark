document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation toggle
  const navToggle = document.querySelector(".nav-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")

      // Animate hamburger to X
      const bars = document.querySelectorAll(".bar")
      bars.forEach((bar) => {
        bar.classList.toggle("active")
      })
    })
  }

  // Quiz functionality
  const quizData = [
    {
      question: "How long have sharks existed on Earth?",
      options: ["50 million years", "150 million years", "300 million years", "450 million years"],
      answer: 3,
    },
    {
      question: "Which shark is the largest fish in the sea?",
      options: ["Great White Shark", "Whale Shark", "Basking Shark", "Megamouth Shark"],
      answer: 1,
    },
    {
      question: "What is the primary reason for the decline in shark populations worldwide?",
      options: ["Climate change", "Natural predators", "Human fishing activities", "Disease"],
      answer: 2,
    },
    {
      question: "Which of these is NOT a feature of shark anatomy?",
      options: ["Cartilaginous skeleton", "Multiple rows of teeth", "Gills for breathing", "Swim bladder"],
      answer: 3,
    },
    {
      question: "Approximately how many species of sharks exist today?",
      options: ["Around 100", "Around 250", "Around 500", "Around 1,000"],
      answer: 2,
    },
    {
      question: "What is the purpose of a shark's lateral line?",
      options: [
        "To detect electrical fields",
        "To sense movement and vibration in water",
        "To regulate body temperature",
        "To produce bioluminescence",
      ],
      answer: 1,
    },
    {
      question: "Which movie is most credited with creating widespread fear of sharks?",
      options: ["The Meg", "Deep Blue Sea", "Jaws", "Sharknado"],
      answer: 2,
    },
    {
      question: "What percentage of shark species are considered potentially dangerous to humans?",
      options: ["Less than 5%", "About 25%", "About 50%", "More than 75%"],
      answer: 0,
    },
    {
      question: "Which shark has the strongest bite force of any fish?",
      options: ["Great White Shark", "Bull Shark", "Tiger Shark", "Mako Shark"],
      answer: 0,
    },
    {
      question: "What is the practice of removing shark fins and discarding the rest of the shark called?",
      options: ["Shark culling", "Shark finning", "Shark harvesting", "Shark trawling"],
      answer: 1,
    },
  ]

  // Quiz elements
  const startQuizBtn = document.getElementById("start-quiz")
  const quizIntro = document.getElementById("quiz-intro")
  const quizQuestions = document.getElementById("quiz-questions")
  const quizResults = document.getElementById("quiz-results")
  const questionContainer = document.getElementById("question-container")
  const progressFill = document.getElementById("progress-fill")
  const currentQuestionEl = document.getElementById("current-question")
  const totalQuestionsEl = document.getElementById("total-questions")
  const prevQuestionBtn = document.getElementById("prev-question")
  const nextQuestionBtn = document.getElementById("next-question")
  const scoreNumberEl = document.getElementById("score-number")
  const scoreMessageEl = document.getElementById("score-message")
  const resultsBreakdownEl = document.getElementById("results-breakdown")
  const retryQuizBtn = document.getElementById("retry-quiz")

  // Quiz state
  let currentQuestion = 0
  const userAnswers = Array(quizData.length).fill(null)

  // Initialize quiz
  totalQuestionsEl.textContent = quizData.length

  // Start quiz
  if (startQuizBtn) {
    startQuizBtn.addEventListener("click", () => {
      quizIntro.classList.remove("active")
      quizQuestions.classList.add("active")
      renderQuestion()
    })
  }

  // Render current question
  function renderQuestion() {
    const question = quizData[currentQuestion]
    currentQuestionEl.textContent = currentQuestion + 1

    // Update progress bar
    const progress = ((currentQuestion + 1) / quizData.length) * 100
    progressFill.style.width = `${progress}%`

    // Create question HTML
    let questionHTML = `
      <div class="question-text">${currentQuestion + 1}. ${question.question}</div>
      <ul class="options-list">
    `

    question.options.forEach((option, index) => {
      const isChecked = userAnswers[currentQuestion] === index ? "checked" : ""
      questionHTML += `
        <li class="option-item">
          <input type="radio" id="option${index}" name="question${currentQuestion}" class="option-radio" value="${index}" ${isChecked}>
          <label for="option${index}" class="option-label">
            <span class="option-marker"></span>
            <span>${option}</span>
          </label>
        </li>
      `
    })

    questionHTML += `</ul>`
    questionContainer.innerHTML = questionHTML

    // Add event listeners to options
    const optionInputs = document.querySelectorAll(".option-radio")
    optionInputs.forEach((input) => {
      input.addEventListener("change", (e) => {
        userAnswers[currentQuestion] = Number.parseInt(e.target.value)
        updateNavButtons()
      })
    })

    // Update navigation buttons
    updateNavButtons()
  }

  // Update navigation buttons state
  function updateNavButtons() {
    prevQuestionBtn.disabled = currentQuestion === 0

    if (currentQuestion === quizData.length - 1) {
      nextQuestionBtn.textContent = "Finish Quiz"
    } else {
      nextQuestionBtn.textContent = "Next"
    }

    // Enable next button if user has answered current question
    nextQuestionBtn.disabled = userAnswers[currentQuestion] === null
  }

  // Navigate to previous question
  if (prevQuestionBtn) {
    prevQuestionBtn.addEventListener("click", () => {
      if (currentQuestion > 0) {
        currentQuestion--
        renderQuestion()
      }
    })
  }

  // Navigate to next question or finish quiz
  if (nextQuestionBtn) {
    nextQuestionBtn.addEventListener("click", () => {
      if (currentQuestion < quizData.length - 1) {
        currentQuestion++
        renderQuestion()
      } else {
        finishQuiz()
      }
    })
  }

  // Finish quiz and show results
  function finishQuiz() {
    quizQuestions.classList.remove("active")
    quizResults.classList.add("active")

    // Calculate score
    const score = userAnswers.reduce((total, answer, index) => {
      return total + (answer === quizData[index].answer ? 1 : 0)
    }, 0)

    // Update score display
    scoreNumberEl.textContent = score

    // Set appropriate message based on score
    if (score >= 9) {
      scoreMessageEl.textContent = "Shark Expert!"
    } else if (score >= 7) {
      scoreMessageEl.textContent = "Great Job!"
    } else if (score >= 5) {
      scoreMessageEl.textContent = "Good Effort!"
    } else {
      scoreMessageEl.textContent = "Keep Learning!"
    }

    // Generate results breakdown
    let breakdownHTML = ""

    quizData.forEach((question, index) => {
      const isCorrect = userAnswers[index] === question.answer
      const iconClass = isCorrect ? "correct-icon" : "incorrect-icon"

      breakdownHTML += `
        <div class="result-item">
          <div class="result-icon ${iconClass}"></div>
          <div class="result-text">
            <div>${index + 1}. ${question.question}</div>
            <div class="result-answer">Correct answer: ${question.options[question.answer]}</div>
          </div>
        </div>
      `
    })

    resultsBreakdownEl.innerHTML = breakdownHTML
  }

  // Retry quiz
  if (retryQuizBtn) {
    retryQuizBtn.addEventListener("click", () => {
      // Reset quiz state
      currentQuestion = 0
      userAnswers.fill(null)

      // Show questions screen
      quizResults.classList.remove("active")
      quizQuestions.classList.add("active")

      // Render first question
      renderQuestion()
    })
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")

          // Reset hamburger
          const bars = document.querySelectorAll(".bar")
          bars.forEach((bar) => {
            bar.classList.remove("active")
          })
        }
      }
    })
  })

  // Add animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".threat-item, .myth-card, .culture-item, .stat-item")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.classList.add("animate")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)

  // Initialize animation on load
  animateOnScroll()
})

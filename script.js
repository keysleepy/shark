document.addEventListener("DOMContentLoaded", () => {
  // Intro animation
  setTimeout(() => {
    document.getElementById("intro").style.opacity = "0"
    document.getElementById("intro").style.transition = "opacity 1s ease"

    setTimeout(() => {
      document.getElementById("intro").style.display = "none"
      document.getElementById("main-content").classList.remove("hidden")
    }, 1000)
  }, 2500) // Show intro for 2.5 seconds

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

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")

        // Reset hamburger
        const bars = document.querySelectorAll(".bar")
        bars.forEach((bar) => {
          bar.classList.remove("active")
        })
      }
    })
  })

  // Add wave effect on hover for buttons
  const buttons = document.querySelectorAll(".cta-button, .learn-more")
  buttons.forEach((button) => {
    button.addEventListener("mouseover", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left
      const y = e.clientY - e.target.getBoundingClientRect().top

      const ripple = document.createElement("span")
      ripple.classList.add("ripple")
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add parallax effect to hero section
  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`
      }
    })
  }

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".info-card, .timeline-content, .species-card, .everything-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.classList.add("animate")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)

  // Initialize animation on load
  animateOnScroll()
})

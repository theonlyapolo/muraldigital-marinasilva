// Get all cards
const cards = document.querySelectorAll(".card")

cards.forEach((card) => {
  const cardFront = card.querySelector(".card-front")
  const closeBtn = card.querySelector(".close-btn")

  // Track if this is a touch device
  let isTouchDevice = false

  // Handle both touch and click events
  const flipCard = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Close all other cards first
    cards.forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.classList.remove("flipped")
      }
    })

    // Flip this card
    card.classList.add("flipped")
  }

  const closeCard = (e) => {
    e.preventDefault()
    e.stopPropagation()
    card.classList.remove("flipped")
  }

  // Touch events for mobile
  cardFront.addEventListener(
    "touchstart",
    (e) => {
      isTouchDevice = true
    },
    { passive: false },
  )

  cardFront.addEventListener("touchend", flipCard, { passive: false })

  // Click events for desktop
  cardFront.addEventListener("click", (e) => {
    if (!isTouchDevice) {
      flipCard(e)
    }
  })

  // Close button events
  closeBtn.addEventListener("touchend", closeCard, { passive: false })
  closeBtn.addEventListener("click", (e) => {
    if (!isTouchDevice) {
      closeCard(e)
    }
  })
})

// Add floating leaves animation
function createLeaf() {
  const leaf = document.createElement("div")
  leaf.textContent = "🍃"
  leaf.style.position = "fixed"
  leaf.style.fontSize = Math.random() * 20 + 20 + "px"
  leaf.style.left = Math.random() * 100 + "%"
  leaf.style.top = "-50px"
  leaf.style.opacity = Math.random() * 0.5 + 0.3
  leaf.style.pointerEvents = "none"
  leaf.style.zIndex = "0"
  leaf.style.transition = "transform 0.1s ease"

  document.body.appendChild(leaf)

  const duration = Math.random() * 10000 + 10000
  const drift = Math.random() * 200 - 100

  let position = -50
  const interval = setInterval(() => {
    position += 2
    const wobble = Math.sin(position / 20) * 30
    leaf.style.transform = `translateY(${position}px) translateX(${wobble + drift}px) rotate(${position}deg)`

    if (position > window.innerHeight + 50) {
      clearInterval(interval)
      leaf.remove()
    }
  }, 50)
}

// Create leaves periodically
setInterval(createLeaf, 3000)

// Create initial leaves
for (let i = 0; i < 5; i++) {
  setTimeout(createLeaf, i * 600)
}

// Add keyboard support for accessibility
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cards.forEach((card) => card.classList.remove("flipped"))
  }
})

// Add touch support for mobile
cards.forEach((card) => {
  let touchStartTime

  card.addEventListener("touchstart", () => {
    touchStartTime = Date.now()
  })

  card.addEventListener("touchend", (e) => {
    const touchDuration = Date.now() - touchStartTime
    if (touchDuration < 500) {
      // Quick tap
      e.preventDefault()
    }
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

// Add active class to navigation based on scroll position
window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// Add CSS for active navigation state
const style = document.createElement("style");
style.textContent = `
            .nav-link.active {
                background: #34495e;
                color: #ff6b6b;
            }
        `;
document.head.appendChild(style);

// Interactive progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll(".progress-fill");
    progressBars.forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0%";
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Trigger progress bar animation when goals section is visible
const goalsSection = document.getElementById("goals");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateProgressBars();
        }
    });
});
observer.observe(goalsSection);

// Add hover effects to evidence cards
document.querySelectorAll(".evidence-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
        this.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
    });

    card.addEventListener("mouseleave", function () {
        this.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    });
});

// Print-friendly adjustments
window.addEventListener("beforeprint", () => {
    document.body.style.background = "white";
    document.querySelectorAll(".evidence-placeholder").forEach((placeholder) => {
        placeholder.style.border = "1px solid #ccc";
    });
});

window.addEventListener("afterprint", () => {
    document.body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    document.querySelectorAll(".evidence-placeholder").forEach((placeholder) => {
        placeholder.style.border = "2px dashed #dee2e6";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".ppmr-card");
    const modal = document.getElementById("ppmr-modal");
    const modalBody = document.getElementById("ppmr-modal-body");
    const closeBtn = document.querySelector(".ppmr-close");
    const overlay = document.querySelector(".ppmr-modal-overlay");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const target = card.dataset.target;
            const section = document.querySelector(
                `.reflection-section[data-section="${target}"]`
            );

            if (!section) return;

            modalBody.innerHTML = section.innerHTML;
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        });
    });

    function closeModal() {
        modal.style.display = "none";
        modalBody.innerHTML = "";
        document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeModal();
    });
});
document.querySelectorAll("[data-carousel]").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = track.children;
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    let index = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    // Auto-rotate every 4 seconds
    setInterval(() => {
        index = (index + 1) % slides.length;
        updateCarousel();
    }, 4000);
});

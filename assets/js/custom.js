document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scroll Effect
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Fade-In Effect for Sections on Scroll
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
        if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.add("visible");
        }
    });

    // Hover Animations for App Sections
    document.querySelectorAll(".app-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.05)";
            card.style.transition = "transform 0.3s ease";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });

    // Floating "Back to Top" Button
    const backToTop = document.createElement("button");
    backToTop.innerText = "↑";
    backToTop.classList.add("back-to-top");
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    // Email Form Validation & Success Message
    document.querySelector("form.cta").addEventListener("submit", function (e) {
        e.preventDefault();
        const emailInput = document.querySelector("#email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(emailInput.value)) {
            alert("Please enter a valid email address.");
        } else {
            alert("Thank you for subscribing!");
            emailInput.value = "";
        }
    });
});

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
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
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
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    // Email Form Submission (Prevents Redirect & Shows Message)
    const form = document.getElementById("subscribeForm");
    const message = document.getElementById("subscribeMessage");

    if (!form || !message) {
        console.error("Form elements not found!");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const emailInput = document.getElementById("email");
        if (!emailInput) {
            console.error("Email input field not found!");
            return;
        }

        const emailValue = emailInput.value.trim();
        console.log("Email Entered:", emailValue);

        if (!emailValue) {
            message.textContent = "Please enter a valid email.";
            message.style.color = "red";
            return;
        }

        // Google Forms Submission URL and Entry ID
        const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLScezShGgSc29JaRTVFABaDVuCR_IFzVx6-6r3xQiYVylq1mKg/formResponse";
        const entryID = "entry.254437408";

        // Create form data object
        const formData = new FormData();
        formData.append(entryID, emailValue);

        console.log("Submitting form to Google...");

        // Send data using Fetch API (Prevents Redirection)
        fetch(googleFormURL, {
            method: "POST",
            mode: "no-cors",
            body: formData
        })
        .then(() => {
            console.log("Form submitted successfully!");
            message.textContent = "Thank you for subscribing!";
            message.style.color = "green";

            // Hide form after submission
            setTimeout(() => {
                form.style.display = "none";
            }, 2000);
        })
        .catch((error) => {
            console.error("Error submitting form:", error);
            message.textContent = "Error subscribing. Please try again.";
            message.style.color = "red";
        });
    });
});

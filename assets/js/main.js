(function ($) {
    var $window = $(window),
        $body = $('body');

    // Ensure jQuery is available
    if (typeof jQuery === "undefined") {
        console.error("jQuery is not loaded!");
        return;
    }

    // Ensure `browser` is defined
    if (typeof browser === "undefined") {
        console.warn("browser.min.js is missing or not loaded correctly.");
    }

    // Play initial animations on page load
    $window.on('load', function () {
        setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Enable touch mode if on mobile
    if (typeof browser !== "undefined" && browser.mobile) {
        $body.addClass('is-touch');
    }

    // Smooth scrolling for internal links
    $('a[href^="#"]').on("click", function (e) {
        e.preventDefault();
        const target = $(this.getAttribute("href"));
        if (target.length) {
            target[0].scrollIntoView({ behavior: "smooth" });
        }
    });

    // Fade-In Effect for Sections on Scroll using IntersectionObserver
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            let visibility = entry.intersectionRatio;
            entry.target.style.opacity = visibility > 0.4 ? "1" : `${visibility}`;
            entry.target.style.transform = `translateY(${20 * (1 - visibility)}px)`;

            if (visibility > 0.4) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] });

    // Observe sections, app cards, team cards
    document.querySelectorAll("section").forEach(section => observer.observe(section));
    document.querySelectorAll(".app-card").forEach(card => observer.observe(card));
    document.querySelectorAll(".team-card").forEach(card => observer.observe(card));

    // Hover Animations for App Cards
    $(".app-card").on("mouseenter", function () {
        $(this).css("transform", "scale(1.05)");
        $(this).css("transition", "transform 0.3s ease");
    }).on("mouseleave", function () {
        $(this).css("transform", "scale(1)");
    });

    // Floating "Back to Top" Button
    const backToTop = $("<button>").text("↑").addClass("back-to-top").appendTo("body");
    backToTop.on("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    $(window).on("scroll", function () {
        backToTop.css("display", window.scrollY > 300 ? "block" : "none");
    });

    // Email Form Submission
    const form = document.getElementById("subscribeForm");
    const message = document.getElementById("subscribeMessage");

    if (form && message) {
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
                message.style.opacity = "1";
                return;
            }

            // Google Forms Submission URL
            const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLScezShGgSc29JaRTVFABaDVuCR_IFzVx6-6r3xQiYVylq1mKg/formResponse";
            const entryID = "entry.254437408";

            // Create form data object
            const formData = new FormData();
            formData.append(entryID, emailValue);

            console.log("Submitting form to Google...");

            // Send data using Fetch API
            fetch(googleFormURL, {
                method: "POST",
                mode: "no-cors",
                body: formData
            })
            .then(() => {
                console.log("Form submitted successfully!");
                form.style.transition = "opacity 0.5s ease-out";
                form.style.opacity = "0";

                setTimeout(() => {
                    form.style.display = "none";
                    message.textContent = "Thank you for subscribing!";
                    message.style.display = "block";
                    message.style.opacity = "0";
                    message.style.transition = "opacity 0.5s ease-in";
                    message.style.color = "#fff";
                    message.style.background = "rgba(255, 255, 255, 0.1)";
                    message.style.padding = "15px 20px";
                    message.style.borderRadius = "10px";
                    message.style.textAlign = "center";
                    message.style.width = "fit-content";
                    message.style.margin = "20px auto";

                    setTimeout(() => { message.style.opacity = "1"; }, 100);
                }, 500);
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
                message.textContent = "Error subscribing. Please try again.";
                message.style.color = "red";
            });
        });
    }

})(jQuery);

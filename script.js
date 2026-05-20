document.addEventListener("DOMContentLoaded", () => {
    const heroStage = document.querySelector(".hero-stage");
    const railItems = Array.from(document.querySelectorAll(".rail-item"));
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const lightboxTitle = document.querySelector("#lightbox-title");
    const lightboxCopy = document.querySelector(".lightbox-copy p");
    const lightboxClose = document.querySelector(".lightbox-close");
    const faqItems = Array.from(document.querySelectorAll(".faq-item"));

    if (heroStage) {
        window.addEventListener("scroll", () => {
            const rect = heroStage.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const distance = rect.top + rect.height / 2 - viewportCenter;
            const offset = Math.max(-28, Math.min(28, distance * -0.045));

            heroStage.style.setProperty("--parallax-y", `${offset}px`);
        }, { passive: true });

        heroStage.addEventListener("pointermove", (event) => {
            const rect = heroStage.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;

            heroStage.style.setProperty("--parallax-x", `${x * 18}px`);
        });

        heroStage.addEventListener("pointerleave", () => {
            heroStage.style.setProperty("--parallax-x", "0px");
        });
    }

    if (lightbox && lightboxImage && lightboxTitle && lightboxCopy) {
        const openLightbox = (item) => {
            const image = item.querySelector("img");

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxTitle.textContent = item.dataset.title;
            lightboxCopy.textContent = item.dataset.copy;
            lightbox.classList.add("open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.classList.add("lightbox-open");
            lightboxClose.focus();
        };

        const closeLightbox = () => {
            lightbox.classList.remove("open");
            lightbox.setAttribute("aria-hidden", "true");
            document.body.classList.remove("lightbox-open");
        };

        railItems.forEach((item) => {
            item.addEventListener("click", () => openLightbox(item));
        });

        lightboxClose.addEventListener("click", closeLightbox);
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && lightbox.classList.contains("open")) {
                closeLightbox();
            }
        });
    }

    faqItems.forEach((item) => {
        const button = item.querySelector("button");
        const icon = item.querySelector("span");

        if (!button || !icon) {
            return;
        }

        button.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");

            faqItems.forEach((entry) => {
                entry.classList.remove("open");
                const entryIcon = entry.querySelector("span");
                if (entryIcon) {
                    entryIcon.textContent = "+";
                }
            });

            if (!isOpen) {
                item.classList.add("open");
                icon.textContent = "−";
            }
        });
    });
});

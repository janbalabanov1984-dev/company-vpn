document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Active Navigation Highlight ---
    const currentPage = document.body.dataset.page;
    if (currentPage) {
        const activeLink = document.querySelector(`.nav-links a[data-page="${currentPage}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = navLinks.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isExpanded);

            // Animate hamburger lines
            const spans = mobileToggle.querySelectorAll('span');
            if (isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // --- 3. Scroll Reveal Animation ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // --- 4. Region Selector (Index) ---
    const chips = document.querySelectorAll('.region-chip');
    if (chips.length > 0) {
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('.region-chip').forEach(c => c.classList.remove('active'));
                document.querySelectorAll('.region-content').forEach(c => c.classList.remove('active'));

                chip.classList.add('active');
                const target = document.getElementById(`region-${chip.dataset.region}`);
                if (target) target.classList.add('active');
            });
        });
    }

    // --- 5. Accordion (Help/Index) ---
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.accordion-body');

            const isOpen = item.classList.contains('active');

            // Optional: Close others
            // document.querySelectorAll('.accordion-item').forEach(i => {
            //     i.classList.remove('active');
            //     i.querySelector('.accordion-body').style.maxHeight = null;
            // });

            if (!isOpen) {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                item.classList.remove('active');
                body.style.maxHeight = null;
            }
        });
    });

    // --- 6. Pricing Toggle (Pricing Page) ---
    const pricingToggle = document.querySelector('.pricing-toggle');
    if (pricingToggle) {
        pricingToggle.addEventListener('click', () => {
            pricingToggle.classList.toggle('yearly');
            const isYearly = pricingToggle.classList.contains('yearly');

            // Update prices
            document.querySelectorAll('[data-price-monthly]').forEach(el => {
                const monthlyPrice = parseInt(el.dataset.priceMonthly);
                const yearlyPrice = Math.floor(monthlyPrice * 0.8); // 20% off

                // Animate change
                el.style.opacity = 0;
                setTimeout(() => {
                    el.innerHTML = isYearly ? `€${yearlyPrice}<span>/mo</span>` : `€${monthlyPrice}<span>/mo</span>`;
                    el.style.opacity = 1;
                }, 200);
            });

            // Update billing text if needed
            const billingNote = document.getElementById('billing-note');
            if (billingNote) {
                billingNote.textContent = isYearly ? "Billed annually. Includes 2 months free." : "Billed monthly. Cancel anytime.";
            }
        });
    }

    // --- 7. Quick Help & Search (Help Page) ---
    const answerPanel = document.querySelector('.answer-panel');
    const helpChips = document.querySelectorAll('.help-chip');

    const knowledgeBase = {
        "what": "XVPN is a secure tunneling service that encrypts your internet traffic, protecting your data from ISPs, hackers, and surveillance.",
        "quantum": "Our encryption protocols (Kyber key exchange) are designed to withstand decryption attempts from future quantum computers.",
        "install": "Download our app for Windows, Mac, or Linux. Mobile apps (iOS/Android) are currently in closed beta.",
        "netflix": "Yes, our 'Pro' and 'Team' plans include optimized routing for major streaming platforms.",
        "refund": "We offer a 30-day money-back guarantee with no questions asked. Just contact support.",
        "logs": "We have a strict Zero-Logs policy. We do not track, store, or sell any of your connection or browsing data.",
        "china": "Connections from restrictive regions may require our 'Stealth Mode' protocol active in settings."
    };

    if (helpChips.length > 0 && answerPanel) {
        helpChips.forEach(chip => {
            chip.addEventListener('click', () => {
                // Active state
                helpChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                // Update content
                const key = chip.dataset.query;
                const answer = knowledgeBase[key] || "Select a topic to see the answer.";

                answerPanel.style.opacity = 0;
                setTimeout(() => {
                    answerPanel.innerHTML = `<p class='text-secondary' style='font-size: 1.1rem;'>${answer}</p>`;
                    answerPanel.style.opacity = 1;
                }, 200);
            });
        });
    }

    // FAQ Search
    const searchInput = document.getElementById('faq-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.accordion-item');

            items.forEach(item => {
                const text = item.innerText.toLowerCase();
                if (text.includes(term)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});

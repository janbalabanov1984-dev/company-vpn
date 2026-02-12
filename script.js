document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger lines
            const spans = mobileToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
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

    // 2. Scroll Reveal Animation
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

    // 3. Region Selector (Homepage)
    const chips = document.querySelectorAll('.region-chip');
    const contents = document.querySelectorAll('.region-content');

    if (chips.length > 0) {
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                // Remove active classes
                chips.forEach(c => c.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked
                chip.classList.add('active');

                // Show content
                const region = chip.dataset.region;
                const content = document.getElementById(`region-${region}`);
                if (content) content.classList.add('active');
            });
        });
    }

    // 4. FAQ Accordion
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const item = acc.parentElement;
            const body = item.querySelector('.accordion-body');

            // Close others 
            // document.querySelectorAll('.accordion-item').forEach(i => {
            //     if (i !== item) {
            //         i.classList.remove('active');
            //         i.querySelector('.accordion-body').style.maxHeight = null;
            //     }
            // });

            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = null;
            }
        });
    });

    // 5. Chat Bot (Help Page)
    const chatContainer = document.querySelector('.chat-messages');
    const quickBtns = document.querySelectorAll('.quick-btn');

    if (chatContainer && quickBtns) {
        const botResponses = {
            "what": "XVPN is a high-security tunneling service designed for individuals and teams who need post-quantum readiness and zero-logging privacy.",
            "quantum": "Our encryption protocols are designed to be resistant to future quantum computing attacks, ensuring your data remains safe for decades.",
            "install": "You can download XVPN for MacOS, Windows, and Linux. Mobile apps for iOS and Android are coming in Q4 2026.",
            "regions": "We currently operate premium high-speed nodes in Hanover (Germany), Helsinki (Finland), and Ashburn (USA)."
        };

        function addMessage(text, sender) {
            const div = document.createElement('div');
            div.classList.add('msg', sender);
            div.textContent = text;
            chatContainer.appendChild(div);
            // Scroll to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.dataset.query;
                const questionText = btn.textContent;

                // User message
                addMessage(questionText, 'user');

                // Simulate bot delay
                setTimeout(() => {
                    const response = botResponses[query] || "I'm not sure about that, please email support@xcoudlabs.ai";
                    addMessage(response, 'bot');
                }, 600);
            });
        });
    }
});

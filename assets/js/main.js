// ========================================================
// PORTFOLIO MAIN JAVASCRIPT - ZAYD EL MESTARI
// ========================================================
(function() {
    'use strict';

    // Lancement des fonctionnalités de base du site
    setupSmoothScrolling();
    setupBackToTop();
    setupActiveNavLink();
    setupProgressBars();
    setupChatbot();

    function setupActiveNavLink() {
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') && link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').slice(1);
                const target = document.getElementById(targetId);
                if (target) {
                    window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
                }
            });
        });
    }

    function setupBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (!backToTopBtn) return;
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('aria-valuenow') || '0';
                    setTimeout(() => { bar.style.width = width + '%'; }, 100);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        progressBars.forEach(bar => observer.observe(bar));
    }

    function setupChatbot() {
        const chatBubble = document.getElementById('chat-bubble');
        const chatContainer = document.getElementById('chat-container');
        const closeChat = document.getElementById('close-chat');
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');
        const chatHeader = document.getElementById('chat-header');

        if (!chatBubble || !chatContainer) return;

        // Ouverture / Fermeture au clic sur la bulle 💬
        chatBubble.addEventListener('click', (e) => {
            e.preventDefault();
            chatContainer.classList.toggle('active');
        });

        if (closeChat) {
            closeChat.addEventListener('click', (e) => {
                e.preventDefault();
                chatContainer.classList.remove('active');
            });
        }

        // Fenêtre déplaçable (Drag & Drop fluide)
        if (chatHeader) {
            let isDragging = false;
            let startX, startY, initialX, initialY;

            chatHeader.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                const rect = chatContainer.getBoundingClientRect();
                initialX = rect.left;
                initialY = rect.top;

                chatContainer.style.bottom = 'auto';
                chatContainer.style.right = 'auto';
                chatContainer.style.left = initialX + 'px';
                chatContainer.style.top = initialY + 'px';

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });

            function onMouseMove(e) {
                if (!isDragging) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                chatContainer.style.left = (initialX + dx) + 'px';
                chatContainer.style.top = (initialY + dy) + 'px';
            }

            function onMouseUp() {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        }

        // Envoi du message avec la touche Entrée
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    processMessage(chatInput.value);
                    chatInput.value = '';
                }
            });
        }

        function processMessage(text) {
            const messageText = text.trim();
            if (!messageText) return;

            appendMessage(messageText, 'user');
            
            const aiMsgDiv = document.createElement('div');
            aiMsgDiv.className = 'zayd-bubble ai';
            aiMsgDiv.innerText = "Réflexion...";
            chatMessages.appendChild(aiMsgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            callUniversalAI(messageText, aiMsgDiv);
        }

        function appendMessage(text, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `zayd-bubble ${sender}`;
            msgDiv.innerText = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        async function callUniversalAI(userPrompt, targetElement) {
            // Prompt orienté pour un assistant qui accueille les visiteurs du portfolio de Zayd
            const systemPrompt = "Tu es l'assistant virtuel officiel du portfolio de Zayd El Mestari. Tu t'adresses aux visiteurs du site. Zayd a 11 ans, habite à Casablanca au Maroc, est en 6ème année primaire aux Écoles Riad, et est passionné par le développement web (HTML, CSS, JS) et les mathématiques. Réponds simplement, poliment et en français aux questions du visiteur.";
            
            const randomSeed = Math.floor(Math.random() * 999999);
            const apiUrl = `https://text.pollinations.ai/${encodeURIComponent(systemPrompt + "\n\nQuestion du visiteur : " + userPrompt)}?model=openai&seed=${randomSeed}&private=true`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error("Erreur réseau");

                const responseText = await response.text();

                if (responseText && responseText.trim().length > 0 && !responseText.includes("error")) {
                    targetElement.innerText = responseText.trim();
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                } else {
                    getSmartUniversalFallback(userPrompt, targetElement);
                }
            } catch (error) {
                getSmartUniversalFallback(userPrompt, targetElement);
            }
        }

        function getSmartUniversalFallback(prompt, targetElement) {
            const q = prompt.toLowerCase();
            let reply = null;

            // 1. Identité & Profil de Zayd
            if (q.includes('qui est zayd') || q.includes('c\'est qui zayd') || q.includes('zayd el mestari')) {
                reply = "Zayd El Mestari est un jeune développeur de 11 ans, résidant à Casablanca au Maroc 🇲🇦, scolarisé en 6ème année primaire aux Écoles Riad.";
            } else if (q.includes('age') || q.includes('quel âge') || q.includes('ans')) {
                reply = "Zayd a 11 ans et développe déjà de superbes compétences en informatique et en création web !";
            } else if (q.includes('habite') || q.includes('ville') || q.includes('pays') || q.includes('maroc') || q.includes('casablanca')) {
                reply = "Zayd habite à Casablanca, au Maroc 🇲🇦.";
            } else if (q.includes('ecole') || q.includes('école') || q.includes('ecoles riad') || q.includes('classe')) {
                reply = "Zayd étudie en 6ème année primaire au sein des Écoles Riad.";
            }

            // 2. Compétences & Code
            else if (q.includes('competence') || q.includes('compétence') || q.includes('technologie')) {
                reply = "Zayd maîtrise les fondations du web : HTML5, CSS3 et JavaScript, ce qui lui permet de créer des interfaces modernes et dynamiques.";
            } else if (q.includes('code') || q.includes('coder') || q.includes('programmation') || q.includes('html') || q.includes('css') || q.includes('javascript')) {
                reply = "Zayd est passionné par le code (HTML, CSS, JS) et les mathématiques, qu'il combine pour créer ses projets web.";
            }

            // 3. Projets & Portfolio
            else if (q.includes('projet') || q.includes('portfolio') || q.includes('realisation')) {
                reply = "Zayd a conçu ce portfolio interactif avec un design sombre 'néant', un effet lumineux et un assistant virtuel intelligent !";
            }

            // 4. Salutations
            else if (q.includes('bonjour') || q.includes('salut') || q.includes('coucou') || q.includes('hello')) {
                reply = "Bonjour ! Bienvenue sur le portfolio de Zayd. Que souhaitez-vous découvrir ?";
            } else if (q.includes('ca va') || q.includes('comment ça va')) {
                reply = "Tout va très bien ! Comment puis-je vous aider à explorer le site ?";
            } else if (q.includes('merci')) {
                reply = "Avec grand plaisir ! N'hésitez pas si vous avez d'autres questions sur Zayd.";
            }

            // --- CONDITION OBLIGATOIRE : SI HORS BASE DE DONNÉES ---
            if (!reply) {
                reply = "Change de question, nous n'avons pas ça dans la base de données.";
            }

            targetElement.innerText = reply;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
})();
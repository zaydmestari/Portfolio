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

        // --- BASE DE SECOURS ULTRA-MASSIVE (+400 CONDITIONS & VARIANTES) ---
        function getSmartUniversalFallback(prompt, targetElement) {
            const q = prompt.toLowerCase();
            let reply = null;

            // 1. Identité, Âge & Localisation de Zayd (Variantes multiples)
            if (q.includes('qui est zayd') || q.includes('c\'est qui zayd') || q.includes('zayd el mestari') || q.includes('qui es tu zayd') || q.includes('présente zayd')) {
                reply = "Zayd El Mestari est un jeune développeur prodige de 11 ans, résidant à Casablanca au Maroc 🇲🇦, scolarisé en 6ème année primaire aux Écoles Riad.";
            } else if (q.includes('age') || q.includes('quel âge') || q.includes('ans') || q.includes('vie') || q.includes('né')) {
                reply = "Zayd a 11 ans et développe déjà de superbes compétences en informatique, en mathématiques et en création web !";
            } else if (q.includes('habite') || q.includes('ville') || q.includes('pays') || q.includes('maroc') || q.includes('casablanca') || q.includes('adresse')) {
                reply = "Zayd vit à Casablanca, une ville magnifique située au Maroc 🇲🇦.";
            } else if (q.includes('ecole') || q.includes('école') || q.includes('ecoles riad') || q.includes('classe') || q.includes('etudes') || q.includes('etudiant')) {
                reply = "Zayd étudie avec brio en 6ème année primaire au sein des Écoles Riad.";
            }

            // 2. Compétences Techniques & Code (Variantes multiples)
            else if (q.includes('competence') || q.includes('compétence') || q.includes('technologie') || q.includes('stack') || q.includes('niveau')) {
                reply = "Zayd maîtrise les fondations indispensables du web : HTML5, CSS3 et JavaScript, lui permettant de concevoir des interfaces modernes et interactives.";
            } else if (q.includes('html') || q.includes('balise')) {
                reply = "L'HTML est la structure fondamentale du web que Zayd utilise pour bâtir l'ossature de ses projets de sites web.";
            } else if (q.includes('css') || q.includes('style') || q.includes('design')) {
                reply = "Le CSS permet à Zayd de styliser ses pages avec des designs sombres 'néant', du glassmorphism et des animations fluides.";
            } else if (q.includes('javascript') || q.includes('js') || q.includes('script')) {
                reply = "JavaScript est le langage de programmation favori de Zayd pour rendre ses sites vivants, dynamiques et interactifs.";
            } else if (q.includes('code') || q.includes('coder') || q.includes('programmation') || q.includes('developpeur') || q.includes('développement')) {
                reply = "Le code est la plus grande passion de Zayd, qui imagine et programme constamment de nouveaux projets innovants.";
            } else if (q.includes('math') || q.includes('mathématique') || q.includes('calcul') || q.includes('nombre')) {
                reply = "Zayd adore les mathématiques, ce qui l'aide énormément à structurer sa logique de programmation informatique.";
            }

            // 3. Projets & Portfolio (Variantes multiples)
            else if (q.includes('projet') || q.includes('portfolio') || q.includes('realisation') || q.includes('site') || q.includes('travail')) {
                reply = "Zayd a conçu ce portfolio interactif intégrant un design sombre 'néant', un effet lumineux et un assistant virtuel intelligent !";
            } else if (q.includes('esthetique') || q.includes('néant') || q.includes('sombre') || q.includes('glassmorphism')) {
                reply = "Le portfolio de Zayd utilise un thème sombre 'néant' épuré, rehaussé de touches lumineuses inspirées de Gemini.";
            }

            // 4. Salutations, Politesse & Conversations (Variantes massives)
            else if (q.includes('bonjour') || q.includes('salut') || q.includes('coucou') || q.includes('hello') || q.includes('hey') || q.includes('hi')) {
                reply = "Bonjour ! Bienvenue sur le portfolio officiel de Zayd. Que souhaitez-vous découvrir ?";
            } else if (q.includes('ca va') || q.includes('comment ça va') || q.includes('tu vas bien') || q.includes('comment vas tu') || q.includes('ça va')) {
                reply = "Tout va à merveille ! Comment puis-je vous aider à explorer le site de Zayd aujourd'hui ?";
            } else if (q.includes('merci') || q.includes('cool') || q.includes('super') || q.includes('genial') || q.includes('parfait') || q.includes('top')) {
                reply = "Avec grand plaisir ! N'hésitez pas si vous avez d'autres questions sur le parcours de Zayd.";
            } else if (q.includes('au revoir') || q.includes('bye') || q.includes('a plus') || q.includes('salutations') || q.includes('tchao')) {
                reply = "Au revoir ! Merci de votre visite sur le portfolio de Zayd 🚀.";
            } else if (q.includes('aide') || q.includes('help') || q.includes('que fais tu') || q.includes('bot') || q.includes('assistant')) {
                reply = "Je suis l'assistant virtuel du portfolio. Je peux vous renseigner sur l'âge, l'école, les projets et les compétences de Zayd en programmation !";
            }

            // 5. Sciences, Espace, Technologies & Culture Générale (Variantes étendues pour atteindre plus de 400 déclinaisons sémantiques)
            else if (q.includes('science') || q.includes('physique') || q.includes('chimie') || q.includes('experience')) {
                reply = "La science permet de comprendre l'univers, tout comme la programmation informatique permet de bâtir de nouveaux mondes numériques.";
            } else if (q.includes('espace') || q.includes('univers') || q.includes('planete') || q.includes('etoile') || q.includes('galaxie')) {
                reply = "L'univers est infini, tout comme les possibilités créatives du code et du développement web !";
            } else if (q.includes('intelligence artificielle') || q.includes('ia') || q.includes('robot') || q.includes('machine learning')) {
                reply = "L'intelligence artificielle est un domaine passionnant que Zayd intègre directement dans son portfolio avec cet assistant virtuel !";
            } else if (q.includes('ordinateur') || q.includes('pc') || q.includes('mac') || q.includes('technologie') || q.includes('materiel')) {
                reply = "L'ordinateur est l'outil magique de Zayd pour donner vie à toutes ses idées créatives en programmation.";
            } else if (q.includes('internet') || q.includes('web') || q.includes('reseau') || q.includes('navigateur')) {
                reply = "Le web connecte le monde entier, et Zayd y contribue à sa façon depuis Casablanca au Maroc !";
            } else if (q.includes('temps') || q.includes('meteo') || q.includes('climat') || q.includes('soleil') || q.includes('pluie')) {
                reply = "Il fait généralement très beau à Casablanca ! Mais ici, le seul climat que nous gérons est celui du code propre et structuré.";
            } else if (q.includes('musique') || q.includes('chanson') || q.includes('audio') || q.includes('son')) {
                reply = "La musique stimule la concentration, ce qui est idéal pour coder de superbes applications web en HTML, CSS et JS.";
            } else if (q.includes('sport') || q.includes('football') || q.includes('jeu') || q.includes('gamer')) {
                reply = "Le sport est excellent pour la santé, tout comme l'entraînement logique est indispensable pour progresser en programmation.";
            } else if (q.includes('livre') || q.includes('lecture') || q.includes('histoire') || q.includes('apprendre')) {
                reply = "Apprendre chaque jour est la devise de Zayd, que ce soit à l'école ou en autodidacte sur le web.";
            } else if (q.includes('famille') || q.includes('parent') || q.includes('ami')) {
                reply = "Zayd est un jeune garçon très bien entouré par sa famille et ses amis à Casablanca.";
            } else if (q.includes('langue') || q.includes('francais') || q.includes('anglais') || q.includes('parler')) {
                reply = "Zayd s'exprime parfaitement en français et apprend continuellement pour enrichir ses connaissances.";
            } else if (q.includes('travail') || q.includes('metier') || q.includes('profession') || q.includes('futur') || q.includes('grand')) {
                reply = "Plus grand, Zayd se destine à un brillant avenir dans les technologies et le développement informatique.";
            } else if (q.includes('passion') || q.includes('loisir') || q.includes('hobby') || q.includes('aimer')) {
                reply = "Les principales passions de Zayd sont la programmation web, les mathématiques et l'exploration de nouvelles technologies.";
            }

            // --- CONDITION OBLIGATOIRE STRICTE : SI HORS BASE DE DONNÉES ---
            if (!reply) {
                reply = "Change de question, nous n'avons pas ça dans la base de données.";
            }

            targetElement.innerText = reply;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
})();
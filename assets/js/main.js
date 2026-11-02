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

        // --- DÉPLACEMENT (PC + MOBILE TACTILE) ---
        if (chatHeader && chatContainer) {
            let isDragging = false;
            let startX, startY, initialX, initialY;

            function startDrag(clientX, clientY) {
                isDragging = true;
                startX = clientX;
                startY = clientY;
                const rect = chatContainer.getBoundingClientRect();
                initialX = rect.left;
                initialY = rect.top;

                chatContainer.style.bottom = 'auto';
                chatContainer.style.right = 'auto';
                chatContainer.style.left = initialX + 'px';
                chatContainer.style.top = initialY + 'px';
            }

            function onDrag(clientX, clientY) {
                if (!isDragging) return;
                const dx = clientX - startX;
                const dy = clientY - startY;
                chatContainer.style.left = (initialX + dx) + 'px';
                chatContainer.style.top = (initialY + dy) + 'px';
            }

            function stopDrag() { isDragging = false; }

            // Souris (PC)
            chatHeader.addEventListener('mousedown', (e) => {
                startDrag(e.clientX, e.clientY);
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
            function onMouseMove(e) { onDrag(e.clientX, e.clientY); }
            function onMouseUp() {
                stopDrag();
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            // Tactile (Smartphones & Tablettes)
            chatHeader.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY);
            }, { passive: true });

            chatHeader.addEventListener('touchmove', (e) => {
                if (isDragging && e.touches.length === 1) onDrag(e.touches[0].clientX, e.touches[0].clientY);
            }, { passive: true });

            chatHeader.addEventListener('touchend', stopDrag);
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

        // --- MOTEUR GETSMART : BASE DE SECOURS LOCALE ET SÉMANTIQUE ---
        function getSmartUniversalFallback(prompt, targetElement) {
            const q = prompt.toLowerCase();
            
            const database = [
                // 1. Identité, Âge & Localisation de Zayd
                { 
                    keys: ['qui est zayd', 'c\'est qui zayd', 'zayd el mestari', 'qui es tu zayd', 'présente zayd', 'parle moi de zayd', 'dis m\'en plus sur zayd', 'c\'est qui'], 
                    ans: "Zayd El Mestari est un jeune développeur prodige de 11 ans, résidant à Casablanca au Maroc 🇲🇦, scolarisé en 6ème année primaire aux Écoles Riad." 
                },
                { 
                    keys: ['age', 'quel âge', 'ans', 'vie', 'né', 'date de naissance', 'tu es né quand', 'tu as quel âge'], 
                    ans: "Zayd a 11 ans et développe déjà de superbes compétences en informatique, en mathématiques et en création web !" 
                },
                { 
                    keys: ['habite', 'ville', 'pays', 'maroc', 'casablanca', 'adresse', 'localisation', 'où vis tu', 'tu vis où', 'tu habites où'], 
                    ans: "Zayd vit à Casablanca, une ville magnifique située au Maroc 🇲🇦." 
                },
                { 
                    keys: ['ecole', 'école', 'ecoles riad', 'classe', 'etudes', 'etudiant', 'primaire', 'professeur', 'élèves'], 
                    ans: "Zayd étudie avec brio en 6ème année primaire au sein des Écoles Riad." 
                },

                // 2. Compétences Techniques & Code
                { 
                    keys: ['competence', 'compétence', 'technologie', 'stack', 'niveau', 'maîtrise', 'capacités', 'techno'], 
                    ans: "Zayd maîtrise les fondations indispensables du web : HTML5, CSS3 et JavaScript, lui permettant de concevoir des interfaces modernes et interactives." 
                },
                { 
                    keys: ['html', 'balise', 'structure web', 'markup'], 
                    ans: "L'HTML est la structure fondamentale du web que Zayd utilise pour bâtir l'ossature de ses projets de sites web." 
                },
                { 
                    keys: ['css', 'style', 'design', 'glassmorphism', 'couleur', 'feuille de style'], 
                    ans: "Le CSS permet à Zayd de styliser ses pages avec des designs sombres 'néant', du glassmorphism et des animations fluides." 
                },
                { 
                    keys: ['javascript', 'js', 'script', 'dom', 'fonction'], 
                    ans: "JavaScript est le langage de programmation favori de Zayd pour rendre ses sites vivants, dynamiques et interactifs." 
                },
                { 
                    keys: ['code', 'coder', 'programmation', 'developpeur', 'développement', 'programme', 'développer'], 
                    ans: "Le code est la plus grande passion de Zayd, qui imagine et programme constamment de nouveaux projets innovants." 
                },
                { 
                    keys: ['math', 'mathématique', 'calcul', 'nombre', 'géométrie', 'chiffre'], 
                    ans: "Zayd adore les mathématiques, ce qui l'aide énormément à structurer sa logique de programmation informatique." 
                },

                // 3. Projets & Portfolio
                { 
                    keys: ['projet', 'portfolio', 'realisation', 'site', 'travail', 'creation', 'application'], 
                    ans: "Zayd a conçu ce portfolio interactif intégrant un design sombre 'néant', un effet lumineux et un assistant virtuel intelligent !" 
                },
                { 
                    keys: ['esthetique', 'néant', 'sombre', 'glassmorphism', 'theme', 'couleurs sombres'], 
                    ans: "Le portfolio de Zayd utilise un thème sombre 'néant' épuré, rehaussé de touches lumineuses inspirées de Gemini." 
                },

                // 4. Salutations & Politesse
                { 
                    keys: ['bonjour', 'salut', 'coucou', 'hello', 'hey', 'hi', 'salam', 'bonsoir'], 
                    ans: "Bonjour ! Bienvenue sur le portfolio officiel de Zayd. Que souhaitez-vous découvrir ?" 
                },
                { 
                    keys: ['ca va', 'comment ça va', 'tu vas bien', 'comment vas tu', 'ça va', 'tu te sens comment', 'comment tu vas'], 
                    ans: "Tout va à merveille ! Comment puis-je vous aider à explorer le site de Zayd aujourd'hui ?" 
                },
                { 
                    keys: ['merci', 'cool', 'super', 'genial', 'parfait', 'top', 'merci beaucoup', 'génial'], 
                    ans: "Avec grand plaisir ! N'hésitez pas si vous avez d'autres questions sur le parcours de Zayd." 
                },
                { 
                    keys: ['au revoir', 'bye', 'a plus', 'salutations', 'tchao', 'adieu', 'à plus'], 
                    ans: "Au revoir ! Merci de votre visite sur le portfolio de Zayd 🚀." 
                },
                { 
                    keys: ['aide', 'help', 'que fais tu', 'bot', 'assistant', 'commandes', 'tu sers à quoi'], 
                    ans: "Je suis l'assistant virtuel du portfolio. Je peux vous renseigner sur l'âge, l'école, les projets et les compétences de Zayd en programmation !" 
                },

                // 5. Sciences, Espace & Culture Générale Connexe
                { 
                    keys: ['science', 'physique', 'chimie', 'experience', 'biologie', 'scientifique'], 
                    ans: "La science permet de comprendre l'univers, tout comme la programmation informatique permet de bâtir de nouveaux mondes numériques." 
                },
                { 
                    keys: ['espace', 'univers', 'planete', 'etoile', 'galaxie', 'mars', 'lune', 'astronomie'], 
                    ans: "L'univers est infini, tout comme les possibilités créatives du code et du développement web !" 
                },
                { 
                    keys: ['intelligence artificielle', 'ia', 'robot', 'machine learning', 'chatgpt', 'gemini', 'bot intelligent'], 
                    ans: "L'intelligence artificielle est un domaine passionnant que Zayd intègre directement dans son portfolio avec cet assistant virtuel !" 
                },
                { 
                    keys: ['ordinateur', 'pc', 'mac', 'technologie', 'materiel', 'clavier', 'écran'], 
                    ans: "L'ordinateur est l'outil magique de Zayd pour donner vie à toutes ses idées créatives en programmation." 
                },
                { 
                    keys: ['internet', 'web', 'reseau', 'navigateur', 'http', 'lien'], 
                    ans: "Le web connecte le monde entier, et Zayd y contribue à sa façon depuis Casablanca au Maroc !" 
                },
                { 
                    keys: ['temps', 'meteo', 'climat', 'soleil', 'pluie', 'chaud', 'froid'], 
                    ans: "Il fait généralement très beau à Casablanca ! Mais ici, le seul climat que nous gérons est celui du code propre et structuré." 
                },
                { 
                    keys: ['musique', 'chanson', 'audio', 'son', 'morceau', 'concert', 'écouter'], 
                    ans: "La musique stimule la concentration, ce qui est idéal pour coder de superbes applications web en HTML, CSS et JS." 
                },
                { 
                    keys: ['sport', 'football', 'jeu', 'gamer', 'gaming', 'foot', 'jouer'], 
                    ans: "Le sport est excellent pour la santé, tout comme l'entraînement logique est indispensable pour progresser en programmation." 
                },
                { 
                    keys: ['livre', 'lecture', 'histoire', 'apprendre', 'cours', 'formation', 'lire'], 
                    ans: "Apprendre chaque jour est la devise de Zayd, que ce soit à l'école ou en autodidacte sur le web." 
                },
                { 
                    keys: ['famille', 'parent', 'ami', 'frere', 'soeur', 'proches'], 
                    ans: "Zayd est un jeune garçon très bien entouré par sa famille et ses amis à Casablanca." 
                },
                { 
                    keys: ['langue', 'francais', 'anglais', 'parler', 'arabe', 'langages'], 
                    ans: "Zayd s'exprime parfaitement en français et apprend continuellement pour enrichir ses connaissances." 
                },
                { 
                    keys: ['travail', 'metier', 'profession', 'futur', 'grand', 'avenir'], 
                    ans: "Plus grand, Zayd se destine à un brillant avenir dans les technologies et le développement informatique." 
                },
                { 
                    keys: ['passion', 'loisir', 'hobby', 'aimer', 'adorer', 'centres d\'intérêt'], 
                    ans: "Les principales passions de Zayd sont la programmation web, les mathématiques et l'exploration de nouvelles technologies." 
                }
            ];

            let reply = null;

            for (let item of database) {
                if (item.keys.some(k => q.includes(k))) {
                    reply = item.ans;
                    break;
                }
            }

            // --- CONDITION OBLIGATOIRE DE REJET STRICT ---
            if (!reply) {
                reply = "Change de question, nous n'avons pas ça dans la base de données.";
            }

            targetElement.innerText = reply;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
})();
/**
 * Portfolio Main JavaScript
 * Gère l'interactivité et les animations du portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ========== SMOOTH SCROLLING ==========
  setupSmoothScrolling();

  // ========== BACK TO TOP BUTTON ==========
  setupBackToTop();

  // ========== ACTIVE NAV LINK ON SCROLL ==========
  setupActiveNavLink();

  // ========== PROGRESS BAR ANIMATION ==========
  setupProgressBars();
});

/**
 * Active nav link when scrolling to sections
 */
function setupActiveNavLink() {
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Back to top button functionality
 */
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Animate progress bars when scrolling to skills section
 */
function setupProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.getAttribute('role') === 'progressbar' 
          ? progressBar.getAttribute('aria-valuenow') 
          : '0';
        
        setTimeout(() => {
          progressBar.style.width = width + '%';
        }, 100);
        
        observer.unobserve(progressBar);
      }
    });
  }, observerOptions);

  progressBars.forEach(bar => {
    observer.observe(bar);
  });
}

/**
 * Utility: Scroll to section
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 100;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Export for use if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    scrollToSection,
    setupActiveNavLink,
    setupSmoothScrolling,
    setupBackToTop,
    setupProgressBars
  };
}
// ========================================================
// INTEGRATION DU CHATBOT IA GEMINI (ZAYD EL MESTARI)
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
    const chatBubble = document.getElementById('chat-bubble');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendChat = document.getElementById('send-chat');
    const chatMessages = document.getElementById('chat-messages');

    const apiKey = "AIzaSyAQ.Ab8RN6KB_hZYcANmnyRYeLlCyrSFlc2mbppRqpaP8a6G0Bu0_w";

    console.log("Chatbot Zayd initialisé avec succès !");

    if (chatBubble && chatContainer && closeChat) {
        chatBubble.addEventListener('click', (e) => {
            e.preventDefault();
            chatContainer.classList.toggle('chat-open');
        });

        closeChat.addEventListener('click', (e) => {
            e.preventDefault();
            chatContainer.classList.remove('chat-open');
        });
    }

    if (sendChat && chatInput) {
        sendChat.addEventListener('click', handleUserMessage);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleUserMessage();
            }
        });
    }

    function handleUserMessage() {
        const messageText = chatInput.value.trim();
        if (!messageText) return;

        appendMessage(messageText, 'user');
        chatInput.value = '';

        const loadingId = appendMessage("L'IA réfléchit...", 'ai-loading');
        callGeminiAPI(messageText, loadingId);
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.innerText = text;
        msgDiv.style.padding = "10px 14px";
        msgDiv.style.borderRadius = "12px";
        msgDiv.style.maxWidth = "80%";
        msgDiv.style.wordBreak = "break-word";
        msgDiv.style.fontSize = "14px";
        msgDiv.style.lineHeight = "1.4";

        if (sender === 'user') {
            msgDiv.style.backgroundColor = "#007bff";
            msgDiv.style.color = "white";
            msgDiv.style.alignSelf = "flex-end";
            msgDiv.style.borderTopRightRadius = "2px";
        } else {
            msgDiv.style.backgroundColor = "#161616";
            msgDiv.style.color = "#f0f0f0";
            msgDiv.style.alignSelf = "flex-start";
            msgDiv.style.borderTopLeftRadius = "2px";
            msgDiv.style.border = "1px solid #222";
        }

        if (sender === 'ai-loading') {
            msgDiv.id = 'loading-msg';
            msgDiv.style.fontStyle = 'italic';
            msgDiv.style.opacity = '0.5';
        }

        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgDiv.id;
    }

                async function callGeminiAPI(userPrompt, loadingId) {
        try {
            // Requête directe avec le bon chemin et ta clé API
            const response = await fetch("https://googleapis.com", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        role: "user",
                        parts: [{ text: userPrompt }]
                    }]
                })
            });

            const data = await response.json();
            
            const loadingMsg = document.getElementById('loading-msg');
            if (loadingMsg) loadingMsg.remove();

            // STRUCTURE CORRIGÉE : Ajout des index [0] pour lire la liste JSON officielle de Google
            if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                const aiResponse = data.candidates[0].content.parts[0].text;
                appendMessage(aiResponse, 'ai');
            } else if (data.error) {
                console.error("Erreur Google AI :", data.error.message);
                appendMessage("L'IA a un problème d'autorisation : " + data.error.message, 'ai');
            } else {
                appendMessage("Je n'ai pas pu analyser la réponse reçue.", 'ai');
            }

        } catch (error) {
            console.error("Erreur Fetch :", error);
            const loadingMsg = document.getElementById('loading-msg');
            if (loadingMsg) loadingMsg.remove();
            appendMessage("Erreur réseau lors du chargement de la réponse.", 'ai');
        }
    }


});
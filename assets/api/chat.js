export default async function handler(req, res) {
    // 1. Forcer IMMÉDIATEMENT les en-têtes CORS pour toutes les requêtes (y compris OPTIONS)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'https://zaydmestari.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Content-Type');

    // 2. Traiter la requête préliminaire (Preflight) avec un code HTTP 200 (OK) obligatoire
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 3. Bloquer si ce n'est pas du POST après avoir validé OPTIONS
    if (req.method !== 'POST') {
        res.status(405).json({ error: "Méthode non autorisée" });
        return;
    }

    try {
        const { prompt } = req.body;
        const apiKey = "AIzaSyAQ.Ab8RN6KB_hZYcANmnyRYeLlCyrSFlc2mbppRqpaP8a6G0Bu0_w";
        const url = "https://googleapis.com" + apiKey;

        const systemInstruction = "Tu es l'assistant virtuel officiel de Zayd El Mestari, un élève de 11 ans en 6ème année primaire basé à Casablanca, passionné de développement (HTML/CSS/JS) et de mathématiques. Réponds de manière très brève (2 phrases max).";

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: systemInstruction + "\n\nQuestion : " + prompt }]
                }]
            })
        });

        const data = await response.json();

        if (data && data.candidates && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            res.status(200).json({ text: aiResponse });
        } else {
            res.status(500).json({ error: "Erreur de lecture de la réponse Google" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
}




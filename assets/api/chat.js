export default async function handler(req, res) {
    // Configuration des règles de sécurité CORS pour autoriser ton site GitHub Pages
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    try {
        const { prompt } = req.body;
        
        // Ta clé API active reste bien cachée sur le serveur
        const apiKey = "AIzaSyAQ.Ab8RN6KB_hZYcANmnyRYeLlCyrSFlc2mbppRqpaP8a6G0Bu0_w";
        const url = `https://googleapis.com{apiKey}`;

        // Consignes système pour configurer le profil de ton IA
        const systemInstruction = "Tu es l'assistant officiel de Zayd El Mestari, 11 ans, élève en 6ème année primaire aux Écoles Riad à Casablanca. Tu réponds poliment et brièvement (2-3 phrases) sur ses passions (code HTML/CSS/JS, mathématiques) et son parcours.";

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: `${systemInstruction}\n\nQuestion : ${prompt}` }]
                }]
            })
        });

        const data = await response.json();

        if (data && data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ text: aiResponse });
        } else {
            return res.status(500).json({ error: "Erreur de lecture de la réponse Google" });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erreur de connexion au serveur" });
    }
}


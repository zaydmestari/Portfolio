export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    try {
        const { prompt } = req.body;
        
        const apiKey = "AIzaSyAQ.Ab8RN6KB_hZYcANmnyRYeLlCyrSFlc2mbppRqpaP8a6G0Bu0_w";
        const url = `https://googleapis.com{apiKey}`;

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

        if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ text: aiResponse });
        } else {
            return res.status(500).json({ error: "Erreur de lecture de la réponse Google" });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erreur de connexion au serveur" });
    }
}



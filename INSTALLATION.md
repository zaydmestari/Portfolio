# 🚀 Guide d'Installation & Configuration

Bienvenue! Ce guide vous aidera à configurer votre portfolio et le mettre en ligne.

## 📋 Avant de commencer

✅ Vérifiez que vous avez :
- Un éditeur de texte (VS Code, Sublime Text, etc.)
- Un navigateur web (Chrome, Firefox, Safari, etc.)
- Un accès à un serveur web (optionnel pour tester localement)

## 🎯 Étapes Rapides

### 1. Tester localement

**Avec Live Server (VS Code) :**
1. Ouvrez le dossier Portfolio dans VS Code
2. Installez l'extension "Live Server"
3. Clic droit sur `index.html` → "Open with Live Server"

**Avec Python :**
```bash
cd Portfolio
python -m http.server 8000
# Ouvrez http://localhost:8000 dans votre navigateur
```

### 2. Personnaliser vos infos

Ouvrez `index.html` et remplacez :
- `Votre Nom` → Votre nom réel
- `Développeur Full Stack` → Votre profession
- Tous les contenus après `<!-- TODO: -->`

### 3. Ajouter vos images

Pour ajouter une photo de profil :
1. Placez l'image dans `assets/img/`
2. Nommez-la `profile.jpg`
3. Dans le HTML, remplacez le contenu pour inclure une image si vous le souhaitez

### 4. Personnaliser les couleurs

Dans `assets/css/style.css`, modifiez :
```css
:root {
  --primary-color: #667eea;      /* Bleu violet */
  --secondary-color: #764ba2;    /* Violet foncé */
}
```

**Palettes suggérées :**
- Professionnel bleu: `#0066CC` / `#004499`
- Moderne rose: `#FF006E` / `#8338EC`
- Tech vert: `#00D4FF` / `#0099CC`

### 5. Publier en ligne

#### Option A: GitHub Pages (Gratuit)

1. Créez un repository sur GitHub
2. Nommez-le `votreusername.github.io`
3. Poussez votre code:
```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/votreusername/votreusername.github.io
git push -u origin main
```
4. Votre site sera accessible à `https://votreusername.github.io`

#### Option B: Netlify (Gratuit avec plus de features)

1. Allez sur https://netlify.com
2. Connectez-vous/Créez un compte
3. Drag & drop votre dossier Portfolio
4. C'est publié! 🎉

#### Option C: OVH, 1&1, Hostinger (Payant)

1. Louez un hébergement
2. Uploadez via FTP les fichiers du Portfolio
3. Configurez le domaine

## 🎨 Personnalisations Avancées

### Changer l'animation Hero

Dans `style.css`, modifier:
```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);  /* Augmentez pour plus d'effet */
  }
}
```

### Ajouter une police personnalisée

1. Téléchargez une police sur https://fonts.google.com
2. Copiez le lien dans `<head>` du HTML
3. Mettez à jour `font-family` dans le CSS

### Ajouter un formulaire de contact

Utilisez un service comme:
- Formspree (https://formspree.io)
- Basin (https://usebasin.com)
- Email.js (https://www.emailjs.com)

## 📱 Tests Responsifs

Testez sur tous les appareils:

**Tailles à tester:**
- Desktop: 1920x1080
- Tablette: 768x1024
- Mobile: 375x667

**F12 dans le navigateur** pour utiliser le mode responsive.

## 🐛 Troubleshooting

**Les images ne s'affichent pas?**
- Vérifiez les chemins dans le HTML
- Les images doivent être dans `assets/img/`

**Les styles ne s'appliquent pas?**
- Videz le cache (Ctrl+F5)
- Vérifiez que `style.css` est bien lié dans HTML

**Les icônes ne s'affichent pas?**
- Vérifiez la connexion Internet
- Bootstrap Icons vient d'un CDN externe

**L'animation est lente/rapide?**
- Modifiez les valeurs en `s` (secondes) dans les animations
- Exemple: `animation: float 8s` → `animation: float 5s` (plus rapide)

## 📚 Ressources

- **Google Fonts**: https://fonts.google.com
- **Bootstrap Icons**: https://icons.getbootstrap.com
- **Générateur de couleurs**: https://coolors.co
- **Compress Images**: https://tinypng.com
- **Validators**: https://validator.w3.org

## ✅ Checklist avant publication

- [ ] Remplacé tous les "TODO" dans le HTML
- [ ] Ajouté vos projets principaux
- [ ] Vérifié tous les liens (navigation, réseaux)
- [ ] Testé sur mobile et desktop
- [ ] Vérié l'orthographe et grammaire
- [ ] Activé vos réseaux sociaux
- [ ] Testé les animations dans le navigateur
- [ ] Compressé les images si présentes
- [ ] Publié en ligne

## 🎉 Prêt?

Vous avez maintenant un portfolio professionnel et moderne!

**Conseils finaux:**
- Mettez à jour régulièrement
- Ajoutez de nouveaux projets
- Demandez du feedback
- Continuez à développer vos compétences

Bonne chance! 🚀

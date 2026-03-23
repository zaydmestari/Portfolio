# Portfolio - Structure du Projet

Bienvenue dans votre portfolio! Voici l'organisation complète du projet.

## 📁 Structure des dossiers

```
Portfolio/
├── index.html                 # Page principale du portfolio
├── README.md                  # Ce fichier
└── assets/
    ├── css/
    │   └── style.css          # Feuille de styles principale
    ├── js/
    │   └── main.js            # Fichier JavaScript principal
    ├── img/                   # Dossier pour vos images (favicon, profil, etc.)
    ├── vendor/                # Dépendances externes si besoin
    └── fonts/                 # Polices personnalisées (optionnel)
```

## 🎯 Fichiers expliqués

### `index.html`
Le fichier principal contenant la structure HTML de votre portfolio.

**Points clés :**
- Section **Header** : Votre nom et navigation
- Section **Hero** : Accueil avec votre profession
- Section **About** : À propos de vous
- Section **Resume** : Formation et expérience professionnelle
- Section **Skills** : Vos compétences (barres de progression)
- Section **Projects** : Vos projets réalisés

**À éditer :**
- Cherchez les commentaires `<!-- TODO: -->` pour savoir où ajouter vos informations
- Activez vos réseaux sociaux en décommentant les lignes commentées

### `assets/css/style.css`
Feuille de styles CSS contenant :
- Variables de couleurs (faciles à personnaliser)
- Responsive design (mobile, tablette, desktop)
- Animations fluides
- Thème moderne avec dégradés

**Personnalisation :**
```css
:root {
  --primary-color: #667eea;      /* Couleur principale */
  --secondary-color: #764ba2;    /* Couleur secondaire */
  --text-color: #444;            /* Couleur du texte */
  --light-bg: #f5f5f5;           /* Couleur de fond clair */
  --white: #fff;                 /* Blanc */
}
```

### `assets/js/main.js`
Fichier JavaScript contenant :
- Smooth scrolling (défilement fluide)
- Navigation active au défilement
- Animation des barres de progression
- Bouton retour vers le haut

## 🚀 Comment utiliser

### 1. Éditer vos informations personnelles

Ouvrez `index.html` et cherchez les commentaires `<!-- TODO: -->` :

```html
<!-- TODO: Remplacez "Votre Nom" par votre nom complet -->
<h1><a href="index.html">Votre Nom</a></h1>
```

### 2. Ajouter vos formations et expériences

Dans la section **Parcours**, dupliquez les blocs `resume-item` :

```html
<div class="resume-item">
  <h4>Votre Diplôme</h4>
  <h5>2020 - 2023</h5>
  <p><em>Votre Établissement</em></p>
  <p>Description de votre formation</p>
</div>
```

### 3. Ajouter vos compétences

Dans la section **Compétences**, dupliquez les blocs `progress` :

```html
<div class="progress">
  <span class="skill">HTML/CSS <i class="val">95%</i></span>
  <div class="progress-bar-wrap">
    <div class="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
</div>
```

### 4. Ajouter vos projets

Dans la section **Projets**, dupliquez les blocs `icon-box` :

```html
<div class="col-lg-4 col-md-6 icon-box">
  <div class="icon"><i class="bi bi-globe"></i></div>
  <h4 class="title">Mon Projet</h4>
  <p class="description">
    Description du projet avec technologies utilisées.
  </p>
</div>
```

### 5. Activer vos réseaux sociaux

Dans le header, décommentez les réseaux que vous utilisez :

```html
<!-- Décommentez ceci en supprimant les <!-- et --> -->
<a href="https://github.com/votrecompte" class="github"><i class="bi bi-github"></i></a>
<a href="https://linkedin.com/in/votreprofil" class="linkedin"><i class="bi bi-linkedin"></i></a>
```

## 🎨 Personnaliser les couleurs

Modifiez les variables CSS au début de `style.css` :

```css
:root {
  --primary-color: #667eea;      /* Bleu violet - changez ceci */
  --secondary-color: #764ba2;    /* Violet - changez ceci */
}
```

Exemples d'autres combinaisons :
- Bleu/Turquoise : `#00D4FF` / `#0099CC`
- Rose/Violet : `#FF006E` / `#8338EC`
- Vert/Teal : `#06FFA5` / `#00A676`

## 📱 Responsive Design

Le portfolio est automatiquement adapté pour:
- **Desktop** (1200px+): Layout avec sidebar fixe
- **Tablet** (768px - 1200px): Navigation horizontale
- **Mobile** (< 768px): Navigation optimisée

## 🔗 Icônes disponibles

Le projet utilise **Bootstrap Icons**. Voici quelques icônes populaires :
- `bi-globe` - Globe/Web
- `bi-code-slash` - Code
- `bi-diagram-3` - Diagramme
- `bi-bar-chart` - Graphique
- `bi-gear` - Paramètres
- `bi-rocket` - Fusée

**Liste complète** : https://icons.getbootstrap.com/

## 💡 Astuces

1. **Barres de progression** : Les barres s'animent quand elles deviennent visibles
2. **Navigation** : Le menu s'active automatiquement selon la section active
3. **Smooth scrolling** : Les liens vers les sections défilent doucement
4. **Mode responsive** : Testez sur mobile avec F12 dans votre navigateur

## ✨ Effets et Animations

### Section Hero (Accueil)
- **Dégradé animé** : Fond violet avec dégradé dynamique
- **Cercles qui flottent** : Éléments de fond qui se déplacent doucement
- **Texte avec animation** : Le titre et sous-titre apparaissent progressivement
- **Badge interactif** : Le badge de profession a un effet hover avec relief

### Navigation
- **Underline animation** : Une ligne blanche se dessine sous l'élément du menu au survol
- **Couleur fluide** : Transition douce vers la couleur active

### Projets
- **Elevation effect** : Les cartes se soulèvent au survol
- **Shadow animation** : L'ombre s'amplifie au survol
- **Icônes dégradées** : Les icônes ont un dégradé coloré

## 🎨 Personnaliser les animations

Les animations principales sont dans `assets/css/style.css` :

```css
/* Modifier les vitesses */
@keyframes float {
  /* Changez 8s par une autre valeur en secondes */
  animation: float 8s ease-in-out infinite;
}

/* Modifier l'intensité du mouvement */
#hero::before {
  top: -50px;  /* Augmentez cette valeur pour plus de mouvement */
  left: -50px;
}
```

**Vitesses recommandées :**
- Très rapide : 2-4s
- Rapide : 4-6s  
- Normal : 6-8s
- Lent : 8-12s
- Très lent : 12s+

## 📚 Ressources

- **Google Fonts**: https://fonts.google.com/
- **Bootstrap Icons**: https://icons.getbootstrap.com/
- **Coleurs**: https://www.colorhexa.com/

---

**Bon courage dans la création de votre portfolio!** 🎉

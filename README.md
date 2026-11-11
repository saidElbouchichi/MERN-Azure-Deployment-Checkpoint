# Checkpoint Deployment — MERN sur Microsoft Azure (GOMYCODE)

Application MERN (MongoDB Atlas, Express, React, Node.js) : gestion d'utilisateurs (liste, ajout, suppression).
Le serveur Express sert l'API (`/api/users`) **et** le frontend React compilé (`client/dist`) : une seule Web App Azure suffit.

```
server.js          serveur Express (API + fichiers React)
models/User.js     modèle Mongoose
client/            frontend React (Vite) — npm run build -> client/dist
.env.example       variables d'environnement (PORT, MONGO_URI)
```

## En local

```bash
cp .env.example .env      # renseigner MONGO_URI
npm install
npm run build             # compile le frontend React
npm start                 # http://localhost:5000
```

## Déploiement sur Azure

1. **MongoDB Atlas** : créer un cluster gratuit (M0), un utilisateur de base de données, autoriser l'accès réseau `0.0.0.0/0`, puis copier la chaîne de connexion `mongodb+srv://...`.
2. **Azure** : portail Azure → *Créer une ressource* → *Web App*.
   - Publier : *Code* · Pile d'exécution : *Node 20 LTS* · Système : *Linux* · Plan : *Free F1*.
3. **Variables d'environnement** : Web App → *Paramètres* → *Variables d'environnement* :
   - `MONGO_URI` = chaîne Atlas
   - `SCM_DO_BUILD_DURING_DEPLOYMENT` = `true` (Azure exécute `npm install` puis `npm run build`)
4. **Deployment Center** : source *GitHub* → ce dépôt, branche `main` → Enregistrer. Azure crée un workflow GitHub Actions et déploie automatiquement à chaque push.
5. Ouvrir `https://<nom-de-l-app>.azurewebsites.net` : l'application est en ligne.

**Lien de l'application déployée :** _à ajouter après le déploiement_

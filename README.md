# GADEApp - Système de Domotique Connectée

## 📱 À propos du projet

GADEApp est un système complet de domotique développé dans le cadre d'un projet de fin d'année de Terminale STI2D. Ce projet de groupe réalisé par une équipe de 5 personnes permet de contrôler des appareils connectés via une application Android, le tout centralisé par un serveur qui synchronise l'ensemble des objets connectés.

## 🏗️ Architecture du système

Le système GADEApp est composé de plusieurs éléments interconnectés :

### 1. **Application Android** (`GADE App/`)
- Application mobile développée en Java pour Android
- Interface utilisateur intuitive pour contrôler les appareils
- Gestion des dispositifs avec statut en temps réel
- Contrôle de luminosité et d'état des lampes
- Compatible avec les appareils Android (API 24+)

### 2. **Serveurs Backend**

#### **Serveur HTTP** (`GADE Server HTTP/`)
- Serveur Express.js pour l'authentification et la gestion des utilisateurs
- Système de sessions sécurisées
- Base de données SQLite pour les utilisateurs
- API REST pour les opérations CRUD

#### **Serveur WebSocket** (`GADE Server WebSocket/`)
- Communication en temps réel avec les appareils IoT
- Support HTTPS sécurisé avec certificats SSL/TLS
- Gestion de multiples types d'appareils :
  - Lampes connectées
  - Capteurs de luminosité
  - Capteurs de présence
  - Capteurs de consommation électrique
  - Panneaux de contrôle

### 3. **Appareils IoT (ESP8266/ESP8285)**

#### **GADE Light** - Lampe connectée
- Contrôle d'éclairage intelligent
- Basé sur ESP8285
- Compatible avec le protocole Philips Hue

#### **GADE Luminosity** - Capteur de luminosité
- Mesure de l'intensité lumineuse
- Communication en temps réel avec le serveur

#### **GADE Control Panel** - Panneau de contrôle
- Interface physique de contrôle
- Basé sur ESP8285

#### **GADE IR** - Contrôle infrarouge
- Émetteur/récepteur IR pour appareils traditionnels
- Intégration avec le système domotique

## 🚀 Installation et Configuration

### Prérequis

- **Pour l'application Android :**
  - Android Studio
  - JDK 8 ou supérieur
  - Android SDK (API 24+)

- **Pour les serveurs :**
  - Node.js (v12 ou supérieur)
  - npm ou yarn

- **Pour les appareils IoT :**
  - PlatformIO
  - Accès aux cartes ESP8266/ESP8285

### Installation

#### 1. Serveur HTTP
```bash
cd "GADE Server HTTP"
npm install
npm start
```

#### 2. Serveur WebSocket
```bash
cd "GADE Server WebSocket"
npm install
npm run server
```

#### 3. Application Android
1. Ouvrir le projet `GADE App/` dans Android Studio
2. Synchroniser les dépendances Gradle
3. Compiler et installer sur un appareil Android

#### 4. Appareils IoT
```bash
cd "GADE Light"  # ou autre appareil
platformio run --target upload
```

## 🔧 Configuration

### Serveur HTTP
- Créer un fichier `.env` avec votre `SECRET_KEY`
- Configurer `data.json` avec votre host et port

### Serveur WebSocket
- Générer les certificats SSL/TLS (`key.pem` et `cert.pem`)
- Le serveur écoute par défaut sur le port 8080

### Application Android
- Configurer l'adresse IP du serveur dans `HueController.java`
- Définir la clé API Philips Hue si applicable

## 📡 Fonctionnalités

- ✅ Contrôle à distance des lampes (on/off, luminosité)
- ✅ Surveillance en temps réel des capteurs
- ✅ Authentification utilisateur sécurisée
- ✅ Communication WebSocket bidirectionnelle
- ✅ Interface mobile intuitive
- ✅ Support multi-appareils
- ✅ Architecture extensible

## 🛠️ Technologies utilisées

- **Frontend Mobile :** Java, Android SDK, Material Design
- **Backend :** Node.js, Express.js, WebSocket
- **Base de données :** SQLite
- **IoT :** Arduino Framework, ESP8266/ESP8285, PlatformIO
- **Protocoles :** HTTP, HTTPS, WebSocket, MQTT
- **Sécurité :** SSL/TLS, Sessions, Authentification

## 👥 Équipe

Projet réalisé par une équipe de 5 élèves en Terminale STI2D dans le cadre du projet de fin d'année.

## 📝 Licence

Ce projet est sous licence ISC.

## 🔗 Liens

- [Repository GitHub](https://github.com/Ekyoz/GADEApp)
- [Issues](https://github.com/Ekyoz/GADEApp/issues)

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

---

*Projet développé dans le cadre de la formation STI2D - Système de domotique connectée*

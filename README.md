
# 🐦 BirdWatcher - Web App

**Developed by an 11-year-old! 🎉**

A progressive web app for identifying birds by photo or sound, tracking sightings, logging behaviors, and learning about pet bird care.

**Live Site:** https://LaurenForsythe197.github.io/BirdWatcher/

---

## ✨ Features

### 🔍 Bird Identification
- **Photo ID**: Upload or capture bird photos for AI-powered identification
- **Sound ID**: Record bird calls and identify species by sound
- **Egg ID**: Identify bird eggs by appearance
- Confidence levels and identifying features
- Fun facts about identified species

### 📋 Sighting Tracking
- Save bird sightings with photos, species, age, and gender
- Track location and custom notes
- Complete sighting history
- View linked behavior observations

### 📊 Behavior Log
- Track bird behaviors (eating, flying, singing, etc.)
- Log observations with timestamps
- Link behaviors to specific sightings
- Monitor bird activity patterns

### 🏠 Pet Bird Care
- **Care Guides**: 8 common pet bird species with diet & enrichment tips
  - Budgerigar (Budgie/Parakeet)
  - Cockatiel
  - African Grey Parrot
  - Canary
  - Lovebird
  - Conure
  - Macaw
  - Cockatoo
- **My Pet Birds**: Add and manage your own pet birds
- Detailed care instructions, feeding schedules, and entertainment tips

### 💡 Pro Tips
- Birdwatching tips for better sightings
- Best times to observe wild birds
- Attracting birds with native plants and water sources

### 📱 Progressive Web App (PWA)
- **Offline Support**: Works without internet connection
- **Installable**: Add to home screen on mobile and desktop
- **Fast**: Cached assets load instantly
- **Service Worker**: Automatic updates and background sync

---

## 🏗️ Architecture

### Technology Stack
- **Framework**: React 18 (via CDN)
- **Styling**: Custom CSS with theme variables
- **Storage**: LocalStorage (browser-based)
- **Media**: Native file input (camera & gallery)
- **PWA**: Service Worker + Web App Manifest

### File Structure
- **index.html**: Main HTML entry point
-  **styles.css**: Global styling & components
-  **app.js**: Utils, hooks, theme, database layer
-  **screens-identify.js**:  Identify screen & modals
-  **screens-other.js**: Sightings, Behaviors, Pet Care screens
-  **main-app.js**:  Main app component & tab navigation
-  **manifest.json**:  PWA manifest
-  **sw.js** Service worker (offline support)
-  **README.md**: This file

  
### Components Breakdown

#### App Core (`app.js`)
- **Theme System**: Purple color scheme with CSS variables
- **Database Utilities**: LocalStorage wrapper (get, set, insert, query)
- **Custom Hooks**: 
  - `useQuery()` - Fetch data from local DB
  - `useMutation()` - Insert data into local DB
  - `useCamera()` - Capture/pick images
  - `useAudio()` - Record bird sounds
- **Utility Functions**: UUID generation, date formatting, photo conversion
- **Icon Component**: Emoji-based icon system

#### Identify Screen (`screens-identify.js`)
- Three modes: Photo ID, Sound ID, Egg ID
- Camera & gallery integration
- Audio recording with visual feedback
- Mock AI identification (ready for real API integration)
- Save sighting modal with notes
- Pro tips section

#### Other Screens (`screens-other.js`)
- **Sightings**: List and detail view of saved sightings
- **Behaviors**: Log and view bird behaviors with FAB button
- **Pet Care**: Care guides and personal pet bird management

#### Main App (`main-app.js`)
- Bottom tab navigation (4 tabs)
- Screen routing based on active tab
- Theme provider wrapper

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LaurenForsythe197/BirdWatcher.github.io.git
2. **Open locally**
   ```bash
   cd BirdWatcher.github.io
 - Open index.html in a web browser
 - Or use a local server: python -m http.server 8000

3. **Install as PWA**
- On mobile: Click share → "Add to Home Screen"
- On desktop: Click address bar → "Install app"

### Usage
- **TBC**

---

## 🔧 Development
- **TBC**

---

## 🔧 Customization
- **TBC**

---

## 🔧 Data Storage
- **TBC**

---

## 🔧 Future Enhancements
- **TBC**

---

## 🔧Browser Support
- **TBC**

---

## 🔧License
- **TBC**


---

## 🔧Contributing
- No contributions at minute please as beta version and want 11 year old to learn more

## 🔧Support
- **None available at moment for internal testing use**

## 🙏Credits
- Built with React, CSS, and lots of bird facts by an 11-year-old developer! 🐦
- Happy Birdwatching! 🐦✨

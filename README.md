# React Native Outfit App

## 🚀 How to Run
- Open in Expo Snack (runs on web/mobile): https://snack.expo.dev/@ashok_bhargav/react-native-assignment-monova 
- GitHub Repo: (https://github.com/AshokBhargav123/React-Native-Assignment-Monova) 

## 📹 What I Replicated from the Video
- Outfit listing UI with multiple items
- Card animations for each outfit/item
- Interactive scrolling & selection behavior
- Image preview inside outfit cards

## 🏗️ Component Structure & State Management
- `App.js`: Main entry point; manages navigation and global state
- `ItemCard.js`: Displays individual items with image and animations
- `OutfitCard.js`: Displays outfit info, handles slide/fade animations
- `data.js`: Contains sample data for items and outfits

**State Management:**
- `useState` for local UI state
- `useEffect` for animations or side effects
- `useRef` + `Animated` API for slide/fade interactions

## 📌 Assumptions & Limitations
- Uses **static mock data**; no external API
- Images are stored as local assets
- Tested on **web and iOS simulator** via Expo Snack
- Limited error handling for UI interactions

## 🎬 Animations & Interactions Implemented
- Slide-in animation for outfit cards
- Fade-in opacity effect for item appearance
- Pressable interaction for selecting an item/outfit
- Scrollable list for outfit gallery
- Basic touch feedback (onPress highlight)

## 📂 Folder/File Structure 
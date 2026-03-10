# Jenkins Spotlight Redesign

A modern redesign of the **Jenkins Contributors Spotlight page** built with **React, Vite, and Material UI (MUI)**.
This project improves the visual design, usability, and responsiveness of the contributors page while maintaining compatibility with the Jenkins ecosystem.

---

## 🚀 Overview

The **Jenkins Spotlight Redesign** enhances how contributors are displayed by introducing a clean card-based layout, modern UI components, and interactive search functionality.

The goal of this project is to make the contributors page:

* More visually appealing
* Easier to navigate
* Responsive across all devices
* Scalable for large contributor lists

---

## ✨ Features

* 🎨 **Modern Glassmorphism UI**

  * Smooth gradients
  * Blurred glass-style contributor cards

* 👤 **Contributor Cards**

  * Avatar
  * Name
  * Location
  * Contribution date
  * Pronouns
  * GitHub profile link

* 🔎 **Contributor Search**

  * Real-time filtering of contributors
  * Search by name or metadata

* 📱 **Responsive Design**

  * Works on mobile, tablet, and desktop

* ⚡ **Fast Performance**

  * Built with **Vite** for lightning-fast development and builds

* 🧩 **Reusable Components**

  * Modular React component structure

---

## 🛠️ Tech Stack

* **React**
* **Vite**
* **Material UI (MUI)**
* **JavaScript (ES6+)**
* **CSS / MUI `sx` styling**

---

## 📂 Project Structure

```
📂 Project Structure
jenkins-spotlight-redesign
│
├── public
│
├── src
│   ├── assets
│
│   ├── components
│   │   ├── card
│   │   │   ├── ContributorCard.jsx
│   │   │   ├── ContributorsGrid.jsx
│   │   │   └── ContributorSpotlight.jsx
│   │
│   │   ├── layout
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │
│   │   └── sections
│   │       └── Hero.jsx
│
│   ├── pages
│   │   └── contributorPage.jsx
│
│   ├── hooks
│   │   └── useContributors.js
│
│   ├── data
│
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```
git clone https://github.com/YOUR_USERNAME/jenkins-spotlight-redesign.git
```

Navigate to the project:

```
cd jenkins-spotlight-redesign
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

---

## 📸 Screenshots

Example contributor card layout:

* Avatar
* Name
* Location
* Metadata badges
* GitHub link

*(Add screenshots here if available)*

---

## 🔍 Future Improvements

* Ctrl + K global contributor search
* Contributor sorting and filtering
* Pagination for large contributor lists
* Dark / light theme toggle
* GitHub API integration for live contributor data

---

## 🤝 Contributing

Contributions are welcome!

If you'd like to improve the design or add new features:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Submit a pull request

---

## 📄 License

This project follows the same open-source spirit as the Jenkins community.
Refer to the Jenkins project licensing guidelines if integrating with the official project.

---

## 💡 Inspiration

This redesign is inspired by modern open-source dashboards and aims to improve how the Jenkins community showcases its contributors.

---

**Built with ❤️ for the Jenkins community.**

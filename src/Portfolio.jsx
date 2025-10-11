import React, { useEffect, useMemo, useState } from "react";
import "./index.css";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Download,
  ExternalLink,
  ChartBar,
  Database,
  Code2,
  BarChart3,
  Languages as LanguagesIcon,
  Trophy,
  Music,
  Dumbbell,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";


/*********************************
 * Données de base / Base details
 *********************************/
const ME = {
  name: "Mélissa Noupeuhou",
  location: "Goussainville, 95190",
  email: "noupeuhoumelissa@gmail.com",
  phone: "+33 6 32 89 53 59",
  linkedin: "https://www.linkedin.com/in/melissa-noupeuhou",
  cvUrl: "/CV_Melissa_NOUPEUHOU.pdf",
};

/*********************************
 * Libellés UI / UI labels
 *********************************/
const translations = {
  fr: {
    nav: {
      home: "Accueil",
      skills: "Compétences",
      experience: "Expériences",
      projects: "Projets",
      education: "Formation",
      contact: "Contact",
    },
    hero: {
      role: "Data Analyst · Ingénieure BI",
      tagline:
        "Passionnée par l’analyse de données et la prise de décision stratégique, j’allie expertise technique et vision métier.",
      cv: "Télécharger mon CV",
      linkedin: "LinkedIn",
    },
    sections: {
      skills: "Compétences",
      experiences: "Expériences",
      projects: "Projets",
      education: "Formation",
      languages: "Langues",
      certifications: "Certifications",
      hobbies: "Centres d’intérêt",
      contact: "Contact",
    },
    project: { view: "Voir le projet" },
    form: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      message: "Votre message",
      send: "Envoyer",
    },
    footer: (year) => `© ${year} ${ME.name}. Tous droits réservés.`,
  },
  en: {
    nav: {
      home: "Home",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      role: "Data Analyst · BI Engineer",
      tagline:
        "Passionate about data analysis and strategic decision‑making, I combine technical expertise with business vision.",
      cv: "Download my CV",
      linkedin: "LinkedIn",
    },
    sections: {
      skills: "Skills",
      experiences: "Experience",
      projects: "Projects",
      education: "Education",
      languages: "Languages",
      certifications: "Certifications",
      hobbies: "Interests",
      contact: "Contact",
    },
    project: { view: "View project" },
    form: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      message: "Your message",
      send: "Send",
    },
    footer: (year) => `© ${year} ${ME.name}. All rights reserved.`,
  },
};

/********************************************
 * Contenus bilingues / Bilingual content
 ********************************************/
const skills = [
  {
    title: { fr: "ETL & Ingénierie de données", en: "ETL & Data Engineering" },
    icon: <Database className="w-6 h-6" />,
    items: ["SSIS", "Talend", "Hadoop", "Spark", "Datastage", "NoSQL", "SQL Server"],
  },
  {
    title: { fr: "Dataviz & BI", en: "DataViz & BI" },
    icon: <BarChart3 className="w-6 h-6" />,
    items: ["Power BI", "Tableau", "Qlik Sense", "D3.js", "SAP Analytics Cloud", "IBM Cognos"],
  },
  {
    title: { fr: "Programmation", en: "Programming" },
    icon: <Code2 className="w-6 h-6" />,
    items: ["Python", "R", "SQL", "NumPy", "Pandas", "Streamlit"],
  },
  {
    title: { fr: "Modélisation & Analytics", en: "Modeling & Analytics" },
    icon: <ChartBar className="w-6 h-6" />,
    items: ["Modèle en étoile / Star schema", "OLAP/SSAS", "Datamining", "Statistiques / Statistics", "RGPD / GDPR"],
  },
];

const experiences = [
  {
    company: "Groupe Covéa",
    period: { fr: "09/2024 – aujourd’hui", en: "09/2024 – present" },
    role: {
      fr: "Chargée d’applications / Ingénieure BI",
      en: "Applications Manager / BI Engineer",
    },
    bullets: [
      { fr: "Développement des flux ETL avec SSIS", en: "Develop ETL dataflows with SSIS" },
      { fr: "Conception du modèle de données (étoile)", en: "Design star‑schema data model" },
      { fr: "Cubes OLAP sous SSAS", en: "OLAP cubes with SSAS" },
      { fr: "Dashboards interactifs Power BI", en: "Interactive Power BI dashboards" },
      { fr: "Analyse des besoins, docs, support utilisateurs", en: "Requirements analysis, documentation, user support" },
    ],
  },
  {
    company: "Zorro",
    period: { fr: "04/2025 – 06/2025", en: "04/2025 – 06/2025" },
    role: { fr: "Projet de Fin d'Études", en: "Capstone Project" },
    bullets: [
      { fr: "Catalogue de recommandations personnalisées", en: "Personalized recommendation catalog" },
      { fr: "Prototype de moteur de reco (Python/Streamlit)", en: "Recommendation engine prototype (Python/Streamlit)" },
      { fr: "Tableau de bord Power BI – suivi & prévention", en: "Power BI dashboard – monitoring & prevention" },
      { fr: "Collaboration multidisciplinaire", en: "Cross‑functional collaboration" },
    ],
  },
  {
    company: "COJOP – Jeux de Paris 2024",
    period: { fr: "07/2024 – 08/2024", en: "07/2024 – 08/2024" },
    role: { fr: "Volontaire – Accueil & logistique", en: "Volunteer – Front‑desk & logistics" },
    bullets: [
      { fr: "Accueil, orientation des délégations", en: "Welcome & guide delegations" },
      { fr: "Coordination logistique & sécurité", en: "Logistics & safety coordination" },
      { fr: "Gestion des imprévus en contexte multiculturel", en: "Handle contingencies in multicultural context" },
    ],
  },
  {
    company: "Sense",
    period: { fr: "06/2023 – 08/2023", en: "06/2023 – 08/2023" },
    role: { fr: "Stagiaire Développement Web", en: "Web Development Intern" },
    bullets: [
      { fr: "Maintenance évolutive/corrective de sites", en: "Feature and bug maintenance for websites" },
      { fr: "Mise en place d’une base de données", en: "Set up a database" },
    ],
  },
];

const projects = [
  {
  title: { 
    fr: "Dashboard Power BI pour la prévention du harcèlement", 
    en: "Power BI Dashboard for Harassment Prevention" 
  },
  period: "2025",
  stack: ["Python", "Streamlit", "Power BI", "DAX"],
  description: {
    fr: "Prototype d’un moteur de recommandations personnalisées et dashboard pour un chatbot qui détecte, qualifie la gravité et suggère des réponses adaptées.",
    en: "Prototype of a personalized recommendation engine and dashboard for a chatbot that detects, assesses severity, and recommends tailored responses.",
  },
  link: "#",
  cover: "/zorro.jpg",
  alt: "Dashboard Power BI – prévention du harcèlement",
  pages: [
    { img: "/zorro.jpg", 
      text: {
    fr: (
        <>
          🎯 <strong> Objectif : Aider les adolescents victimes de harcèlement en leur proposant des recommandations personnalisées via un chatbot intelligent </strong> <br />
          🧩 Ma contribution : <br />
            - Création d’un catalogue de recommandations<br />
            - Développement d’un système de scoring<br />
            - Mise en place d’un tableau de bord Power BI
        </>
      ),
      en: (
        <>
          🎯 <strong> Goal: Help teenagers facing harassment by providing personalized recommendations via an intelligent chatbot </strong> <br />
          🧩 My contribution: <br />
            - Built a catalog of recommendations<br />
            - Developed a scoring system<br />
            - Created a Power BI dashboard
        </>
      ),
    },
  },
    
  {
    img: "/zorro-1.jpg",
    text: {
      fr: (
        <>
          📊 <strong>Gestion des données :</strong> <br />
          Les données utilisateurs sont normalement fournies par le chatbot après analyse automatique
          (type de harcèlement, émotions, gravité, etc.). <br /><br />
          Dans le cadre du projet, nous avons <strong>simulé des profils utilisateurs variés</strong>
          pour tester notre système. <br />
          Nous avons également créé un <strong>catalogue de recommandations structuré</strong>,
          enrichissable par des experts (psychologues, associations, etc.).
        </>
      ),
      en: (
        <>
          📊 <strong>Data management:</strong> <br />
          User data is normally provided by the chatbot after automatic analysis
          (harassment type, emotions, severity, etc.). <br /><br />
          For the project, we <strong>simulated a variety of user profiles</strong>
          to test our system. <br />
          We also created a <strong>structured recommendations catalog</strong>
          that experts (psychologists, NGOs, etc.) can enrich.
        </>
      ),
    },
  },

  {
    img: "/zorro-2.jpg",
    text: {
      fr: (
        <>
          🧠 <strong>Application Streamlit :</strong> fait correspondre chaque profil utilisateur avec les recommandations les plus adaptées. Un <strong>système de scoring</strong> a été mis en place selon plusieurs critères. <br /><br />
          L’outil permet de :
          <ul style={{ paddingLeft: '1.25rem', listStyleType: 'disc' }}>
            <li>Visualiser les recommandations personnalisées par utilisateur</li>
            <li>Exporter les résultats (CSV, Excel, JSON)</li>
            <li>Générer un fichier global de recommandations pour l’analyse</li>
          </ul>
        </>
      ),
      en: (
        <>
          🧠 <strong>Streamlit application:</strong> matches each user profile with the most relevant recommendations. A <strong>scoring system</strong> was implemented across multiple criteria. <br /><br />
          The tool lets you:
          <ul style={{ paddingLeft: '1.25rem', listStyleType: 'disc' }}>
            <li>View personalized recommendations per user</li>
            <li>Export results (CSV, Excel, JSON)</li>
            <li>Generate a global recommendations file for analysis</li>
          </ul>
        </>
      ),
    },
  },

  {
    img: "/zorro-3.jpg",
    text: {
      fr: (
        <>
          🗂️ Nous avons conçu un <strong>modèle en étoile</strong> structurant les données liées aux utilisateurs, aux recommandations et aux analyses de scoring. <br /><br />
          📊 Ce modèle permet de <strong>croiser les profils utilisateurs</strong> avec les recommandations reçues,
          et d’analyser facilement les <strong>tendances</strong> par période, type de harcèlement ou émotions dominantes.
        </>
      ),
      en: (
        <>
          🗂️ We designed a <strong>star schema</strong> to structure data for users, recommendations, and scoring analyses. <br /><br />
          📊 This model enables <strong>linking user profiles</strong> with the recommendations they received,
          and makes it easy to analyze <strong>trends</strong> by time period, harassment type, or dominant emotions.
        </>
      ),
    },
  },

  {
    img: "/zorro.jpg",
    text: {
      fr: (
        <>
          <strong>Visuel final</strong>
        </>
      ),
      en: (
        <>
          <strong>Final visual</strong>
        </>
      ),
    },
  },

  {
    img: "/zorro-4.jpg",
    text: {
      fr: (
        <>
          <strong>Visuel final</strong>
        </>
      ),
      en: (
        <>
          <strong>Final visual</strong>
        </>
      ),
    },
  },

  {
    img: "/zorro-5.jpg",
    text: {
      fr: (
        <>
          <strong>Visuel final</strong>
        </>
      ),
      en: (
        <>
          <strong>Final visual</strong>
        </>
      ),
    },
  },

  {
    img: "/zorro-6.jpg",
    text: {
      fr: (
        <>
          <strong>Visuel final</strong>
        </>
      ),
      en: (
        <>
          <strong>Final visual</strong>
        </>
      ),
    },
  },
  ],
},

  {
    title: { fr: "Dashboard Power BI pour le pilotage du parc hôtelier en Île-de-France", en: "Power BI Dashboard for Managing the Île-de-France Hotel Supply" },
    period: "2025",
    stack: ["PowerBI", "DAX", "Data Quality"],
    description: {
      fr: "Tableau de bord Power BI pour analyser les performances hôtelières en Île-de-France.",
      en: "Power BI dashboard analyzing hotel performance in Île-de-France.",
    },
    link: "#",
    cover: "/hotelIDF.jpg",
    alt: "Dashboard Power BI – parc hôtelier IDF", // <-- alternatif (accessibilité)
    pages: [
    { img: "/hotelIDF.jpg", 
      text: {
    fr: (
        <>
          🎯 <strong> L’objectif principal de ce tableau de bord est d’analyser et de visualiser les données liées aux 
performances des hôtels en Île-de-France.</strong> 
        </>
      ),
      en: (
        <>
          🎯 <strong> The main objective of this dashboard is to analyze and visualize data related to hotel performance in the Île-de-France region.</strong> 
        </>
      ),
    },
  },
  {
    img: "/hotelIDF2.jpg",
    text: {
      fr: (
        <>
          <strong>Visuel final</strong>
        </>
      ),
      en: (
        <>
          <strong>Final visual</strong>
        </>
      ),
    },
  },
  {
    img: "/hotelIDF3.jpg",
    text: {
      fr: (
        <>
          <strong>Visuel final</strong>
        </>
      ),
      en: (
        <>
          <strong>Final visual</strong>
        </>
      ),
    },
  },
  {
    img: "/hotelIDF4.jpg",
    text: {
      fr: (
        <>
          <strong>Visuel final</strong>
        </>
      ),
      en: (
        <>
          <strong>Final visual</strong>
        </>
      ),
    },
  },
  {
    img: "/hotelIDF5.jpg",
    text: {
      fr: (
        <>
          <strong>Visuel final</strong>
        </>
      ),
      en: (
        <>
          <strong>Final visual</strong>
        </>
      ),
    },
  },
  {
    img: "/hotelIDF6.jpg",
    text: {
      fr: (
        <>
          <strong>Visuel final</strong>
        </>
      ),
      en: (
        <>
          <strong>Final visual</strong>
        </>
      ),
    },
  },
  {
    img: "/hotelIDF7.jpg",
    text: {
      fr: (
        <>
        🧠  Création d'un bouton avec Power Automate qui permet d'extraire les données de Power BI en format CSV.
        </>
      ),
      en: (
        <>
        🧠 Creation of a button with Power Automate that allows you to extract Power BI data in CSV format.
        </>
      ),
    },
  },
  ],
  
  },
  {
    title: { fr: "Visualisation de données avec D3.js pour l'analyse du jeu de données COVID-19 (OWID)", en: "D3.js Data Visualization for Analysis of the OWID COVID-19 Dataset" },
    period: "2024",
    stack: ["D3.js", "JavaScript", "HTML/CSS"],
    description: {
      fr: "Analyse du dataset OWID COVID-19 et construction d’un dashboard avec D3.js.",
      en: "Explored the OWID COVID-19 dataset and built an interactive D3.js dashboard.",
    },
    link: "#",
    cover: "/covid.jpg",
    alt: "Visualisation de données avec D3.j", // <-- alternatif (accessibilité)
    pages: [
    {
    img: "/covid.jpg",
    text: {
      fr: (
        <>
          🎯 <strong> L’objectif principal de ce tableau de bord est d’analyser et de visualiser les données liées aux 
données du Covid-19.</strong>
        </>
      ),
      en: (
        <>
          🎯 <strong>The main objective of this dashboard is to analyze and visualize data related to Covid-19.</strong>
        </>
      ),
    },
  },
  {
    img: "/covid2.jpg",
    text: {
      fr: (
        <>
          Avant de concevoir les visualisations, nous avons réalisé une analyse exploratoire des données afin d’en extraire les indicateurs pertinents.
        </>
      ),
      en: (
        <>
        Before designing the dashboard, we conducted an exploratory data analysis to extract relevant indicators.
        </>
      ),
    },
  },
  ],

  
  },
  {
    title: { fr: "Analyse de données fonctionnelles du dataset Cancerrate (fds)", en: "Functional Data Analysis of the Cancerrate (fds) Dataset" },
    period: "2023",
    stack: ["R", "Linear Regression", "Data wrangling"],
    description: {
      fr: "Étude des taux de cancer du sein par âge en Australie : transformation en données fonctionnelles.",
      en: "Study of age-specific breast cancer rates in Australia: transformation into functional data.",
    },
    link: "#",
    cover: "/cancerate.jpg",
    alt: "Dashboard Power BI – parc hôtelier IDF", // <-- alternatif (accessibilité)
    pages: [
    {
    img: "/cancerate.jpg",
    text: {
      fr: (
        <>
          🎯 <strong> Objectifs : Étudier l’évolution du taux d’incidence du cancer du sein chez les femmes australiennes, afin d’identifier des profils d’évolution et des groupes d’âge pertinents pour la surveillance épidémiologique. </strong>
        </>
      ),
      en: (
        <>
          🎯 <strong>Goal : To study the evolution of breast cancer incidence rates among Australian women in order to identify evolution patterns and age groups relevant for epidemiological surveillance.</strong>
        </>
      ),
    },
  },
  {
    img: "/cancerate2.jpg",
    text: {
      fr: (
        <>
          <>
     💻 <strong>Approche (en R)</strong>
    <li><strong>Données → fonctions :</strong> lissage par B-splines cubiques pour représenter chaque tranche d’âge par une courbe continue.</li>
    <li><strong>Comparer les trajectoires dans le temps :</strong> Alignement temporel dynamique des courbes + classification hiérarchique classification hiérarchique (nombre de classes via sauts d’inertie).</li>
    <li><strong>Modélisation :</strong> régression linéaire (pentes/tendances) et ACP/FPCA (axes principaux de variation).</li>
    <li><strong>Dataviz :</strong> courbes lissées, dendrogramme + courbe des sauts d’inertie, scree plot, cercle des corrélations.</li>
</>

        </>
      ),
      en: (
        <>
  💻 <strong>Approach (in R)</strong>
  <ul style={{ paddingLeft: "1.25rem", listStyleType: "disc", marginTop: "0.5rem" }}>
    <li><strong>Data → functions:</strong> cubic B-spline smoothing to represent each age group with a continuous curve.</li>
    <li><strong>Compare trajectories over time:</strong> Dynamic Time Warping (DTW) alignment of curves + hierarchical clustering (number of classes via inertia “elbow”).</li>
    <li><strong>Modeling:</strong> linear regression (slopes/trends) and PCA/FPCA (principal axes of variation).</li>
    <li><strong>Data viz:</strong> smoothed curves, DTW dendrogram + inertia-drop curve, scree plot, correlation circle.</li>
  </ul>
</>

      ),
    },
  },
  {
    img: "/cancerate3.jpg",
    text: {
      fr: (
        <>
        <strong>Resultats - Visuel 1</strong> <br/>
        Évolution des taux d’incidence (1921–2001) par tranche d’âge. Les points montrent les mesures annuelles ; les lignes relient les séries par âge pour visualiser la dynamique globale.

        </>
      ),
      en: (
        <>
          <strong>Results - Visual 1</strong> <br/>
          Incidence rates (1921–2001) by age group. Dots are annual values; lines connect each age series to show overall dynamics.        
        </>
      ),
    },
  },
  {
    img: "/cancerate4.jpg",
    text: {
      fr: (
        <>
        <strong>Resultats - Visuel 2</strong> <br/>
        Évolution des taux d’incidence (1921–2001) par tranche d’âge. Les points montrent les mesures annuelles ; les lignes relient les séries par âge pour visualiser la dynamique globale.

        </>
      ),
      en: (
        <>
          <strong>Results - Visual 2</strong> <br/>
          Incidence rates (1921–2001) by age group. Dots are annual values; lines connect each age series to show overall dynamics.        
        </>
      ),
    },
  },
  {
    img: "/cancerate5.jpg",
    text: {
      fr: (
        <>
        <strong>Resultats - Visuel 3</strong> <br/>
ACP (variables) : relations entre tranches d’âge sur les deux premiers axes. Les flèches proches indiquent des profils similaires ; celles opposées signalent des dynamiques contrastées.
        </>
      ),
      en: (
        <>
          <strong>Results - Visual 3</strong> <br/>
PCA (variables): relationships across age groups on the first two components. Nearby arrows = similar profiles; opposite directions = contrasting dynamics.        </>
      ),
    },
  },
  {
    img: "/cancerate7.jpg",
    text: {
      fr: (
        <>
        <strong>Resultats - Visuel 4</strong> <br/>
Tendance linéaire (ligne rouge) superposée à la courbe lissée : estimation de la pente pour une tranche d’âge donnée (curseur).        </>
      ),
      en: (
        <>
          <strong>Results - Visual 4</strong> <br/>
        Linear trend (red line) overlaid on the smoothed curve: estimated slope for a selected age group (slider).
        </>
      ),
    },
  },
  ],
  },
];

const education = [
  {
    school: "CY Tech – Cergy",
    period: "2022 – 2025",
    degree: {
      fr: "Cycle ingénieur, maths appliquées – BI & Analytics",
      en: "Engineering cycle, applied mathematics – BI & Analytics",
    },
    details: {
      fr: "Datamining, Data visualisation, Statistiques, Probabilités, ETL, Data science, RGPD.",
      en: "Data mining, Data visualization, Statistics, Probability, ETL, Data science, GDPR.",
    },
  },
  {
    school: "Heriot‑Watt University – Édimbourg",
    period: "01/2024 – 05/2024",
    degree: { fr: "Semestre d’échanges", en: "Exchange semester" },
    details: {
      fr: "Time Series & ML, Parallel Programming, Big Data Management, Data Viz.",
      en: "Time Series & ML, Parallel Programming, Big Data Management, Data Viz.",
    },
  },
  {
    school: "CY Tech – Prépa intégrée",
    period: "2020 – 2022",
    degree: {
      fr: "Maths‑Informatique, Statistiques & Économie",
      en: "Integrated preparatory class, Math–CS, Statistics & Economics",
    },
    details: {
      fr: "Mathématiques, Informatique, Marketing, Macroéconomie, Microéconomie.",
      en: "Mathematics, Computer Science, Marketing, Macroeconomics, Microeconomics.",
    },
  },
];

const languagesList = [
  { name: { fr: "Français", en: "French" }, level: { fr: "Langue maternelle", en: "Native" } },
  { name: { fr: "Anglais", en: "English" }, level: { fr: "B2 (TOEIC 810)", en: "B2 (TOEIC 810)" } },
  { name: { fr: "Espagnol", en: "Spanish" }, level: { fr: "B1", en: "B1" } },
  { name: { fr: "Portugais (brésilien)", en: "Portuguese (Brazilian)" }, level: { fr: "B1", en: "B1" } },
];

const certifications = [
  { name: { fr: "TOEIC B2 (810)", en: "TOEIC B2 (810)" } },
  { name: { fr: "Certification Google Analytics", en: "Google Analytics Certification" } },
];

const hobbies = [
  { icon: <Dumbbell className="w-5 h-5" />, label: { fr: "Gym artistique (7 ans)", en: "Artistic gymnastics (7 years)" } },
  { icon: <Dumbbell className="w-5 h-5" />, label: { fr: "Tennis (2 ans)", en: "Tennis (2 years)" } },
  { icon: <Dumbbell className="w-5 h-5" />, label: { fr: "Athlétisme (2 ans)", en: "Athletics (2 years)" } },
  { icon: <Dumbbell className="w-5 h-5" />, label: { fr: "Football (2 ans)", en: "Football (2 years)" } },
  { icon: <Music className="w-5 h-5" />, label: { fr: "Solfège (4 ans)", en: "Music theory (4 years)" } },
  { icon: <Music className="w-5 h-5" />, label: { fr: "Piano (2 ans)", en: "Piano (2 years)" } },
];

/*********************************
 * Animations
 *********************************/
const fadeIn = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

/*********************************
 * Composants / Components
 *********************************/
function Nav({ t, lang, setLang }) {
  const navItems = useMemo(
    () => [
      { id: "home", label: t.nav.home },
      { id: "skills", label: t.nav.skills },
      { id: "experience", label: t.nav.experience },
      { id: "projects", label: t.nav.projects },
      { id: "education", label: t.nav.education },
      { id: "contact", label: t.nav.contact },
    ],
    [t]
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur border-b border-zinc-200 bg-white/70 text-lg" aria-label="Primary">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight text-zinc-900 text-2xl">
          {ME.name}
        </a>
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-zinc-600 hover:text-zinc-900 hover:underline">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2" role="group" aria-label="Language switcher">
          <button
            onClick={() => setLang("fr")}
            aria-pressed={lang === "fr"}
            aria-label="Basculer en français / Switch to French"
            className={`px-2 py-1 rounded-md focus:outline-none focus:ring ${
              lang === "fr" ? "font-bold underline" : "opacity-70"
            }`}
          >
            FR
          </button>
          <span className="text-zinc-400">|</span>
          <button
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            aria-label="Basculer en anglais / Switch to English"
            className={`px-2 py-1 rounded-md focus:outline-none focus:ring ${
              lang === "en" ? "font-bold underline" : "opacity-70"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ t }) {
  const telHref = useMemo(
    () => `tel:${ME.phone.replace(/[^\d+]/g, "")}`,
    []
  );

  return (
    <section id="home" className="relative isolate overflow-hidden text-lg" aria-label="Hero">
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-cyan-100 via-white to-indigo-100" />
      <div className="max-w-7xl mx-auto px-6 py-28">
        <motion.div {...fadeIn} className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900">
              {ME.name}
            </h1>
            <p className="mt-3 text-2xl text-cyan-700 font-semibold">{t.hero.role}</p>
            <p className="mt-5 text-xl text-zinc-700 leading-relaxed">{t.hero.tagline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={ME.cvUrl}
                className="inline-flex items-center gap-3 rounded-2xl px-6 py-3 bg-zinc-900 text-white shadow hover:shadow-lg"
                download
              >
                <Download className="w-5 h-5" /> {t.hero.cv}
              </a>
              <a
                href={ME.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl px-6 py-3 border border-zinc-300 hover:bg-zinc-100"
              >
                <Linkedin className="w-5 h-5" /> {t.hero.linkedin}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-lg text-zinc-600">
              <span className="inline-flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                {ME.location}
              </span>
              <a
                className="inline-flex items-center gap-3 hover:underline"
                href={`mailto:${ME.email}`}
              >
                <Mail className="w-5 h-5" />
                {ME.email}
              </a>
              <a className="inline-flex items-center gap-3 hover:underline" href={telHref}>
                <Phone className="w-5 h-5" />
                {ME.phone}
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-tr from-indigo-500 to-cyan-500 p-[3px] shadow-2xl">
              <div className="w-full h-full rounded-[calc(theme(borderRadius.3xl)-3px)] bg-white/80 backdrop-blur flex items-center justify-center overflow-hidden">
                <img src="/photo_moi.jpg" alt={ME.name} className="w-full h-full object-cover rounded-3xl" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Skills({ t, lang }) {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-28 text-lg" aria-label={t.sections.skills}>
      <motion.h2 {...fadeIn} className="text-4xl font-bold text-zinc-900">
        {t.sections.skills}
      </motion.h2>
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-7">
        {skills.map((cat) => (
          <motion.div key={cat.title.fr} {...fadeIn} className="rounded-2xl border border-zinc-200 p-6 bg-white/70">
            <div className="flex items-center gap-3 text-zinc-900 font-semibold">
              {cat.icon}
              {cat.title[lang]}
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {cat.items.map((s) => (
                <span key={s} className="text-sm rounded-full px-3.5 py-1.5 bg-zinc-100 border border-zinc-200 text-zinc-700">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Experience({ t, lang }) {
  return (
    <section id="experience" className="max-w-7xl mx-auto px-6 py-28 text-lg" aria-label={t.sections.experiences}>
      <motion.h2 {...fadeIn} className="text-4xl font-bold text-zinc-900">
        {t.sections.experiences}
      </motion.h2>
      <div className="mt-10 relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-300 to-transparent" />
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div key={idx} {...fadeIn} className="relative pl-14">
              <div className="absolute left-0 mt-1.5 w-9 h-9 rounded-full bg-white border border-zinc-300 flex items-center justify-center shadow">
                <ChevronRight className="w-5 h-5 text-zinc-500" />
              </div>
              <div className="rounded-2xl border border-zinc-200 p-6 bg-white/70">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-zinc-900 text-xl">{exp.company}</p>
                  <p className="text-base text-zinc-500">{exp.period[lang]}</p>
                </div>
                <p className="mt-1 text-lg text-cyan-700 font-medium">{exp.role[lang]}</p>
                <ul className="mt-3 space-y-1.5 text-base text-zinc-700 list-disc pl-5">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b[lang]}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ open, project, index, total, onPrev, onNext, onClose, lang, t }) {
  const [pageIndex, setPageIndex] = useState(0);

  // Réinitialise la page à 0 quand on change de projet
  useEffect(() => {
    setPageIndex(0);
  }, [project]);

  // Raccourcis clavier
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  // Bloque le scroll en arrière-plan
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  if (!open || !project) return null;

  // Helper de localisation : accepte string, JSX, ou { fr, en }
  const L = (val) => {
    if (typeof val === "string" || React.isValidElement(val)) return val;
    return val?.[lang] ?? val?.fr ?? "";
  };

  const title = L(project.title);
  const desc  = L(project.description);

  // Si pas de pages, on fabrique une page à partir de la cover + description
  const pages = project.pages?.length
    ? project.pages
    : [{ img: project.cover, text: desc }];

  const currentPage = pages[pageIndex];
  const pageText = L(currentPage?.text) || desc;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onMouseDown={onClose}
    >
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onMouseDown={onClose}
      />

      <motion.div
        className="relative mx-4 w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white shadow-2xl"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", damping: 22, stiffness: 220 }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-6 border-b border-zinc-200">
          <div>
            <h3 id="project-modal-title" className="text-2xl font-semibold text-zinc-900">
              {title}
            </h3>
            <p className="text-sm text-zinc-500">{project.period}</p>
          </div>
          <button
            onClick={onClose}
            aria-label={lang === "fr" ? "Fermer le modal" : "Close modal"}
            className="rounded-xl border border-zinc-200 px-3 py-2 hover:bg-zinc-100"
          >
            ✕
          </button>
        </div>

        {/* IMAGE + flèches pour défiler les pages du projet */}
        <div className="relative aspect-video bg-zinc-100">
          {currentPage?.img && (
            <img
              src={currentPage.img}
              alt={project.alt || title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}

          {/* flèche gauche (page précédente) */}
          {pages.length > 1 && (
            <>
              <button
                onClick={() => setPageIndex((p) => (p === 0 ? pages.length - 1 : p - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-zinc-200 bg-white/80 backdrop-blur px-3 py-3 shadow hover:bg-white focus:outline-none focus:ring"
                aria-label={lang === "fr" ? "Page précédente" : "Previous page"}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* flèche droite (page suivante) */}
              <button
                onClick={() => setPageIndex((p) => (p + 1) % pages.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-zinc-200 bg-white/80 backdrop-blur px-3 py-3 shadow hover:bg-white focus:outline-none focus:ring"
                aria-label={lang === "fr" ? "Page suivante" : "Next page"}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 text-white text-xs px-2 py-1">
                {lang === "fr" ? "Page" : "Page"} {pageIndex + 1} / {pages.length}
              </span>
            </>
          )}
        </div>

        <div className="p-6 space-y-4">
          <p className="text-base text-zinc-700">
            {pageText}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.stack?.map((s) => (
              <span
                key={s}
                className="text-sm rounded-full px-3 py-1.5 bg-zinc-100 border border-zinc-200 text-zinc-700"
              >
                {s}
              </span>
            ))}
          </div>

          {project.link && project.link !== "#" ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 bg-zinc-900 text-white hover:shadow"
            >
              {lang === "fr" ? "Ouvrir le lien" : "Open link"} <ExternalLink className="w-4 h-4" />
            </a>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}



function Projects({ t, lang, onOpenProject }) {
  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-28 text-lg" aria-label={t.sections.projects}>
      <motion.h2 {...fadeIn} className="text-4xl font-bold text-zinc-900">
        {t.sections.projects}
      </motion.h2>
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((p, i) => (
          <motion.article key={i} {...fadeIn} className="rounded-2xl border border-zinc-200 bg-white/70 overflow-hidden group">
            <div className="aspect-video overflow-hidden bg-gradient-to-tr from-indigo-400 to-cyan-400/80">
              {p.cover ? (
                <img
                  src={p.cover}
                  alt={p.alt || (typeof p.title === "string" ? p.title : p.title[lang])}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              ) : null}
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900 text-xl">{p.title[lang]}</h3>
                <span className="text-base text-zinc-500">{p.period}</span>
              </div>
              <p className="mt-2 text-base text-zinc-600">{p.description[lang]}</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {p.stack.map((s) => (
                  <span key={s} className="text-sm rounded-full px-3 py-1.5 bg-zinc-100 border border-zinc-200 text-zinc-700">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-5">
               <button
  type="button"
  onClick={() => onOpenProject(i)}
  className="inline-flex items-center gap-2 text-lg text-cyan-700 hover:underline focus:outline-none focus:ring"
>
  {t.project.view} <ExternalLink className="w-5 h-5" />
</button>

              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}


function Education({ t, lang }) {
  return (
    <section id="education" className="max-w-7xl mx-auto px-6 py-28 text-lg" aria-label={t.sections.education}>
      <motion.h2 {...fadeIn} className="text-4xl font-bold text-zinc-900">
        {t.sections.education}
      </motion.h2>
      <div className="mt-10 grid md:grid-cols-3 gap-7">
        {education.map((e, i) => (
          <motion.div key={i} {...fadeIn} className="rounded-2xl border border-zinc-200 p-6 bg-white/70">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-zinc-900 text-xl">{e.school}</p>
              <span className="text-base text-zinc-500">{e.period}</span>
            </div>
            <p className="mt-1 text-lg text-cyan-700 font-medium">{e.degree[lang]}</p>
            <p className="mt-2 text-base text-zinc-700">{e.details[lang]}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Aside({ t, lang }) {
  return (
    <aside className="max-w-7xl mx-auto px-6 text-lg" aria-label="Sidebar">
      <div className="grid md:grid-cols-2 gap-7">
        <motion.div {...fadeIn} className="rounded-2xl border border-zinc-200 p-6 bg-white/70">
          <div className="flex items-center gap-3 text-zinc-900 font-semibold">
            <LanguagesIcon className="w-6 h-6" /> {t.sections.languages}
          </div>
          <ul className="mt-3 space-y-1.5 text-base text-zinc-700">
            {languagesList.map((l, i) => (
              <li key={i} className="flex items-center justify-between">
                <span>{l.name[lang]}</span>
                <span className="text-zinc-500">{l.level[lang]}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div {...fadeIn} className="rounded-2xl border border-zinc-200 p-6 bg-white/70">
          <div className="flex items-center gap-3 text-zinc-900 font-semibold">
            <Trophy className="w-6 h-6" /> {t.sections.certifications}
          </div>
          <ul className="mt-3 space-y-1.5 text-base text-zinc-700">
            {certifications.map((c, i) => (
              <li key={i}>{c.name[lang]}</li>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-7 mt-7">
        <motion.div {...fadeIn} className="rounded-2xl border border-zinc-200 p-6 bg-white/70">
          <div className="flex items-center gap-3 text-zinc-900 font-semibold">
            <Music className="w-6 h-6" /> {t.sections.hobbies}
          </div>
          <ul className="mt-3 grid sm:grid-cols-2 gap-3 text-base text-zinc-700">
            {hobbies.map((h, i) => (
              <li key={i} className="flex items-center gap-3">
                {h.icon}
                <span>{h.label[lang]}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </aside>
  );
}

function Contact({ t }) {
  const telHref = useMemo(
    () => `tel:${ME.phone.replace(/[^\d+]/g, "")}`,
    []
  );

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-28 text-lg" aria-label={t.sections.contact}>
      <motion.h2 {...fadeIn} className="text-4xl font-bold text-zinc-900">
        {t.sections.contact}
      </motion.h2>
      <motion.div {...fadeIn} className="mt-7 rounded-2xl border border-zinc-200 p-7 bg-white/70">
        <div className="grid md:grid-cols-2 gap-7">
          <div className="space-y-4 text-base">
            <a className="flex items-center gap-3 hover:underline" href={`mailto:${ME.email}`}>
              <Mail className="w-5 h-5" /> {ME.email}
            </a>
            <a className="flex items-center gap-3 hover:underline" href={telHref}>
              <Phone className="w-5 h-5" /> {ME.phone}
            </a>
            <a className="flex items-center gap-3 hover:underline" href={ME.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <p className="flex items-center gap-3 text-zinc-600">
              <MapPin className="w-5 h-5" /> {ME.location}
            </p>
          </div>
          {/* Formulaire non relié / Unwired form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                placeholder={t.form.firstName}
                className="rounded-xl border border-zinc-300 bg-white/80 px-3 py-3 text-base outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                required
                placeholder={t.form.lastName}
                className="rounded-xl border border-zinc-300 bg-white/80 px-3 py-3 text-base outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <input
              required
              type="email"
              placeholder={t.form.email}
              className="w-full rounded-xl border border-zinc-300 bg-white/80 px-3 py-3 text-base outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <textarea
              required
              rows={4}
              placeholder={t.form.message}
              className="w-full rounded-xl border border-zinc-300 bg-white/80 px-3 py-3 text-base outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 bg-zinc-900 text-white shadow hover:shadow-lg text-lg">
              {t.form.send}
            </button>
          </form>
        </div>
      </motion.div>
      <footer className="text-center text-base text-zinc-500 mt-6">{t.footer(new Date().getFullYear())}</footer>
    </section>
  );
} 

/*********************************
 * App
 *********************************/
export default function Portfolio() {
  const [lang, setLang] = useState("fr");
  const [openedIndex, setOpenedIndex] = useState(null);
  const t = translations[lang];

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    const initial = saved || (navigator.language?.startsWith("fr") ? "fr" : "en");
    setLang(initial);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 text-lg">
      <Nav t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} />
        <Skills t={t} lang={lang} />
        <Experience t={t} lang={lang} />
        <Projects
          t={t}
          lang={lang}
          onOpenProject={(index) => setOpenedIndex(index)}
        />
        <ProjectModal
          open={openedIndex !== null}
          project={openedIndex !== null ? projects[openedIndex] : null}
          index={openedIndex ?? 0}
          total={projects.length}
          onPrev={() =>
            setOpenedIndex((i) => (i === null ? 0 : (i - 1 + projects.length) % projects.length))
          }
          onNext={() =>
            setOpenedIndex((i) => (i === null ? 0 : (i + 1) % projects.length))
          }
          onClose={() => setOpenedIndex(null)}
          lang={lang}
          t={t}
        />
        <Education t={t} lang={lang} />
        <Aside t={t} lang={lang} />
        <Contact t={t} />
      </main>
    </div>
  );
}

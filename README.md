# Quantum Versa — Complete Front-End Starter

A responsive, multi-section educational website made with plain HTML, CSS and JavaScript. No build system or package installation is required.

## Included features
- Responsive homepage and mobile navigation
- Dark/light theme toggle (preference saved in the browser)
- Six beginner quantum concept cards with detail dialogs
- Interactive measurement demo with single samples and batches of 100
- Five-question quiz with feedback and session score
- Three project cards with project-plan dialogs
- Roadmap, team roles, footer, keyboard-friendly controls, and reduced-motion support

## Important limitations
- The quantum lab is a simplified probability teaching model, not a full quantum simulator.
- The quiz score is held only in the current page session; there are no user accounts or database.
- No backend, contact form, admin panel, analytics, or real quantum hardware connection is included.
- Google Fonts requires an internet connection; the site falls back to system fonts if unavailable.

## Run locally
1. Extract `quantum_versa_complete.zip`.
2. Open the `quantum_versa_complete` folder.
3. Open `index.html` in Chrome, Edge, Firefox, or another modern browser.
4. Test the navigation, theme toggle, lesson dialogs, quantum lab, quiz, and project plan dialogs.

## Customize
- Edit page content in `index.html`.
- Edit colours and layout in `styles.css`.
- Edit interactions and quiz questions in `app.js`.
- Replace the brand initials in `favicon.svg` if desired.

## Publish for free with GitHub Pages
1. Create/sign in to a GitHub account.
2. Create a new public repository, e.g. `quantum-versa`.
3. Upload the contents of this folder (the files themselves, not the ZIP).
4. Open the repository's **Settings → Pages**.
5. Under the build/deployment source, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
6. Wait for the deployment status to finish; GitHub will show the published URL in Pages settings.
7. Open that URL on both desktop and mobile and test all interactions.

## Suggested team split (4–6 members)
- Website and visual design
- Quantum content and fact-checking
- Interactive demo logic
- Quiz and learning resources
- Quality testing and documentation
- Deployment and outreach

For a four-person team, combine design with device testing, and combine content with quiz writing.

## Next production upgrades
1. Add references to trustworthy quantum learning resources.
2. Add unit tests for interactive behaviour.
3. Add a proper quantum SDK integration via a backend or documented notebook workflow.
4. Add accounts and saved progress only with a secure backend, privacy notice, and access controls.
5. Add a contact form only after choosing a backend/form provider and testing spam protection.

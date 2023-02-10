/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	content: [
		"./src/components/**/*.tsx",
		"./src/pages/**/*.tsx",
		"./index.html",
	],
	theme: {
		extend: {
			// Design System
			colors: {
				primary: "#8952F5",
				secondary: "#5030DB",
				"neon-blue": "#52C4F5",
				"primary-dark": "#27223F",
				"secondary-dark": "#222240",
				"new-black": "#252525",
				"new-white": "#F5F5F5",
				"kinda-black": "#00000066",
				blu: {
					100: "#52C4F5",
					200: "#5030DB",
					300: "#27223F",
				},
				violet: "#8952F5",
				blac: "#252525",
				grey: "rgba(25, 25, 25, 0.47)",
			},
			fontFamily: {
				display: ["Monoton", "sans-serif"],
				heading: ["Poppins", "sans-serif"],
				body: ["Inter", "sans-serif"],
			},
			screens: {
				md: "836px",
			},
			backgroundImage: {
				freeRoam: "url('public/assets/Dasboard.png')",
				"landing-bg": "url('/assets/images/plants.webp')",
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"signup-bg":
					"url('/assets/images/loginbg.webp'),linear-gradient(to right, #52C4F5 , #5030DB)",
				"login-bg": "url('/assets/images/loginbg.webp')",
			},
			dropShadow: {
				"text-regular": "0px 2.08px 4.16px rgba(0, 0, 0, 0.2)",
				"text-hover": " 0px 4.16px 8.32px rgba(0, 0, 0, 0.4)",
			},
			// keyfram for fade in
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0, top: "-5%" },
					"100%": { opacity: 1, top: "0%" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.5s ease-in-out",
			},
		},
		textShadow: {
			button: "#FC0 1px 0 10px",
		},
	},
	plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,stories}'],
	theme: {
		extend: {
			colors: {
				dark: {
					DEFAULT: 'rgba(0,0,0, 0.8)',
					1: 'rgba(0,0,0, 0.6)',
					2: 'rgba(0,0,0, 0.4)',
					3: 'rgba(0,0,0, 0.2)',
					4: 'rgba(0,0,0, 0.1)',
					5: 'rgba(0,0,0, 0.05)'
				},
				light: {
					DEFAULT: 'rgba(255,255,255, 0.8)',
					1: 'rgba(255,255,255, 0.6)',
					2: 'rgba(255,255,255, 0.4)',
					3: 'rgba(255,255,255, 0.2)',
					4: 'rgba(255,255,255, 0.1)',
					5: 'rgba(255,255,255, 0.05)'
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif']
			},
			fontSize: {
				sm: ['0.75rem', { lineHeight: 1.25 }],
				base: ['1rem', { lineHeight: 1.25 }],
				md: ['1.125rem', { lineHeight: 1.25 }],
				lg: ['1.5rem', { lineHeight: 1.25 }],
				xl: ['2rem', { lineHeight: 1.25 }],
				'2xl': ['3rem', { lineHeight: 1.25 }],
				'3xl': ['3.5rem', { lineHeight: 1.25 }]
			},
			borderRadius: {
				none: '0',
				0: '0',
				DEFAULT: '1rem',
				sm: '1rem',
				md: '2rem',
				lg: '3rem',
				xl: '4rem',
				full: '9999px'
			}
		}
	},
	plugins: []
};

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
				xs: '0.75rem',
				DEFAULT: '1rem',
				sm: '1rem',
				md: '2rem',
				lg: '3rem',
				xl: '4rem',
				full: '9999px'
			},
			keyframes: {
				animateGlow: {
					'0%': { 'background-position': '0% 50%' },
					'25%': { 'background-position': '50% 100%' },
					'50%': { 'background-position': '100% 50%' },
					'75%': { 'background-position': '50% 0%' },
					'100%': { 'background-position': '0% 50%' }
				},
				draw: {
					'0%': {
						'stroke-dashoffset': '100'
					},
					'50%': {
						'stroke-dashoffset': 0
					},
					'100%': {
						'stroke-dashoffset': '100'
					}
				},
				shutdown: {
					'0%, 20%': { opacity: '1' },
					'40%, 60%': { opacity: '0.7' },
					'70%': { opacity: '1' },
					'75%, 80%': { opacity: '0.3' },
					'85%, 90%': { opacity: '0.7' },
					'95%, 100%': { opacity: '0' }
				},
				shake: {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(2px)' }
				}
			},
			animation: {
				glow: 'animateGlow 4s linear infinite',
				'glow-pulse': 'animateGlow 1s ease-out infinite',
				shutdown: 'shutdown 4s ease-in-out forwards',
				shake: 'shake 1s ease-in-out'
			}
		}
	},
	plugins: []
};

export const fallbackLng = 'en'
export const languages = [fallbackLng, 'idn']

export function getOptions(lng?: string) {
	return {
		lng,
		fallbackLng: 'en',
		supportedLngs: languages,
		defaultNS: 'common',
		ns: 'common',
		interpolation: {
			escapeValue: false,
		},
	}
}

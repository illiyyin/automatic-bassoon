'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'
import {
	initReactI18next,
	useTranslation as useTranslationOrg,
} from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

i18next
	.use(initReactI18next)
	.use(
		resourcesToBackend(
			(lng: string, filename: string) =>
				import(`./locales/${lng}/${filename}.json`)
		)
	)
	.init({
		...getOptions(),
		detection: {
			order: ['path'],
		},
		preload: runsOnServerSide ? languages : [],
	})

export function useTranslation(lng: string) {
	const ret = useTranslationOrg('common')
	const { i18n } = ret
	const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)

	useEffect(() => {
		if (activeLng === i18n.resolvedLanguage) return
		setActiveLng(i18n.resolvedLanguage)
	}, [activeLng, i18n.resolvedLanguage])

	useEffect(() => {
		if (!lng || i18n.resolvedLanguage === lng) return
		i18n.changeLanguage(lng)
	}, [lng, i18n])

	return ret
}

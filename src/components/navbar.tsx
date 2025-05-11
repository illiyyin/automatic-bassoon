'use client'

import { BellIcon, SettingsIcon } from 'lucide-react'
import { Button } from './ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useParams, useRouter } from 'next/navigation'
import { useTranslation } from '../../i18n/client'

const navbarMenuList = [
	'home',
	'dashboard',
	'projects',
	'tasks',
	'reporting',
	'users',
]

export default function Navbar() {
	const router = useRouter()
	const path = useParams<{ lng: string }>()
	const { t } = useTranslation(path.lng)
	return (
		<div className='flex justify-between items-center py-3 border-b mt-4'>
			<div className='flex gap-x-0.5'>
				{navbarMenuList.map((menu) => (
					<Button
						variant={'ghost'}
						key={menu}
						status={menu === 'dashboard' ? 'active' : 'default'}
					>
						{t(menu)}
					</Button>
				))}
			</div>
			<div>
				<ToggleGroup
					type='single'
					value={path.lng}
					onValueChange={(val) => router.replace(val)}
					className='rounded-md border bg-muted'
				>
					<ToggleGroupItem value='en'>English</ToggleGroupItem>
					<ToggleGroupItem value='idn'>Bahasa</ToggleGroupItem>
				</ToggleGroup>
			</div>
			<div>
				<Button size={'icon'} variant={'ghost'}>
					<SettingsIcon />
				</Button>
				<Button size={'icon'} variant={'ghost'}>
					<BellIcon />
				</Button>
			</div>
		</div>
	)
}

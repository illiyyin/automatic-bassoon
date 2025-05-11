'use client'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'
import { useTranslation } from '../../i18n/client'
import { useParams } from 'next/navigation'
const menubarMenuList = [
	'overview',
	'notifications',
	'analytics',
	'savedreports',
	'tradehistory',
	'userreport',
]
export default function Menubar() {
	const path = useParams<{ lng: string }>()
	const { t } = useTranslation(path.lng)
	return (
		<div className='flex justify-between items-center py-2 border-b'>
			<div className='flex gap-x-0.5'>
				{menubarMenuList.map((menu) => (
					<Button
						variant={'ghost'}
						key={menu}
						status={menu === 'overview' ? 'active' : 'default'}
					>
						{t(menu)}
					</Button>
				))}
			</div>
			<div className='relative'>
				<SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500' />
				<Input className='pl-8 w-64' placeholder='Search' />
			</div>
		</div>
	)
}

import Menubar from '@/components/menubar'
import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CloudDownloadIcon, PlusIcon, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { DateRange } from '@/components/ui/date-range'
import Table from '@/components/table'
import { useTranslation } from '../../../i18n'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export default async function Page({
	params: { lng },
}: {
	params: { lng: string }
}) {
	const { t } = await useTranslation(lng)

	return (
		<div className='container mx-auto'>
			<Navbar />
			<Menubar />
			<div>
				<div>
					<div className='flex justify-between items-center mt-8'>
						<p className='text-3xl font-bold'>{t('tradehistory')}</p>
						<div className='flex gap-x-2'>
							<Button variant={'outline'}>
								<CloudDownloadIcon />
								{t('downloadcsv')}
							</Button>
							<Button>
								<PlusIcon className='text-white' /> {t('add')}
							</Button>
						</div>
					</div>
					<p className='text-slate-400 mt-1'>
						View your team's trades and transactions.
					</p>
				</div>
				<div className='py-2 mt-4'>
					<ToggleGroup type='single' className='rounded-md border bg-muted' defaultValue='all'>
						<ToggleGroupItem className='h-8' value='all'>
							All Trades
						</ToggleGroupItem>
						<ToggleGroupItem className='h-8' value='buy'>
							Buy Side
						</ToggleGroupItem>
						<ToggleGroupItem className='h-8' value='sell'>
							Sell Side
						</ToggleGroupItem>
					</ToggleGroup>
				</div>
				<div className='flex justify-between items-center p-2 bg-slate-50 rounded-xl mt-4'>
					<div className='relative'>
						<SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500' />
						<Input
							className='pl-8 bg-white w-80'
							placeholder='Search for trades'
						/>
					</div>
					<div className='flex gap-x-2'>
						<DateRange />
						<Select>
							<SelectTrigger className='w-36 bg-white'>
								<SelectValue placeholder={t('filters')} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='success'>{t('success')}</SelectItem>
								<SelectItem value='declined'>{t('declined')}</SelectItem>
								<SelectItem value='processing'>{t('processing')}</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div>
					<Table />
				</div>
			</div>
		</div>
	)
}

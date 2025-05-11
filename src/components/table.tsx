'use client'
import React from 'react'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { useTranslation } from '../../i18n/client'
import { useParams } from 'next/navigation'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { ArrowDownIcon } from 'lucide-react'

const data: {
	trade: string
	company: string
	order_amount: number
	delivery_date: Date
	status: 'success' | 'declined' | 'processing'
}[] = [
	{
		trade: 'MSFT BUY',
		company: 'Microsoft, Corp.',
		order_amount: 30021.23,
		delivery_date: new Date('22 Mar 2025'),
		status: 'processing',
	},
	{
		trade: 'AAPL SELL',
		company: 'Apple, Inc.',
		order_amount: 10045.0,
		delivery_date: new Date('22 Mar 2025'),
		status: 'success',
	},
	{
		trade: 'NVDA BUY',
		company: 'NVIDIA, Corp.',
		order_amount: 40132.16,
		delivery_date: new Date('22 Mar 2025'),
		status: 'success',
	},
	{
		trade: 'AMZN BUY',
		company: 'Amazon.com, Inc.',
		order_amount: 22665.12,
		delivery_date: new Date('22 Mar 2025'),
		status: 'declined',
	},
	{
		trade: 'GOOG BUY',
		company: 'Alphabet, Inc.',
		order_amount: 18221.3,
		delivery_date: new Date('11 Mar 2025'),
		status: 'success',
	},
	{
		trade: 'META SELL',
		company: 'Meta Platforms, Inc.',
		order_amount: 24118.18,
		delivery_date: new Date('11 Mar 2025'),
		status: 'success',
	},
]

const StatusLabel = ({
	status,
	label,
}: {
	status: 'success' | 'declined' | 'processing'
	label: string
}) => {
	return (
		<div
			className={cn(
				'rounded-full flex items-center px-2 py-0.5 gap-x-1 w-fit',
				{
					'bg-emerald-50': status === 'success',
					'bg-red-50': status === 'declined',
					'bg-slate-50': status === 'processing',
				}
			)}
		>
			<div
				className={cn('size-1.5 rounded-full', {
					'bg-emerald-600': status === 'success',
					'bg-red-600': status === 'declined',
					'bg-slate-600': status === 'processing',
				})}
			></div>
			<p
				className={cn('text-xs font-semibold', {
					'text-emerald-600': status === 'success',
					'text-red-600': status === 'declined',
					'text-slate-600': status === 'processing',
				})}
			>
				{label}
			</p>
		</div>
	)
}

export default function Table() {
	const path = useParams<{ lng: string }>()
	const { t, i18n } = useTranslation(path.lng)
	return (
		<div className='border rounded-lg shadow mt-4'>
			<table className='w-full'>
				<thead>
					<tr className='border-b'>
						<th className='w-14 h-8'>
							<Checkbox />
						</th>
						<th className='w-auto'>
							<p className='text-xs text-left text-slate-500'>Trade</p>
						</th>
						<th className='w-38'>
							<p className='text-xs text-left text-slate-500'>Order amount</p>
						</th>
						<th className='w-40 relative'>
							<p className='text-xs text-left text-slate-500'>Delivery date</p>
							<ArrowDownIcon size={16} className='absolute left-20 top-2'/>
						</th>
						<th className='w-28'>
							<p className='text-xs text-left text-slate-500'>Status</p>
						</th>
						<th className='w-18'></th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr key={item.company} className='border-b items-center'>
							<td className='flex justify-center items-center h-14'>
								<Checkbox />
							</td>
							<td>
								<div className='py-2'>
									<p className='font-semibold text-sm'>{item.trade}</p>
									<p className='text-xs text-slate-400'>{item.company}</p>
								</div>
							</td>
							<td>
								<p className='text-sm'>
									{t('orderamountvalue', { val: item.order_amount })}
								</p>
							</td>
							<td>
								<p className='text-sm'>
									{new Intl.DateTimeFormat(
										i18n.language === 'idn' ? 'id-ID' : i18n.language,
										{
											day: 'numeric',
											month: 'long',
											year: 'numeric',
										}
									).format(item.delivery_date)}
								</p>
							</td>
							<td>
								<StatusLabel status={item.status} label={t(item.status)} />
							</td>
							<td>
								<Button variant={'link'} className='mx-2'>
									{t('view')}
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className='py-3 px-5'>
				<Pagination>
					<PaginationContent className='flex justify-between w-full'>
						<PaginationItem>
							<PaginationPrevious
								variant='outline'
								href='#'
								label={t('previous')}
							/>
						</PaginationItem>
						<div className='flex'>
							<PaginationItem>
								<PaginationLink href='#' isActive>
									1
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href='#'>2</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href='#'>3</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href='#'>8</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href='#'>9</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href='#'>10</PaginationLink>
							</PaginationItem>
						</div>
						<PaginationItem>
							<PaginationNext variant='outline' href='#' label={t('next')} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	)
}

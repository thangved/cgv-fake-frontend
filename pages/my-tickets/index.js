/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import AccountLayout from '@/layouts/AccountLayout';
import InvoiceService from '@/services/invoice.service';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from 'react-query';
import styles from './MyTickets.module.css';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { currencyFormatter } from '@/utils/formatter';
import Button from '@/components/Button';

const MyTickets = () => {
	const { data: invoices, isLoading } = useQuery(
		['invoices', 'me'],
		InvoiceService.getAll
	);

	return (
		<>
			<Head>
				<title>Vé của tôi</title>
			</Head>

			{isLoading ? (
				<LoadingOverlay />
			) : (
				<div className={styles.wrapper}>
					{invoices.map((e) => (
						<Link
							href={`/invoices/${e.id}`}
							key={e.id}
							className={styles.invoice}
						>
							<img
								width={200}
								src={e.show.movie.verPoster}
								alt={e.show.movie.title}
							/>

							<div className={styles.texts}>
								<h3>{e.show.movie.title}</h3>

								<p>{e.show.language.name}</p>

								<p>
									<FontAwesomeIcon icon={faCalendar} />{' '}
									{dayjs(e.show.startAt).format(
										'DD/MM/YYYY HH:mm'
									)}{' '}
									- {dayjs(e.show.endAt).format('HH:mm')}
								</p>

								<p>{e.show.room.cinema.name}</p>

								<p>
									{e.show.room.name} (
									{e.tickets
										.map((e) => e.seatrow.label + e.seatId)
										.join(', ')}
									)
								</p>

								<p>{currencyFormatter.format(e.total)}</p>

								<Button>Xem</Button>
							</div>
						</Link>
					))}
				</div>
			)}
		</>
	);
};

MyTickets.layout = AccountLayout;

export default MyTickets;

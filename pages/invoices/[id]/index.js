/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import InvoiceService from '@/services/invoice.service';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-grid-system';
import { useQuery } from 'react-query';
import styles from './Invoice.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { currencyFormatter } from '@/utils/formatter';
import QRCode from 'react-qr-code';

const Invoice = () => {
	const router = useRouter();

	const { data: invoiceDetails } = useQuery(
		['invoice', router.query.id],
		() => InvoiceService.getById(router.query.id)
	);

	if (!invoiceDetails) return <LoadingOverlay />;

	return (
		<>
			<Head>
				<title>Hóa đơn</title>
			</Head>

			<Container className={styles.wrapper}>
				<Row className={styles.invoice}>
					<Col
						xs={12}
						md={6}
						className={styles.image}
						style={{
							backgroundImage: `url(${invoiceDetails.show.movie.horPoster})`,
						}}
					>
						<img
							src={invoiceDetails.show.movie.verPoster}
							alt={invoiceDetails.show.movie.title}
						/>
					</Col>

					<Col xs={12} md={6} className={styles.texts}>
						<h3>{invoiceDetails.show.movie.title}</h3>

						<p>{invoiceDetails.show.language.name}</p>

						<p>
							<FontAwesomeIcon icon={faCalendar} />{' '}
							{dayjs(invoiceDetails.show.startAt).format(
								'DD/MM/YYYY HH:mm'
							)}{' '}
							- {dayjs(invoiceDetails.show.endAt).format('HH:mm')}
						</p>

						<p>{invoiceDetails.show.room.cinema.name}</p>

						<p>
							{invoiceDetails.show.room.name} (
							{invoiceDetails.tickets
								.map((e) => e.seatrow.label + e.seatId)
								.join(', ')}
							)
						</p>

						<p>{currencyFormatter.format(invoiceDetails.total)}</p>

						<QRCode
							className={styles.code}
							value={invoiceDetails.code}
						/>

						<p>
							<i>
								Quét mã QR này tại quầy để nhận vé (Vui lòng
								không chia sẻ mã này với ai)
							</i>
						</p>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Invoice;

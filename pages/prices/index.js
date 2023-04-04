import SeatTypeService from '@/services/seatType.service';
import { Col, Container, Row } from 'react-grid-system';
import styles from './Prices.module.css';
import { currencyFormatter } from '@/utils/formatter';
import MovieService from '@/services/movie.service';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';
import Button from '@/components/Button';

export async function getServerSideProps() {
	const seatTypes = await SeatTypeService.getAll();
	const showNows = await MovieService.getAll({ show: 'now' });

	return {
		props: { seatTypes, showNows: showNows.splice(0, 4) },
	};
}

const Prices = ({ seatTypes, showNows }) => {
	return (
		<Container className={styles.wrapper}>
			<Row>
				<Col xs={12} md={9}>
					<h2 style={{ margin: '20px 0' }}>Giá vé</h2>
					<div style={{ overflow: 'auto' }}>
						<table>
							<thead>
								<tr>
									<th>Loại ghế / Ngày</th>
									<th>Thứ 2</th>
									<th>Thứ 3</th>
									<th>Thứ 4</th>
									<th>Thứ 5</th>
									<th>Thứ 6</th>
									<th>Thứ 7</th>
									<th>Chủ nhật</th>
								</tr>
							</thead>

							<tbody>
								{seatTypes.map((e) => (
									<tr key={e.id}>
										<td>{e.name}</td>
										<td>
											{currencyFormatter.format(e.price1)}
										</td>
										<td>
											{currencyFormatter.format(e.price2)}
										</td>
										<td>
											{currencyFormatter.format(e.price3)}
										</td>
										<td>
											{currencyFormatter.format(e.price4)}
										</td>
										<td>
											{currencyFormatter.format(e.price5)}
										</td>
										<td>
											{currencyFormatter.format(e.price6)}
										</td>
										<td>
											{currencyFormatter.format(e.price7)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Col>

				<Col sx={12} md={3}>
					<h2 style={{ margin: '20px 0' }}>Phim đang chiếu</h2>

					{showNows.map((e) => (
						<MovieCard key={e.id} details={e} />
					))}

					<Link href="/movies?show=now">
						<Button outlined block>
							Xem thêm
						</Button>
					</Link>
				</Col>
			</Row>
		</Container>
	);
};

export default Prices;

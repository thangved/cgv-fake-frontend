import Button from '@/components/Button';
import CinemaByMovie from '@/components/CinemaByMovie';
import Input from '@/components/Input';
import MovieCard from '@/components/MovieCard';
import Select from '@/components/Select';
import cinemaShows from '@/mock/cinemaShows';
import movies from '@/mock/movies';
import { faCirclePlay, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import Link from 'next/link';
import { AspectRatio } from 'react-aspect-ratio';
import { Col, Container, Row } from 'react-grid-system';

import styles from './Movie.module.css';

const Movie = () => {
	return (
		<Container className={styles.wrapper}>
			<Head>
				<title>Đặt vé SHAZAM! FURY OF THE GODS</title>
			</Head>
			<Row>
				<Col xs={12} md={9}>
					<Row>
						<Col xs={12} md={3}>
							<AspectRatio
								className={styles.thumbnail}
								ratio={0.7}
								style={{
									backgroundImage: `url(https://cdn.galaxycine.vn/media/2023/2/10/shazam-3_1675998610941.jpg)`,
								}}
							>
								<div>
									<FontAwesomeIcon
										icon={faCirclePlay}
										className={styles.playButton}
										size="4x"
									/>
								</div>
							</AspectRatio>
						</Col>

						<Col xs={12} md={9}>
							<h2 className={styles.title}>
								SHAZAM! FURY OF THE GODS
							</h2>

							<h2 className={styles.brief}>
								SHAZAM! CƠN THỊNH NỘ CỦA CÁC VỊ THẦN
							</h2>

							<div className={styles.details}>
								<span>
									<FontAwesomeIcon icon={faClock} /> 130 phút
								</span>

								<div>
									<span className={styles.label}>
										Đạo diễn:
									</span>
									<span> David F. Sandberg</span>
								</div>

								<div>
									<span className={styles.label}>
										Quốc gia:
									</span>
									<span> Mỹ</span>
								</div>

								<div>
									<span className={styles.label}>
										Nhà sản xuất:
									</span>
									<span> Warner Bros</span>
								</div>

								<div>
									<span className={styles.label}>
										Thể loại:
									</span>
									<span> Hành Động</span>
								</div>

								<div>
									<span className={styles.label}>
										Ngày khởi chiếu:
									</span>
									<span> 16/3/2023</span>
								</div>
							</div>
						</Col>
					</Row>
					<h3>NỘI DUNG PHIM</h3>

					<div className={styles.content}>
						<p>
							Trong lần trở lại này, cậu chàng Shazam vẫn trăn trở
							cho rằng mình “không xứng đáng với năng lực này”.
							Thế giới có The Flash nhanh như chớp với bộ suit đỏ
							đặc trưng, Aquaman to cao lực lưỡng và cả Batman
							siêu ngầu. Trong khi đó, Shazam vẫn chỉ là Shazam
							chẳng có năng lực gì khác biệt… hoặc là Billy
							Batson, một cậu nhóc trung học trong thân hình một
							siêu anh hùng cao to già đời, không thể kiểm soát
							sức mạnh của mình.
						</p>
						<p>
							Nếu như các siêu anh hùng khác khiến khán giả không
							khỏi trầm trồ vì những năng lực siêu phàm có thể cứu
							thế giới thì “cậu nhóc” Shazam, mỗi khi dùng siêu
							năng lực vẫn hậu đậu như một “chú hề” lừng danh
							khiến người xem phải bật cười.
						</p>
						<p>
							Phim mới Shazam! Fury Of The Gods ra mắt tại các rạp
							chiếu phim từ 17.03.2023.
						</p>
					</div>

					<h3>LỊCH CHIẾU</h3>

					<Row>
						<Col xs={12} md={4}>
							<Select>
								<option value="all">Cả nước</option>
								<option value="hcm">
									Thành phố Hồ Chí Minh
								</option>
								<option value="ct">Thành phố Cần Thơ</option>
							</Select>
						</Col>

						<Col xs={12} md={4}>
							<Input type="date" />
						</Col>

						<Col xs={12} md={4}>
							<Select>
								<option value="all">Tất cả rạp</option>
								<option value="hchv">Vimcom Hùng Vương</option>
							</Select>
						</Col>
					</Row>

					{cinemaShows.map((e) => (
						<CinemaByMovie key={e.id} details={e} />
					))}
				</Col>
				<Col xs={12} md={3}>
					<h3>PHIM ĐANG CHIẾU</h3>

					<Row>
						{movies.slice(0, 3).map((e, index) => (
							<Col xs={12} key={index}>
								<MovieCard details={e} />
							</Col>
						))}
					</Row>

					<Row justify="end" style={{ margin: '20px 0' }}>
						<Link href="/movies?show=now">
							<Button outlined>XEM THÊM</Button>
						</Link>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default Movie;

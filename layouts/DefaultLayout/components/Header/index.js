/* eslint-disable @next/next/no-img-element */
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import Images from '@/assets/images';
import LoginWithGoogle from '@/components/LoginWithGoogle';
import MovieCard from '@/components/MovieCard';
import movies from '@/mock/movies';

import { Col, Container, Row } from 'react-grid-system';
import styles from './Header.module.css';

const Header = () => {
	return (
		<div className={styles.wrapper}>
			<Container>
				<Row justify="between" align="center" style={{ padding: 10 }}>
					<Link href="/" className={styles.logo}>
						<img src={Images.logo} width={200} alt="CGV Fake" />
					</Link>

					<LoginWithGoogle />
				</Row>
			</Container>

			<div className={styles.navbar}>
				<Container style={{ height: '100%' }}>
					<Row style={{ height: '100%' }}>
						<Link href="/movies">
							<span>Phim</span>
							<FontAwesomeIcon icon={faAngleDown} />
						</Link>
						<div
							onClick={(event) => event.stopPropagation()}
							className={styles.mega}
							style={{ width: 1024, maxWidth: '100vw' }}
						>
							<Link href="/movies?show=now">
								<h4>PHIM ĐANG CHIẾU</h4>
							</Link>

							<Row>
								{movies.slice(0, 4).map((e, index) => (
									<Col xs={12} md={6} lg={3} key={index}>
										<MovieCard dark details={e} />
									</Col>
								))}
							</Row>

							<Link href="/movies?show=coming">
								<h4>PHIM ĐANG CHIẾU</h4>
							</Link>
							<Row>
								{movies
									.slice(0, 4)
									.reverse()
									.map((e, index) => (
										<Col xs={12} md={6} lg={3} key={index}>
											<MovieCard dark details={e} />
										</Col>
									))}
							</Row>
						</div>
						<Link href="/about-us">
							<span>Giới thiệu</span>
						</Link>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default Header;

/* eslint-disable @next/next/no-img-element */
import Images from '@/assets/images';
import Link from 'next/link';
import { Col, Container, Row } from 'react-grid-system';
import styles from './Footer.module.css';

const Footer = () => {
	return (
		<div className={styles.wrapper}>
			<Container>
				<Row>
					<Col xs={12} md={4}>
						<h2>CGV FAKE</h2>
						<ul>
							<li>
								<Link href="/about-us">Giới thiệu</Link>
							</li>
						</ul>
					</Col>

					<Col xs={12} md={4}>
						<h2>PHIM</h2>
						<ul>
							<li>
								<Link href="/movies?show=now">
									Phim đang chiếu
								</Link>
							</li>
							<li>
								<Link href="/movies?show=coming">
									Phim sắp chiếu
								</Link>
							</li>
						</ul>
					</Col>
				</Row>

				<Row
					style={{
						marginTop: 10,
						paddingTop: 10,
						borderTopStyle: 'solid',
						borderWidth: 1,
						borderTopColor: 'var(--primary)',
					}}
				>
					<Col xs={12}>
						<img src={Images.logo} width={200} alt="Logo" />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Footer;

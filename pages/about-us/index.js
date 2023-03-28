import styles from './AboutUs.module.css';

import { Col, Container, Row } from 'react-grid-system';
import movies from '@/mock/movies';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';
import Button from '@/components/Button';

const AboutUs = () => {
	return (
		<Container className={styles.wrapper}>
			<Row>
				<Col xs={12} md={9}>
					<h1>Giới thiệu về dự án</h1>

					<h2>Tổng quan</h2>

					<p>Lô 🐧, </p>

					<p>Lô lô</p>

					<p>Lô lô lô lô</p>

					<p>
						<strong>CGV Fake</strong> là một hệ thống quản lý một hệ
						thống rạp phim (tương tự CGV hay Galaxy), có đầy đủ tính
						năng cơ bản cho quản trị viên và cho phép khách hàng đặt
						vé trực tuyến.
					</p>

					<h2>Công nghệ sử dụng</h2>

					<p>Hệ thống được chia làm 2 phần riêng biệt:</p>
					<ul>
						<li>CGV Fake Backend</li>
						<li>CGV Fake Frontend</li>
					</ul>

					<h3>Backend</h3>

					<p>
						Backend là nơi thao tác trực tiếp với cơ sở dữ liệu và
						xử lý các request gửi từ client được viết bằng
						javascript (chạy trên môi trường nodejs), kết hợp với
						framework expressjs và cơ sở dữ liệu MySQL. Backend có
						nhiệm vụ là kết nối và truy xuất các dữ liệu có trong cơ
						sở dữ liệu và cung cấp các api để frontend có thể lấy dữ
						liệu từ cơ sở dữ liệu. Backend sẽ định nghĩa các dữ liệu
						mà frontend có thể truy cập được.
					</p>

					<h3>Frontend</h3>

					<p>
						Frontend là phần tương tác trực tiếp với người dùng, hầu
						hết các thao tác của người dùng sẽ thông qua frontend để
						gửi tới backend. Phần frontend được viết bằng framework
						Next.js, một thư viện javascript giúp xây dựng các trang
						ứng dụng web single page có chức năng SSR (ServerSide
						Rendering) phù hợp cho các trang web có yêu cầu về SEO
						(Search Engine Optimize)
					</p>

					<h2>Kết</h2>

					<p>Hết.</p>
				</Col>

				<Col xs={12} md={3}>
					<h3>Phim đang chiếu</h3>

					<Row>
						{movies.slice(0, 3).map((e, index) => (
							<Col xs={12} key={index}>
								<MovieCard details={e} />
							</Col>
						))}
					</Row>

					<Row justify="end">
						<Link href="/movies?show=now">
							<Button outlined>XEM THÊM</Button>
						</Link>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default AboutUs;

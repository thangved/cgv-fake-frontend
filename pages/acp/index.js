import AcpLayout, { adminNavItems } from '@/layouts/AcpLayout';
import { Container } from '@mui/material';
import Link from 'next/link';
import styles from './Acp.module.css';

const Acp = () => {
	return (
		<Container className={styles.wrapper}>
			<h2 style={{ margin: '20px 0' }}>CGV Fake ACP</h2>

			<ul>
				{adminNavItems.map((e) => (
					<li key={e.path}>
						<Link href={`/acp/${e.path}`}>{e.title}</Link>
					</li>
				))}
			</ul>
		</Container>
	);
};

Acp.layout = AcpLayout;

export default Acp;

import '../styles/index.css';
import { AppProps } from 'next/app';
import { TodoProvider } from '../contexts/todoContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<TodoProvider>
			<Component {...pageProps} />
		</TodoProvider>
	);
}

export default MyApp;

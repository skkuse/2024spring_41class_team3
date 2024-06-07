import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MainPage from './pages/MainPage';
import ListPage from './pages/ListPage';
import DetailPages from './pages/DetailPages';
import CoverPage from './pages/CoverPage';

const RedirectToCoverPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem('firstVisit')) {
			localStorage.setItem('firstVisit', 'true');
			navigate('/cover');
		} else {
			localStorage.setItem('firstVisit', 'false');
		}
	}, [navigate]);

	return null;
};

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/cover" element={<CoverPage />} />
				<Route path="/list" element={<ListPage />} />
				<Route
					path="/"
					element={
						<>
							<RedirectToCoverPage />
							<MainPage />
						</>
					}
				/>
				<Route path="/detail/:id" element={<DetailPages />} />
			</Routes>
		</BrowserRouter>
	);
}

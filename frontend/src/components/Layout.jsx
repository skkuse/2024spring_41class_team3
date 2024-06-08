// Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
	<div>
		<Header />
		<div className="w-dvh flex min-h-dvh justify-center px-16 py-8">
			{children}
		</div>
		<Footer />
	</div>
);

export default Layout;

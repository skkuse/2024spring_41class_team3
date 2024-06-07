// Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
	<div>
		<Header />
		<div className="flex h-full w-dvw justify-center px-16 py-8">
			{children}
		</div>
		<Footer />
	</div>
);

export default Layout;

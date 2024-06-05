// Layout.jsx
import React from 'react';
import Header from './Header';

const Layout = ({ children }) => (
	<div>
		<Header />
		<div className="flex h-dvh w-dvw justify-center px-16 py-8">{children}</div>
	</div>
);

export default Layout;

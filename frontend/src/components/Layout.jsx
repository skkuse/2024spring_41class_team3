// Layout.jsx
import React from 'react';
import Header from './Header';

const Layout = ({ children }) => (
	<div>
		<Header />
		<div className="w-dvw h-dvh py-8 px-16">{children}</div>
	</div>
);

export default Layout;

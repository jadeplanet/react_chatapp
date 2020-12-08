import React from 'react';
import './Skeleton.css';

function Skeleton() {
	return (
		<div classNAme='skeleton'>
			<div className='skeleton-avatar' />
			<div className='skeleton-author' />
			<div className='skeleton-description' />
		</div>
	);
}

export default Skeleton;

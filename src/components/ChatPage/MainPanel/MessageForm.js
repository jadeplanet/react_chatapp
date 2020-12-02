import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import firebase from '../../../firebase';
import { useSelector } from 'react-redux';
import mime from 'mime-types';

const MessageForm = () => {
	const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
	const user = useSelector((state) => state.user.currentUser);
	const [content, setContent] = useState('');
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);
	const messagesRef = firebase.database().ref('messages');
	const inputOpenImageRef = useRef();
	const storageRef = firebase.storage().ref();

	const handleChange = (event) => {
		setContent(event.target.value);
	};
	const createMessage = (fileUrl = null) => {
		const message = {
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			user: {
				id: user.uid,
				name: user.displayName,
				image: user.photoURL,
			},
		};

		if (fileUrl !== null) {
			message['image'] = fileUrl;
		} else {
			message['content'] = content;
		}

		return message;
	};
	const handleSubmit = async () => {
		if (!content) {
			setErrors((prev) => prev.concat('Type contents first'));
			return;
		}
		setLoading(true);

		// firebase에 메시지를 저장하는 부분
		try {
			await messagesRef.child(chatRoom.id).push().set(createMessage());
			setLoading(false);
			setContent('');
			setErrors([]);
		} catch (error) {
			setErrors((prev) => prev.concat(error.message));
			setLoading(false);
			setTimeout(() => {
				setErrors([]);
			}, 5000);
		}
	};

	const handleOpenImageRef = () => {
		inputOpenImageRef.current.click();
	};

	const handleUploadImage = async (event) => {
		const file = event.target.files[0];
		const filePath = `/message/public/${file.name}`;
		const metadata = { contentType: mime.lookup(file.name) };

		try {
			await storageRef.child(filePath).put(file, metadata);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='exampleForm.ControlTextarea1'>
					<Form.Control
						value={content}
						onChange={handleChange}
						as='textarea'
						rows={3}
					/>
				</Form.Group>
			</Form>
			<ProgressBar variant='warning' label='60%' now={60} />
			<div>
				{errors.map((errorMsg) => (
					<p style={{ color: 'red' }} key={errorMsg}>
						{errorMsg}
					</p>
				))}
			</div>
			<Row>
				<Col>
					<button
						onClick={handleSubmit}
						className='message-form-button'
						style={{ width: '100%' }}
					>
						SEND
					</button>
				</Col>
				<Col>
					<button
						onClick={handleOpenImageRef}
						className='message-form-button'
						style={{ width: '100%' }}
					>
						UPLOAD
					</button>
				</Col>
			</Row>
			<input
				style={{ display: 'none' }}
				type='file'
				ref={inputOpenImageRef}
				onChange={handleUploadImage}
			/>
		</div>
	);
};

export default MessageForm;

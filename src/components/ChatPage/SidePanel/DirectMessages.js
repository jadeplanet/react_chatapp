import React, { Component } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import firebase from '../../../firebase';
import { connect } from 'react-redux';

export class DirectMessages extends Component {
	state = {
		usersRef: firebase.database().ref('user'),
		users: [],
	};
	componentDidMount() {
		if (this.props.user) {
			this.addUsersListeners(this.props.user.uid);
		}
	}
	addUsersListeners = (currentUserId) => {
		const { usersRef } = this.state;
		let usersArray = [];
		usersRef.on('child_added', (DataSnapshot) => {
			if (currentUserId !== DataSnapshot.key) {
				let user = DataSnapshot.val();
				user['uid'] = DataSnapshot.key;
				user['status'] = 'offline';

				usersArray.push();
				this.setState({ users: usersArray });
			}
		});
	};

	getChatRoomId = (userId) => {
		const currentUserId = this.props.user.uid;

		return userId > currentUserId
			? `${userId}/${currentUserId}`
			: `${currentUserId}/${userId}`;
	};

	changeChatRoom = (user) => {
		const chatRoomId = this.getChatRoomId(user.uid);
	};

	renderDirectMessages = (users) =>
		users.length > 0 &&
		users.map((user) => (
			<li key={user.uid} onClick={() => this.changeChatRoom(user)}>
				{' '}
				# {user.name}
			</li>
		));

	render() {
		const { users } = this.state;
		return (
			<div>
				<span style={{ display: 'flex', alignItems: 'center' }}>
					<FaRegSmile style={{ marginRight: 3 }} /> DIRECT MESSAGES(1)
				</span>
				<ul style={{ listStyleType: 'none', padding: 0 }}>
					{this.renderDirectMessages(users)}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user.currentUser,
	};
};

export default connect(mapStateToProps)(DirectMessages);

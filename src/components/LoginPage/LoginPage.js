import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';

function LoginPage() {
	const { register, errors, handleSubmit } = useForm();
	const [errorFromSubmit, setErrorFromSubmit] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data) => {
		try {
			setLoading(true);
			await firebase
				.auth()
				.signInWithEmailAndPassword(data.email, data.password);
			setLoading(false);
		} catch (error) {
			setErrorFromSubmit(error.message);
			setLoading(false);
			setTimeout(() => {
				setErrorFromSubmit('');
			}, 5000);
		}
	};

	return (
		<div className='auth-wrapper'>
			<div style={{ textAlign: 'center' }}>
				<h3>로그인</h3>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>이메일</label>
				<input
					name='email'
					type='email'
					ref={register({ required: true, pattern: /^\S+@\S+$/i })}
				/>
				{errors.email && <p>이메일 양식에 맞게 입력해주세요</p>}

				<label>패스워드</label>
				<input
					name='password'
					type='password'
					ref={register({ required: true, minLength: 6 })}
				/>
				{errors.password && errors.password.type === 'required' && (
					<p>패스워드를 입력해주세요</p>
				)}
				{errors.password && errors.password.type === 'minLength' && (
					<p>패스워드를 6자 이상으로 만들어주세요</p>
				)}

				{errorFromSubmit && <p>{errorFromSubmit}</p>}

				<input type='submit' disabled={loading} value='로그인하기' />
				<Link
					style={{ color: 'gray', textDecoration: 'none', textAlign: 'center' }}
					to='register'
				>
					아직 아이디가 없다면...
				</Link>
			</form>
		</div>
	);
}

export default LoginPage;

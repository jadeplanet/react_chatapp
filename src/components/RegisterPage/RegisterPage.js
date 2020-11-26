import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';
import md5 from 'md5';

function RegisterPage() {
	const { register, watch, errors, handleSubmit } = useForm();
	const [errorFromSubmit, setErrorFromSubmit] = useState('');
	const [loading, setLoading] = useState(false);
	const password = useRef();

	password.current = watch('password');

	const onSubmit = async (data) => {
		try {
			setLoading(true);
			let createdUser = await firebase
				.auth()
				.createUserWithEmailAndPassword(data.email, data.password);
			console.log('createdUser', createdUser);

			await createdUser.user.updateProfile({
				displayName: data.name,
				photoURL: `http://gravatar.com/avatar/${md5(
					createdUser.user.email
				)}?d=identicon`,
			});

			setLoading(false);
		} catch (error) {
			setErrorFromSubmit(error.message);
			setLoading(false);
			setTimeout(() => {
				setErrorFromSubmit('');
			}, 5000);
		}
	};
	console.log(watch('email'));

	return (
		<div className='auth-wrapper'>
			<div style={{ textAlign: 'center' }}>
				<h3>회원가입</h3>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>이메일</label>
				<input
					name='email'
					type='email'
					ref={register({ required: true, pattern: /^\S+@\S+$/i })}
				/>
				{errors.email && <p>이메일 양식에 맞게 입력해주세요</p>}
				<label>이름</label>
				<input name='name' ref={register({ required: true, maxLength: 10 })} />
				{errors.name && errors.name.type === 'required' && (
					<p>이름을 입력해주세요</p>
				)}
				{errors.name && errors.name.type === 'maxLength' && (
					<p>이름을 10자 이내로 입력해주세요</p>
				)}
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
				<label>패스워드 확인</label>
				<input
					name='password_confirm'
					type='password'
					ref={register({
						required: true,
						validate: (value) => value === password.current,
					})}
				/>
				{errors.password_confirm &&
					errors.password_confirm.type === 'required' && (
						<p>상단에 입력한 패스워드를 다시 입력해주세요</p>
					)}
				{errors.password_confirm &&
					errors.password_confirm.type === 'validate' && (
						<p>상단에 입력한 패스워드와 일치하지 않습니다</p>
					)}

				{errorFromSubmit && <p>{errorFromSubmit}</p>}
				<input type='submit' disabled={loading} value='회원가입하기' />
			</form>
			<Link
				style={{ color: 'gray', textDecoration: 'none', textAlign: 'center' }}
				to='login'
			>
				이미 아이디가 있다면...
			</Link>
		</div>
	);
}

export default RegisterPage;

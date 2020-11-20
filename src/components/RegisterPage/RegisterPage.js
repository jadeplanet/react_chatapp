import React from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
	return (
		<div className='auth-wrapper'>
			<div style={{ textAlign: 'center' }}>
				<h3>Register</h3>
			</div>
			<form>
				<label>이메일</label>
				<input
					name='email'
					type='email'
					// ref={register({ required: true, maxLength: 10 })}
				/>
				{/* {errors.exampleRequired && <p>This field is required</p>} */}
				<label>이름</label>
				<input
					name='name'
					// ref={register({ required: true, maxLength: 10 })}
				/>
				{/* {errors.exampleRequired && <p>This field is required</p>} */}
				<label>패스워드</label>
				<input
					name='password'
					type='password'
					// ref={register({ required: true, maxLength: 10 })}
				/>
				{/* {errors.exampleRequired && <p>This field is required</p>} */}
				<label>패스워드 확인</label>
				<input
					name='password_confirm'
					type='password'
					// ref={register({ required: true, maxLength: 10 })}
				/>
				{/* {errors.exampleRequired && <p>This field is required</p>} */}

				<input type='submit' />
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

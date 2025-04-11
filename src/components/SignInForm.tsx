"use client";
import React, { useState } from "react";

const SignInForm = () => {
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
	});
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted");
	};
	const handleCahnge = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	return (
		<form className='flex flex-col gap-4' onSubmit={onSubmit}>
			<input
				placeholder='Email'
				name='email'
				type='email'
				className='p-2 rounded border-gray-400 border'
				value={formValues.email}
				onChange={handleCahnge}
			/>
			<input
				placeholder='Password'
				name='password'
				type='password'
				className='p-2 rounded border-gray-400 border'
				value={formValues.password}
				onChange={handleCahnge}
			/>
			<button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
				Login
			</button>
		</form>
	);
};

export default SignInForm;

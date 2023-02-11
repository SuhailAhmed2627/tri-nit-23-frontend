/* eslint-disable indent */
import React, { useState } from "react";
import { mutations } from "../../utils/constants";
import { useMutation } from "react-query";
import { dataFetch, showNotification } from "../../utils/helpers";
import { Box, Button, PasswordInput, TextInput } from "@mantine/core";
import { storeUserToken } from "../../actions/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { mutate } = useMutation({
		mutationKey: mutations.SIGNUP,
		mutationFn: () =>
			dataFetch({
				url: "/api/user/signup",
				method: "POST",
				body: { email, password, confirmPassword },
			}),
		onSuccess: async (res) => {
			if (res.status !== 200) {
				return showNotification("error", "Something went wrong", "error");
			}

			const data = await res.json();

			dispatch(
				storeUserToken({
					userToken: data.token,
				})
			);

			showNotification("success", "Signup successful", "success");

			navigate("/graph");
		},
	});

	const handleSubmit:
		| React.MouseEventHandler<HTMLButtonElement>
		| undefined = (e) => {
		e.preventDefault();
		mutate();
	};

	return (
		<Box>
			<TextInput
				label="Email"
				placeholder="Enter your email"
				value={email}
				onChange={(e) => setEmail(e.currentTarget.value)}
			></TextInput>
			<PasswordInput
				label="Password"
				placeholder="Enter your password"
				value={password}
				onChange={(e) => setPassword(e.currentTarget.value)}
			></PasswordInput>
			<PasswordInput
				label="Confirm Password"
				placeholder="Confirm your password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.currentTarget.value)}
			></PasswordInput>
			<Button onClick={handleSubmit}>Signup</Button>
		</Box>
	);
};

export default Signup;

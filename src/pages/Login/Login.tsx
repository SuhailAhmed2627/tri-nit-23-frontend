/* eslint-disable indent */
import { Box, TextInput, PasswordInput, Button } from "@mantine/core";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeUserToken } from "../../actions/user";
import { mutations } from "../../utils/constants";
import { dataFetch, showNotification } from "../../utils/helpers";

const Login = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { mutate } = useMutation({
		mutationKey: mutations.LOGIN,
		mutationFn: () =>
			dataFetch({
				url: "/api/user/login",
				method: "POST",
				body: { email, password },
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
			<Button onClick={handleSubmit}>Login</Button>
		</Box>
	);
};

export default Login;

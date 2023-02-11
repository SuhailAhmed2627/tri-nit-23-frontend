import { Box } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<Box>
			<h1>Landing Page</h1>
			<Link to="/login">Login</Link>
			<Link to="/signup">Signup</Link>
		</Box>
	);
};

export default LandingPage;

import React from "react";
import "./types.d";
import { LandingPage, ViewGraph, Login, Signup, Dashboard } from "../pages";

export const routes: RouteType[] = [
	{
		path: "/",
		element: <LandingPage />,
		title: "Welcome",
		description: "Landing Page",
	},
	{
		path: "/graph",
		element: <ViewGraph />,
		title: "Graph",
		description: "Graph Page",
	},
	{
		path: "/login",
		element: <Login />,
		title: "Login",
		description: "Login Page",
	},
	{
		path: "/signup",
		element: <Signup />,
		title: "Signup",
		description: "Signup Page",
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
		title: "Dashboard",
		description: "Dashboard Page",
	},
];

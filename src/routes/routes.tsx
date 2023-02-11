import React from "react";
import "./types.d";
import {
	LandingPage,
	ViewGraph,
	Login,
	Signup,
	Dashboard,
	EntityPage,
} from "../pages";

export const routes: RouteType[] = [
	{
		path: "/",
		element: <LandingPage />,
		title: "Welcome",
		description: "Landing Page",
	},
	{
		path: "/graph/:id",
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
	{
		path: "/entity/:id",
		element: <EntityPage />,
		title: "Entity",
		description: "Entity Page",
	},
];

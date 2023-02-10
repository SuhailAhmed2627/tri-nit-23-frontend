import React from "react";
import "./types.d";
import { LandingPage, ViewGraph } from "../pages";

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
];

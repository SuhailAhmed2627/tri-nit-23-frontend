import React from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useEffect, useState } from "react";
import {
	ControlsContainer,
	FullScreenControl,
	SigmaContainer,
	ZoomControl,
} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import Sigma from "sigma";
import AbstractGraph, { Attributes } from "graphology-types";

import { initToGraph, addNodeToGraph } from "./utils";
import { showNotification } from "../../utils/helpers";

export const displayGraph = (
	setSigma: React.Dispatch<
		React.SetStateAction<Sigma<
			AbstractGraph<Attributes, Attributes, Attributes>
		> | null>
	>
) => {
	return (
		<SigmaContainer
			style={{ height: window.innerHeight - 200, width: window.innerWidth }}
			ref={setSigma}
		>
			<ControlsContainer position={"bottom-right"}>
				<ZoomControl />
				<FullScreenControl />
			</ControlsContainer>
		</SigmaContainer>
	);
};
const Graph = () => {
	const [sigma, setSigma] = useState<Sigma | null>(null);

	useEffect(() => {
		if (sigma) {
			const graph = sigma.getGraph();

			// Init Graph
			initToGraph(graph, [
				{
					id: "n0",
					label: "Node 0",
					x: 0,
					y: 0,
					size: 30,
					color: "#f00",
				},
				{
					id: "n1",
					label: "Node 1",
					x: 3,
					y: 1,
					size: 20,
					color: "#0f0",
				},
			]);
		}

		const handleSocketMessage = (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			switch (data.type) {
				case "UPDATE_NODE":
					if (sigma) {
						addNodeToGraph(sigma.getGraph(), data.payload);
					} else {
						showNotification(
							"error",
							"Sigma is not initialized",
							"error"
						);
					}
					break;
				default:
					break;
			}
		};

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.socket.addEventListener("message", handleSocketMessage);

		return function cleanupListener() {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			window.socket.removeEventListener("message", handleSocketMessage);
		};
	}, [sigma]);

	return (
		<div className="grid">
			<div className="row-span-full col-span-full">
				{displayGraph(setSigma)}
			</div>
		</div>
	);
};

export default Graph;

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
import { CustomNode } from "../../type";
import { Signup } from "../../pages";

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
			settings={{
				defaultNodeColor: "#ec5148",
			}}
		>
			<ControlsContainer position={"bottom-right"}>
				<ZoomControl />
				<FullScreenControl />
			</ControlsContainer>
		</SigmaContainer>
	);
};

const Graph = ({ initialNodes }: { initialNodes: CustomNode[] }) => {
	const [sigma, setSigma] = useState<Sigma | null>(null);

	useEffect(() => {
		if (sigma) {
			const graph = sigma.getGraph();

			// set default node size
			initToGraph(
				graph,
				initialNodes.map((node) => {
					return {
						...node,
						size: 10,
					};
				})
			);
		} else {
			showNotification("error", "Sigma is not initialized", "error");
		}

		// const handleSocketMessage = (event: MessageEvent) => {
		// 	const data = JSON.parse(event.data);
		// 	switch (data.type) {
		// 		case "NODES":
		// 			if (sigma) {
		// 				addNodeToGraph(sigma.getGraph(), data.data.nodes);
		// 			} else {
		// 				showNotification(
		// 					"error",
		// 					"Sigma is not initialized",
		// 					"error"
		// 				);
		// 			}
		// 			break;

		// 		case "NODE":
		// 			if (sigma) {
		// 				addNodeToGraph(sigma.getGraph(), [data.data.node]);
		// 			} else {
		// 				showNotification(
		// 					"error",
		// 					"Sigma is not initialized",
		// 					"error"
		// 				);
		// 			}
		// 			break;
		// 		default:
		// 			break;
		// 	}
		// 	sigma?.refresh();
		// };

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// window.socket.addEventListener("message", handleSocketMessage);

		// return function cleanupListener() {
		// 	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// 	// @ts-ignore
		// 	window.socket.removeEventListener("message", handleSocketMessage);
		// };
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

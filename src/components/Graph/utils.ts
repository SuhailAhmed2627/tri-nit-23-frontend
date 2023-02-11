import Graph from "graphology";

interface CustomNode {
	id: string;
	label?: string;
	x: number;
	y: number;
	size?: number;
	color: string;
}

export const initToGraph = (graph: Graph, nodes: CustomNode[]) => {
	graph.clear();
	nodes.forEach((node) => {
		graph.addNode(node.id, node);
	});
};

export const addNodeToGraph = (graph: Graph, nodes: CustomNode[]) => {
	nodes.forEach((updatedNode) => {
		graph.updateNode(updatedNode.id, (attributes) => {
			return {
				...attributes,
				x: updatedNode.x,
				y: updatedNode.y,
				color: updatedNode.color,
				label: updatedNode.label,
			};
		});
	});
};

export const generateRandomNodes = (count: number): CustomNode[] => {
	const nodes: CustomNode[] = [];
	for (let i = 0; i < count; i++) {
		nodes.push({
			id: i.toString(),
			x: Math.floor(Math.random() * 100),
			y: Math.floor(Math.random() * 100),
			color: "#000",
		});
	}
	return nodes;
};

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

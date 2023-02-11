export type User = Partial<{
	userToken: string;
	username: string;
}>;

interface CustomNode {
	id: string;
	label?: string;
	x: number;
	y: number;
	size?: number;
	color: string;
}

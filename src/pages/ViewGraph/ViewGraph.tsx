import React, { useEffect } from "react";

import { Graph } from "../../components";
import { dataFetch, getUser } from "../../utils/helpers";
import { useQuery } from "react-query";
import { CustomNode } from "../../type";

const ViewGraph = () => {
	const user = getUser();
	const [nodes, setNodes] = React.useState<CustomNode[] | null>(null);

	useEffect(() => {
		if (!user || !user.userToken) {
			return;
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.socket.send(
			JSON.stringify({
				type: "AUTH_USER",
				data: user.userToken,
			})
		);
	}, []);

	const { isError, isLoading } = useQuery({
		queryKey: ["nodes", user],
		queryFn: () =>
			dataFetch({
				url: "/api/nodes",
				method: "GET",
				user,
			}),
		onSuccess: async (res) => {
			if (!res.ok) {
				return;
			}

			const data = await res.json();

			setNodes(data);
		},
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error</div>;
	}

	if (nodes !== null) {
		return <Graph initialNodes={nodes} />;
	}

	return <div>Empty</div>;
};

export default ViewGraph;

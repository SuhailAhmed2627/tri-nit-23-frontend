import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dataFetch, getUser, showNotification } from "../../utils/helpers";
import { useMutation, useQuery } from "react-query";
import { Box, Button, SimpleGrid, TextInput } from "@mantine/core";
import { CustomNode } from "../../type";
import { Graph } from "../../components";

type Param = {
	id: number;
	type: "STRING" | "INT";
	keyName: string;
};

const EntityPage = () => {
	const { id } = useParams();
	const [params, setParams] = React.useState<Param[] | null>(null);
	const [nodes, setNodes] = useState<CustomNode[] | null>(null);
	const user = getUser();

	const navigate = useNavigate();

	const { isLoading, isError } = useQuery({
		queryKey: ["entity", id],
		queryFn: () =>
			dataFetch({
				url: `/api/params/${id}`,
				method: "GET",
				user,
			}),
		onSuccess: async (res) => {
			if (!res.ok) {
				return;
			}

			const data = await res.json();

			setParams(data);
		},
	});

	const addData = useMutation({
		mutationKey: "addData",
		mutationFn: (data: { [key: number]: string | number }) =>
			dataFetch({
				url: "/api/dataset/add",
				method: "POST",
				user,
				body: {
					entityId: Number(id),
					dataset: [data],
				},
			}),
		onSuccess: async (res) => {
			if (!res.ok) {
				showNotification("Error adding data", "error", "error");
				return;
			}

			showNotification("Data added", "success", "success");
		},
	});

	useEffect(() => {
		if (!user || !user.userToken) {
			return;
		}

		const handleSocketMessage = (event: MessageEvent) => {
			console.log(event.data);
			const data = JSON.parse(event.data);
			if (data.type === "NODES") {
				setNodes(data.data);
			}
		};

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.socket.addEventListener("message", handleSocketMessage);

		return () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			window.socket.removeEventListener("message", handleSocketMessage);
		};
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error</div>;
	}

	if (params !== null) {
		return (
			<Box className="w-full">
				<SimpleGrid cols={3} spacing={10}>
					<div>Name</div>
					<div>Type</div>
					<div>-</div>
					{params.map((param) => (
						<>
							<div key={param.keyName}>{param.keyName}</div>
							<div key={param.type}>{param.type}</div>
							<div key={param.keyName + param.type}>
								<TextInput
									id={param.keyName + param.type}
									placeholder="Enter Value"
								/>
							</div>
						</>
					))}
					<Button
						onClick={() => {
							const temp = params.map((param) => {
								const input = document.getElementById(
									param.keyName + param.type
								) as HTMLInputElement;

								if (input === null) {
									return;
								}

								if (input.value === "") {
									return;
								}

								let value: string | number = input.value;

								if (param.type === "INT") {
									value = Number(value);
								}

								return {
									newValue: value,
									paramId: param.id,
								};
							});

							const data: {
								[key: number]: string | number;
							} = {};

							temp.forEach((item) => {
								if (item === undefined) {
									return;
								}

								data[item.paramId] = item.newValue;
							});

							addData.mutate(data);
						}}
					>
						Add Data
					</Button>
					<Button onClick={() => navigate(`/graph/${id}`)}>
						View Graph
					</Button>
				</SimpleGrid>
				{nodes && (
					<Box className="w-full">
						<Graph initialNodes={nodes} />
					</Box>
				)}
			</Box>
		);
	}

	return <div>Entity</div>;
};

export default EntityPage;

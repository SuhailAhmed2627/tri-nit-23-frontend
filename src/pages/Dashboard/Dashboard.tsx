import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Center,
	SimpleGrid,
	Text,
	TextInput,
} from "@mantine/core";
import { dataFetch, getUser, showNotification } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { CustomNode, EntityType } from "../../type";
import { useMutation, useQuery } from "react-query";
import { Graph } from "../../components";

const Dashboard = () => {
	const user = getUser();
	const navigate = useNavigate();

	const [entities, setEntities] = useState<EntityType[] | null>(null);
	const [newEntityName, setNewEntityName] = useState<string>("");
	const [nodes, setNodes] = useState<CustomNode[] | null>(null);

	useEffect(() => {
		if (!user || !user.userToken) {
			return;
		}
		console.log("Connecting to socket");
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.socket.send(
			JSON.stringify({
				type: "AUTH_USER",
				data: user.userToken,
			})
		);
	}, []);

	const { isLoading, isError, refetch } = useQuery({
		queryKey: ["entities"],
		queryFn: () =>
			dataFetch({
				url: "/api/entities",
				method: "GET",
				user,
			}),
		onSuccess: async (res) => {
			if (!res.ok) {
				return;
			}

			const data = await res.json();

			setEntities(data);
		},
	});

	const createEntity = useMutation({
		mutationKey: "createEntity",
		mutationFn: (entityName: string) =>
			dataFetch({
				url: "/api/entity/create",
				method: "POST",
				user,
				body: {
					name: entityName,
				},
			}),
		onSuccess: async (res) => {
			if (!res.ok) {
				return showNotification("Error", "Entity Not Created", "error");
			}
			showNotification("Nice", "Entity Created", "success");
			refetch();
		},
	});

	if (!user) {
		navigate("/login");
	}

	return (
		<Box>
			<Box className="w-full">
				<Center>
					Your Token: <code>{user?.userToken}</code>
				</Center>
			</Box>
			<Box className="w-full">
				<Text>Your Entities:</Text>
				<SimpleGrid cols={3} spacing={10}>
					{isLoading && <div>Loading...</div>}
					{isError && <div>Error</div>}
					{entities &&
						entities.map((entity) => (
							<Box
								className="cursor-pointer"
								onClick={() => navigate("/entity/" + entity.id)}
								key={entity.id}
							>
								<Text>{entity.name}</Text>
							</Box>
						))}
				</SimpleGrid>
			</Box>
			<Box className="w-full">
				<TextInput
					label="Create Entity"
					placeholder="Entity Name"
					onChange={(e) => setNewEntityName(e.currentTarget.value)}
					value={newEntityName}
				/>
				<Button
					disabled={newEntityName.length === 0 || createEntity.isLoading}
					onClick={() => {
						createEntity.mutate(newEntityName);
					}}
				>
					Create
				</Button>
			</Box>
			{nodes && (
				<Box className="w-full">
					<Graph initialNodes={nodes} />
				</Box>
			)}
		</Box>
	);
};

export default Dashboard;

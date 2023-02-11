import React, { useState } from "react";
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
import { EntityType } from "../../type";
import { useMutation, useQuery } from "react-query";

const Dashboard = () => {
	const user = getUser();
	const navigate = useNavigate();

	const [entities, setEntities] = useState<EntityType[] | null>(null);
	const [newEntityName, setNewEntityName] = useState<string>("");

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
		</Box>
	);
};

export default Dashboard;

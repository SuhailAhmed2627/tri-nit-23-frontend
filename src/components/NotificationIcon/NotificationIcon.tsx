import React from "react";
import {
	IconAlertCircle,
	IconCircleCheck,
	IconCircleX,
	IconInfoCircle,
} from "@tabler/icons";

const NotificationIcon = ({
	type,
}: {
	type: "success" | "error" | "warning" | "info";
}) => {
	const stroke = 2;
	let Icon = <IconInfoCircle stroke={stroke} color="#2D9CDB" />;

	switch (type) {
		case "success":
			Icon = <IconCircleCheck stroke={stroke} color="#529E66" />;
			break;
		case "error":
			Icon = <IconCircleX stroke={stroke} color="#D0454C" />;
			break;
		case "warning":
			Icon = <IconAlertCircle stroke={stroke} color="#E1C542" />;
			break;
	}

	return Icon;
};

export default NotificationIcon;

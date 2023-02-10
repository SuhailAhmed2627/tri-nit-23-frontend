import { ButtonStylesParams, MantineThemeOverride } from "@mantine/core";

const getButtonWidth = (size: "xs" | "sm" | "md" | "lg" | "xl") => {
	switch (size) {
		case "xs":
			return 100;
		case "sm":
			return 120;
		case "md":
			return 140;
		case "lg":
			return 160;
		case "xl":
			return 180;
	}
};

const getButtonBorderRadius = (size: "xs" | "sm" | "md" | "lg" | "xl") => {
	switch (size) {
		case "xs":
			return 2;
		case "sm":
			return 4;
		case "md":
			return 5;
		case "lg":
			return 6;
		case "xl":
			return 8;
	}
};

const theme: MantineThemeOverride = {
	fontFamily: "'Inter', sans-serif;",
	headings: {
		fontFamily: "'Inter', sans-serif;",
	},
	components: {
		Button: {
			defaultProps: {
				variant: "gradient",
				size: "md",
			},
			styles: (theme, params: ButtonStylesParams) => ({
				root: {
					width: getButtonWidth(params.size),
					transitionProperty: "box-shadow, letter-spacing",
					paddingLeft: 0,
					paddingRight: 0,
					transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
					transitionDuration: "150ms",
					border: "none",
					borderRadius: getButtonBorderRadius(params.size),
					background:
						params.variant == "gradient"
							? "linear-gradient(180deg, #8952F5 0%, #5030DB 100%);"
							: "#F8F8F8",
					boxShadow:
						"0px 4.15917px 8.31834px rgba(0, 0, 0, 0.05), 0px 8.31834px 10.3979px rgba(0, 0, 0, 0.05), 0px 2.07958px 20.7958px rgba(0, 0, 0, 0.05);",
					"&:hover": {
						boxShadow:
							"0px 4.15917px 8.31834px rgba(0, 0, 0, 0.02), 0px 2.07958px 20.7958px rgba(0, 0, 0, 0.02);",
						letterSpacing: "0.05em",
						background:
							params.variant == "gradient"
								? "linear-gradient(180deg, #8952F5 0%, #5030DB 100%);"
								: "#F8F8F8",
					},
					minWidth: 100,
				},
				inner: {
					width: "100%",
				},
				label: {
					textShadow:
						params.variant == "gradient"
							? "0px 1px 1px rgb(0 0 0 / 20%);"
							: "none",
					textAlign: "center",
					fontFamily: "'Poppins', sans-serif;",
					fontWeight: 800,
					color: params.variant == "gradient" ? "#fff" : "#5030DB",
				},
			}),
		},
	},
};

export default theme;

import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { ReactElement } from "react";

interface CustomTooltipProps {
	children: ReactElement<any, any>;
	title: string;
	placement:
		| "right"
		| "bottom"
		| "left"
		| "top"
		| "bottom-end"
		| "bottom-start"
		| "left-end"
		| "left-start"
		| "right-end"
		| "right-start"
		| "top-end"
		| "top-start";
	fontSize?: string;
}

export function CustomTooltip(props: CustomTooltipProps) {
	const TooltipComponent = withStyles(() => ({
		tooltip: {
			fontSize: props.fontSize ?? "1rem",
			font: "400 1rem 'Inter', sans-serif",
			textAlign: "center",
		},
	}))(Tooltip);

	return (
		<TooltipComponent title={props.title} placement={props.placement}>
			{props.children}
		</TooltipComponent>
	);
}

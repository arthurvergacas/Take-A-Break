import { ReactElement } from "react";

interface ConditionalWrapperProps {
	condition: boolean;
	wrapper: (children: ReactElement<any, any>) => ReactElement<any, any>;
	children: ReactElement<any, any>;
}

export function ConditionalWrapper({
	condition,
	wrapper,
	children,
}: ConditionalWrapperProps) {
	return condition ? wrapper(children) : children;
}

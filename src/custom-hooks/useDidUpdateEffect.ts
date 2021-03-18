import { useRef, useEffect } from "react";

export function useDidUpdateEffect(fn: Function, inputs: Array<any>) {
	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) fn();
		else didMountRef.current = true;
	}, inputs);
}

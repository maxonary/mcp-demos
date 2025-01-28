import { useState } from "react";
import { Example } from "~/components/example";
import { Button } from "~/components/ui/button";

function CSSVariableExample() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<div
			style={{ "--width": isCollapsed ? "8rem" : "14rem" }}
			className="w-[--width] bg-emerald-100 p-4 transition-all flex justify-between items-center border-2 border-black rounded-md"
		>
			<Button onClick={() => setIsCollapsed(!isCollapsed)}>Toggle</Button>
		</div>
	);
}

const code = `
function CSSVariableExample() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<div
			style={{ "--width": isCollapsed ? "8rem" : "14rem" }}
			className="w-[--width] bg-emerald-100 p-4 transition-all flex justify-between items-center border-2 border-black rounded-md"
		>
			<Button onClick={() => setIsCollapsed(!isCollapsed)}>Toggle</Button>
			{isCollapsed ? "" : "Expanded"}
		</div>
	);
}
`;

export default function DynamicWidthPage() {
	return (
		<Example
			title="01. Dynamic Width Control Using CSS Custom Properties and React State"
			code={code}
			description="This example demonstrates how to dynamically control the width of a component using CSS custom properties and React state. Click the 'Toggle' button to collapse or expand the width of the box."
		>
			<CSSVariableExample />
		</Example>
	);
}

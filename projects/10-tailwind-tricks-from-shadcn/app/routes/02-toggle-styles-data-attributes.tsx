import { useState } from "react";
import { Example } from "~/components/example";
import { Button } from "~/components/ui/button";

function DataAttributeExample() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<div
			data-collapsed={isCollapsed}
			className="w-[8rem] data-[collapsed=false]:w-[14rem] bg-emerald-100 p-4  flex justify-between items-center border-2 border-black rounded-md transition-all"
		>
			<Button onClick={() => setIsCollapsed(!isCollapsed)}>Toggle</Button>
		</div>
	);
}

const code = `
function DataAttributeExample() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<div
			data-collapsed={isCollapsed}
			className="w-[8rem] data-[collapsed=false]:w-[14rem] bg-emerald-100 p-4  flex justify-between items-center border-2 border-black rounded-md transition-all"
		>
			<Button onClick={() => setIsCollapsed(!isCollapsed)}>Toggle</Button>
			{isCollapsed ? "" : "Expanded"}
		</div>
	);
}
`;

export default function ToggleStylesPage() {
	return (
		<Example
			title="02. Toggle Styles with Data Attributes and Tailwind Selectors"
			description="This example demonstrates how to toggle styles using data attributes and Tailwind CSS selectors. Click the 'Toggle' button to collapse or expand the width of the box."
			code={code}
		>
			<DataAttributeExample />
		</Example>
	);
}

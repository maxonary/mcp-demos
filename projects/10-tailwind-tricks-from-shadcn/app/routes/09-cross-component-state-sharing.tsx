import { useState } from "react";
import { Example } from "~/components/example";
import { Button } from "~/components/ui/button";

function GroupStateExample() {
	const [isActive, setIsActive] = useState(false);
	return (
		<div className="group/menu flex gap-4 items-center">
			<Button
				className="group-has-[[data-active=true]]/menu:bg-blue-500"
				onClick={() => setIsActive(!isActive)}
			>
				Toggle
			</Button>
			<div
				data-active={isActive}
				className="border-2 border-black p-2 rounded-md"
			>
				{isActive ? "Active" : "Inactive"}
			</div>
		</div>
	);
}

const code = `
function GroupStateExample() {
	const [isActive, setIsActive] = useState(false);
	return (
		<div className="group/menu flex gap-4 items-center">
			<Button
				className="group-has-[[data-active=true]]/menu:bg-blue-500"
				onClick={() => setIsActive(!isActive)}
			>
				Toggle
			</Button>
			<div
				data-active={isActive}
				className="border-2 border-black p-2 rounded-md"
			>
				{isActive ? "Active" : "Inactive"}
			</div>
		</div>
	);
}
`;

export default function CrossComponentStatePage() {
	return (
		<Example
			title="09. Group Data Attributes"
			description="This example demonstrates how to share state between two components using a parent group element. Click the 'Toggle' button to toggle the state of the child element."
			code={code}
		>
			<GroupStateExample />
		</Example>
	);
}

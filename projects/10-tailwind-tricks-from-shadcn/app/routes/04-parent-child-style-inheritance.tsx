import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { Example } from "~/components/example";
import { Button } from "~/components/ui/button";

function ParentStateExample() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<div
			data-collapsed={isCollapsed}
			className="border-2 border-black p-8 rounded-md w-[300px]"
		>
			<div className="flex gap-4 justify-left items-center">
				<ChevronUp
					size={24}
					className="transition-all [[data-collapsed=true]_&]:rotate-180"
				/>

				<Button onClick={() => setIsCollapsed(!isCollapsed)}>
					{isCollapsed ? "Expand" : "Collapse"}
				</Button>
			</div>

			{!isCollapsed && (
				<p className="mt-8">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
				</p>
			)}
		</div>
	);
}

const code = `
function ParentStateExample() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<div
			data-collapsed={isCollapsed}
			className="border-2 border-black p-8 rounded-md w-[300px]"
		>
			<div className="flex gap-4 justify-left items-center">
				<ChevronUp
					size={24}
					className="transition-all [[data-collapsed=true]_&]:rotate-180"
				/>

				<Button onClick={() => setIsCollapsed(!isCollapsed)}>
					{isCollapsed ? "Expand" : "Collapse"}
				</Button>
			</div>

			{!isCollapsed && (
				<p className="mt-8">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
				</p>
			)}
		</div>
	);
}
`;

export default function ParentChildStylePage() {
	return (
		<Example
			title="04. Parent Child Style Inheritance"
			description="This example demonstrates how to inherit styles from a parent element to a child element using Tailwind CSS."
			code={code}
		>
			<ParentStateExample />
		</Example>
	);
}

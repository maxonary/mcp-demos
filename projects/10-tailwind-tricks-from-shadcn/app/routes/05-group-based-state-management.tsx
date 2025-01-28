import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { Example } from "~/components/example";
import { Button } from "~/components/ui/button";

function GroupDataExample() {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div
			data-collapsed={isCollapsed}
			className="border-2 border-black p-8 rounded-md w-[300px] group"
		>
			<div className="flex gap-4 justify-left items-center">
				<ChevronUp
					size={24}
					className="transition-all group-data-[collapsed=true]:rotate-180"
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
function GroupDataExample() {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div
			data-collapsed={isCollapsed}
			className="border-2 border-black p-8 rounded-md w-[300px] group"
		>
			<div className="flex gap-4 justify-left items-center">
				<ChevronUp
					size={24}
					className="transition-all group-data-[collapsed=true]:rotate-180"
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

export default function GroupBasedStatePage() {
	return (
		<Example
			title="05. Group-Based State Management"
			description="This example demonstrates how to manage state based on a parent group element. Click the 'Toggle' button to rotate the child element."
			code={code}
		>
			<GroupDataExample />
		</Example>
	);
}

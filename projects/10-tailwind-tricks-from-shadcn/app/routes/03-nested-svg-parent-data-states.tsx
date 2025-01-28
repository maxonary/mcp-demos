import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { Example } from "~/components/example";
import { Button } from "~/components/ui/button";

function NestedChildExample() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<div
			data-collapsed={isCollapsed}
			className="[&[data-collapsed=true]_svg]:rotate-180 border-2 border-black p-8 rounded-md w-[300px]"
		>
			<div className="flex gap-4 justify-left items-center">
				<ChevronUp size={24} className="transition-all" />

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
function NestedChildExample() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<div
			data-collapsed={isCollapsed}
			className="[&[data-collapsed=true]_svg]:rotate-180 border-2 border-black p-8 rounded-md w-[300px]"
		>
			<div className="flex gap-4 justify-left items-center">
				<ChevronUp size={24} className="transition-all" />

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

export default function NestedSvgPage() {
	return (
		<Example
			title="03. Nested SVG Parent Data States"
			description="This example demonstrates how to use parent data states to style nested SVG elements. Click the 'Toggle' button to rotate the arrow SVG."
			code={code}
		>
			<NestedChildExample />
		</Example>
	);
}

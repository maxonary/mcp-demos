import { Example } from "~/components/example";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function FocusGroupExample() {
	return (
		<div className="group/menu flex gap-4">
			<Input />
			<Button className="group-focus-within/menu:bg-blue-500">
				Menu Button
			</Button>
		</div>
	);
}

const code = `
function FocusGroupExample() {
	return (
		<div className="group/menu flex gap-4">
			<Input />
			<Button className="group-focus-within/menu:bg-blue-500">
				Menu Button
			</Button>
		</div>
	);
}
`;

export default function NamedGroupFocusPage() {
	return (
		<Example
			title="08. Named Group Focus States"
			description="This example demonstrates how to style a group of elements based on the focus state of another element."
			code={code}
		>
			<FocusGroupExample />
		</Example>
	);
}

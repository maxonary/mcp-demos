import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { Example } from "~/components/example";
import { Button } from "~/components/ui/button";

function PeerExample() {
	const [isActive, setIsActive] = useState(false);
	return (
		<div className="w-[300px] overflow-hidden border-2 border-black rounded-md">
			<div className="rounded-md flex gap-4 items-center m-4">
				<Button
					onClick={() => setIsActive(!isActive)}
					data-active={isActive}
					className="peer"
				>
					<Ellipsis size={24} />
				</Button>

				<div className="border-2 border-black rounded-md p-2 w-full transition-all peer-data-[active=true]:bg-emerald-100">
					{isActive ? "Active" : "Inactive"}
				</div>
			</div>
		</div>
	);
}

const code = `
function PeerExample() {
	const [isActive, setIsActive] = useState(false);
	return (
		<div className="w-[300px] overflow-hidden border-2 border-black rounded-md">
			<div className="rounded-md flex gap-4 items-center m-4">
				<Button
					onClick={() => setIsActive(!isActive)}
					data-active={isActive}
					className="peer"
				>
					<Ellipsis size={24} />
				</Button>

				<div
					className="border-2 border-black rounded-md p-2 w-full transition-all peer-data-[active=true]:bg-emerald-100"
				>
					{isActive ? "Active" : "Inactive"}
				</div>
			</div>
		</div>
	);
}
`;

export default function PeerElementPage() {
	return (
		<Example
			title="07. Peer Element State Control"
			description="This example demonstrates how to control the state of a peer element based on another element. Click the 'Toggle' button to slide the text based on the button state."
			code={code}
		>
			<PeerExample />
		</Example>
	);
}

import { Ellipsis } from "lucide-react";
import { Example } from "~/components/example";
import { Button } from "~/components/ui/button";

function DataSlotExample() {
	return (
		<div className="w-[200px]">
			<div className="data-[slot=action]:*:hover:mr-0 flex overflow-hidden w-full gap-2 items-stretch">
				<div className="border-2 border-black w-full transition-all overflow-hidden rounded-m flex items-center rounded-md px-4">
					hey
				</div>
				<div
					data-slot="action"
					className="ml-auto -mr-32 w-max bg-slate-100 transition-all"
				>
					<Button>
						<Ellipsis size={24} />
					</Button>
				</div>
			</div>
		</div>
	);
}

const code = `
function DataSlotExample() {
	return (
		<div className="w-[200px]">
			<div className="data-[slot=action]:*:hover:mr-0 flex overflow-hidden w-full gap-2 items-stretch">
				<div className="border-2 border-black w-full transition-all overflow-hidden rounded-m flex items-center rounded-md px-4">
					hey
				</div>
				<div
					data-slot="action"
					className="ml-auto -mr-32 w-max bg-slate-100 transition-all"
				>
					<Button>
						<Ellipsis size={24} />
					</Button>
				</div>
			</div>
		</div>
	);
}
`;

export default function DataSlotsPage() {
	return (
		<Example
			title="06. Data Slots for Hover Interactions"
			description="This example demonstrates how to use data slots to create hover interactions. Hover over the ellipsis button to see the action."
			code={code}
		>
			<DataSlotExample />
		</Example>
	);
}

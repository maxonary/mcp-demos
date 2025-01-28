import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { Example } from "~/components/example";
import { Button } from "~/components/ui/button";

function PropBasedExample() {
	const [variant, setVariant] = useState("default");
	return (
		<div className="flex gap-4 items-center">
			<Button
				data-variant={variant}
				className="peer data-[variant=ghost]:border-emerald-500 border-4 border-transparent"
				onClick={() => setVariant((v) => (v === "ghost" ? "default" : "ghost"))}
			>
				Toggle Variant
			</Button>
			<div className="peer-data-[variant=ghost]:rotate-90 transition-all border-2 border-black p-2 rounded-md">
				<Ellipsis size={24} />
			</div>
		</div>
	);
}

const code = `
function PropBasedExample() {
	const [variant, setVariant] = useState("default");
	return (
		<div className="flex gap-4 items-center">
			<Button
				data-variant={variant}
				className="peer data-[variant=ghost]:border-emerald-500 border-4 border-transparent"
				onClick={() => setVariant((v) => (v === "ghost" ? "default" : "ghost"))}
			>
				Toggle Variant
			</Button>
			<div className="peer-data-[variant=ghost]:rotate-90 transition-all border-2 border-black p-2 rounded-md">
				<Ellipsis size={24} />
			</div>
		</div>
	);
}
`;

export default function VariantBasedPropPage() {
	return (
		<Example
			title="10. Variant-Based Prop Styling"
			description="This example demonstrates how to style elements based on a prop value. Click the 'Toggle Variant' button to rotate the text based on the variant prop."
			code={code}
		>
			<PropBasedExample />
		</Example>
	);
}

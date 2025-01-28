import React from "react";

import { codeToHtml } from "shiki/bundle-web.mjs";
import { Separator } from "~/components/ui/separator";

export function Example({
	title,
	description,
	code,
	children,
}: {
	title: string;
	description: string;
	code: string;
	children: React.ReactNode;
}) {
	const [html, setHtml] = React.useState("");

	React.useEffect(() => {
		async function fetchHtml() {
			const result = await codeToHtml(code, {
				lang: "tsx",
				theme: "dracula",
				transformers: [
					{
						pre(node) {
							// Override inline styles for wrapping
							node.properties.style =
								"white-space: pre-wrap; word-wrap: break-word;";
						},
					},
				],
			});
			setHtml(result);
		}

		fetchHtml();
	}, [code]);

	return (
		<div className="p-4 flex flex-col gap-16 items-center w-full">
			<h1 className="text-2xl font-bold text-center">{title}</h1>

			<p>{description}</p>

			{children}

			<Separator />

			<div
				className="w-full p-4 bg-gray-800 text-white rounded-lg text-xs overflow-x-scroll"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
}

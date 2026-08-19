import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

type Props = {
	content: Content.ExperienceTemplateDocument["data"];
};

export function Overlay({ content }: Props) {
	return (
		<div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-8 sm:p-12">
			<header className="max-w-md">
				<PrismicRichText
					field={content.title}
					components={{
						heading1: ({ children }) => (
							<h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
								{children}
							</h1>
						),
					}}
				/>
			</header>

			<footer className="max-w-md">
				<div className="text-md leading-relaxed text-neutral-600">
					<PrismicRichText field={content.description} />
				</div>
			</footer>
		</div>
	);
}

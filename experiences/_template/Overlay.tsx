import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

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

			<footer className="flex max-w-md flex-col items-start gap-4">
				<div className="text-md leading-relaxed text-neutral-600">
					<PrismicRichText field={content.description} />
				</div>

				{content.cta.map((link, i) => (
					<PrismicNextLink
						key={i}
						field={link}
						className="pointer-events-auto rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
					/>
				))}
			</footer>
		</div>
	);
}

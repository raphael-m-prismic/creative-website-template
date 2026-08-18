import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

type Props = {
	content: Content.LockerExperienceDocument["data"];
};

export function Overlay({ content }: Props) {
	return (
		<div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
			<header className="flex items-start justify-between gap-6">
				<PrismicRichText
					field={content.title}
					components={{
						heading1: ({ children }) => (
							<h1 className="max-w-xs text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:max-w-sm sm:text-4xl">
								{children}
							</h1>
						),
					}}
				/>

				{isFilled.link(content.cta) && (
					<PrismicNextLink
						field={content.cta}
						className="pointer-events-auto shrink-0 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-neutral-700"
					/>
				)}
			</header>

			<footer className="max-w-sm">
				<div className="text-sm leading-relaxed text-neutral-600">
					<PrismicRichText field={content.description} />
				</div>
			</footer>
		</div>
	);
}

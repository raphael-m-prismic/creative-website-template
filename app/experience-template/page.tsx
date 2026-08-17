import type { Metadata } from "next";
import { asText } from "@prismicio/client";

import { createClient } from "@/prismicio";
import TemplateExperienceView from "@/experiences/_template";
import { resolveContent } from "@/experiences/_template/resolveContent";

export default async function Page() {
	const client = createClient();
	const page = await client.getSingle("experience_template");

	const experience = resolveContent(page.data);

	return <TemplateExperienceView experience={experience} content={page.data} />;
}

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	const page = await client.getSingle("experience_template");

	return {
		title: page.data.meta_title ?? asText(page.data.title),
		description: page.data.meta_description,
		openGraph: {
			images: page.data.meta_image.url ? [page.data.meta_image.url] : undefined,
		},
	};
}

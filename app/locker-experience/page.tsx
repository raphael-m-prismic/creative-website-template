import type { Metadata } from "next";
import { asText } from "@prismicio/client";

import { createClient } from "@/prismicio";
import LockerExperienceView from "@/experiences/locker";
import { resolveItems } from "@/experiences/locker/resolveItems";

export default async function Page() {
	const client = createClient();
	const page = await client.getSingle("locker_experience");

	const items = resolveItems(page.data);

	return <LockerExperienceView items={items} content={page.data} />;
}

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	const page = await client.getSingle("locker_experience");

	return {
		title: page.data.meta_title ?? asText(page.data.title),
		description: page.data.meta_description,
		openGraph: {
			images: page.data.meta_image.url ? [page.data.meta_image.url] : undefined,
		},
	};
}

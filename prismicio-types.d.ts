import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type ExperienceTemplateDocumentDataSlicesSlice = never

/**
 * Content for experience_template documents
 */
interface ExperienceTemplateDocumentData {
	/**
	 * Position field in *experience_template*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience_template.position
	 * - **Tab**: Experience
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	position: prismic.SelectField<"center" | "left" | "right">;
	
	/**
	 * Color field in *experience_template*
	 *
	 * - **Field Type**: Color
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience_template.color
	 * - **Tab**: Experience
	 * - **Documentation**: https://prismic.io/docs/fields/color
	 */
	color: prismic.ColorField;
	
	/**
	 * Texture field in *experience_template*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience_template.texture
	 * - **Tab**: Experience
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	texture: prismic.ImageField<never>;
	
	/**
	 * Slice Zone field in *experience_template*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience_template.slices[]
	 * - **Tab**: Experience
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<ExperienceTemplateDocumentDataSlicesSlice>;/**
	 * Title field in *experience_template*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience_template.title
	 * - **Tab**: Content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *experience_template*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience_template.description
	 * - **Tab**: Content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Cta field in *experience_template*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience_template.cta
	 * - **Tab**: Content
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta: prismic.Repeatable<prismic.LinkField<string, string, unknown, prismic.FieldState, never>>;/**
	 * Meta Title field in *experience_template*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: experience_template.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *experience_template*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: experience_template.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *experience_template*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experience_template.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * experience_template document from Prismic
 *
 * - **API ID**: `experience_template`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ExperienceTemplateDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<ExperienceTemplateDocumentData>, "experience_template", Lang>;

/**
 * Item in *locker_experience → Objects*
 */
export interface LockerExperienceDocumentDataObjectsItem {
	/**
	 * Image field in *locker_experience → Objects*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: locker_experience.objects[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * uid field in *locker_experience → Objects*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: locker_experience.objects[].uid
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	uid: prismic.KeyTextField;
	
	/**
	 * Label field in *locker_experience → Objects*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: locker_experience.objects[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Link field in *locker_experience → Objects*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: locker_experience.objects[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

type LockerExperienceDocumentDataSlicesSlice = never

/**
 * Content for locker_experience documents
 */
interface LockerExperienceDocumentData {
	/**
	 * Objects field in *locker_experience*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: locker_experience.objects[]
	 * - **Tab**: Experience
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	objects: prismic.GroupField<Simplify<LockerExperienceDocumentDataObjectsItem>>;
	
	/**
	 * Slice Zone field in *locker_experience*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: locker_experience.slices[]
	 * - **Tab**: Experience
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<LockerExperienceDocumentDataSlicesSlice>;/**
	 * Meta Title field in *locker_experience*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: locker_experience.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *locker_experience*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: locker_experience.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *locker_experience*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: locker_experience.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;/**
	 * Title field in *locker_experience*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: locker_experience.title
	 * - **Tab**: Content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *locker_experience*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: locker_experience.description
	 * - **Tab**: Content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Cta field in *locker_experience*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: locker_experience.cta
	 * - **Tab**: Content
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Loading Text field in *locker_experience*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: locker_experience.loading_text
	 * - **Tab**: Content
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	loading_text: prismic.KeyTextField;
}

/**
 * locker_experience document from Prismic
 *
 * - **API ID**: `locker_experience`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type LockerExperienceDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<LockerExperienceDocumentData>, "locker_experience", Lang>;

export type AllDocumentTypes = ExperienceTemplateDocument | LockerExperienceDocument;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			ExperienceTemplateDocument,
			ExperienceTemplateDocumentData,
			ExperienceTemplateDocumentDataSlicesSlice,
			LockerExperienceDocument,
			LockerExperienceDocumentData,
			LockerExperienceDocumentDataObjectsItem,
			LockerExperienceDocumentDataSlicesSlice,
			AllDocumentTypes
		}
	}
}
# Creative experiences with Prismic

A proof of concept inspired by [Elle's Locker](https://www.amazon.com/salp/elleslocker): a bespoke 3D scene where clickable objects link out, with everything an editor should own coming from a CMS.

It answers two questions:

1. **Can several distinct 3D experiences live in one project?** Yes — each one gets its own page type and its own folder, sharing a skeleton but no design.
2. **Can a bespoke experience stay editable?** Yes — a marketer swaps a visual, renames an item, changes a link or reorders the objects in Prismic, without a developer.

Built with Next.js, Prismic and React Three Fiber.

## Two experiences

| Route | Folder | What it is |
| --- | --- | --- |
| `/experience-template` | `experiences/_template` | The reference wiring, deliberately plain: a cube whose color is a Prismic field, a Suzanne whose position is a select, and a sphere whose PBR maps are Prismic images. Duplicate this folder to start a new experience. |
| `/locker-experience` | `experiences/locker` | The real one: a GLB locker, textured planes on shelves, hover outline, label tag, pointer-driven camera. |

The template exists to show the range of what a field can drive — a value, a code-defined position, a set of assets — with nothing to distract from the wiring.

## Running it

```bash
npm install
npm run dev
```

Content lives in the Prismic repository named in `prismic.config.json`. Models are edited in Prismic's Type Builder, then synced into this repo:

```bash
npx prismic pull   # writes customtypes/ and prismicio-types.d.ts
```

**Commit what `pull` writes.** Without it the repo drifts from Prismic, and the content model becomes invisible to anyone reading the code.

Add `?debug` to either route for a leva panel, OrbitControls and helpers: use it to place objects, read the values, paste them into the code.

## What the editor owns, and what the code owns

This split is the whole point.

**Prismic owns _what_ is in the scene.** Which visuals, which labels, which links, in which order. Which texture maps dress a material, which color a mesh takes.

**The code owns _where_ and _how_.** `slots.ts` declares every position, rotation and size. Lighting, camera feel, shadows, materials, the outline shader — none of it is exposed. An editor can fill the locker; they cannot break the art direction.

Three consequences worth knowing:

- Objects fill slots **in the order they appear in Prismic**. Reordering the group moves them in the scene; extras beyond the slot count are ignored.
- Plane proportions are **derived**, not configured. The height comes from the slot, the width from the image's own ratio, so a tall umbrella and a square handbag both sit correctly with nothing to adjust.
- The scene **reacts to what the content contains**. Upload a displacement map and the sphere is rebuilt at a higher segment count, because displacement needs real geometry to move. The editor never learns why.

## How a page is put together

```
app/locker-experience/page.tsx     server: fetches the document
  └── resolveItems.ts              the only file that understands Prismic
        └── index.tsx              the experience view
              ├── Scene.tsx        <Canvas>, lights, camera, 3D logic
              ├── Overlay.tsx      DOM layer: title, CTA, copy
              └── LoadingScreen.tsx
```

**The resolve step is the boundary** — `resolveItems.ts` here, `resolveContent.ts` in the template. It turns a Prismic document into plain data: texture URLs sized by the code, positions resolved from slots, image ratios computed, defaults applied. Everything downstream consumes that, so:

- the 3D code imports nothing from Prismic and runs on hardcoded values, with no CMS and no network;
- validation and defaults live in one place;
- swapping the content source touches one file.

It is also where CMS-specific knowledge is documented rather than scattered: why data maps opt out of automatic recompression, why a non-repeatable group still arrives as an array.

The DOM overlay is the deliberate exception: it consumes Prismic fields directly, because `PrismicRichText` and `PrismicNextLink` are the right tool there. The boundary protects the creative code, not the interface.

## What is shared, and what is not

`experiences/_shared` holds the _when_ of loading and the debug flag, never the _what_:

- `useLoadingScreen` — headless: returns state and props to spread, no markup, no class names. Each experience writes its own loading screen.
- `SceneReady` / `useSceneReady` — bridges inside-the-Canvas to outside. A loading screen is DOM and cannot see frames, so something in the scene reports out once assets have resolved _and_ a few frames have actually been painted. Decoding finishing is not the same as the scene being on screen.
- `useDebug` / `DebugPanel` — the `?debug` URL flag and the leva panel.

Everything else belongs to its experience: its own lights, its own camera, its own scene graph, its own resolve step. Two creative experiences have nothing visual in common, and a shared abstraction trying to cover both would be worked around by the third.

## Adding an experience

1. Create a page type in Prismic's Type Builder, publish a document, run `npx prismic pull`.
2. Duplicate `experiences/_template` and rename it.
3. Add a route under `app/` that fetches the document, resolves it, and renders the view.
4. Write the scene. `_shared` stays untouched.

That is the point of the skeleton: the wiring, the folder convention, the loading contract and the resolve pattern are already here, so the second project costs less than the first.

## Publishing

`prismic init` set up `/api/revalidate`. A Prismic webhook points at it, so publishing invalidates the `prismic` cache tag and the affected pages regenerate on the next request — no rebuild, no redeploy. The change is live within seconds.

Preview routes (`/api/preview`, `/api/exit-preview`) are wired too, so unpublished changes can be viewed before they go live.

## Notes

- **This is a POC.** The visuals are placeholders, not Powster's or Amazon's artwork.
- leva ships in the client bundle even without `?debug`. A dynamic import behind the flag would fix it; not worth it at this size.
- The hover outline dilates the texture's alpha in a shader, so it follows the artwork's cutout rather than the plane's rectangle. Thickness is a single constant in `ItemOutline.tsx`.
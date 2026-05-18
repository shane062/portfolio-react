/**
 * Base path utility for GitHub Pages deployment.
 *
 * In production, NEXT_PUBLIC_BASE_PATH is set to "/portfolio-react"
 * so all asset URLs resolve correctly under the subpath.
 * In development, it defaults to "" (root).
 *
 * Usage:
 *   fetch(assetUrl("/metadata.json"))
 *   <img src={assetUrl("/images/logo.png")} />
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prepend basePath to any public asset URL */
export const assetUrl = (path: string): string => `${basePath}${path}`;

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${process.env.NEXT_PUBLIC_APP_NAME}`,
    short_name: `${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: "Manage shifts in the health sector with ease",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/Screenshot_vitalSync.png",
        sizes: "1080x796",
        type: "image/png",
        form_factor: "wide",
        label: "Shift-Manager",
      },
      {
        src: "/screenshots/Screenshot_vitalSync_iPad.png",
        sizes: "880x1173",
        type: "image/png",
        form_factor: "narrow",
        label: "Shift-Manager on iPad",
      },
    ],
  };
}

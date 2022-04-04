// client.js
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// export client
export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECTID,
  dataset: "production",
  apiVersion: "2022-04-04",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

// builder user[image]
const builder = imageUrlBuilder(client);

// export url[img sorce]
export const urlFor = (source) => builder.image(source);

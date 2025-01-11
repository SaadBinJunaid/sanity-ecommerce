import { createClient } from '@sanity/client';

let projectid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
let dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const sanityClient = createClient({
  projectId: projectid,
  dataset: dataset,
  apiVersion: '2022-03-07',
  useCdn: true
});
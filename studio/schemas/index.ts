import { project } from "./documents/project";
import { experience } from "./documents/experience";
import { skill } from "./documents/skill";
import { post } from "./documents/post";
import { siteSettings } from "./documents/site-settings";

import { imageWithAlt } from "./objects/image-with-alt";
import { link } from "./objects/link";
import { seo } from "./objects/seo";
import { blockContent } from "./objects/block-content";

export const schemaTypes = [
  // documents
  project,
  experience,
  skill,
  post,
  siteSettings,
  // objects
  imageWithAlt,
  link,
  seo,
  blockContent,
];

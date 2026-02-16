export type Resource = {
  id: string;
  title: string;
  category: string;
  categoryBlurb: string;
  description: string;
  tags: string[];
  link: string;
};

export type CategoryGroup = {
  category: string;
  categoryBlurb: string;
  resources: Resource[];
};

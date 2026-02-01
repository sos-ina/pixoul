export const routes = {
  experience: (category, slug) =>
    `/experience/${category}/${slug}`,

  bookExperience: (experienceId) =>
    `/book?experience=${experienceId}`,

  vrStory: () =>
    `/experience/vr/story`,
};

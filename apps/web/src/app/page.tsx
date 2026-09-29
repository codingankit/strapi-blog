import {
  getHome,
  Hero,
  LatestPosts,
  FeaturedCategories,
  HomeSectionType,
} from "@/features/home";

export default async function Home() {
  const home = await getHome();

  return (
    <>
      {home.sections.map((section, index) => {
        switch (section.__component) {
          case HomeSectionType.Hero:
            return (
              <Hero key={`${section.__component}-${index}`} data={section} />
            );

          case HomeSectionType.LatestPosts:
            return (
              <LatestPosts
                key={`${section.__component}-${index}`}
                data={section}
              />
            );

          case HomeSectionType.FeaturedCategories:
            return (
              <FeaturedCategories
                key={`${section.__component}-${index}`}
                data={section}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}

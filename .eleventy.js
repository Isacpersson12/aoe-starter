export default function(eleventyConfig) {
  eleventyConfig.addCollection("opps", (api) =>
    api.getFilteredByGlob("opps/**/*.md") // because input dir is "src"
  );
  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}

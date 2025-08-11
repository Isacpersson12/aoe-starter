export default function(eleventyConfig) {
  // Collect EVERY markdown file under src/opps (recursively)
  eleventyConfig.addCollection("opps", (api) =>
    api.getFilteredByGlob("src/opps/**/*.md")
  );

  return {
    dir: { input: "src", output: "_site" }, // layouts in src/_includes
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}

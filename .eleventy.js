export default function(eleventyConfig) {
  // Grab every Markdown file in src/opps/
  eleventyConfig.addCollection("opps", (api) =>
    api.getFilteredByGlob("src/opps/*.md")
  );

  return {
    dir: { input: "src", output: "_site" }, // layouts are already in src/_includes/
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}

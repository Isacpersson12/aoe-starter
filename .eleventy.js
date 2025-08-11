export default function(eleventyConfig) {
  eleventyConfig.addCollection("opps", (api) =>
    api.getFilteredByGlob("opps/**/*.md")   // <-- key fix
  );
  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}

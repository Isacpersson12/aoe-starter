export default function(eleventyConfig) {
  // All items with the "opp" tag (set automatically by src/opps/opps.json)
  eleventyConfig.addCollection("opps", (api) => api.getFilteredByTag("opp"));

  return {
    dir: { input: "src", output: "_site" }, // layouts live in src/_includes
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}

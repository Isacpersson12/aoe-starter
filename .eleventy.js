export default function(eleventyConfig) {
  // Collect ONLY markdown files in src/opps, and sort by deadline (if any)
  eleventyConfig.addCollection("opps", (api) =>
    api.getFilteredByGlob("opps/**/*.md")
       .filter(i => i.data && i.data.title) // ignore pages without a title
       .sort((a,b) => String(a.data.deadline||"").localeCompare(String(b.data.deadline||"")))
  );

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}

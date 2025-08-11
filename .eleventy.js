export default function(eleventyConfig) {
  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: "/aoe-starter/"   // <-- for GitHub Pages project site
  };
}

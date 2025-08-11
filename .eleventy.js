export default function(eleventyConfig) {
  // Collect ANY markdown that lives under src/opps (robust on CI paths)
  eleventyConfig.addCollection("opps", (api) => {
    return api.getAll().filter(i =>
      i.inputPath &&
      i.inputPath.endsWith(".md") &&
      (i.inputPath.includes("/src/opps/") || i.inputPath.includes("\\src\\opps\\"))
    ).sort((a,b) =>
      String(a.data?.deadline || "").localeCompare(String(b.data?.deadline || ""))
    );
  });

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}

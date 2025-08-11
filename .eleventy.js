export default function(eleventyConfig) {
  // Robust collection: "anything in src/opps/"
  eleventyConfig.addCollection("opps", (coll) => {
    const items = coll.getAll().filter(i =>
      i.inputPath.includes("/opps/") && i.inputPath.endsWith(".md")
    );
    // sort by deadline if present
    return items.sort((a,b) =>
      String(a.data.deadline || "").localeCompare(String(b.data.deadline || ""))
    );
  });

  return {
    dir: { input: "src", output: "_site" }, // _includes defaults to "src/_includes"
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}


module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"public": "/"});
  eleventyConfig.addCollection("opps", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/opps/*.md").sort((a,b)=>{
      const da = (a.data.deadline||"").toString();
      const db = (b.data.deadline||"").toString();
      return da.localeCompare(db);
    });
  });
  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};

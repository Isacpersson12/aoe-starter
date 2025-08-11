export default function(eleventyConfig) {
  eleventyConfig.addCollection("opps", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/opps/*.md").sort((a,b)=>{
      const da = (a.data.deadline||"").toString();
      const db = (b.data.deadline||"").toString();
      return da.localeCompare(db);
    })
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "layouts"   // <— tell 11ty that layouts live in src/layouts
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}

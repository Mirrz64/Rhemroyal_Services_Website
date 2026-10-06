module.exports = function (eleventyConfig) {
  // Static assets copied as-is into the build output (_site)
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/resources");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  // The CMS lives outside src/ so it is never mistaken for site content
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });

  // Blog posts, newest first
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByTag("post").sort(function (a, b) {
      return b.date - a.date;
    });
  });

  // Up to `limit` other posts, for the "Read next" links under an article
  eleventyConfig.addFilter("otherPosts", function (posts, currentUrl, limit) {
    return (posts || [])
      .filter(function (p) { return p.url !== currentUrl; })
      .slice(0, limit || 2);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    // Don't run Markdown through a template engine first: anything an editor
    // types in a post (curly braces etc.) stays exactly as written.
    markdownTemplateEngine: false
  };
};

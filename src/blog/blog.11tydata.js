// Applies to every post in src/blog/.
// The permalink is computed in JavaScript (not as a template string) so it works
// without a template engine running over the Markdown files.
module.exports = {
  layout: "layouts/post.njk",
  tags: "post",
  eleventyComputed: {
    permalink: (data) => "blog/" + data.page.fileSlug + ".html"
  }
};

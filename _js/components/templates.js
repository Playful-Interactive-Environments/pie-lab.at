const youtube = id => `<iframe src="https://www.youtube.com/embed/${id}?autoplay=true" frameborder="0" allowfullscreen></iframe>`;
const vimeo = id => `<iframe src="https://player.vimeo.com/video/${id}?badge=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;

module.exports = {
  youtube,
  vimeo,
};

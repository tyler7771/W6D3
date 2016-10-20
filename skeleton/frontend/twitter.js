const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./user_search");

$(function () {
  new FollowToggle($('button.follow-toggle'));
});

$(function () {
  new UsersSearch($('nav.users-search'));
});

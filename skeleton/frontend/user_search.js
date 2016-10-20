const FollowToggle = require("./follow_toggle");

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.$input = $el.find("input");
    this.$ul = $el.find("ul");
    this.handleInput();
  }

  handleInput() {
    this.$input.on("input", e => {
      e.preventDefault();
      $.ajax({
        method: "GET",
        url: "/users/search",
        dataType: "json",
        data: {query: this.$input.val()},
        success: this.render.bind(this)
      });
    });
  }

  render(userObjects) {
    this.$ul.empty();
    userObjects.forEach((user) => {
      const $newLi = $("<li>");
      $newLi.append(`<a href="/users/${user.id}">${user.username}</a>`);
      $newLi.append(" <button></button>");
      this.$ul.append($newLi);
      const button = $newLi.find("button");
      const following = user.followed ? "followed" : "unfollowed";
      new FollowToggle(button, {userId: user.id, followState: following});
    });
  }
}

module.exports = UsersSearch;

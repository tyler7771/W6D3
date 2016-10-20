class FollowToggle{
  constructor(el, options) {
    this.userId = el.attr("data-user-id") || options.userId;
    this.followState = (el.attr("data-initial-follow-state") ||
                        options.followState);
    this.$el = el;
    this.render();
    this.handleClick();
  }

  render() {
    if (this.followState === "unfollowing" ||
        this.followState === "following"){
          this.$el.prop('disabled',true);
        }
    if (this.followState === "followed") {
      this.$el.html("Unfollow!");
    } else {
      this.$el.html("Follow!");
    }
  }

  handleClick () {
    this.$el.on("click", (e) => {
      e.preventDefault();
      if (this.followState === "followed") {
        this.followState = "unfollowing";
        this.render();
      } else {
        this.followState = "following";
        this.render();
      }
      $.ajax({
        method: this.followState === "unfollowing" ? "DELETE" : "POST",
        url: `${this.userId}/follow`,
        dataType: "json",
        success: function() {
          this.followState = this.followState === "unfollowing" ?
          "unfollowed" : "followed";
          this.$el.prop('disabled',false);
          this.render();
        }.bind(this)
      });
    });
  }
}
module.exports = FollowToggle;

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
	const UsersSearch = __webpack_require__(2);
	
	$(function () {
	  new FollowToggle($('button.follow-toggle'));
	});
	
	$(function () {
	  new UsersSearch($('nav.users-search'));
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
arcade.minesweeper.face = function(minesweeper, container) {
  this.minesweeper = minesweeper;
  container.appendChild(this.get_element());
}

arcade.minesweeper.face.prototype.minesweeper;
arcade.minesweeper.face.prototype.state;
arcade.minesweeper.face.prototype.element;
arcade.minesweeper.face.prototype.mouse_left = 1;
arcade.minesweeper.face.prototype.mouse_right = 3;

arcade.minesweeper.face.prototype.get_element = function() {
  var self = this;
  if(!this.element) {
    this.element = $.createElement("div")
      .style({"width": 26, "height": 26, "margin": "auto", "background-image": "url('image/sprite.png')", "background-repeat": "no-repeat"})
      .addEventListener("mousedown", function() {
        if(self.state === "smile") self.set_state("depressed_smile");
      })
      .addEventListener("mouseup", function() {
        if(self.state === "depressed_smile") {
          self.set_state("smile");
          self.minesweeper.restart();
        }
      })
      .addEventListener("mouseout", function() {
        if(self.state === "depressed_smile") self.set_state("smile");
      })
      .addEventListener("mouseover", function(e) {
        if(e.which === self.mouse_left && self.state === "smile") self.set_state("depressed_smile");
      })
    this.set_state("smile");
  }
  return this.element[0];
}

arcade.minesweeper.face.prototype.set_state = function(state) {
  this.state = state;
  switch(state) {
    case "smile":
      this.element.style({"background-position": "0px -55px"})
    break;
    case "depressed_smile":
      this.element.style({"background-position": "-26px -55px"});
    break;
    case "scared":
      this.element.style({"background-position": "-52px -55px"});
    break;
    case "dead":
      this.element.style({"background-position": "-78px -55px"});
    break;
    case "sunglasses":
      this.element.style({"background-position": "-104px -55px"});
    break;
  }
}
arcade.minesweeper.face.prototype.get_state = function() {
  return this.state;
}
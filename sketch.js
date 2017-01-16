// Generated by CoffeeScript 1.11.1
var Button, Deltagare, buttons, colors, deltagare, draw, mousePressed, persons, rooms, setup, state;

buttons = [];

rooms = ['Scratch 1', 'Scratch 2', 'Python 1', 'Python 2', 'Matematik 1', 'Matematik 2', 'Coffeescript', 'Javascript', 'Unity', 'Cobol'];

colors = [];

deltagare = {};

persons = [];

state = 0;

Deltagare = (function() {
  function Deltagare(namn1, rum, dag) {
    this.namn = namn1;
    this.rum = rum;
    this.dag = dag;
    this.present = false;
  }

  return Deltagare;

})();

Button = (function() {
  function Button(text1, x1, y1, w, h, present, col) {
    this.text = text1;
    this.x = x1;
    this.y = y1;
    this.w = w;
    this.h = h;
    this.present = present != null ? present : false;
    this.col = col != null ? col : -1;
    this.a = 0;
    this.b = 0;
  }

  Button.prototype.draw = function() {
    var t;
    if (this.b === 0) {
      t = this.text;
    } else {
      t = this.text + (" (" + this.a + " av " + this.b + ")");
    }
    if (this.col === -1) {
      if (this.present) {
        fill(color(255));
        rect(this.x, this.y, this.w, this.h);
        fill(color(0));
        return text(t, this.x, this.y);
      } else {
        fill(color(0));
        rect(this.x, this.y, this.w, this.h);
        fill(color(255));
        return text(t, this.x, this.y);
      }
    } else {
      fill(colors[this.col][1]);
      rect(this.x, this.y, this.w, this.h);
      fill(colors[this.col][0]);
      return text(t, this.x, this.y);
    }
  };

  Button.prototype.pressed = function(x, y) {
    x = x + this.w / 2;
    y = y + this.h / 2;
    return (this.x < x && x < this.x + this.w) && (this.y < y && y < this.y + this.h);
  };

  return Button;

})();

setup = function() {
  var button, i, j, k, l, len, len1, len2, name, ref, ref1, ref2, results, room;
  createCanvas(600, 660);
  noStroke();
  rectMode(CENTER);
  textSize(14);
  textAlign(CENTER, CENTER);
  colors.push([color(255), color(0)]);
  colors.push([color(0), color(255)]);
  colors.push([color(255), color(255, 0, 0)]);
  colors.push([color(0), color(0, 255, 0)]);
  colors.push([color(255), color(0, 0, 255)]);
  colors.push([color(0), color(255, 255, 0)]);
  colors.push([color(255), color(255, 0, 255)]);
  colors.push([color(0), color(0, 255, 255)]);
  colors.push([color(0), color(192)]);
  colors.push([color(255), color(64)]);
  ref = range(31);
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    buttons.push(new Button(i + 1, 30 + 60 * (i % 3), 30 + 60 * (int(i / 3)), 50, 50));
  }
  ref1 = _.sortBy(rooms);
  for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
    room = ref1[i];
    buttons.push(new Button(room, 350, 30 + 60 * i, 300, 50, false, i));
  }
  ref2 = _.sortBy(namn.split('\n'));
  results = [];
  for (l = 0, len2 = ref2.length; l < len2; l++) {
    name = ref2[l];
    room = _.sample(rooms);
    deltagare[name] = new Deltagare(name, room, _.random(1, 31));
    results.push((function() {
      var len3, m, results1;
      results1 = [];
      for (m = 0, len3 = buttons.length; m < len3; m++) {
        button = buttons[m];
        if (button.text === room) {
          results1.push(button.b += 1);
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    })());
  }
  return results;
};

draw = function() {
  var button, j, k, len, len1, person, results, results1;
  background(128);
  if (state === 0) {
    results = [];
    for (j = 0, len = buttons.length; j < len; j++) {
      button = buttons[j];
      results.push(button.draw());
    }
    return results;
  } else {
    results1 = [];
    for (k = 0, len1 = persons.length; k < len1; k++) {
      person = persons[k];
      results1.push(person.draw());
    }
    return results1;
  }
};

mousePressed = function() {
  var button, delt, filter, i, j, k, key, len, len1, namn, person, results, results1;
  if (state === 0) {
    results = [];
    for (j = 0, len = buttons.length; j < len; j++) {
      button = buttons[j];
      if (button.pressed(mouseX, mouseY)) {
        state = 1;
        filter = button.text;
        persons = [];
        results.push((function() {
          var results1;
          results1 = [];
          for (key in deltagare) {
            delt = deltagare[key];
            if (delt.rum === filter || delt.dag === filter) {
              i = persons.length;
              results1.push(persons.push(new Button(delt.namn, 60 + 155 * (i % 4), 30 + 60 * int(i / 4), 150, 50, delt.present)));
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        })());
      } else {
        results.push(void 0);
      }
    }
    return results;
  } else {
    state = 0;
    results1 = [];
    for (k = 0, len1 = persons.length; k < len1; k++) {
      person = persons[k];
      if (person.pressed(mouseX, mouseY)) {
        namn = person.text;
        delt = deltagare[namn];
        delt.present = !delt.present;
        results1.push((function() {
          var l, len2, results2;
          results2 = [];
          for (l = 0, len2 = buttons.length; l < len2; l++) {
            button = buttons[l];
            if (delt.rum === button.text) {
              if (delt.present) {
                results2.push(button.a += 1);
              } else {
                results2.push(button.a -= 1);
              }
            } else {
              results2.push(void 0);
            }
          }
          return results2;
        })());
      } else {
        results1.push(void 0);
      }
    }
    return results1;
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2tldGNoLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBS0EsSUFBQTs7QUFBQSxPQUFBLEdBQVU7O0FBQ1YsS0FBQSxHQUFRLENBQUMsV0FBRCxFQUFhLFdBQWIsRUFBeUIsVUFBekIsRUFBb0MsVUFBcEMsRUFBK0MsYUFBL0MsRUFBNkQsYUFBN0QsRUFBMkUsY0FBM0UsRUFBMEYsWUFBMUYsRUFBdUcsT0FBdkcsRUFBK0csT0FBL0c7O0FBQ1IsTUFBQSxHQUFTOztBQUNULFNBQUEsR0FBWTs7QUFDWixPQUFBLEdBQVU7O0FBQ1YsS0FBQSxHQUFROztBQUVGO0VBQ1MsbUJBQUMsS0FBRCxFQUFPLEdBQVAsRUFBWSxHQUFaO0lBQUMsSUFBQyxDQUFBLE9BQUQ7SUFBTSxJQUFDLENBQUEsTUFBRDtJQUFLLElBQUMsQ0FBQSxNQUFEO0lBQ3pCLElBQUMsQ0FBQSxPQUFELEdBQVc7RUFERTs7Ozs7O0FBR1Q7RUFDUyxnQkFBQyxLQUFELEVBQU8sRUFBUCxFQUFVLEVBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLE9BQW5CLEVBQWtDLEdBQWxDO0lBQUMsSUFBQyxDQUFBLE9BQUQ7SUFBTSxJQUFDLENBQUEsSUFBRDtJQUFHLElBQUMsQ0FBQSxJQUFEO0lBQUcsSUFBQyxDQUFBLElBQUQ7SUFBRyxJQUFDLENBQUEsSUFBRDtJQUFHLElBQUMsQ0FBQSw0QkFBRCxVQUFTO0lBQU0sSUFBQyxDQUFBLG9CQUFELE1BQUssQ0FBQztJQUNyRCxJQUFDLENBQUEsQ0FBRCxHQUFHO0lBQ0gsSUFBQyxDQUFBLENBQUQsR0FBRztFQUZVOzttQkFJZCxJQUFBLEdBQU8sU0FBQTtBQUNOLFFBQUE7SUFBQSxJQUFHLElBQUMsQ0FBQSxDQUFELEtBQUksQ0FBUDtNQUNDLENBQUEsR0FBSSxJQUFDLENBQUEsS0FETjtLQUFBLE1BQUE7TUFHQyxDQUFBLEdBQUksSUFBQyxDQUFBLElBQUQsR0FB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RUFBQSxHQUFHLEdBQUEsQ0FBSSxDQUFBLEdBQUUsQ0FBTixDQUFwQyxFQUE2QyxHQUE3QyxFQUFpRCxFQUFqRCxFQUFxRCxJQUFJLENBQUMsT0FBMUQsQ0FBakIsR0FGRDthQUFBLE1BQUE7b0NBQUE7O0FBREQ7O2NBSkQ7T0FBQSxNQUFBOzZCQUFBOztBQUREO21CQUREO0dBQUEsTUFBQTtJQVdDLEtBQUEsR0FBUTtBQUNSO1NBQUEsMkNBQUE7O01BQ0MsSUFBRyxNQUFNLENBQUMsT0FBUCxDQUFlLE1BQWYsRUFBc0IsTUFBdEIsQ0FBSDtRQUNDLElBQUEsR0FBTyxNQUFNLENBQUM7UUFDZCxJQUFBLEdBQU8sU0FBVSxDQUFBLElBQUE7UUFDakIsSUFBSSxDQUFDLE9BQUwsR0FBZSxDQUFJLElBQUksQ0FBQzs7O0FBQ3hCO2VBQUEsMkNBQUE7O1lBQ0MsSUFBRyxJQUFJLENBQUMsR0FBTCxLQUFZLE1BQU0sQ0FBQyxJQUF0QjtjQUNDLElBQUcsSUFBSSxDQUFDLE9BQVI7OEJBQ0MsTUFBTSxDQUFDLENBQVAsSUFBWSxHQURiO2VBQUEsTUFBQTs4QkFHQyxNQUFNLENBQUMsQ0FBUCxJQUFZLEdBSGI7ZUFERDthQUFBLE1BQUE7b0NBQUE7O0FBREQ7O2NBSkQ7T0FBQSxNQUFBOzhCQUFBOztBQUREO29CQVpEOztBQURjIiwic291cmNlc0NvbnRlbnQiOlsiIyBWaXNhIGbDtmRlbHNlZGFnIDEtMzFcclxuIyBWaXNhIHRpbyBydW1cclxuIyBWaXNhIGRlbHRhZ2FyZVxyXG4jIFRvZ2dsYSBkZWx0YWdhcmVcclxuXHJcbmJ1dHRvbnMgPSBbXVxyXG5yb29tcyA9IFsnU2NyYXRjaCAxJywnU2NyYXRjaCAyJywnUHl0aG9uIDEnLCdQeXRob24gMicsJ01hdGVtYXRpayAxJywnTWF0ZW1hdGlrIDInLCdDb2ZmZWVzY3JpcHQnLCdKYXZhc2NyaXB0JywnVW5pdHknLCdDb2JvbCddXHJcbmNvbG9ycyA9IFtdXHJcbmRlbHRhZ2FyZSA9IHt9XHJcbnBlcnNvbnMgPSBbXVxyXG5zdGF0ZSA9IDBcclxuXHJcbmNsYXNzIERlbHRhZ2FyZVxyXG5cdGNvbnN0cnVjdG9yIDogKEBuYW1uLEBydW0sQGRhZykgLT5cclxuXHRcdEBwcmVzZW50ID0gZmFsc2VcclxuXHJcbmNsYXNzIEJ1dHRvblxyXG5cdGNvbnN0cnVjdG9yIDogKEB0ZXh0LEB4LEB5LEB3LEBoLEBwcmVzZW50PWZhbHNlLEBjb2w9LTEpIC0+XHJcblx0XHRAYT0wXHJcblx0XHRAYj0wXHJcblxyXG5cdGRyYXcgOiAtPlxyXG5cdFx0aWYgQGI9PTBcclxuXHRcdFx0dCA9IEB0ZXh0XHJcblx0XHRlbHNlXHJcblx0XHRcdHQgPSBAdGV4dCArIFwiICgje0BhfSBhdiAje0BifSlcIlxyXG5cdFx0aWYgQGNvbD09LTFcclxuXHRcdFx0I3N0cm9rZSAwXHJcblx0XHRcdGlmIEBwcmVzZW50XHJcblx0XHRcdFx0ZmlsbCBjb2xvcigyNTUpXHJcblx0XHRcdFx0cmVjdCBAeCxAeSxAdyxAaFxyXG5cdFx0XHRcdGZpbGwgY29sb3IoMClcclxuXHRcdFx0XHR0ZXh0IHQsQHgsQHlcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGZpbGwgY29sb3IoMClcclxuXHRcdFx0XHRyZWN0IEB4LEB5LEB3LEBoXHJcblx0XHRcdFx0ZmlsbCBjb2xvcigyNTUpXHJcblx0XHRcdFx0dGV4dCB0LEB4LEB5XHJcblx0XHRlbHNlXHJcblx0XHRcdGZpbGwgY29sb3JzW0Bjb2xdWzFdXHJcblx0XHRcdHJlY3QgQHgsQHksQHcsQGhcclxuXHRcdFx0ZmlsbCBjb2xvcnNbQGNvbF1bMF1cclxuXHRcdFx0dGV4dCB0LEB4LEB5XHJcblx0cHJlc3NlZCA6ICh4LHkpIC0+XHJcblx0XHR4ID0geCArIEB3LzJcclxuXHRcdHkgPSB5ICsgQGgvMlxyXG5cdFx0QHggPCB4IDwgQHgrQHcgYW5kIEB5IDwgeSA8IEB5K0BoXHJcblxyXG5zZXR1cCA9ICgpIC0+XHJcblx0Y3JlYXRlQ2FudmFzIDYwMCw2NjBcclxuXHRub1N0cm9rZSgpXHJcblx0cmVjdE1vZGUgQ0VOVEVSXHJcblx0dGV4dFNpemUgMTRcclxuXHR0ZXh0QWxpZ24gQ0VOVEVSLENFTlRFUlxyXG5cdGNvbG9ycy5wdXNoIFtjb2xvcigyNTUpLCBjb2xvcigwKV1cclxuXHRjb2xvcnMucHVzaCBbY29sb3IoMCksIGNvbG9yKDI1NSldXHJcblx0Y29sb3JzLnB1c2ggW2NvbG9yKDI1NSksIGNvbG9yKDI1NSwwLDApXVxyXG5cdGNvbG9ycy5wdXNoIFtjb2xvcigwKSwgY29sb3IoMCwyNTUsMCldXHJcblx0Y29sb3JzLnB1c2ggW2NvbG9yKDI1NSksIGNvbG9yKDAsMCwyNTUpXVxyXG5cdGNvbG9ycy5wdXNoIFtjb2xvcigwKSwgY29sb3IoMjU1LDI1NSwwKV1cclxuXHRjb2xvcnMucHVzaCBbY29sb3IoMjU1KSwgY29sb3IoMjU1LDAsMjU1KV1cclxuXHRjb2xvcnMucHVzaCBbY29sb3IoMCksIGNvbG9yKDAsMjU1LDI1NSldXHJcblx0Y29sb3JzLnB1c2ggW2NvbG9yKDApLCBjb2xvcigxOTIpXVxyXG5cdGNvbG9ycy5wdXNoIFtjb2xvcigyNTUpLCBjb2xvcig2NCldXHJcblx0Zm9yIGkgaW4gcmFuZ2UgMzFcclxuXHRcdGJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIGkrMSwgMzAgKyA2MCooaSUzKSwgMzAgKyA2MCooaW50KGkvMykpLCA1MCw1MFxyXG5cdGZvciByb29tLGkgaW4gXy5zb3J0Qnkocm9vbXMpXHJcblx0XHRidXR0b25zLnB1c2ggbmV3IEJ1dHRvbiByb29tLCAzNTAsIDMwICsgNjAqaSwgMzAwLDUwLGZhbHNlLGlcclxuXHRmb3IgbmFtZSBpbiBfLnNvcnRCeShuYW1uLnNwbGl0KCdcXG4nKSlcclxuXHRcdHJvb20gPSBfLnNhbXBsZShyb29tcylcclxuXHRcdGRlbHRhZ2FyZVtuYW1lXSA9IG5ldyBEZWx0YWdhcmUobmFtZSwgcm9vbSwgXy5yYW5kb20oMSwzMSkpXHJcblx0XHRmb3IgYnV0dG9uIGluIGJ1dHRvbnNcclxuXHRcdFx0aWYgYnV0dG9uLnRleHQgPT0gcm9vbVxyXG5cdFx0XHRcdGJ1dHRvbi5iICs9IDFcclxuXHJcbmRyYXcgPSAoKSAtPlxyXG5cdGJhY2tncm91bmQgMTI4XHJcblx0aWYgc3RhdGUgPT0gMFxyXG5cdFx0Zm9yIGJ1dHRvbiBpbiBidXR0b25zXHJcblx0XHRcdGJ1dHRvbi5kcmF3KClcclxuXHRlbHNlIFxyXG5cdFx0Zm9yIHBlcnNvbiBpbiBwZXJzb25zXHJcblx0XHRcdHBlcnNvbi5kcmF3KClcclxuXHJcbm1vdXNlUHJlc3NlZCA9ICgpIC0+XHJcblx0aWYgc3RhdGUgPT0gMFxyXG5cdFx0Zm9yIGJ1dHRvbiBpbiBidXR0b25zXHJcblx0XHRcdGlmIGJ1dHRvbi5wcmVzc2VkIG1vdXNlWCxtb3VzZVlcclxuXHRcdFx0XHRzdGF0ZSA9IDFcclxuXHRcdFx0XHRmaWx0ZXIgPSBidXR0b24udGV4dFxyXG5cdFx0XHRcdHBlcnNvbnMgPSBbXVxyXG5cdFx0XHRcdGZvciBrZXksZGVsdCBvZiBkZWx0YWdhcmVcclxuXHRcdFx0XHRcdGlmIGRlbHQucnVtID09IGZpbHRlciBvciBkZWx0LmRhZyA9PSBmaWx0ZXJcclxuXHRcdFx0XHRcdFx0aSA9IHBlcnNvbnMubGVuZ3RoXHJcblx0XHRcdFx0XHRcdHBlcnNvbnMucHVzaCBuZXcgQnV0dG9uIGRlbHQubmFtbiw2MCsxNTUqKGklNCksMzArNjAqaW50KGkvNCksMTUwLDUwLCBkZWx0LnByZXNlbnRcclxuXHRlbHNlXHJcblx0XHRzdGF0ZSA9IDBcclxuXHRcdGZvciBwZXJzb24gaW4gcGVyc29uc1xyXG5cdFx0XHRpZiBwZXJzb24ucHJlc3NlZCBtb3VzZVgsbW91c2VZXHJcblx0XHRcdFx0bmFtbiA9IHBlcnNvbi50ZXh0XHJcblx0XHRcdFx0ZGVsdCA9IGRlbHRhZ2FyZVtuYW1uXVxyXG5cdFx0XHRcdGRlbHQucHJlc2VudCA9IG5vdCBkZWx0LnByZXNlbnRcclxuXHRcdFx0XHRmb3IgYnV0dG9uIGluIGJ1dHRvbnNcclxuXHRcdFx0XHRcdGlmIGRlbHQucnVtID09IGJ1dHRvbi50ZXh0XHJcblx0XHRcdFx0XHRcdGlmIGRlbHQucHJlc2VudFxyXG5cdFx0XHRcdFx0XHRcdGJ1dHRvbi5hICs9IDFcclxuXHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdGJ1dHRvbi5hIC09IDFcclxuIl19
//# sourceURL=C:\Lab\2017\004-inpassering\sketch.coffee
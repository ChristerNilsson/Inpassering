// Generated by CoffeeScript 1.11.1
var Button, DayButton, Deltagare, PersonButton, RoomButton, buttons, colors, deltagare, draw, mousePressed, persons, rooms, setup, state,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

buttons = [];

rooms = ['Scratch 1', 'Scratch 2', 'Python 1', 'Python 2', 'Matematik och spelprogrammering', '3D-grafik och modellering i Maya', 'Eget projekt'];

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
  function Button() {}

  Button.prototype.pressed = function(x, y) {
    x = x + this.w / 2;
    y = y + this.h / 2;
    return (this.x < x && x < this.x + this.w) && (this.y < y && y < this.y + this.h);
  };

  return Button;

})();

PersonButton = (function(superClass) {
  extend(PersonButton, superClass);

  function PersonButton(text1, x1, y1, w, h, col1, present) {
    this.text = text1;
    this.x = x1;
    this.y = y1;
    this.w = w;
    this.h = h;
    this.col = col1;
    this.present = present;
  }

  PersonButton.prototype.draw = function() {
    if (this.present) {
      stroke(colors[this.col][0]);
      strokeWeight(3);
    } else {
      noStroke();
      strokeWeight(1);
    }
    fill(colors[this.col][1]);
    rect(this.x, this.y, this.w, this.h);
    fill(colors[this.col][0]);
    noStroke();
    textAlign(LEFT, CENTER);
    return text(this.text, 5 + this.x - this.w / 2, this.y);
  };

  return PersonButton;

})(Button);

RoomButton = (function(superClass) {
  extend(RoomButton, superClass);

  function RoomButton(text1, x1, y1, w, h, col1) {
    this.text = text1;
    this.x = x1;
    this.y = y1;
    this.w = w;
    this.h = h;
    this.col = col1;
    this.a = 0;
    this.b = 0;
  }

  RoomButton.prototype.draw = function() {
    noStroke();
    strokeWeight(1);
    fill(colors[this.col][1]);
    rect(this.x, this.y, this.w, this.h);
    fill(colors[this.col][0]);
    noStroke();
    textAlign(LEFT, CENTER);
    text(this.text, 5 + this.x - this.w / 2, this.y);
    textAlign(RIGHT, CENTER);
    return text(this.a + " av " + this.b, -5 + this.x + this.w / 2, this.y);
  };

  return RoomButton;

})(Button);

DayButton = (function(superClass) {
  extend(DayButton, superClass);

  function DayButton(text1, x1, y1, w, h) {
    this.text = text1;
    this.x = x1;
    this.y = y1;
    this.w = w;
    this.h = h;
  }

  DayButton.prototype.draw = function() {
    fill(color(255));
    rect(this.x, this.y, this.w, this.h);
    fill(color(0));
    textAlign(CENTER, CENTER);
    return text(this.text, this.x, this.y);
  };

  return DayButton;

})(Button);

setup = function() {
  var button, i, j, k, l, len, len1, len2, name, ref, ref1, results, room;
  createCanvas(630, 660);
  rooms = _.sortBy(rooms);
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
    buttons.push(new DayButton(i + 1, 30 + 60 * (i % 3), 30 + 60 * (int(i / 3)), 50, 50));
  }
  for (i = k = 0, len1 = rooms.length; k < len1; i = ++k) {
    room = rooms[i];
    buttons.push(new RoomButton(room, 350, 30 + 60 * i, 300, 50, i));
  }
  ref1 = _.sortBy(namn.split('\n'));
  results = [];
  for (l = 0, len2 = ref1.length; l < len2; l++) {
    name = ref1[l];
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
  var button, col, delt, filter, i, j, k, key, len, len1, namn, person, results, results1;
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
              col = rooms.indexOf(delt.rum);
              button = new PersonButton(delt.namn, 80 + 155 * (i % 4), 30 + 60 * int(i / 4), 150, 50, col, delt.present);
              results1.push(persons.push(button));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2tldGNoLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBS0EsSUFBQSxvSUFBQTtFQUFBOzs7QUFBQSxPQUFBLEdBQVU7O0FBQ1YsS0FBQSxHQUFRLENBQUMsV0FBRCxFQUFhLFdBQWIsRUFBeUIsVUFBekIsRUFBb0MsVUFBcEMsRUFBK0MsaUNBQS9DLEVBQWlGLGtDQUFqRixFQUFvSCxjQUFwSDs7QUFDUixNQUFBLEdBQVM7O0FBQ1QsU0FBQSxHQUFZOztBQUNaLE9BQUEsR0FBVTs7QUFDVixLQUFBLEdBQVE7O0FBRUY7RUFDUyxtQkFBQyxLQUFELEVBQU8sR0FBUCxFQUFZLEdBQVo7SUFBQyxJQUFDLENBQUEsT0FBRDtJQUFNLElBQUMsQ0FBQSxNQUFEO0lBQUssSUFBQyxDQUFBLE1BQUQ7SUFDekIsSUFBQyxDQUFBLE9BQUQsR0FBVztFQURFOzs7Ozs7QUFHVDs7O21CQUNMLE9BQUEsR0FBVSxTQUFDLENBQUQsRUFBRyxDQUFIO0lBQ1QsQ0FBQSxHQUFJLENBQUEsR0FBSSxJQUFDLENBQUEsQ0FBRCxHQUFHO0lBQ1gsQ0FBQSxHQUFJLENBQUEsR0FBSSxJQUFDLENBQUEsQ0FBRCxHQUFHO1dBQ1gsQ0FBQSxJQUFDLENBQUEsQ0FBRCxHQUFLLENBQUwsSUFBSyxDQUFMLEdBQVMsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBYixDQUFBLElBQW1CLENBQUEsSUFBQyxDQUFBLENBQUQsR0FBSyxDQUFMLElBQUssQ0FBTCxHQUFTLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQWI7RUFIVjs7Ozs7O0FBS0w7OztFQUNTLHNCQUFDLEtBQUQsRUFBTyxFQUFQLEVBQVUsRUFBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsSUFBbkIsRUFBd0IsT0FBeEI7SUFBQyxJQUFDLENBQUEsT0FBRDtJQUFNLElBQUMsQ0FBQSxJQUFEO0lBQUcsSUFBQyxDQUFB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LEVBQW1ELEdBQW5ELEVBQXVELEVBQXZELEVBQTJELEdBQTNELEVBQWdFLElBQUksQ0FBQyxPQUFyRTs0QkFDYixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsR0FKRDthQUFBLE1BQUE7b0NBQUE7O0FBREQ7O2NBSkQ7T0FBQSxNQUFBOzZCQUFBOztBQUREO21CQUREO0dBQUEsTUFBQTtJQWFDLEtBQUEsR0FBUTtBQUNSO1NBQUEsMkNBQUE7O01BQ0MsSUFBRyxNQUFNLENBQUMsT0FBUCxDQUFlLE1BQWYsRUFBc0IsTUFBdEIsQ0FBSDtRQUNDLElBQUEsR0FBTyxNQUFNLENBQUM7UUFDZCxJQUFBLEdBQU8sU0FBVSxDQUFBLElBQUE7UUFDakIsSUFBSSxDQUFDLE9BQUwsR0FBZSxDQUFJLElBQUksQ0FBQzs7O0FBQ3hCO2VBQUEsMkNBQUE7O1lBQ0MsSUFBRyxJQUFJLENBQUMsR0FBTCxLQUFZLE1BQU0sQ0FBQyxJQUF0QjtjQUNDLElBQUcsSUFBSSxDQUFDLE9BQVI7OEJBQ0MsTUFBTSxDQUFDLENBQVAsSUFBWSxHQURiO2VBQUEsTUFBQTs4QkFHQyxNQUFNLENBQUMsQ0FBUCxJQUFZLEdBSGI7ZUFERDthQUFBLE1BQUE7b0NBQUE7O0FBREQ7O2NBSkQ7T0FBQSxNQUFBOzhCQUFBOztBQUREO29CQWREOztBQURjIiwic291cmNlc0NvbnRlbnQiOlsiIyBWaXNhIGbDtmRlbHNlZGFnIDEtMzFcclxuIyBWaXNhIHRpbyBydW1cclxuIyBWaXNhIGRlbHRhZ2FyZVxyXG4jIFRvZ2dsYSBkZWx0YWdhcmVcclxuXHJcbmJ1dHRvbnMgPSBbXVxyXG5yb29tcyA9IFsnU2NyYXRjaCAxJywnU2NyYXRjaCAyJywnUHl0aG9uIDEnLCdQeXRob24gMicsJ01hdGVtYXRpayBvY2ggc3BlbHByb2dyYW1tZXJpbmcnLCczRC1ncmFmaWsgb2NoIG1vZGVsbGVyaW5nIGkgTWF5YScsJ0VnZXQgcHJvamVrdCddXHJcbmNvbG9ycyA9IFtdXHJcbmRlbHRhZ2FyZSA9IHt9XHJcbnBlcnNvbnMgPSBbXVxyXG5zdGF0ZSA9IDBcclxuXHJcbmNsYXNzIERlbHRhZ2FyZVxyXG5cdGNvbnN0cnVjdG9yIDogKEBuYW1uLEBydW0sQGRhZykgLT5cclxuXHRcdEBwcmVzZW50ID0gZmFsc2VcclxuXHJcbmNsYXNzIEJ1dHRvblxyXG5cdHByZXNzZWQgOiAoeCx5KSAtPlxyXG5cdFx0eCA9IHggKyBAdy8yXHJcblx0XHR5ID0geSArIEBoLzJcclxuXHRcdEB4IDwgeCA8IEB4K0B3IGFuZCBAeSA8IHkgPCBAeStAaFxyXG5cclxuY2xhc3MgUGVyc29uQnV0dG9uIGV4dGVuZHMgQnV0dG9uXHJcblx0Y29uc3RydWN0b3IgOiAoQHRleHQsQHgsQHksQHcsQGgsQGNvbCxAcHJlc2VudCkgLT5cclxuXHRkcmF3IDogLT5cclxuXHRcdGlmIEBwcmVzZW50XHJcblx0XHRcdHN0cm9rZSBjb2xvcnNbQGNvbF1bMF0gXHJcblx0XHRcdHN0cm9rZVdlaWdodCAzXHJcblx0XHRlbHNlXHJcblx0XHRcdG5vU3Ryb2tlKClcclxuXHRcdFx0c3Ryb2tlV2VpZ2h0IDFcclxuXHRcdGZpbGwgY29sb3JzW0Bjb2xdWzFdXHJcblx0XHRyZWN0IEB4LEB5LEB3LEBoXHJcblxyXG5cdFx0ZmlsbCBjb2xvcnNbQGNvbF1bMF1cclxuXHRcdG5vU3Ryb2tlKClcclxuXHRcdHRleHRBbGlnbiBMRUZULENFTlRFUlxyXG5cdFx0dGV4dCBAdGV4dCw1K0B4LUB3LzIsQHlcclxuXHJcbmNsYXNzIFJvb21CdXR0b24gZXh0ZW5kcyBCdXR0b25cclxuXHRjb25zdHJ1Y3RvciA6IChAdGV4dCxAeCxAeSxAdyxAaCxAY29sKSAtPlxyXG5cdFx0QGE9MFxyXG5cdFx0QGI9MFxyXG5cclxuXHRkcmF3IDogLT5cclxuXHRcdG5vU3Ryb2tlKClcclxuXHRcdHN0cm9rZVdlaWdodCAxXHJcblx0XHRmaWxsIGNvbG9yc1tAY29sXVsxXVxyXG5cdFx0cmVjdCBAeCxAeSxAdyxAaFxyXG5cclxuXHRcdGZpbGwgY29sb3JzW0Bjb2xdWzBdXHJcblx0XHRub1N0cm9rZSgpXHJcblx0XHR0ZXh0QWxpZ24gTEVGVCxDRU5URVJcclxuXHRcdHRleHQgQHRleHQsNStAeC1Ady8yLEB5XHJcblx0XHR0ZXh0QWxpZ24gUklHSFQsQ0VOVEVSXHJcblx0XHR0ZXh0IFwiI3tAYX0gYXYgI3tAYn1cIiwtNStAeCtAdy8yLEB5XHJcblxyXG5jbGFzcyBEYXlCdXR0b24gZXh0ZW5kcyBCdXR0b25cclxuXHRjb25zdHJ1Y3RvciA6IChAdGV4dCxAeCxAeSxAdyxAaCkgLT5cclxuXHJcblx0ZHJhdyA6IC0+XHJcblx0XHRmaWxsIGNvbG9yKDI1NSlcclxuXHRcdHJlY3QgQHgsQHksQHcsQGhcclxuXHRcdGZpbGwgY29sb3IoMClcclxuXHRcdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblx0XHR0ZXh0IEB0ZXh0LEB4LEB5XHJcblxyXG5zZXR1cCA9ICgpIC0+XHJcblx0Y3JlYXRlQ2FudmFzIDYzMCw2NjBcclxuXHRyb29tcyA9IF8uc29ydEJ5IHJvb21zXHJcblx0bm9TdHJva2UoKVxyXG5cdHJlY3RNb2RlIENFTlRFUlxyXG5cdHRleHRTaXplIDE0XHJcblx0dGV4dEFsaWduIENFTlRFUixDRU5URVJcclxuXHRjb2xvcnMucHVzaCBbY29sb3IoMjU1KSwgY29sb3IoMCldXHJcblx0Y29sb3JzLnB1c2ggW2NvbG9yKDApLCBjb2xvcigyNTUpXVxyXG5cdGNvbG9ycy5wdXNoIFtjb2xvcigyNTUpLCBjb2xvcigyNTUsMCwwKV1cclxuXHRjb2xvcnMucHVzaCBbY29sb3IoMCksIGNvbG9yKDAsMjU1LDApXVxyXG5cdGNvbG9ycy5wdXNoIFtjb2xvcigyNTUpLCBjb2xvcigwLDAsMjU1KV1cclxuXHRjb2xvcnMucHVzaCBbY29sb3IoMCksIGNvbG9yKDI1NSwyNTUsMCldXHJcblx0Y29sb3JzLnB1c2ggW2NvbG9yKDI1NSksIGNvbG9yKDI1NSwwLDI1NSldXHJcblx0Y29sb3JzLnB1c2ggW2NvbG9yKDApLCBjb2xvcigwLDI1NSwyNTUpXVxyXG5cdGNvbG9ycy5wdXNoIFtjb2xvcigwKSwgY29sb3IoMTkyKV1cclxuXHRjb2xvcnMucHVzaCBbY29sb3IoMjU1KSwgY29sb3IoNjQpXVxyXG5cdGZvciBpIGluIHJhbmdlIDMxXHJcblx0XHRidXR0b25zLnB1c2ggbmV3IERheUJ1dHRvbiBpKzEsIDMwICsgNjAqKGklMyksIDMwICsgNjAqKGludChpLzMpKSwgNTAsNTBcclxuXHRmb3Igcm9vbSxpIGluIHJvb21zXHJcblx0XHRidXR0b25zLnB1c2ggbmV3IFJvb21CdXR0b24gcm9vbSwgMzUwLCAzMCArIDYwKmksIDMwMCw1MCxpXHJcblx0Zm9yIG5hbWUgaW4gXy5zb3J0QnkobmFtbi5zcGxpdCgnXFxuJykpXHJcblx0XHRyb29tID0gXy5zYW1wbGUocm9vbXMpXHJcblx0XHRkZWx0YWdhcmVbbmFtZV0gPSBuZXcgRGVsdGFnYXJlKG5hbWUsIHJvb20sIF8ucmFuZG9tKDEsMzEpKVxyXG5cdFx0Zm9yIGJ1dHRvbiBpbiBidXR0b25zXHJcblx0XHRcdGlmIGJ1dHRvbi50ZXh0ID09IHJvb21cclxuXHRcdFx0XHRidXR0b24uYiArPSAxXHJcblxyXG5kcmF3ID0gKCkgLT5cclxuXHRiYWNrZ3JvdW5kIDEyOFxyXG5cdGlmIHN0YXRlID09IDBcclxuXHRcdGZvciBidXR0b24gaW4gYnV0dG9uc1xyXG5cdFx0XHRidXR0b24uZHJhdygpXHJcblx0ZWxzZSBcclxuXHRcdGZvciBwZXJzb24gaW4gcGVyc29uc1xyXG5cdFx0XHRwZXJzb24uZHJhdygpXHJcblxyXG5tb3VzZVByZXNzZWQgPSAoKSAtPlxyXG5cdGlmIHN0YXRlID09IDBcclxuXHRcdGZvciBidXR0b24gaW4gYnV0dG9uc1xyXG5cdFx0XHRpZiBidXR0b24ucHJlc3NlZCBtb3VzZVgsbW91c2VZXHJcblx0XHRcdFx0c3RhdGUgPSAxXHJcblx0XHRcdFx0ZmlsdGVyID0gYnV0dG9uLnRleHRcclxuXHRcdFx0XHRwZXJzb25zID0gW11cclxuXHRcdFx0XHRmb3Iga2V5LGRlbHQgb2YgZGVsdGFnYXJlXHJcblx0XHRcdFx0XHRpZiBkZWx0LnJ1bSA9PSBmaWx0ZXIgb3IgZGVsdC5kYWcgPT0gZmlsdGVyXHJcblx0XHRcdFx0XHRcdGkgPSBwZXJzb25zLmxlbmd0aFxyXG5cdFx0XHRcdFx0XHRjb2wgPSByb29tcy5pbmRleE9mIGRlbHQucnVtXHJcblx0XHRcdFx0XHRcdGJ1dHRvbiA9IG5ldyBQZXJzb25CdXR0b24gZGVsdC5uYW1uLDgwKzE1NSooaSU0KSwzMCs2MCppbnQoaS80KSwxNTAsNTAsIGNvbCwgZGVsdC5wcmVzZW50XHJcblx0XHRcdFx0XHRcdHBlcnNvbnMucHVzaCBidXR0b25cclxuXHRlbHNlXHJcblx0XHRzdGF0ZSA9IDBcclxuXHRcdGZvciBwZXJzb24gaW4gcGVyc29uc1xyXG5cdFx0XHRpZiBwZXJzb24ucHJlc3NlZCBtb3VzZVgsbW91c2VZXHJcblx0XHRcdFx0bmFtbiA9IHBlcnNvbi50ZXh0XHJcblx0XHRcdFx0ZGVsdCA9IGRlbHRhZ2FyZVtuYW1uXVxyXG5cdFx0XHRcdGRlbHQucHJlc2VudCA9IG5vdCBkZWx0LnByZXNlbnRcclxuXHRcdFx0XHRmb3IgYnV0dG9uIGluIGJ1dHRvbnNcclxuXHRcdFx0XHRcdGlmIGRlbHQucnVtID09IGJ1dHRvbi50ZXh0XHJcblx0XHRcdFx0XHRcdGlmIGRlbHQucHJlc2VudFxyXG5cdFx0XHRcdFx0XHRcdGJ1dHRvbi5hICs9IDFcclxuXHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdGJ1dHRvbi5hIC09IDEiXX0=
//# sourceURL=C:\github\Inpassering\sketch.coffee
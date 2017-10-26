# Visa födelsedag 1-31
# Visa tio rum
# Visa deltagare
# Toggla deltagare

buttons = []
rooms = ['Scratch 1','Scratch 2','Python 1','Python 2','Matematik och spelprogrammering','3D-grafik och modellering i Maya','Eget projekt']
colors = []
deltagare = {}
persons = []
state = 0

class Deltagare
	constructor : (@namn,@rum,@dag) ->
		@present = false

class Button
	pressed : (x,y) ->
		x = x + @w/2
		y = y + @h/2
		@x < x < @x+@w and @y < y < @y+@h

class PersonButton extends Button
	constructor : (@text,@x,@y,@w,@h,@col,@present) ->
	draw : ->
		if @present
			stroke colors[@col][0] 
			strokeWeight 3
		else
			noStroke()
			strokeWeight 1
		fill colors[@col][1]
		rect @x,@y,@w,@h

		fill colors[@col][0]
		noStroke()
		textAlign LEFT,CENTER
		text @text,5+@x-@w/2,@y

class RoomButton extends Button
	constructor : (@text,@x,@y,@w,@h,@col) ->
		@a=0
		@b=0

	draw : ->
		noStroke()
		strokeWeight 1
		fill colors[@col][1]
		rect @x,@y,@w,@h

		fill colors[@col][0]
		noStroke()
		textAlign LEFT,CENTER
		text @text,5+@x-@w/2,@y
		textAlign RIGHT,CENTER
		text "#{@a} av #{@b}",-5+@x+@w/2,@y

class DayButton extends Button
	constructor : (@text,@x,@y,@w,@h) ->

	draw : ->
		fill color(255)
		rect @x,@y,@w,@h
		fill color(0)
		textAlign CENTER,CENTER
		text @text,@x,@y

setup = () ->
	createCanvas 630,660
	rooms = _.sortBy rooms
	noStroke()
	rectMode CENTER
	textSize 14
	textAlign CENTER,CENTER
	colors.push [color(255), color(0)]
	colors.push [color(0), color(255)]
	colors.push [color(255), color(255,0,0)]
	colors.push [color(0), color(0,255,0)]
	colors.push [color(255), color(0,0,255)]
	colors.push [color(0), color(255,255,0)]
	colors.push [color(255), color(255,0,255)]
	colors.push [color(0), color(0,255,255)]
	colors.push [color(0), color(192)]
	colors.push [color(255), color(64)]
	for i in range 31
		buttons.push new DayButton i+1, 30 + 60*(i%3), 30 + 60*(int(i/3)), 50,50
	for room,i in rooms
		buttons.push new RoomButton room, 350, 30 + 60*i, 300,50,i
	for name in _.sortBy(namn.split('\n'))
		room = _.sample(rooms)
		deltagare[name] = new Deltagare(name, room, _.random(1,31))
		for button in buttons
			if button.text == room
				button.b += 1

draw = () ->
	background 128
	if state == 0
		for button in buttons
			button.draw()
	else 
		for person in persons
			person.draw()

mousePressed = () ->
	if state == 0
		for button in buttons
			if button.pressed mouseX,mouseY
				state = 1
				filter = button.text
				persons = []
				for key,delt of deltagare
					if delt.rum == filter or delt.dag == filter
						i = persons.length
						col = rooms.indexOf delt.rum
						button = new PersonButton delt.namn,80+155*(i%4),30+60*int(i/4),150,50, col, delt.present
						persons.push button
	else
		state = 0
		for person in persons
			if person.pressed mouseX,mouseY
				namn = person.text
				delt = deltagare[namn]
				delt.present = not delt.present
				for button in buttons
					if delt.rum == button.text
						if delt.present
							button.a += 1
						else
							button.a -= 1
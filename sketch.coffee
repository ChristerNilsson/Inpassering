# Visa födelsedag 1-31
# Visa tio rum
# Visa deltagare
# Toggla deltagare

buttons = []
rooms = ['Scratch 1','Scratch 2','Python 1','Python 2','Matematik 1','Matematik 2','Coffeescript','Javascript','Unity','Cobol']
colors = []
deltagare = {}
persons = []
state = 0

class Deltagare
	constructor : (@namn,@rum,@dag) ->
		@present = false

class Button
	constructor : (@text,@x,@y,@w,@h,@present=false,@col=-1) ->
		@a=0
		@b=0

	draw : ->
		if @b==0
			t = @text
		else
			t = @text + " (#{@a} av #{@b})"
		if @col==-1
			#stroke 0
			if @present
				fill color(255)
				rect @x,@y,@w,@h
				fill color(0)
				text t,@x,@y
			else
				fill color(0)
				rect @x,@y,@w,@h
				fill color(255)
				text t,@x,@y
		else
			fill colors[@col][1]
			rect @x,@y,@w,@h
			fill colors[@col][0]
			text t,@x,@y
	pressed : (x,y) ->
		x = x + @w/2
		y = y + @h/2
		@x < x < @x+@w and @y < y < @y+@h

setup = () ->
	createCanvas 600,660
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
		buttons.push new Button i+1, 30 + 60*(i%3), 30 + 60*(int(i/3)), 50,50
	for room,i in _.sortBy(rooms)
		buttons.push new Button room, 350, 30 + 60*i, 300,50,false,i
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
						persons.push new Button delt.namn,60+155*(i%4),30+60*int(i/4),150,50, delt.present
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

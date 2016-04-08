function Clock () {
    var time = new Date();
    this.hours = time.getHours();
    this.minutes = time.getMinutes();
    this.seconds = time.getSeconds();
    setInterval(this._tick.bind(this),1000);
}

Clock.prototype.printTime = function () {
  console.log(this.hours +":"+ this.minutes +":"+ this.seconds);
};

Clock.prototype._tick = function () {
    this.seconds += 1;
    this.minutes += Math.floor(this.seconds/60);
    this.hours += Math.floor(this.minutes/60);
    this.minutes = this.minutes%60;
    this.seconds = this.seconds%60;

    this.printTime();
};

var clock = new Clock();

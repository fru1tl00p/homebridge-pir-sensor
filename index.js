var Service, Characteristic;

var state = false;
var gpio = require('rpi-gpio');

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-pir-sensor", "PIRSensor", PIRSensor);
};

function PIRSensor(log, config) {
    //config
    this.name = config["name"];
    this.pin = config["gpio"];
    if (this.name == undefined || this.pin == undefined) {
        throw "Specify name and pin in config file.";
    }

    //setup
    this.log = log;
    this.service = new Service.MotionSensor(this.name);
    this.service
        .getCharacteristic(Characteristic.MotionDetected)
        .on('get', this.getState.bind(this));

    gpio.setMode(gpio.MODE_BCM);
    gpio.setup(this.pin, gpio.DIR_IN, function (err) {
        if (err) throw err;
        setInterval(function() {
            gpio.read(this.pin, function (err, value) {
                if (err) throw err;
                if (value !== state) {
                    log('State set to ' + value);
                    this.service.setCharacteristic(Characteristic.MotionDetected, value);
                    state = value;
                }
            }.bind(this));
        }.bind(this), config["poll_interval"] || 100);
    }.bind(this));
}

PIRSensor.prototype.getState = function (callback) {
    callback(null, state);
};

PIRSensor.prototype.getServices = function () {
    return [this.service];
};

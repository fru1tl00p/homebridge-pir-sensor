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
    gpio.on('change', function (channel, value) {
        if (channel == this.pin) {
            this.service.setCharacteristic(Characteristic.MotionDetected, value);
        }
    }.bind(this));
    gpio.setup(this.pin, gpio.DIR_IN, gpio.EDGE_BOTH, function () {
        gpio.read(this.pin, function (err, value) {
            if (err) throw err;
            state = value;
            this.log('State set to ' + value);
        });
    }.bind(this));
}

PIRSensor.prototype.getState = function (callback) {
    callback(null, state);
};

PIRSensor.prototype.getServices = function () {
    return [this.service];
};

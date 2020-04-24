# homebridge-rpi-pir

This is a test fork of D4rk's homebridge plugin to make a Raspberry Pi connect with a PIR Sensor into a Motion Sensor.

I've removed rpi-gpio as a dependency, you need to install it manually yourself first, for example:

```sudo -E -n npm install -g rpi-gpio --unsafe-perm```

Then install this repo after, for example:

```sudo -E -n npm install -g git://github.com/fru1tl00p/homebridge-rpi-pir.git```

This is because of a node gyp compile error with epoll which is installed by rpi-gpio.

Just add the following sample config to your homebridge config file located at this path `~/.homebridge/config.json`.

Or if using latest Homebridge with global (-g), `/etc/lib/homebridge/config.json`.

This is a typical example with [homebridge-camera-rpi](https://www.npmjs.com/package/homebridge-camera-rpi):

```json
{
  "bridge": {
    "name": "Homebridge",
    "username": "DE:AD:BE:EF:00:00",
    "port": 51826,
    "pin": "123-45-678"
  },
  "accessories": [
    {
      "accessory": "PIRSensor",
      "name": "Motion Sensor",
      "gpio": 15
    }
  ],
  "platforms": [
    {
      "platform": "rpi-camera",
      "cameras": [
        {
          "name": "Pi Camera"
        }
      ]
    }
  ]
}
```

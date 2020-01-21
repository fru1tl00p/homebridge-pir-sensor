# homebridge-pir-sensor

This is a homebridge plugin to make a Raspberry Pi connected with a PIR Sensor into a Motion Sensor.

Just add the following sample config to your homebridge config file located at this path `~/.homebridge/config.json`.

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

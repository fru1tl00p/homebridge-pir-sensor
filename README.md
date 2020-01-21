# homebridge-pir-sensor

Typical usage along with [homebridge-camera-rpi](https://www.npmjs.com/package/homebridge-camera-rpi):

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
      "gpio": 15,
      "poll_interval": 100
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

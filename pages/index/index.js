//index.js
//获取应用实例
const app = getApp()
const location = {
    longitude: 105.5788922300,
    latitude: 32.2180294900
}
//32.2180294900,105.5788922300
Page({
    data: {
        speed: 400,
        sSpeed: 1,
        play: false,
        markers: [{
            iconPath: "/img/start.png",
            id: 1,
            latitude: location.latitude,
            longitude: location.longitude,
            width: 30,
            height: 30,
        }, {
            iconPath: "/img/stop.png",
            id: 2,
            longitude: location.longitude + 0.01,
            latitude: location.latitude + 0.01,
            width: 30,
            height: 30
        }, {
            iconPath: "/img/car.png",
            id: 3,
            latitude: location.latitude,
            longitude: location.longitude,
            width: 30,
            height: 30,
            zIndex: 2,
            callout: {
                content: '川A88888',
                display: 'ALWAYS',
                color: '#fff',
                fontsize: 24,
                bgColor: '#1296db',
                borderRadius: 4,
                padding: 4
            }
        }],
        polyline: [{
            points: [{
                longitude: location.longitude,
                latitude: location.latitude
            }, {
                longitude: location.longitude + 0.001,
                latitude: location.latitude + 0.002
            }, {
                longitude: location.longitude + 0.002,
                latitude: location.latitude + 0.004
            }, {
                longitude: location.longitude + 0.003,
                latitude: location.latitude + 0.005
            }, {
                longitude: location.longitude + 0.004,
                latitude: location.latitude + 0.005
            }, {
                longitude: location.longitude + 0.005,
                latitude: location.latitude + 0.006
            }, {
                longitude: location.longitude + 0.006,
                latitude: location.latitude + 0.007
            }, {
                longitude: location.longitude + 0.007,
                latitude: location.latitude + 0.008
            }, {
                longitude: location.longitude + 0.009,
                latitude: location.latitude + 0.009
            }, {
                longitude: location.longitude + 0.01,
                latitude: location.latitude + 0.01
            }],
            color: "#1296db",
            width: 4,
            // dottedLine: true
        }],
        // controls: [{
        //   id: 1,
        //   iconPath: '/img/location.png',
        //   position: {
        //     left: 0,
        //     top: 300 - 50,
        //     width: 50,
        //     height: 50
        //   },
        //   clickable: true
        // }]
    },
    regionchange(e) {
        console.log(e.type)
    },
    markertap(e) {
        console.log(e.markerId)
    },
    controltap(e) {
        console.log(e.controlId)
    },
    onLoad(e) {
        let that = this;
        if (that.data.timeIndex) {
            clearInterval(that.data.timeIndex)
        }
        this.mapCtx = wx.createMapContext('myMap')
    },
    addSpeed() {
        if (this.data.speed > 100) {
            this.setData({
                speed: this.data.speed - 100,
                sSpeed: this.data.sSpeed + 1
            })
        }
    },

    delSpeed() {
        if (this.data.sSpeed > 1) {
            this.setData({
                speed: this.data.speed + 100,
                sSpeed: this.data.sSpeed - 1
            })
        }
    },

    play() {
        if (!this.data.play) {
            this.data.play = true;
            this.moveMaker(0, 1, true)
        }
    },

    stop() {
        if (this.data.play) {
            console.log("暂停")
            this.data.play = false;
        }
    },


    /**
     * 移动maker
     * @param start 起点
     * @param end 终点
     * @param next 是否有下一帧
     */
    moveMaker(start, end, next) {
        let that = this
        let points = that.data.polyline[0].points;
        if (end < that.data.polyline[0].points.length) {
            that.mapCtx.translateMarker({
                markerId: 3,
                destination: {
                    longitude: points[start].longitude,
                    latitude: points[start].latitude,
                },
                duration: 0
            })
            that.mapCtx.translateMarker({
                markerId: 3,
                destination: {
                    longitude: points[end].longitude,
                    latitude: points[end].latitude,
                },
                duration: that.data.speed,
                success() {
                    let percent = end / (points.length - 1) * 100;
                    that.setData({
                        percent: percent
                    })
                    console.log(that.data.play + "---" + next)
                    if (that.data.play && next) {
                        that.moveMaker(++start, ++end, true)
                    }
                }
            })
        } else {
            this.data.play = false
        }
    },


    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        clearInterval(this.data.timeIndex);
    },

})

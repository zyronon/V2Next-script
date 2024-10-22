export default {
    eventMap: new Map(),
    on(eventType, cb) {
        let cbs = this.eventMap.get(eventType);
        if (cbs) {
            cbs.push(cb);
        } else {
            cbs = [cb];
        }
        this.eventMap.set(eventType, cbs);
    },
    offOne(eventType, cb) {
        let cbs = this.eventMap.get(eventType);
        if (cbs) {
            let rIndex = cbs.findIndex(c => c === cb)
            if (rIndex > -1) {
                cbs.splice(rIndex, 1)
            }
        }
        this.eventMap.set(eventType, cbs);
    },
    emit(eventType, val) {
        let cbs = this.eventMap.get(eventType);
        // console.log('emit===>', '事件类型===>', eventType, '所有回调====>', cbs, '     值===>', val)
        if (cbs) {
            cbs.map((cb) => cb(val));
        }
    },
    off(eventType) {
        let cbs = this.eventMap.has(eventType);
        if (cbs) {
            this.eventMap.delete(eventType);
        }
    },
    clear() {
        this.eventMap = new Map()
    }
};
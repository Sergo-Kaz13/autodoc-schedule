const store = {
  db: null,
  schedule: null,
  _listeners: [],

  onReady(callback) {
    if (this.schedule) {
      callback(this.schedule);
    } else {
      this._listeners.push(callback);
    }
  },

  setSchedule(schedule) {
    this.schedule = schedule;
    this._listeners.forEach((cb) => cb(schedule));
    this._listeners = [];
  },
};

export default store;

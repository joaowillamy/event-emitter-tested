function create() {
  return {
    events: {},
    on: function (event, callback) {
      const self = this
      if(!callback) throw new Error()

      if (!this.events[event]) this.events[event] = []

      if(this.events[event].includes(callback)) return

      this.events[event].push(callback)

      return function() {
        self.off(event, callback)
      }
    },
    off: function (event, callback) {
      if (!this.events[event]) return

      this.events[event] = this.events[event].filter(function(localCallback) {
        return localCallback !== callback
      })
    },
    emit: function (event, data) {
      this.events[event].forEach(function(localEvent) {
        localEvent({ ...data, type: event })
      })
    }
  }
}

module.exports = { create }

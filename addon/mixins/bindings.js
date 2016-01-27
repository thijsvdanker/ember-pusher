import Ember from 'ember';
import { keys } from 'ember-pusher/compat';

export default Ember.Mixin.create({
  init() {
    if (this.PUSHER_SUBSCRIPTIONS) {
      keys(this.PUSHER_SUBSCRIPTIONS).forEach(channelName => {
        let events = this.PUSHER_SUBSCRIPTIONS[channelName];
        this.get('pusher').wire(this, channelName, events);
      });
    }

    return this._super(...arguments);
  },

  willDestroy() {
    if (this.PUSHER_SUBSCRIPTIONS) {
      keys(this.PUSHER_SUBSCRIPTIONS).forEach(channelName => {
        this.get('pusher').unwire(this, channelName);
      });
    }

    return this._super(...arguments);
  },

  _pusherEventsId() {
    return this.toString();
  }
});

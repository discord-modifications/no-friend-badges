const { inject, uninject } = require('powercord/injector');
const { React, getModule } = require('powercord/webpack');
const { Plugin } = require('powercord/entities');

const Settings = require('./components/Settings');

const Classes = getModule(['badge', 'inviteToolbar'], false);
const Relationships = getModule(['getRelationships'], false);
const { NumberBadge } = getModule(['NumberBadge'], false);
const { Item } = getModule(['Item'], false);

module.exports = class NoFriendBadges extends Plugin {
   startPlugin() {
      powercord.api.settings.registerSettings(this.entityID, {
         category: this.entityID,
         label: 'No Friend Badges',
         render: Settings
      });

      inject('no-fr-badges', Relationships, 'getPendingCount', (args, res) => {
         return 0;
      });

      inject('no-fr-badges-pending', Item.prototype, 'render', (args, res) => {
         if (this.settings.get('showPending', true) && res.props['aria-controls'] == 'PENDING-tab') {
            if (!Array.isArray(res.props.children)) res.props.children = [res.props.children];
            const count = (Relationships.__powercordOriginal_getPendingCount ?? Relationships.getPendingCount)();
            if (count > 0) {
               res.props.children[1] = React.createElement(NumberBadge, {
                  count,
                  className: Classes.badge,
                  style: {
                     paddingRight: 0
                  }
               });
            }
         }

         return res;
      });
   }

   pluginWillUnload() {
      powercord.api.settings.unregisterSettings(this.entityID);
      uninject('no-fr-badges');
      uninject('no-fr-badges-pending');
   }
};
const { React } = require('powercord/webpack');
const { SwitchItem } = require('powercord/components/settings');

module.exports = class Settings extends React.Component {
   constructor() {
      super();
   }

   render() {
      return (
         <SwitchItem
            note='Show the friend requests badge in the pending friends tab'
            value={this.props.getSetting('showPending', true)}
            onChange={() => this.props.toggleSetting('showPending', true)}
         >
            Show in pending tab
         </SwitchItem>
      );
   }
};
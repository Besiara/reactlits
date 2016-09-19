import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Layout from '../imports/ui/Layout.jsx';

Meteor.startup(() => {
  render(<Layout />, document.getElementById('render-target'));
});
'use strict';
import React from 'react';
import icon from './icon.png';
import Preview from './preview';

const stackoverflowPlugin = ({ term, display }) => {
  display({
    id: 'stackoverflow',
    icon,
    order: 11,
    title: `Search for ${term}`,
    getPreview: () => <Preview term={term} />
  });
};

export { stackoverflowPlugin as fn };

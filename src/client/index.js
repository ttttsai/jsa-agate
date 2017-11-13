'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/component/App';
import enUS from 'antd/lib/locale-provider/en_US';
import LocaleProvider from 'antd/lib/locale-provider';

ReactDOM.render(
  <LocaleProvider locale={enUS}><App /></LocaleProvider>,
  document.getElementById('root'));

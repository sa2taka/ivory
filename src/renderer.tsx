import React from 'react';
import ReactDOM from 'react-dom';
import '@/style/tailwind.css';
import LayoutHeader from '@/components/organisms/layoutHeader';

const app = document.getElementById('app');

ReactDOM.render(<LayoutHeader></LayoutHeader>, app);

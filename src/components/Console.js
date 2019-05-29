import { h } from 'preact';

export function Console(props) {
  const entities = props.entities || [];
  return h('div', {
      style: {
        position: 'fixed',
        top: '1em',
        right: '1em',
        opacity: '0.5'
      }
    },
    ...entities.map((logEntity) => h('div', null, logEntity.text())));
};

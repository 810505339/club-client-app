import {atom} from 'recoil';

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: {
    name: '',
    age: 18,
  },
  effects: [
    ({node, onSet}) => {
      onSet((oldValue, newValue) => {
        console.log(oldValue, newValue);
      });
    },
  ],
});

export {textState};

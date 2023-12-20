import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

type Props = {
  min?: number,
  max?: number,
  num?: number,
  onChange?: (num: number) => void
}


const NumberInput = (props: Props) => {
  const { min = 0, max = 9999999999999, num = 0, onChange } = props;
  const [value, selectValue] = useState(num);
  console.log(max, 'max');

  const onMinus = () => {
    onChangeText(`${value - 1}`);
  };

  const onPlus = () => {
    onChangeText(`${value + 1}`);
  };


  const onChangeText = (text: string) => {
    if (/^\d+$/.test(text)) {
      const newText = text.replace(/[^0-9]/g, '');
      const sum = Number(newText);
      selectValue(() => {
        let temp = sum > max ? max : sum;
        temp = temp < min ? min : temp;
        onChange?.(temp);
        return temp;
      });
    }

  };

  useEffect(() => {
    onChangeText(`${num}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);



  return <View className="flex-row items-center">
    <IconButton mode="outlined" icon="minus" size={16} containerColor={'#FFFFFF'} iconColor={'#222222FF'} onPress={onMinus} />
    <TextInput mode="outlined" className="bg-transparent text-center w-20" keyboardType="numeric" value={`${value}`} onChangeText={onChangeText} outlineStyle={{ borderRadius: 16 }} />
    <IconButton mode="outlined" icon="plus" size={16} containerColor={'#FFFFFF'} iconColor={'#222222FF'} onPress={onPlus} />
  </View>;
};

export default NumberInput;

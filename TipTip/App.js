import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Voice from '@react-native-voice/voice';

const App = () => {


  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState('');

  const startRecording = async () => {
    try {
      await Voice.start('vi-VN'); // Chọn ngôn ngữ (ví dụ: tiếng Việt)
      setIsRecording(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      console.error(error);
    }
  };

  Voice.onSpeechResults = (event) => {
    // Xử lý kết quả khi nhận được âm thanh ghi âm thành công
    setText(event.value[0]);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
        <Text>{isRecording ? 'Dừng ghi âm' : 'Bắt đầu ghi âm'}</Text>
      </TouchableOpacity>
      <Text>Đoạn văn: {text}</Text>
    </View>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import axios from 'axios';
import OpenAI from 'openai';

const apiUrl = 'https://api.openai.com/v1/chat/completions';
const apiKey = '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'; // Thay YOUR_API_KEY bằng API Key của bạn

const openai = new OpenAI({
  apiKey: apiKey,
});

Tts.setDefaultLanguage('vi-VN');

const App = () => {
  console.log("------------------------")
  // console.log(openai.chat.completions.create);

  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState('');
  const [result, setResult] = useState('');


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

  const startSpeaking = ()=> {
    try{
      if(text){
        Tts.speak(text);
      }
    }catch(error){
      console.log(error);
    }
  }

  const callChatGPT = async () =>{
    try{
      if(text){
        const options = {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: text}],
            max_tokens: 100,
          })
        }
        try{
          const response = await fetch(apiUrl,options);
          const data = await response.json();
          console.log(data);
        }catch(error){
          console.log(error);
        }

        // const requestData = {
        //   model: "gpt-3.5-turbo",
        //   messages: [{"role": "user", "content": text}],
        //   temperature: 0.7
        // };
        // axios.post(apiUrl2, requestData, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${apiKey}`,
        //   },
        // })
        // .then(response => {
        //   const generatedText = response.data.choices[0].text;
        //   setResult(generatedText);
        //   console.log('Generated Text:', generatedText);
        // })
        // .catch(error => {
        //   console.error('Error:', error);
        // });
      }
    }catch(error){
      console.log(error);
    }
  }

  Voice.onSpeechResults = (event) => {
    // Xử lý kết quả khi nhận được âm thanh ghi âm thành công
    setText(event.value[0]);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} style={{borderColor: "black",borderWidth: 1,padding: 5}}>
        <Text>{isRecording ? 'Dừng ghi âm' : 'Bắt đầu ghi âm'}</Text>
      </TouchableOpacity>
      <Text style={{marginVertical: 10}}>Đoạn văn: {text}</Text>
      <TouchableOpacity onPress={!isRecording ? callChatGPT : null} style={{borderColor: "black",borderWidth: 1,padding: 5}}>
        <Text>Call API</Text>
      </TouchableOpacity>
      <Text style={{marginVertical: 10}}>Đoạn Trả lời: {result}</Text>
      <TouchableOpacity onPress={!isRecording ? startSpeaking : null} style={{borderColor: "black",borderWidth: 1,padding: 5}}>
        <Text>Speak</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

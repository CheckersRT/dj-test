import uploadAudio from "../uploadAudio";

export default async function handleSubmit(event, audioFile, setIsLoading, setAudioUrlCh1, setAudioUrlCh2) {
    event.preventDefault();
    console.log(audioFile);
    console.log(event.target.name);
    const url = await uploadAudio(audioFile, setIsLoading);
    event.target.name === "player1" && setAudioUrlCh1(url);
    event.target.name === "player2" && setAudioUrlCh2(url);
  }
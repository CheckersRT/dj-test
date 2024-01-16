import handleSubmit from "@/utils/Controls/handleSubmit";

export default function Load({
  audioFile,
  setAudioFile,
  isLoading,
  setIsLoading,
  setAudioUrlCh1,
  setAudioUrlCh2,
}) {

    console.log(audioFile)
  return (
    <>
      <form
        name="player1"
        onSubmit={(event) =>
          handleSubmit(
            event,
            audioFile,
            setIsLoading,
            setAudioUrlCh1,
            setAudioUrlCh2
          )
        }
      >
        <label htmlFor="image">Deck 1</label>
        <input
          id="image"
          type="file"
          onChange={(event) =>
            event.target ? setAudioFile(event.target.files[0]) : null
          }
        />
        <button type="submit">{isLoading ? "...loading.." : "load"}</button>
      </form>
    </>
  );
}

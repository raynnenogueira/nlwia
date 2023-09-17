import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoID) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoID
    console.log("Realizando o download do video:" + videoID)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => { //acompnhar as etapas do processo do video
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw new Error("A duração desse video é maior do que 60 segundos")
        }
      })

      .on("end", () => {
        console.log("Download do video finalizado")
        resolve()
      })

      .on("error", (error) => {
        console.log("Ocorreu um erro ao tentar baixar o arquivo. Detalhe do erro:", error)
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
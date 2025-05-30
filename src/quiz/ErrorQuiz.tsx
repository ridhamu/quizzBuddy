import WarningImage from '../assets/warning.png'; 

export default function ErrorQuiz() {
  return (
    <div className="w-full border border-black h-full flex flex-col justify-center items-center gap-4">
      <img src={WarningImage} alt="GreenMedal" className="size-32 md:size-48" />
      <button onClick={() => alert("Go Back")} className="text-center font-main text-cred text-2xl md:text-3xl font-bold outline-2 outline-crtext-cred py-1 px-4 rounded-lg hover:cursor-pointer hover:text-bgall hover:outline-transparent hover:bg-cred hover:shadow-xl">
        Go Back
      </button>
    </div>
  )
}

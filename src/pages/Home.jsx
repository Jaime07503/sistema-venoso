import MobileLayout from "../components/MobileLayout";
import PrimaryButton from "../components/PrimaryButton";
import {
  StudyIcon,
  GameIcon,
  QuizIcon,
  ClinicIcon
} from "../components/Icons";

export default function Home() {
  return (
    <MobileLayout>
      <div className="mb-8 pt-3">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/60 shadow-md backdrop-blur-sm border border-white/40">
          <span className="text-3xl">🧬</span>
        </div>

        <h1 className="text-center text-3xl font-extrabold tracking-tight text-[#7a1f2a] mb-3">
          Sistema venoso del brazo
        </h1>

        <p className="text-center text-pretty leading-7 text-[#5f3a40] px-2">
          Aprende el sistema venoso superficial y profundo del brazo de forma
          interactiva basado en Anatomía con orientación clínica.
        </p>
      </div>

      <div className="space-y-4 mb-24">

        <PrimaryButton
          text="Estudiar"
          to="/estudiar"
          icon={<StudyIcon />}
          variant="study"
        />

        <PrimaryButton
          text="Jugar"
          to="/juego"
          icon={<GameIcon />}
          variant="game"
        />

        <PrimaryButton
          text="Quiz"
          to="/quiz"
          icon={<QuizIcon />}
          variant="quiz"
        />

        <PrimaryButton
          text="Clínica"
          to="/clinica"
          icon={<ClinicIcon />}
          variant="clinic"
        />

      </div>
    </MobileLayout>
  );
}
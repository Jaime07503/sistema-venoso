import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import MobileLayout from "../components/MobileLayout";
import SectionCard from "../components/SectionCard";
import PrimaryButton from "../components/PrimaryButton";
import { GameIcon, HomeIcon } from "../components/Icons";

const juegoBase = [
  {
    id: 1,
    imagen: "/vena_axilar.png",
    pregunta: "Arrastra la respuesta correcta hacia la zona señalada.",
    pista: "La flecha señala la vena del lado lateral del brazo.",
    correcta: "Vena cefálica",
    opciones: ["Vena cefálica", "Vena basílica", "Venas braquiales"],
  },
  {
    id: 2,
    imagen: "/vena_profundas.png",
    pregunta: "Arrastra la respuesta correcta hacia la zona señalada.",
    pista: "La flecha señala la vena del lado medial del brazo.",
    correcta: "Vena basílica",
    opciones: ["Vena cefálica", "Vena basílica", "Vena axilar"],
  },
  {
    id: 3,
    imagen: "/vena_superficial.png",
    pregunta: "Arrastra la respuesta correcta hacia la zona señalada.",
    pista: "La flecha señala venas profundas que acompañan la arteria braquial.",
    correcta: "Venas braquiales",
    opciones: ["Vena cefálica", "Venas braquiales", "Vena subclavia"],
  },
];

function mezclarArray(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function prepararJuego() {
  return juegoBase.map((item) => ({
    ...item,
    opciones: mezclarArray(item.opciones),
  }));
}

function OpcionArrastrable({ id, label, bloqueado, colocada }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled: bloqueado || colocada,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`w-full rounded-2xl border px-4 py-3.5 font-medium shadow-sm transition text-left touch-none ${
        colocada
          ? "bg-[#f3d8db] border-[#d79aa1] text-[#7a1f2a] opacity-60"
          : "bg-white/85 border-white/50 text-[#5f3a40]"
      } ${
        isDragging ? "scale-105 shadow-lg opacity-90 z-50" : ""
      } ${bloqueado ? "opacity-70" : "active:scale-95"}`}
    >
      {label}
    </button>
  );
}

function ZonaDrop({ children, ocupada }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "zona-respuesta",
  });

  return (
    <div
      ref={setNodeRef}
      className={`mt-2 min-h-[72px] w-40 rounded-2xl border-2 border-dashed  px-3 py-3 text-center flex items-center justify-center shadow-sm transition ${
        ocupada
          ? "bg-white/85 border-[#c7727b] text-[#7a1f2a]"
          : isOver
          ? "bg-[#ffe8ea] border-[#c7727b] text-[#7a1f2a]"
          : "bg-white/55 border-white/70 text-[#9a7a7f]"
      }`}
    >
      {children || "Suelta aquí"}
    </div>
  );
}

function OverlayCard({ text }) {
  if (!text) return null;

  return (
    <div className="w-56 rounded-2xl border border-[#d79aa1] bg-white px-4 py-3.5 font-medium text-left text-[#7a1f2a] shadow-xl">
      {text}
    </div>
  );
}

export default function Juego() {
  const [preguntas, setPreguntas] = useState(prepararJuego);
  const [indice, setIndice] = useState(0);
  const [opcionColocada, setOpcionColocada] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [bloqueado, setBloqueado] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [errores, setErrores] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const actual = preguntas[indice];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 120,
        tolerance: 8,
      },
    })
  );

  const progreso = useMemo(() => {
    return ((indice + 1) / preguntas.length) * 100;
  }, [indice, preguntas.length]);

  const verificarRespuesta = () => {
    if (!opcionColocada || bloqueado) return;

    setBloqueado(true);

    const esCorrecta = opcionColocada === actual.correcta;

    if (esCorrecta) {
      setPuntaje((prev) => prev + 1);
      setMensaje("✔ Correcto");
    } else {
      setMensaje(`❌ Incorrecto. La respuesta correcta es: ${actual.correcta}`);
      setErrores((prev) => [
        ...prev,
        {
          pregunta: actual.pregunta,
          pista: actual.pista,
          imagen: actual.imagen,
          respuestaUsuario: opcionColocada,
          correcta: actual.correcta,
        },
      ]);
    }

    setTimeout(() => {
      if (indice + 1 < preguntas.length) {
        setIndice((prev) => prev + 1);
        setOpcionColocada("");
        setMensaje("");
        setBloqueado(false);
        setActiveId(null);
      } else {
        setTerminado(true);
      }
    }, 1400);
  };

  const reiniciarJuego = () => {
    setPreguntas(prepararJuego());
    setIndice(0);
    setOpcionColocada("");
    setMensaje("");
    setBloqueado(false);
    setPuntaje(0);
    setTerminado(false);
    setErrores([]);
    setActiveId(null);
  };

  const limpiarZona = () => {
    if (bloqueado) return;
    setOpcionColocada("");
  };

  return (
    <MobileLayout>
      <div className="flex items-center justify-center gap-4 text-[#7a1f2a] mb-4">
        <GameIcon />
        <h1 className="text-3xl font-extrabold text-center text-[#7a1f2a] mb-2">
          Juego
        </h1>
      </div>

      <p className="text-center text-sm text-[#5f3a40] mb-4 leading-6">
        Arrastra una opción y suéltala en la zona indicada.
      </p>

      {!terminado && (
        <div className="mb-5">
          <div className="flex justify-between text-xs text-[#7a555c] mb-2">
            <span>
              Imagen {indice + 1} de {preguntas.length}
            </span>
            <span>
              Puntaje: {puntaje}
            </span>
          </div>

          <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden border border-white/40">
            <div
              className="bg-gradient-to-r from-[#ba7f8c] via-[#d48f92] to-[#c7727b] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
      )}

      {!terminado ? (
        <DndContext
          sensors={sensors}
          onDragStart={(event) => {
            setActiveId(event.active.id);
          }}
          onDragEnd={(event) => {
            const { active, over } = event;
            setActiveId(null);

            if (!over || bloqueado) return;

            if (over.id === "zona-respuesta") {
              setOpcionColocada(active.id);
            }
          }}
          onDragCancel={() => {
            setActiveId(null);
          }}
        >
          <SectionCard title={`Imagen ${indice + 1}`}>
            <p className="mb-2 text-[#5f3a40] font-medium">{actual.pregunta}</p>
            <p className="mb-4 text-sm text-[#7a555c]">{actual.pista}</p>

            <div className="relative mt-32 mb-10">
              <img
                src={actual.imagen}
                alt={`Pregunta ${indice + 1}`}
                className="w-full"
              />

              <div className="absolute right-4 bottom-4 flex flex-col items-center mb-24">

                <ZonaDrop ocupada={!!opcionColocada}>
                  {opcionColocada}
                </ZonaDrop>

                {opcionColocada && !bloqueado && (
                  <button
                    onClick={limpiarZona}
                    className="mt-2 text-xs text-[#9f3d46] font-medium underline"
                  >
                    Quitar respuesta
                  </button>
                )}

                <span className="text-3xl drop-shadow animate-bounce mt-6">⬇️</span>
              </div>
            </div>

            <div className="space-y-3">
              {actual.opciones.map((opcion) => (
                <OpcionArrastrable
                  key={opcion}
                  id={opcion}
                  label={opcion}
                  bloqueado={bloqueado}
                  colocada={opcionColocada === opcion}
                />
              ))}
            </div>

            <p className="mt-3 text-xs text-center text-[#7a555c]">
              Mantén presionada una opción y arrástrala a la zona punteada.
            </p>

            <button
              onClick={verificarRespuesta}
              disabled={!opcionColocada || bloqueado}
              className={`w-full mt-5 py-3.5 rounded-2xl font-semibold text-white shadow-lg transition ${
                !opcionColocada || bloqueado
                  ? "bg-[#d8b6bb] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#ba7f8c] via-[#d48f92] to-[#c7727b] active:scale-95"
              }`}
            >
              Verificar respuesta
            </button>

            {mensaje && (
              <div className="mt-4 rounded-2xl bg-white/60 border border-white/50 p-4 text-sm text-[#7a1f2a] text-center">
                {mensaje}
              </div>
            )}
          </SectionCard>

          <DragOverlay>
            <OverlayCard text={activeId} />
          </DragOverlay>
        </DndContext>
      ) : (
        <SectionCard title="Resultado del juego">
          <p className="text-lg font-semibold mb-3 text-center text-[#7a1f2a]">
            Puntaje: {puntaje} / {preguntas.length}
          </p>

          {errores.length === 0 ? (
            <div className="bg-[#eef9f0] border border-[#b7ddc1] rounded-2xl p-4 text-center text-[#2f6b45] text-sm mb-4">
              🎉 ¡Excelente! Identificaste todas correctamente.
            </div>
          ) : (
            <div className="space-y-3 mb-4">
              <p className="text-sm font-semibold text-[#9f3d46]">
                Respuestas que debes repasar:
              </p>

              {errores.map((error, index) => (
                <div
                  key={index}
                  className="bg-white/70 border border-white/50 rounded-2xl p-4 shadow-sm"
                >
                  <p className="text-sm font-semibold text-[#7a1f2a] mb-2">
                    {index + 1}. {error.pista}
                  </p>

                  <p className="text-sm text-[#a14b54] mb-1">
                    <span className="font-semibold">Tu respuesta:</span>{" "}
                    {error.respuestaUsuario}
                  </p>

                  <p className="text-sm text-[#2f6b45]">
                    <span className="font-semibold">Respuesta correcta:</span>{" "}
                    {error.correcta}
                  </p>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={reiniciarJuego}
            className="w-full bg-gradient-to-r from-[#ba7f8c] via-[#d48f92] to-[#c7727b] text-white font-semibold py-3.5 rounded-2xl mt-3 shadow-lg border border-white/30 active:scale-95 transition"
          >
            Reintentar juego
          </button>
        </SectionCard>
      )}

      <div className="mt-6 mb-24">
        <PrimaryButton text="Volver al inicio" to="/" icon={<HomeIcon />} variant="clinic" />
      </div>
    </MobileLayout>
  );
}
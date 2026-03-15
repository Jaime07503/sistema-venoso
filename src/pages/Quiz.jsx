import { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import MobileLayout from "../components/MobileLayout";
import SectionCard from "../components/SectionCard";
import PrimaryButton from "../components/PrimaryButton";
import { QuizIcon } from "../components/Icons";

const preguntasBase = [
  {
    pregunta: "¿Con qué venas se une la vena basílica para formar la vena axilar?",
    opciones: [
      "Con las venas braquiales",
      "Con la vena cefálica",
      "Con la vena radial",
      "Con la vena subclavia",
    ],
    correcta: "Con las venas braquiales",
  },
  {
    pregunta: "¿Cuáles son las venas superficiales principales del miembro superior?",
    opciones: [
      "La vena cefálica y la vena basílica, que se originan en la red venosa dorsal de la mano.",
      "La vena braquial y la vena radial, que se originan en las arterias del antebrazo.",
      "La vena axilar y la vena subclavia, que se originan en la cavidad torácica.",
    ],
    correcta:
      "La vena cefálica y la vena basílica, que se originan en la red venosa dorsal de la mano.",
  },
  {
    pregunta:
      "¿Por qué las venas profundas del miembro superior reciben el mismo nombre que las arterias?",
    opciones: [
      "Porque nacen del mismo tejido",
      "Porque acompañan a las arterias principales",
      "Porque transportan sangre arterial",
      "Porque están en la piel",
    ],
    correcta: "Porque acompañan a las arterias principales",
  },
  {
    pregunta:
      "¿La vena basílica desciende por el brazo hacia la mano?",
    opciones: [
      "Verdadero",
      "Falso",
    ],
    correcta: "Falso",
  },
  {
    pregunta:
      "¿La vena mediana del antebrazo es una vena profunda?",
    opciones: [
      "Verdadero",
      "Falso",
    ],
    correcta: "Falso",
  },
  {
    pregunta:
      "¿La vena mediana del antebrazo asciende por la línea media del antebrazo?",
    opciones: [
      "Verdadero",
      "Falso",
    ],
    correcta: "Verdadero",
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

function prepararPreguntas() {
  return mezclarArray(
    preguntasBase.map((pregunta, index) => ({
      id: index + 1,
      ...pregunta,
      opciones: mezclarArray(pregunta.opciones),
    }))
  );
}

export default function Quiz() {
  const [preguntas, setPreguntas] = useState(prepararPreguntas);
  const [indice, setIndice] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [terminado, setTerminado] = useState(false);
  const [respuestasUsuario, setRespuestasUsuario] = useState([]);
  const [bloqueado, setBloqueado] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const preguntaActual = preguntas[indice];

  const fallos = useMemo(() => {
    return respuestasUsuario.filter(
      (item) => item.respuestaSeleccionada !== item.respuestaCorrecta
    );
  }, [respuestasUsuario]);

  const lanzarConfeti = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  const responder = (opcion) => {
    if (bloqueado) return;

    setBloqueado(true);
    setOpcionSeleccionada(opcion);

    const esCorrecta = opcion === preguntaActual.correcta;

    if (esCorrecta) {
      setPuntaje((prev) => prev + 1);
      setMensaje("✔ Correcto");
    } else {
      setMensaje("❌ Incorrecto");
    }

    setRespuestasUsuario((prev) => [
      ...prev,
      {
        pregunta: preguntaActual.pregunta,
        respuestaSeleccionada: opcion,
        respuestaCorrecta: preguntaActual.correcta,
      },
    ]);

    setTimeout(() => {
      if (indice + 1 < preguntas.length) {
        setIndice((prev) => prev + 1);
        setMensaje("");
        setBloqueado(false);
        setOpcionSeleccionada(null);
      } else {
        const puntajeFinal = esCorrecta ? puntaje + 1 : puntaje;
        setTerminado(true);
        setMensaje("");
        setBloqueado(false);

        if (puntajeFinal === preguntas.length) {
          lanzarConfeti();
        }
      }
    }, 1200);
  };

  const reiniciar = () => {
    setPreguntas(prepararPreguntas());
    setIndice(0);
    setPuntaje(0);
    setMensaje("");
    setTerminado(false);
    setRespuestasUsuario([]);
    setBloqueado(false);
    setOpcionSeleccionada(null);
  };

  const obtenerClaseBoton = (opcion) => {
    const base =
      "w-full font-medium py-3.5 rounded-2xl transition text-left px-4 shadow-sm border";

    if (!bloqueado || opcionSeleccionada === null) {
      return `${base} bg-white/85 backdrop-blur-sm border-white/50 text-[#5f3a40] active:scale-95`;
    }

    if (opcion === preguntaActual.correcta) {
      return `${base} bg-[#e3f6e8] border-[#8cc8a1] text-[#2f6b45]`;
    }

    if (opcion === opcionSeleccionada && opcion !== preguntaActual.correcta) {
      return `${base} bg-[#fde7e7] border-[#e3a0a3] text-[#9f3d46]`;
    }

    return `${base} bg-white/50 border-white/40 text-[#9a7a7f]`;
  };

  return (
    <MobileLayout>
      <div className="flex items-center justify-center gap-4 text-[#7a1f2a] mb-4">
        <QuizIcon />
        <h1 className="text-3xl font-extrabold text-center text-[#7a1f2a] mb-2">
          Quiz
        </h1>
      </div>

      <p className="text-center text-sm text-[#5f3a40] mb-4 leading-6">
        Responde las preguntas y mide tu conocimiento.
      </p>

      {!terminado && (
        <div className="mb-5">
          <div className="flex justify-between text-xs text-[#7a555c] mb-2">
            <span>
              Pregunta {indice + 1} de {preguntas.length}
            </span>
            <span>
              Puntaje: {puntaje}
            </span>
          </div>

          <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden border border-white/40">
            <div
              className="bg-gradient-to-r from-[#c98bb7] via-[#d48f92] to-[#b483c2] h-3 rounded-full transition-all duration-300"
              style={{
                width: `${((indice + 1) / preguntas.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {!terminado ? (
        <SectionCard title={`Pregunta ${indice + 1}`}>
          <p className="mb-4 text-[#5f3a40]">{preguntaActual.pregunta}</p>

          <div className="space-y-3">
            {preguntaActual.opciones.map((opcion) => (
              <button
                key={opcion}
                onClick={() => responder(opcion)}
                disabled={bloqueado}
                className={obtenerClaseBoton(opcion)}
              >
                {opcion}
              </button>
            ))}
          </div>

          {mensaje && (
            <div className="mt-4 rounded-2xl bg-white/60 border border-white/50 p-4 text-sm text-[#7a1f2a] text-center">
              {mensaje}
            </div>
          )}
        </SectionCard>
      ) : (
        <SectionCard title="Resultado final">
          <p className="text-lg font-semibold mb-2 text-center text-[#7a1f2a]">
            Puntaje: {puntaje} / {preguntas.length}
          </p>

          {puntaje === preguntas.length ? (
            <div className="bg-[#eef9f0] border border-[#b7ddc1] rounded-2xl p-4 text-center text-[#2f6b45] text-sm mb-4">
              🎉 ¡Excelente! Acertaste todas las preguntas.
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-sm font-semibold text-[#9f3d46] mb-3">
                Fallaste en estas preguntas:
              </p>

              <div className="space-y-3">
                {fallos.map((fallo, index) => (
                  <div
                    key={index}
                    className="bg-white/70 border border-white/50 rounded-2xl p-4 shadow-sm"
                  >
                    <p className="text-sm font-semibold text-[#7a1f2a] mb-2">
                      {index + 1}. {fallo.pregunta}
                    </p>

                    <p className="text-sm text-[#a14b54] mb-1">
                      <span className="font-semibold">Tu respuesta:</span>{" "}
                      {fallo.respuestaSeleccionada}
                    </p>

                    <p className="text-sm text-[#2f6b45]">
                      <span className="font-semibold">Respuesta correcta:</span>{" "}
                      {fallo.respuestaCorrecta}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={reiniciar}
            className="w-full bg-gradient-to-r from-[#a98acb] via-[#bc9fd7] to-[#b483c2] text-white font-semibold py-3.5 rounded-2xl mt-3 shadow-lg border border-white/30 active:scale-95 transition"
          >
            Reintentar Quiz
          </button>
        </SectionCard>
      )}

      <div className="mt-6 mb-24">
        <PrimaryButton text="Volver al inicio" to="/" icon="🏠" variant="clinic" />
      </div>
    </MobileLayout>
  );
}
let capture;
let detector;
let selectedHand = null;
let isHandInCircle = false; // Variabile per tracciare lo stato della mano nel cerchio
let lastDetectionTime = 0; // Variabile per tenere traccia dell'ultimo rilevamento della mano
const demoElement = document.getElementById("demo");
const ratio = window.innerWidth / 16 * 9;
let body = document.querySelector('body');



async function setup() {
    createCanvas(window.innerWidth, ratio);
    capture = createCapture(VIDEO);
    capture.hide();
    console.log("Carico modello...");
    detector = await createDetector();
    console.log("Modello caricato.");
}



async function draw() {
    clear();
    background(0, 10);
    if (detector && capture.loadedmetadata) {
        const hands = await detector.estimateHands(capture.elt, { flipHorizontal: true });

        noStroke();
        for (let j = 0; j < hands.length; j++) {
            const hand = hands[j];
            const handedness = hand.handedness;
            const middle = hand.keypoints[9];

            let palmX = middle.x;
            let palmY = middle.y;
            let mappedPalmX = map(palmX, 0, capture.width, 0, window.innerWidth);
            let mappedPalmY = map(palmY, 0, capture.height, 0, ratio);

            if (hands.length == 2) {
                fill("purple");
            } else {
                if (handedness === "Left") {
                    fill("blue");
                    selectedHand = hand;
                } else if (handedness === "Right") {
                    fill("yellow");
                    selectedHand = hand;
                }
            }
            circle(mappedPalmX, mappedPalmY, 50);

            // Verifica se è trascorso abbastanza tempo dall'ultimo rilevamento della mano
            const currentTimetTime = new Date().getTime();
            const timeSinceLastDetection = currentTimetTime - lastDetectionTime;
            if (timeSinceLastDetection >= 5000) { // 5000 millisecondi = 5 secondi
                rispostaCerchio(handedness, selectedHand);
                lastDetectionTime = currentTimetTime; // Aggiorna l'ultimo rilevamento della mano
            }
        }
    }
}

rispostaCerchio = function (handedness, selectedHand) {
    if (!selectedHand) return;

    // Controlla se la mano selezionata è all'interno del cerchio centrale
    if (handedness === 'Right') {
        timer = this.setTimeout(() => {
            machine.send('destra');
            timer = 0;
        }, 2000);
    } else if (handedness === 'Left') {
        timer = this.setTimeout(() => {
            machine.send('sinistra');
            timer = 20000;
        }, 2000);
    }

};

function typeWriter(text, element) {
    element.innerHTML = ""; // Cancella il contenuto dell'elemento prima di digitare
    let i = 0;
    const speed = 5;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

let currentState = "Inizio";

function createMachine(config) {
    let currentState = config.initial;
    let gameOver = false;

    function transition(state) {
        currentState = state;
        render();

        if (currentState === "Muori" || currentState === "Sopravvivi") {
            gameOver = true;
            resetGame();
        }
        // Cambia l'immagine di sfondo del body
    body.style.backgroundImage = 'url(IMG/' + currentState +'.png)';
    console.log("Percorso immagine:", "IMG/" + state + ".png");
    }

    function render() {
        const stateMachineEl = document.getElementById("stateMachine");
        stateMachineEl.innerHTML = "";

        const stateConfig = config.states[currentState];
        const choices = Object.keys(stateConfig.on);

        const choicesEl = document.createElement("div");
        choicesEl.classList.add("choices");

        choices.forEach((choice) => {
            const choiceDiv = document.createElement("div");
            choiceDiv.textContent = choice;
            choiceDiv.classList.add("option");
            choiceDiv.addEventListener("gesture-detected", () => {

                const targetState = stateConfig.on[choice].target;
                transition(targetState);
                console.log(targetState);
                txt = targetState.testo;
                typeWriter(txt, demoElement);

                // Chiamare `machine.send()` con l'evento appropriato
                machine.send(choice);

            });

            choicesEl.appendChild(choiceDiv);
        });

        stateMachineEl.appendChild(choicesEl);

        // Chiamare typeWriter con il testo di immissione dello stato corMarcote
        typeWriter(stateConfig.entry, demoElement);
    }

    render();

    return {
        send: function (event) {

                const textToType = "";
                typeWriter(textToType, demoElement);
                let stateConfig = config.states[currentState];
                let targetState = stateConfig.on[event].target;
                transition(targetState);
                console.log(targetState);
                txt = targetState.testo;
                typeWriter(txt, demoElement);

                // Chiamare il metodo `dispatchEvent` per attivare l'evento gesto
                const gestureEvent = new CustomEvent("gesture-detected", {
                    detail: {
                        gesture: event,
                    },
                });
                document.body.dispatchEvent(gestureEvent);
        },
    }
}



const machine = createMachine({
    id: "Gioco",
    initial: "Start",
    states: {
        "Start": {
            entry: " Benvenuto nel gioco! Metti la mano destra all'interno del cerchio (per 3 secondi) per incominciare a giocare!",
            on: {
                destra: {
                    target: "Inizio"
                }
            }
        },

        "Inizio": {
            entry: " Marco notò che il suo telefono era completamente scarico. Mentre cercava il caricatore nella cucina, udì un rumore improvviso provenire dal salotto. Qualcuno era in casa. Marco doveva decidere se cercare il caricatore (mano sinistra) per chiamare aiuto o nascondersi dietro la porta.(mano destra)",
            on: {
                destra: {
                    target: "Porta"
                },
                sinistra: {
                    target: "Muori"
                }
            }
        },

        "Porta": {
            entry: " Marco si nascose dietro la porta per non farsi notare dall'intruso. Riuscì camminando di soppiatto a raggiungere il salotto. Cosa fai? Ti nascondi sotto il tavolo (mano sinistra) o dietro il divano (mano destra)?",
            on: {
                destra: {
                    target: "Scappi"
                },
                sinistra: {
                    target: "Muori"
                }
            }
        },

        "Scappi": {
            entry: " Hai deciso di nasconderti dietro il divano. L'assassino non nota Marco ed esce dal salotto entrando in cucina, Marco sfrutta l'opportunità per scappare di casa. Corre per la strada e s'imbatte in un vicolo (M. destra)",
            on: {
                destra: {
                    target: "Vicolo"
                }
            }
        },

        "Vicolo": {
            entry: " Marco si fermò per riprendere fiato ma non aveva molto tempo prima che il killer lo raggiungesse! Guardò davanti a sé e vide che aveva due opzioni, girare a sinistra o a destra",
            on: {
                sinistra: {
                    target: "Rete"
                },
                destra: {
                    target: "Strada"
                }
            }
        },

        "Rete": {
            entry: " Marco sceglie di andare a sinistra e si imbatte in una rete fatiscente che blocca il passaggio. Cosa fa? (destra) ritorna indietro o (sinistra) prova a superare la rete?",
            on: {
                destra: {
                    target: "Principale"
                },
                sinistra: {
                    target: "Muori"
                }
            }
        },

        "Principale": {
            entry: " Marco ritorna nel vicolo principale e trova una piccola strada laterale che conduce a una stazione di servizio. Trova un telefono funzionante e chiama la polizia, ottenendo finalmente aiuto. (destra per avanzare)",
            on: {
                destra: {
                    target: "Sopravvivi"
                },
            }
        },

        "Strada": {
            entry: " Marco decide di andare a destra e si imbatte in una strada deserta. Cosa fa? (destra) Correre o (sinistra) proseguire in una via secondaria",
            on: {
                destra: {
                    target: "Correre"
                },
                sinistra: {
                    target: "DueEdifici"
                }
            }
        },

        "Correre": {
            entry: " Mentre Marco corre lungo la strada, il killer lo raggiunge e inizia una caccia spietata. Marco deve fare delle scelte rapide per sfuggirgli, cosa fai? (destra) ti fermi e lo affronti o (sinistra) urla aiuto",
            on: {
                destra: {
                    target: "Muori"
                },
                sinistra: {
                    target: "Gruppo"
                }
            }
        },

        "DueEdifici": {
            entry: " Marco cerca una via secondaria per evitare l'esposizione e continuare la fuga. Alla fine della strada si imbatte in due edifici: (destra) un vecchio magazzino e (sinistra) un edificio in costruzione",
            on: {
                destra: {
                    target: "Telefono"
                },
                sinistra: {
                    target: "Muori"
                }
            }
        },

        "Gruppo": {
            entry: " Un gruppo di persone che hanno sentito le urla va incontro a Marco per capire cosa è successo, grazie a loro sopravvivi e il killer scappa via. (destra per completare)",
            on: {
                destra: {
                    target: "Sopravvivi"
                }
            }
        },

        "Telefono": {
            entry: " All'interno del magazzino Marco scopre che c'è un telefono, lo raggiunge e chiama immediatamente la polizia. Loro lo avvisano che ci vorrà un po' prima che lo raggiungano, nel frattempo gli indicano che deve rimanere nascosto e stare in guardia. Dove ti nascondi? (destra) Scaffali o (sinistra) in cantina",
            on: {
                destra: {
                    target: "Scaffali"
                },
                sinistra: {
                    target: "Cantina"
                }
            }
        },

        "Scaffali": {
            entry: " Marco decide di rimanere fermo dietro agli scaffali del magazzino, sperando che il killer non lo trovi. Il killer entra nel magazzino e guarda in giro. Marco emette un suono involontario che attira l'attenzione del killer che si avvicina. Cosa fai? (destra) Cambi nascondiglio o (sinistra) rimani fermo?",
            on: {
                destra: {
                    target: "Muori"
                },
                sinistra: {
                    target: "Sopravvivi"
                }
            }
        },

        "Cantina": {
            entry: " Marco decide di scendere nella cantina del magazzino, sperando di trovare un nascondiglio più sicuro. Il killer entra nel magazzino e guarda in giro ma non scende in cantina. Successivamente se ne va. Marco sopravvive (destra per completare)",
            on: {
                destra: {
                    target: "Sopravvivi"
                }
            }
        },

        Sopravvivi: {
            entry: " Congratulazioni sei sopravvissuto! Alza la mano sinistra (per due volte, una adesso e la seconda quando il testo sparisce) per provare altri percorsi!",

            on: {
                destra: {
                    target: "Start"
                },
                sinistra: {
                    target: "Start"
                }
            },

            description: `Good ending`
        },

        Muori: {
            entry: " Hai perso! Alza la mano sinistra (per due volte, una adesso e la seconda quando il testo sparisce) per riprovarci",

            on: {
                destra: {
                    target: "Start"
                },
                sinistra: {
                    target: "Start"
                }
            },

            description: `Bad ending`
        }
    },
    predictableActionArguments: true,
    preserveActionOrder: true
});

function resetGame() {
    machine.send("Inizio");
    txt = '';
    typeWriter(txt, demoElement);
}


async function createDetector() {
    const mediaPipeConfig = {
        runtime: "mediapipe",
        modelType: "full",
        maxHands: 2,
        solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands`,
    };
    return window.handPoseDetection.createDetector(window.handPoseDetection.SupportedModels.MediaPipeHands, mediaPipeConfig);
}
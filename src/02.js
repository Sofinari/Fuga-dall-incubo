createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QHECWB7AxugdASQDtUAvDAYgAUAndWMKAV1QG0AGAXUVAAdbUAXDAS4gAHogAsEgEw4AnHIBsrOawCMagOwBWABz6ANCACeiaQGZtORdLm7Fd6WomLt56QF8PRtFlzVUAFsAQwACWEwwABt+YMp0Kli2TiQQXlgBIRFxBCUrfVZpRRdzVldNXSNTBGl1eUVNCttGiR1pXS8fDGwcAJDwyJi4gGFgqlRMYP4EsGSRdMz0YVScvJwCopKy7QqqxDVzBvXNVU0LO205CU6QXx6AZTBsAggwiOjYsgARVAA3YII6DmqQWgiW2X22jqrFYEhh0hcEjkzT2CC0uhwrG0UPUtTh2O0128t26uEez1eAw+cQAKsFfugokCOPM+GDlqAcmooWpMbD4YjkXJNKiDlocOZdHJzNyYeY5Dc7mTJtxuKgyAAxYJ0ULSYE8NlZFZmXE4A6w5xlCy6SWiiqY7EwtR4rHYoldPw4ABqE0Z6DI91QRFg-CowX1aUN4ONNW0agxyl0MgUSN00hFJkhEjNMicV1KiksNsVpO9vqZ3zgofDLJBUY5YjMcYTrCTtiujgz1WxchwUnMcPc5gHOhLnoASmB+GAyEGIKgpzQI6CjZzJBpecjzjYLI1RcO+ycLKmkw4KmOepPpwGGNwwGGqFEaykDRl2RCEBIN-JpNvf+Y90zBBSisJwdF0VhSl0M4pXdElPQCAhMFQbhgiiGcAFUIgEZ9WTfVdG0-YpWHkA4v30GxFHsfdzEPZEBzsU87AvMlq1eMhhgSKh71mWtX0WBsclKdxrHcWFd20BoEVFMpeV0eMNAuKikXMFicHuNi4nJJZXnGXC63w6M12AyDZELPEJKkiRUUJWRIMKWUbG0Xc1MnAhQmwKhuNCBhHwBCB0FCMBQlQKJQgAa1C9CqFCJkQoIOhGBnABBAAzVKaAIJI+MjQzBPXDQfz-Xcu32NQlGsKQJEOAtsQHVywHczzvN8p8XkC4LQoiqL71iwKg0ShhML85d6w-L9Cq3eUdwA0q0Ug7NXGxTRYWHIpCTUr4hqC+dUomdUAFlgigYJiFIQFRryj9LE0WjNGdS4Gn0Nw5G0Gz4zNLQXGadRpUUTbtsgVA9uQsgAFFdv25kX1ygTrp2O6HqUCpdBet6gOg3lFGxw4ZGgiRMbUmkaH+Hz3KgKhb14UJ51CO8qFgJYZ3HY6oFQBgCDZ2LgvpxmCF4mGVyMwjERIuQyPjewimooC1AW6wCRW6r3FcOClRwYn0F+VAydCad0NSpYOo8gALVBgkCHWnzpxkSHNgNJnStCWByoX8s-b8pqUf9AOqKiSOTbG9FR5zVOJdXNe13X9bAQ3ASC03zct2Kwl4KI7ZGAFBAIfT+PfGMJs3f9vZK1ECc0HAVrjCQ9CUKRsTUvAwsiqJotCRgxkpIN29QGgOItgAjc3LrhgviNIgdJcomXqnukik3RZybHUKRG+bnqYo7qgu-J3v-XHIIARdwWxrHuEJ-IqWqMUVFXBI9Rbs0QszgqBo1+61veq3nee5oUJ+kBO5d4LxOpNSzkGOIFBbakFzrDfOxlRYXyntLG+QFy6VyxM4WuxQa7aDUgdBgCR1QH2wJbJCw9XanwQQ4KwVFpB6EUGoRhUlRQlErgOVwzh2gOEsGpe46BuBhl+NrbWZAD5sywLAt2H5nJFB-EiRhK1hTcnehXWwqYALOROAqG4gIIBwBEEqPCo9jIAFpUHVFMVYBQCgpT0L0PGK4-1w6lkIHbdAxj4Ei2kKiX8sgnBIkJDsWEaZhRqT6G8QYsRPEERyJJXs+gvwWELM6FeopCQSkSZBe6AECaFj4U8HSkTqQxOFlyOWVgYSv2cKrW6rDezChkGJeSLglB8JVGqUp7smFMLNAOdMBZbDph8bLXpMoAm3R2MtQ4akfTYCZF0j8ThfzWGdO0KUUIAJqFFHI2SNd7IQSRDoj0l4pxgEWTGLZ1jNjDhlK2OMopCpSggsoZyNpxYWHCeMchqF0IXIQQibM4t7r0LApRVE8k+yo2UioBExQtB8M0v8wiRRDiiR2OXAszo5pL3kHk4czhy6tAak1LiwVWr+WNl1Fubc4oDXoENZFQl7rXOKLcuWqNtmyxhPfHQ8YV73QUGHE5uAtrBSBiDVATLEAykaJXJhhZJQ6EYcKMuqhMSHB0GJYU9hNBExJmEDm7dKaqkCrTXmTNpWfkBaREFzktDgqAgoWQE0ES2CTDaNWpZI46yNTHOOxtMBmwtlbVO0DzZWquT+NlBL7lcuqFIRQ1h6FYturUWw78aVfwYJ3MI3c2Y0CtTIKQtqHpgqKLfVs8hNFYlUAvHYmaN7txzdvPNu8-4AKWFSEB8UPLgJzkWm1wKy0OorWg+h9RdytHcI4L1noCFEKtXGWEOBjwMQ0DobEjz0wSluoUZ6jo1B8IEUIkRUqDImJFhRCUuNSgHEJOVNVsg3Ry1aPJWwNgvBeCAA */
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
                    target: "Marco corre urlando e il killer lo insegue"
                },
                sinistra: {
                    target: "Due edifici"
                }
            }
        },

        "Marco corre urlando e il killer lo insegue": {
            entry: " Mentre Marco corre lungo la strada, il killer lo raggiunge e inizia una caccia spietata. Marco deve fare delle scelte rapide per sfuggirgli, cosa fai? (destra) ti fermi e lo affronti o (sinistra) urla aiuto",
            on: {
                destra: {
                    target: "Muori"
                },
                sinistra: {
                    target: "Trova un gruppo di persone"
                }
            }
        },

        "Due edifici": {
            entry: " Marco cerca una via secondaria per evitare l'esposizione e continuare la fuga. Alla fine della strada si imbatte in due edifici: (destra) un vecchio magazzino e (sinistra) un edificio in costruzione",
            on: {
                destra: {
                    target: "Trovi un telefono e chiami la polizia"
                },
                sinistra: {
                    target: "Muori"
                }
            }
        },

        "Trova un gruppo di persone": {
            entry: " Un gruppo di persone che hanno sentito le urla va incontro a Marco per capire cosa è successo, grazie a loro sopravvivi e il killer scappa via. (destra per completare)",
            on: {
                destra: {
                    target: "Sopravvivi"
                }
            }
        },

        "Trovi un telefono e chiami la polizia": {
            entry: " All'interno del magazzino Marco scopre che c'è un telefono, lo raggiunge e chiama immediatamente la polizia. Loro lo avvisano che ci vorrà un po' prima che lo raggiungano, nel frattempo gli indicano che deve rimanere nascosto e stare in guardia. Dove ti nascondi? (destra) Scaffali o (sinistra) in cantina",
            on: {
                destra: {
                    target: "Il killer guarda in giro"
                },
                sinistra: {
                    target: "Il killer guarda in giro ma non scende in cantina"
                }
            }
        },

        "Il killer guarda in giro": {
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

        "Il killer guarda in giro ma non scende in cantina": {
            entry: " Marco decide di scendere nella cantina del magazzino, sperando di trovare un nascondiglio più sicuro. Il killer entra nel magazzino e guarda in giro ma non scende in cantina. Successivamente se ne va. Marco sopravvive (destra per completare)",
            on: {
                destra: {
                    target: "Sopravvivi"
                }
            }
        },

        Sopravvivi: {
            entry: "Congratulazioni sei sopravvissuto! Alza la mano sinistra (per due volte, una adesso e la seconda quando il testo sparisce) per provare altri percorsi!",

            on: {
                destra: {
                    target: "Prossimo"
                },
                sinistra: {
                    target: "Prossimo"
                }
            },

            description: `Good ending`
        },

        Prossimo: {
            on: {
                sinistra: {
                    target: "Start",
                    action: resetGame

                }
            }
        },

        Muori: {
            entry: "Hai perso! Alza la mano sinistra (per due volte, una adesso e la seconda quando il testo sparisce) per riprovarci",

            on: {
                destra: {
                    target: "Prossimo"
                },
                sinistra: {
                    target: "Prossimo"
                }
            },

            description: `Bad ending`
        }
    },
    predictableActionArguments: true,
    preserveActionOrder: true
});